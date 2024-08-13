import * as vscode from "vscode";
import { HighlighterStoreEntry, HighlighterDecorationTypes, HighlightService } from "./highlighters";

export class GadgetFile {
	private filename: string;
	private highlightService: HighlightService;
	private highlighters: HighlighterStoreEntry[] = [];

	constructor(filename: string, highlightService: HighlightService) {
		this.filename = filename;
		this.highlightService = highlightService;
		this.highlighters = this.getHighlighters();
	}

	getHighlighters(): HighlighterStoreEntry[] {
		this.highlighters = this.highlightService.fetch(this.filename);
		return this.highlighters;
	}

	setHighlighter(highlighter: HighlighterStoreEntry): HighlighterStoreEntry[] {
		this.highlighters = this.highlightService.upsert(this.filename, highlighter);
		return this.highlighters;
	}

	clearHighlighters(editor: vscode.TextEditor | undefined, highlighterDecorationTypes: typeof HighlighterDecorationTypes): void {
		this.highlightService.clear(this.filename);
	}

	renderHighlighters(editor: vscode.TextEditor | undefined, highlighterDecorationTypes: typeof HighlighterDecorationTypes) {
		for (const [key, decoration] of Object.entries(highlighterDecorationTypes)) {
			editor?.setDecorations(decoration, []);
			const colorHighlightersRanges = this.highlighters.filter(h => h.c === key).map(h => new vscode.Range(h.s, 0, h.e, Number.MAX_VALUE));
			editor?.setDecorations(decoration, colorHighlightersRanges);
		}
	}

    static validateFilename(filename: string | undefined): boolean {
        return !!(filename?.endsWith('.gadgets.txt'))
    }
}