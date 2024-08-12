import * as vscode from 'vscode';
import { colors } from './config';

export const HighlighterDecorationTypes: Record<ColorKey, vscode.TextEditorDecorationType> = {
	red: vscode.window.createTextEditorDecorationType({
		backgroundColor: colors.red
	}),
	green: vscode.window.createTextEditorDecorationType({
		backgroundColor: colors.green
	}),
	blue: vscode.window.createTextEditorDecorationType({
		backgroundColor: colors.blue
	}),
	yellow: vscode.window.createTextEditorDecorationType({
		backgroundColor: colors.yellow
	}),
	orange: vscode.window.createTextEditorDecorationType({
		backgroundColor: colors.orange
	})
};

export type ColorKey = keyof typeof colors;

export type HighlighterStoreEntry = {
	s: number;
	e: number;
	c: ColorKey;
};

export class HighlightService {
	private extensionContext: vscode.ExtensionContext;

	constructor(extensionContext: vscode.ExtensionContext) {
		this.extensionContext = extensionContext;
	}

	upsert(filename: string, highlighter: HighlighterStoreEntry): HighlighterStoreEntry[] {
		const highlighters = this.fetch(filename);
		const index = highlighters.findIndex(h => h.s === highlighter.s && h.e === highlighter.e);

		if (index > -1) {
			highlighters[index] = highlighter;
		} else {
			highlighters.push(highlighter);
		}

		this.extensionContext.workspaceState.update(filename, highlighters);
		return highlighters;
	}

	fetch(filename: string): HighlighterStoreEntry[] {
		return this.extensionContext.workspaceState.get<HighlighterStoreEntry[]>(filename) || [];
	}

	clear(filename: string) {
		vscode.window.showInformationMessage(`Clearing highlighters for ${filename}`);
		this.extensionContext.workspaceState.update(filename, []);
	}
}