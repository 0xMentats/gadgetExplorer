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
		this.highlighters = this.highlightService.insertOrRemove(this.filename, highlighter);
		return this.highlighters;
	}

	clearHighlighters(): void {
		console.log('Clearing highlighters for file: ', this.filename);
		console.log("Old highlighters: ", this.highlighters);
		this.highlightService.clear(this.filename);
		const newHighlighters = this.getHighlighters();
		console.log("New highlighters: ", newHighlighters);

	}

	renderHighlighters(editor: vscode.TextEditor | undefined, highlighterDecorationTypes: typeof HighlighterDecorationTypes) {
		console.log('Rendering highlighters for file: ', this.filename);
		for (const [key, decoration] of Object.entries(highlighterDecorationTypes)) {
			editor?.setDecorations(decoration, []);
			const colorHighlightersRanges = this.highlighters.filter(h => h.color === key).map(h => new vscode.Range(h.start, 0, h.end, Number.MAX_VALUE));
			editor?.setDecorations(decoration, colorHighlightersRanges);
		}
	}

    static validateFilename(filename: string | undefined): boolean {
        return !!(filename?.endsWith('.gadgets.txt'))
    }
}