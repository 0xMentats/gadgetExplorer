import * as vscode from 'vscode';
import { GadgetExplorer } from './gadgetExplorer';

export function activate(context: vscode.ExtensionContext) {
	try {
		new GadgetExplorer(context);
		vscode.window.showInformationMessage('Gadget Explorer activated');
	} catch (error) {
		console.error(`Error activating Gadget Explorer: ${error}`);
	}
}

export function deactivate() {
	vscode.window.showInformationMessage('Gadget Explorer deactivated');
}