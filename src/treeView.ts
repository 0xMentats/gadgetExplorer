import * as vscode from 'vscode';
import { ColorKey, HighlighterStoreEntry } from './highlighters';
import { TreeViewCommandKeys } from './config';

export class GadgetFileProvider implements vscode.TreeDataProvider<GadgetFileItem | HighlighterItem | HighlighterItemColorSection> {
	private _onDidChangeTreeData: vscode.EventEmitter<any> = new vscode.EventEmitter<any>();
	readonly onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;

	constructor(
		private workspaceRoot: string,
		private context: vscode.ExtensionContext
	) {
		vscode.commands.registerCommand(TreeViewCommandKeys.onItemClicked, item => this.on_item_clicked(item));
		vscode.commands.registerCommand(TreeViewCommandKeys.refresh, () => this.refresh());
	}

	getTreeItem(element: GadgetFileItem | HighlighterItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: GadgetFileItem | HighlighterItemColorSection | undefined): vscode.ProviderResult<(GadgetFileItem | HighlighterItem | HighlighterItemColorSection)[]> {
		if (!this.workspaceRoot) {
			vscode.window.showInformationMessage('No gadget files in empty workspace');
			return Promise.resolve([]);
		}

		if (!element) {
			return Promise.resolve(this.getWorkspaceGadgetFiles());
		} else if (element instanceof GadgetFileItem) {
			return Promise.resolve(this.getGadgetFileHighlighters(element.fsPath));
		} else if (element instanceof HighlighterItemColorSection) {
			return Promise.resolve(this.getGadgetFileHighlightersColors(element.fsPath));
		}
	}

	private async getWorkspaceGadgetFiles(): Promise<GadgetFileItem[]> {
		const gadgetFiles = await vscode.workspace.findFiles('**/*.gadgets.txt', '**/node_modules/**', 10);
		const gadgetFilenames = gadgetFiles.map(file => {
			const relativePath = vscode.workspace.asRelativePath(file);
			return new GadgetFileItem(
				relativePath,
				vscode.TreeItemCollapsibleState.Collapsed,
				vscode.Uri.file(file.fsPath)
			);
		});

		const sortedGadgetFilenames = gadgetFilenames.sort((a, b) => a.filename.localeCompare(b.filename));
		return sortedGadgetFilenames;
	}

	private getGadgetFileHighlightersColors(filename: string): HighlighterItemColorSection[] {
		const highlighters = this.context.workspaceState.get<HighlighterStoreEntry[]>(filename, []);
		const colors = highlighters.map(h => h.color);
		const uniqueColors = [...new Set(colors)];
		const colorItems = uniqueColors.map(c => new HighlighterItemColorSection(
			c,
			filename,
			vscode.TreeItemCollapsibleState.None,
			colors.filter(color => color === c).length
		));
		return colorItems;
	}

	private getGadgetFileHighlighters(filename: string): HighlighterItem[] {
		const highlighters = this.context.workspaceState.get<HighlighterStoreEntry[]>(filename, []);
		const highlightersItems = highlighters.map(h => new HighlighterItem(
			vscode.TreeItemCollapsibleState.None,
			vscode.Uri.file(filename),
			h.start,
			h.end,
			h.color,
			h.gadget
		));

		// sort the highlighters by start range
		highlightersItems.sort((a, b) => a.rangeStart - b.rangeStart);
		return highlightersItems;
	}

	public on_item_clicked(item: GadgetFileItem | HighlighterItem | HighlighterItemColorSection) {
		// make a switch statement to handle the different types of items
		switch (item.constructor.name) {
			case 'GadgetFileItem':
				console.log('GadgetFileItem clicked: ', item);
				vscode.workspace.openTextDocument(item.resourceUri!).then(doc => {
					vscode.window.showTextDocument(doc);
				});

				break;
			case 'HighlighterItem':
				let highlighterItem = item as HighlighterItem;
				console.log('HighlighterItem clicked: ', highlighterItem);
				vscode.workspace.openTextDocument(highlighterItem.resourceUri!).then(doc => {
					vscode.window.showTextDocument(doc).then(editor => {
						const range = new vscode.Range(highlighterItem.rangeStart, 0, highlighterItem.rangeEnd, Number.MAX_VALUE);
						editor?.revealRange(range);
						editor.selection = new vscode.Selection(range.start, range.start);
					});
				});

				break;
			case 'HighlighterItemColorSection':
				console.log('HighlighterItemColorSection clicked: ', item);
				break;
			default:
				console.error('Unknown item type clicked: ', item);
		}
	}

	refresh(): void {
		console.log('Refreshing tree view');
		this._onDidChangeTreeData.fire(undefined);
	}
}

class GadgetFileItem extends vscode.TreeItem {
	constructor(
		public readonly filename: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly resourceUri: vscode.Uri,
		public readonly fsPath = resourceUri.fsPath,
		public readonly command?: vscode.Command,
		public readonly iconPath = vscode.ThemeIcon.File
	) {
		super(filename, collapsibleState);
		this.command = {
			command: TreeViewCommandKeys.onItemClicked,
			title: 'Open',
			arguments: [this]
		};
	}
}

class HighlighterItemColorSection extends vscode.TreeItem {
	constructor(
		public readonly color: string,
		public readonly fsPath: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly childCount: number,
		public readonly command?: vscode.Command
	) {
		super(color, collapsibleState);
	}
}

class HighlighterItem extends vscode.TreeItem {
	constructor(
		// public readonly highlightedGadget: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly resourceUri: vscode.Uri,
		public readonly rangeStart: number,
		public readonly rangeEnd: number,
		public readonly color: ColorKey,
		public readonly gadget?: string,
		public readonly command?: vscode.Command,
		public readonly iconPath?: vscode.ThemeIcon
	) {
		super({
			label: HighlighterItem.formatLabel(rangeStart, rangeEnd, gadget!),
			highlights: [[0, 1]],
		}, collapsibleState);

		this.command = {
			command: TreeViewCommandKeys.onItemClicked,
			title: 'Open',
			arguments: [this]
		};

		try {
			this.iconPath = new vscode.ThemeIcon('circle-filled', new vscode.ThemeColor(`terminal.ansi${color.charAt(0).toUpperCase() + color.slice(1)}`))
		} catch (error) {
			console.error('Error creating icon path for tree view: ', error);
		}
	}

	private static formatLabel(rangeStart: number, rangeEnd: number, gadget: string): string {
		return `[${rangeStart}-${rangeEnd}] ${gadget.toUpperCase()}`;
	}
}