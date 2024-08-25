import * as vscode from "vscode";
import { generateController } from "../generators/generateController";
import { generateScreen } from "../generators/generateScreen";
import { createFile } from "../utils/createFile";

export async function createNewFile() {
  const fileName = await vscode.window.showInputBox({ prompt: "Enter the name of the new file" });
  if (!fileName) return;

  const option = ["controller", "view/screen", "view/widget"];

  const selectedFolders = await vscode.window.showQuickPick(option, {
    canPickMany: true,
    placeHolder: "Select folders to create files in",
  });

  if (!selectedFolders) return;

  selectedFolders.forEach((folder) => {
    if (folder === "view/screen") {
      createFile(folder, `${fileName}_screen`, selectedFolders.includes("controller") ? generateScreen(fileName, "controller") : generateScreen(fileName, ""), true);
    }
    if (folder === "controller") {
      createFile(folder, `${fileName}_controller`, generateController(fileName), true);
    }
    if (folder === "view/widget") {
      createFile(`${folder}/${fileName}_widget`, "", "", false);
    }
  });
}
