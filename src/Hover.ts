import * as vscode from "vscode";

export class InstructionsHoverProvider implements vscode.HoverProvider {
    private instructionDocs: Map<string, vscode.MarkdownString | "unknown"> = new Map();
    private memoryUsage: number = 0;
    private instructionsDocsLocation: vscode.Uri;

    constructor(
        private context: vscode.ExtensionContext,
        private languageVersion: string = "x86" // todo: make this configurable
    ) {
        vscode.window.showInformationMessage(`Initializing InstructionsHoverProvider for asm ${languageVersion}`);
        this.instructionsDocsLocation = vscode.Uri.file(this.context.globalStorageUri.fsPath + `/docs/${this.languageVersion}/instructions/`);
    }

    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        language?: string
    ): vscode.ProviderResult<vscode.Hover> {

        const range = document.getWordRangeAtPosition(position);
        const hoverWord = document.getText(range);

        const isInstructionOrRegister = hoverWord.match(/^[a-zA-Z]+$/);
        if (!isInstructionOrRegister) {
            return;
        }
        
        const cachedInstruction = this.instructionDocs.get(hoverWord.toLowerCase()) || this.instructionDocs.get(hoverWord.toUpperCase());

        if (cachedInstruction === "unknown") { // todo: improve this bs
            return;
        }

        if (!cachedInstruction) {
            vscode.window.showInformationMessage(`Caching instruction docs for ${this.languageVersion}`);
            this.loadSingleInstructionDoc(hoverWord); // todo: this is async, so the hover will not show up immediately after the first time
        }

        const wordDefinition = this.instructionDocs.get(hoverWord.toLowerCase()) || this.instructionDocs.get(hoverWord.toUpperCase()); // todo always case insensitive?
        if (wordDefinition) {
            return new vscode.Hover(wordDefinition);
        }
    }

    public async loadSingleInstructionDoc(instruction: string) {
        const fileUri = vscode.Uri.joinPath(this.instructionsDocsLocation, `${instruction}.md`);
        
        let docContent;

        try {
            docContent = await vscode.workspace.fs.readFile(fileUri);
        } catch (error) {
            vscode.window.showErrorMessage(`Could not find documentation for ${instruction} instruction`);
            this.instructionDocs.set(instruction, "unknown");
            return;
        }

        const fileSize = docContent.byteLength;
        this.memoryUsage += fileSize;

        const markdownString = new vscode.MarkdownString(docContent.toString());
        this.instructionDocs.set(instruction, markdownString);

        vscode.window.showInformationMessage(`Loaded ${instruction} instruction doc for a total of ${this.memoryUsage} bytes`);
    }

    // public async loadInstructionsDocs() {
    //     // retrieve a list of all .md files in the extension's folder
    //     const instructionsDocsLocation = vscode.Uri.file(this.context.globalStorageUri.fsPath + `/docs/${this.languageVersion}/instructions/`);

    //     // find all md files in the folder
    //     const docMdFiles = await vscode.workspace.fs.readDirectory(instructionsDocsLocation);
    //     const docMdFilenames = docMdFiles.map(([name, type]) => name);
        
    //     for (const filename of docMdFilenames) {
    //         const instruction = filename.split(".")[0];
    //         const fileUri = vscode.Uri.joinPath(instructionsDocsLocation, filename);
    //         const docContent = await vscode.workspace.fs.readFile(fileUri);
    //         const fileSize = docContent.byteLength;
    //         this.memoryUsage += fileSize;

    //         const markdownString = new vscode.MarkdownString(docContent.toString());

    //         this.instructionDocs.set(instruction, markdownString);
    //     }

    //     vscode.window.showInformationMessage(`Loaded ${docMdFilenames.length} instruction docs for a total of ${this.memoryUsage} bytes`);
    // };
}
