import * as vscode from "vscode";
import * as path from "path";
import { createFile } from "../utils/createFile";
import { folders } from "../utils/constants";

export async function createFlutterFolders() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage("No workspace folder found");
    return;
  }

  const libPath = path.join(workspaceFolders[0].uri.fsPath, "lib");

  const selectedFolders = await vscode.window.showQuickPick(
    ["All folders", "Select"],
    { placeHolder: "Select folders to create" }
  );

  let foldersToCreate: string[] = [];
  if (selectedFolders === "Select") {
    const pickedFolders = await vscode.window.showQuickPick(folders, {
      canPickMany: true,
      placeHolder: "Select folders to create",
    });
    foldersToCreate = pickedFolders || [];
  } else {
    foldersToCreate = [...folders];
  }

  foldersToCreate.forEach((folder) => {
    createFile(folder, "", "", false);
  });
}



