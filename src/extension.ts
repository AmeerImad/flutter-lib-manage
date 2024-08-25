import * as vscode from "vscode";
import { createFlutterFolders } from "./commands/createFlutterFolders";
import { createNewFile } from "./commands/createNewFile";
import { isFlutterProject } from "./utils/isFlutterProject";

export function activate(context: vscode.ExtensionContext) {

  const workspaceFolders = vscode.workspace.workspaceFolders;
  const rootPath = workspaceFolders?.[0]?.uri.fsPath || "";

  if (rootPath) {
    vscode.window.showInformationMessage(`Project path: ${rootPath}`);
  } else {
    vscode.window.showErrorMessage("No workspace folder is open");
  }

  const disposableStartStructure = vscode.commands.registerCommand("flutterLibManagerView.StartStructure", async () => {
    if (isFlutterProject(rootPath)) {
      const options = ["Create Flutter Structure", "Create New File dart"];
      const selectedOption = await vscode.window.showQuickPick(options, { placeHolder: "Select an option" });

      if (selectedOption === "Create Flutter Structure") {
        createFlutterFolders();
      } else if (selectedOption === "Create New File dart") {
        createNewFile();
      }
    } else {
      vscode.window.showErrorMessage("Not a Flutter project");
    }
  });

  context.subscriptions.push(disposableStartStructure);
}

export function deactivate() {}
