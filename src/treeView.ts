import * as vscode from 'vscode';
import { ColorKey, HighlighterStoreEntry } from './highlighters';

export class GadgetFileProvider implements vscode.TreeDataProvider<GadgetFileItem | HighlighterItem | HighlighterItemColorSection> {
	constructor(
		private workspaceRoot: string,
		private context: vscode.ExtensionContext
	) { }

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
		return gadgetFiles.map(file => {
			const relativePath = vscode.workspace.asRelativePath(file);
			return new GadgetFileItem(
				relativePath,
				vscode.TreeItemCollapsibleState.Collapsed,
				vscode.Uri.file(file.fsPath)
			);
		});
	}

	private getGadgetFileHighlightersColors(filename: string): HighlighterItemColorSection[] {
		const highlighters = this.context.workspaceState.get<HighlighterStoreEntry[]>(filename, []);
		const colors = highlighters.map(h => h.c);
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
			`${h.s}:${h.e} > MOV`,
			vscode.TreeItemCollapsibleState.None,
			vscode.Uri.file(filename),
			h.c
		));
		return highlightersItems;
	}

	private _onDidChangeTreeData: vscode.EventEmitter<GadgetFileItem | HighlighterItem | undefined | null | void> = new vscode.EventEmitter<GadgetFileItem | HighlighterItem | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<GadgetFileItem | HighlighterItem | undefined | null | void> = this._onDidChangeTreeData.event;

	refresh(): void {
		console.log('Refreshing tree view');
		this._onDidChangeTreeData.fire();
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
		public readonly highlightedGadget: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly reourceUri: vscode.Uri,
		public readonly color: ColorKey,
		public readonly command?: vscode.Command,
		public readonly iconPath = new vscode.ThemeIcon('circle-filled', new vscode.ThemeColor(`terminal.ansi${color.charAt(0).toUpperCase() + color.slice(1)}`))
	) {
		super({
			highlights: [[0,1]],
			label: highlightedGadget
		}, collapsibleState);
	}
}