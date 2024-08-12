import * as vscode from 'vscode';
import { HighlighterStoreEntry } from './highlighters';

export class GadgetFileProvider implements vscode.TreeDataProvider<GadgetFileItem | HighlighterItem> {
	constructor(
		private workspaceRoot: string,
		private context: vscode.ExtensionContext
	) { }

	getTreeItem(element: GadgetFileItem | HighlighterItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: GadgetFileItem | undefined): vscode.ProviderResult<(GadgetFileItem | HighlighterItem)[]> {
		if (!this.workspaceRoot) {
			vscode.window.showInformationMessage('No gadget files in empty workspace');
			return Promise.resolve([]);
		}

		if (!element) {
			return Promise.resolve(this.getWorkspaceGadgetFiles());
		} else {
			return Promise.resolve(this.getGadgetFileHighlighters(element.path));
		}
	}

	private async getWorkspaceGadgetFiles(): Promise<GadgetFileItem[]> {
		const gadgetFiles = await vscode.workspace.findFiles('**/*.gadgets.txt', '**/node_modules/**', 10);
		return gadgetFiles.map(file => {
			const relativePath = vscode.workspace.asRelativePath(file);
			return new GadgetFileItem(relativePath, file.fsPath, vscode.TreeItemCollapsibleState.Collapsed);
		});
	}

	private async getGadgetFileHighlighters(filename: string): Promise<HighlighterItem[]> {
		const highlighters = this.context.workspaceState.get<HighlighterStoreEntry[]>(filename, []);
		const highlightersItems = highlighters.map(h => new HighlighterItem(`${h.s}:${h.e} > MOV`, vscode.TreeItemCollapsibleState.None));
		return highlightersItems;
	}
}

class GadgetFileItem extends vscode.TreeItem {
	constructor(
		public readonly relativePath: string,
		public readonly path: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(relativePath, collapsibleState);
	}
}

class HighlighterItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
	}
}