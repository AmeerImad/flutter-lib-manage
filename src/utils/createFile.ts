import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function createFile(folder: string, fileName: string, content: string, shouldCreateFile: boolean) {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) return;

  const libPath = path.join(workspaceFolders[0].uri.fsPath, "lib");
  const folderPath = path.join(libPath, folder);
  const filePath = path.join(folderPath, `${fileName}.dart`);

  // إنشاء المجلد إذا لم يكن موجوداً
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    vscode.window.showInformationMessage(`Created: ${folderPath}`);
  } else if (!shouldCreateFile) {
    vscode.window.showWarningMessage(`Already exists: ${folderPath}`);
    return;
  }

  // إنشاء الملف إذا تم تحديد ذلك
  if (shouldCreateFile && !fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    vscode.window.showInformationMessage(`Created: ${filePath}`);
  } else if (shouldCreateFile) {
    vscode.window.showWarningMessage(`File already exists: ${filePath}`);
  }
}
