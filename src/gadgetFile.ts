import * as vscode from "vscode";
import { HighlighterStoreEntry, HighlighterDecorationTypes, HighlightService, HlSnapshot } from "./highlighters";
import { GadgetFileCommandKeys } from "./config";

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
		// this.registerCommands();
	}

	createSnapshot(): void {
		this.snapshotId = this.highlightService.createSnapshot(this.filename);
		this.highlighters = [];
	}

	getHighlighters(): HighlighterStoreEntry[] {
		this.highlighters = this.highlightService.fetchSnapshot(this.filename, this.snapshotId);
		return this.highlighters;
	}

	setHighlighter(highlighter: HighlighterStoreEntry): HighlighterStoreEntry[] {
		this.highlighters = this.highlightService.insertOrRemove(this.filename, this.snapshotId, highlighter);
		return this.highlighters;
	}

	clearHighlighters(): void {
		this.highlightService.clearSnapshot(this.filename, this.snapshotId);
	}

	renderHighlighters(editor: vscode.TextEditor | undefined, highlighterDecorationTypes: typeof HighlighterDecorationTypes) {
		console.log('Rendering highlighters for file: ', this.filename);
		for (const [key, decoration] of Object.entries(highlighterDecorationTypes)) {
			editor?.setDecorations(decoration, []);
			const colorHighlightersRanges = this.highlighters.filter(h => h.color === key).map(h => new vscode.Range(h.start, 0, h.end, Number.MAX_VALUE));
			editor?.setDecorations(decoration, colorHighlightersRanges);
		}
	}

	registerCommands() {

		// check if commands are already registered

		vscode.commands.getCommands(true).then((commands) => {
			console.log('Commands: ', commands);
			// check if any of the commands are already registered
			for (const command of Object.values(GadgetFileCommandKeys)) {
				if (commands.includes(command)) {
					console.log(`Command already registered: ${command}`);
					return;
				}
			}
		});

		// todo: register commands for creating snapshots, clearing highlighters, etc.
	}

    static validateFilename(filename: string | undefined): boolean {
        return !!(filename?.endsWith('.gadgets.txt'))
    }
}