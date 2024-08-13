import * as vscode from 'vscode';
import { GadgetFile, GadgetFileStoreEntry } from './gadgetFile';
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
					const selectedText = this.currentEditor?.document.getText(new vscode.Range(cursorStart!, 0, cursorEnd!, Number.MAX_VALUE));

					const highlighter: HighlighterStoreEntry = {
						start: cursorStart!,
						end: cursorEnd!,
						color: key as ColorKey,
						gadget: selectedText!
					};

					this.setCurrentFileHighlighter(highlighter);
					// this.currentFile?.clearHighlighters();
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
			treeDataProvider: this.treeViewProvider!
		});
	}

	private handleActiveTextEditorChange(editor: vscode.TextEditor | undefined) {
		this.currentEditor = editor;
		const filename = editor?.document.fileName;
		if(this.loadGadgetFile(filename)){
			this.renderCurrentFileHighlighters();
		}
	}

	private loadGadgetFile(filename: string | undefined): boolean {
		console.log('trying to load gadget file: ', filename);
		if (!filename?.endsWith('.gadgets.txt')) {
			console.error('Current file is not a gadget file. Skipping handle.');
			this.currentFile = undefined;
			vscode.commands.executeCommand('setContext', ContextStoreKeys.gadgetFileFlag, false);
			return false;
		}

		this.ensureStoreGadgetFile(filename);
		vscode.commands.executeCommand('setContext', ContextStoreKeys.gadgetFileFlag, true);
		return true;
	}

	private ensureStoreGadgetFile(filename: string) {
		let storeEntry = this.context.workspaceState.get<GadgetFileStoreEntry>(filename!);
		
		if(storeEntry) {
			console.log('Store entry for gadget file already exists: ', storeEntry);
		} else {
			this.context.workspaceState.update(filename, {
				hlSnapshotId: 0,
				hlSnapshots: []
			});	
		}

		this.currentFile = new GadgetFile(
			filename as string,
			0,
			new HighlightService(this.context)
		);

		console.log('Created new store entry for gadget file: ', filename);
	}

	private renderCurrentFileHighlighters() {
		try {
			this.currentFile?.renderHighlighters(this.currentEditor, HighlighterDecorationTypes);
		} catch (error) {
			console.error('Error rendering highlighters: ', error);
		}
	}

	private setCurrentFileHighlighter(highlighter: HighlighterStoreEntry) {
		try {
			this.currentFile?.setHighlighter(highlighter);
			this.treeViewProvider?.refresh();
			// this.renderCurrentFileHighlighters();
		} catch (error) {
			console.error('Error setting highlighter: ', error);
		}
	}

	private init() {

	}
}