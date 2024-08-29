import * as vscode from "vscode";
import * as fs from "fs";


export class InstructionsHoverProvider implements vscode.HoverProvider {
    private instructionDocs: Map<string, vscode.MarkdownString | "unknown"> = new Map();
    private availableInstructions: Map<string, string> = new Map();
    private memoryUsage: number = 0;
    private instructionsDocsLocation: vscode.Uri;

    constructor(
        private context: vscode.ExtensionContext,
        private languageVersion: string = "x86", // todo: make this configurable
    ) {
        vscode.window.showInformationMessage(`Initializing InstructionsHoverProvider for asm ${languageVersion}`);
        const extensionPath = this.context.extensionPath;
        this.instructionsDocsLocation = vscode.Uri.joinPath(vscode.Uri.file(extensionPath), `docs/${languageVersion}/instructions/`);
        this.loadAvailableInstructions();
        console.log("wat");
        console.log(this.availableInstructions);
    }

    loadAvailableInstructions() {
        fs.readdirSync(this.instructionsDocsLocation.fsPath).forEach(file => {
            const instruction = file.split(".")[0];
            const multipleInstructions = instruction.split("_");
            multipleInstructions.forEach(i => {
                this.availableInstructions.set(i, file);
            });
        });
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
            this.loadSingleInstructionDoc(hoverWord);
        }

        const wordDefinition = this.instructionDocs.get(hoverWord.toLowerCase()) || this.instructionDocs.get(hoverWord.toUpperCase()); // todo always case insensitive?
        if (wordDefinition) {
            return new vscode.Hover(wordDefinition);
        }
    }

    public loadSingleInstructionDoc(instruction: string) {
        const fileUri = this.availableInstructions.get(instruction.toUpperCase());
        
        if (!fileUri) {
            this.instructionDocs.set(instruction, "unknown");
            return;
        }

        if (this.instructionDocs.has(instruction)) {
            return;
        }

        const docContent = fs.readFileSync(vscode.Uri.joinPath(this.instructionsDocsLocation, fileUri).fsPath);
        const fileSize = docContent.byteLength;
        this.memoryUsage += fileSize;

        const markdownString = new vscode.MarkdownString(docContent.toString());
        this.instructionDocs.set(instruction, markdownString);

        vscode.window.showInformationMessage(`loaded ${fileUri} for a total of ${this.memoryUsage} bytes`);
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
