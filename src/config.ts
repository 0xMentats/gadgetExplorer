import { ColorKey } from "./highlighters";

export const gadgetsFileExtensions = ['.gadgets.txt'];

export const highlightCommandKeys: Record<ColorKey, string> = {
	red: 'gadgetExplorer.highlight.red',
	green: 'gadgetExplorer.highlight.green',
	blue: 'gadgetExplorer.highlight.blue',
	yellow: 'gadgetExplorer.highlight.yellow',
	orange: 'gadgetExplorer.highlight.orange',
};

export const colors: Record<string, string> = {
	red: "rgba(255, 0, 0, 0.3)",
	green: "rgba(0, 255, 0, 0.3)",
	blue: "rgba(0, 0, 255, 0.3)",
	yellow: "rgba(255, 255, 0, 0.3)",
	orange: "rgba(255, 165, 0, 0.3)"
};

export const ContextStoreKeys: Record<string, string> = {
	gadgetFileFlag: 'gadgetExplorer.gadgetFileFlag'
} as const;

export const TreeViewCommandKeys = {
	onItemClicked: 'gadgetExplorer.treeview.on_item_clicked',
	refresh: 'gadgetExplorer.treeview.refresh'
} as const;