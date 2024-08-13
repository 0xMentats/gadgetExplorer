import * as vscode from "vscode";
import { HighlighterStoreEntry, HighlighterDecorationTypes, HighlightService, HlSnapshot } from "./highlighters";

export type GadgetFileStoreEntry = {
	hlSnapshotId: number;
	hlSnapshots: HighlighterStoreEntry[][];
}

export class GadgetFile {
	public highlighters: HighlighterStoreEntry[] = [];

	constructor(
		public filename: string,
		public snapshotId: number,
		public highlightService: HighlightService
	) {
		this.filename = filename;
		this.highlightService = highlightService;
		this.highlighters = this.getHighlighters();
	}

	getHighlighters(): HighlighterStoreEntry[] {
		this.highlighters = this.highlightService.fetch(this.filename, this.snapshotId);
		return this.highlighters;
	}

	setHighlighter(highlighter: HighlighterStoreEntry): HighlighterStoreEntry[] {
		this.highlighters = this.highlightService.insertOrRemove(this.filename, this.snapshotId, highlighter);
		return this.highlighters;
	}

	clearHighlighters(): void {
		this.highlightService.clear(this.filename, this.snapshotId);
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