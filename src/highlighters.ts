import * as vscode from 'vscode';
import { colors } from './config';
import { GadgetFileStoreEntry } from './gadgetFile';

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

export type HlSnapshot = {
	[id: number]: HighlighterStoreEntry[];
}

export type HighlighterStoreEntry = {
	start: number;
	end: number;
	color: ColorKey;
	gadget: string;
};

export class HighlightService {
	constructor(
		private extensionContext: vscode.ExtensionContext
	) {
		this.extensionContext = extensionContext;
	}

	insertOrRemove(
		// todo: we can probably avoid most of this by just passing the gadgetFileEntry to the constructor
		filename: string,
		snapshotId: number,
		highlighter: HighlighterStoreEntry
	): HighlighterStoreEntry[] {
		vscode.window.showInformationMessage(`Inserting highlighter for ${filename}`);

		const gadgetFileEntry = this.extensionContext.workspaceState.get<GadgetFileStoreEntry>(filename);
		let hlSnapshots = gadgetFileEntry?.hlSnapshots;

		let highlighters = hlSnapshots?.[snapshotId] || [];
		const existingHighlighter = highlighters.find(h => h.start === highlighter.start && h.end === highlighter.end);

		if (!existingHighlighter) {
			highlighters.push(highlighter);
		} else if (existingHighlighter.color === highlighter.color) {
			// remove the existing highlighter without adding the new one
			const index = highlighters.indexOf(existingHighlighter);
			highlighters.splice(index, 1);
		} else {
			// remove the existing highlighter and add the new one
			const index = highlighters.indexOf(existingHighlighter);
			highlighters.splice(index, 1);
			highlighters.push(highlighter);
		}

		hlSnapshots![snapshotId] = highlighters;
		this.extensionContext.workspaceState.update(filename, { hlSnapshotId: snapshotId, hlSnapshots });

		return highlighters;
	}

	createSnapshot(filename: string): number { // todo: should this be a method of GadgetFile?
		const gadgetFileEntry = this.extensionContext.workspaceState.get<GadgetFileStoreEntry>(filename);
		const hlSnapshotId = gadgetFileEntry?.hlSnapshotId || 0;
		const hlSnapshots = gadgetFileEntry?.hlSnapshots || [];
		
		vscode.window.showInformationMessage(`Creating new snapshot ${hlSnapshotId + 1} for ${filename}`);
		this.extensionContext.workspaceState.update(filename, { hlSnapshotId: hlSnapshotId + 1, hlSnapshots: [...hlSnapshots, []] });
		return hlSnapshotId + 1;
	}

	fetchSnapshot(
		filename: string,
		snapshotId: number
	): HighlighterStoreEntry[] {
		vscode.window.showInformationMessage(`Fetching snapshot ${snapshotId} for ${filename}`);
		const gadgetFileEntry = this.extensionContext.workspaceState.get<GadgetFileStoreEntry>(filename);
		const snapshots = gadgetFileEntry?.hlSnapshots;
		const highlighters = snapshots?.[snapshotId] || [];
		return highlighters;
	}

	clearSnapshot(
		filename: string,
		snapshotId: number
	) {
		vscode.window.showInformationMessage(`Clearing snapshot ${snapshotId} for ${filename}`);
		const gadgetFileEntry = this.extensionContext.workspaceState.get<GadgetFileStoreEntry>(filename);
		let hlSnapshots = gadgetFileEntry?.hlSnapshots;

		if (!hlSnapshots) {
			vscode.window.showErrorMessage(`snapshot ${snapshotId} for ${filename} is corrupted.`);
			this.extensionContext.workspaceState.update(filename, { hlSnapshotId: 0, hlSnapshots: [] });
			return;
		}

		hlSnapshots![snapshotId] = [];
		this.extensionContext.workspaceState.update(filename, { hlSnapshotId: snapshotId, hlSnapshots });
	}
}