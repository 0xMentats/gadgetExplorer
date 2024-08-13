import * as vscode from 'vscode';
import { GadgetFile } from './gadgetFile';
import { HighlighterStoreEntry, HighlighterDecorationTypes, ColorKey, HighlightService } from './highlighters';
import { GadgetFileProvider } from './treeView';
import { colors, ContextStoreKeys, highlightCommandKeys } from './config';

export class GadgetExplorer {
	private readonly context: vscode.ExtensionContext;
	private currentFile?: GadgetFile;
	private currentEditor?: vscode.TextEditor;
	private workspaceRootPath?: string;
	private decorationTypes: vscode.TextEditorDecorationType[] = [];
	private treeViewProvider?: GadgetFileProvider;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
		this.currentEditor = vscode.window.activeTextEditor;
		this.workspaceRootPath = vscode.workspace.workspaceFolders![0].uri.fsPath;

		this.registerCommands();
		this.registerEvents();
		// this.registerDecorationTypes();
		this.registerViewProviders();
		this.registerViewElements();

		console.log('Gadget Explorer initialized');
		const currentFilename = vscode.window.activeTextEditor?.document.fileName;

		this.loadGadgetFile(currentFilename);
		this.currentFile?.renderHighlighters(this.currentEditor, HighlighterDecorationTypes);

		console.log('Highlighters: ', this.currentFile?.getHighlighters());
	}

	private registerDecorationTypes() {
		const decorationType = vscode.window.createTextEditorDecorationType({
			backgroundColor: colors['red']
		});

		this.context?.subscriptions.push(decorationType);
		this.decorationTypes.push(decorationType);
	}

	private registerCommands() {
		for (const [key, value] of Object.entries(colors)) {
			this.context?.subscriptions.push(
				vscode.commands.registerCommand(highlightCommandKeys[key], () => {
					const cursorStart = this.currentEditor?.selection.start.line;
					const cursorEnd = this.currentEditor?.selection.end.line;

					const highlighter: HighlighterStoreEntry = {
						s: cursorStart!,
						e: cursorEnd!,
						c: key as ColorKey
					};

					this.setCurrentFileHighlighter(highlighter);
					this.renderCurrentFileHighlighters();
				})
			);
		}
	}

	private registerEvents() {
		this.context?.subscriptions.push(
			vscode.window.onDidChangeActiveTextEditor((editor) => {
				this.handleActiveTextEditorChange(editor);
			})
		);
	}

	private registerViewProviders() {
		this.treeViewProvider = new GadgetFileProvider(this.workspaceRootPath!, this.context);
		vscode.window.registerTreeDataProvider('gadget-files-tree', this.treeViewProvider);
	}

	private registerViewElements() {
		vscode.window.createTreeView('gadget-files-tree', {
			treeDataProvider: new GadgetFileProvider(this.workspaceRootPath!, this.context)
		});
	}

	private handleActiveTextEditorChange(editor: vscode.TextEditor | undefined) {
		console.log('Active text editor changed', this.currentFile);
		this.currentEditor = editor;
		const filename = editor?.document.fileName;
		this.loadGadgetFile(filename);
		this.renderCurrentFileHighlighters();
	}

	private loadGadgetFile(filename: string | undefined) {
		if (!filename?.endsWith('.gadgets.txt')) {
			console.error('Current file is not a gadget file. Skipping handle.');
			vscode.commands.executeCommand('setContext', ContextStoreKeys.gadgetFileFlag, false);
			return;
		}

		this.currentFile = new GadgetFile(filename as string, new HighlightService(this.context!));
		vscode.commands.executeCommand('setContext', ContextStoreKeys.gadgetFileFlag, true);
	}

	private renderCurrentFileHighlighters() {
		this.currentFile?.renderHighlighters(this.currentEditor, HighlighterDecorationTypes);
	}

	private setCurrentFileHighlighter(highlighter: HighlighterStoreEntry) {
		this.currentFile?.setHighlighter(highlighter);
		this.treeViewProvider?.refresh();
		this.renderCurrentFileHighlighters();
	}

	private init() {

	}
}