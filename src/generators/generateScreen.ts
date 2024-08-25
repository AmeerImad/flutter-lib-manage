import * as vscode from "vscode";

export function generateScreen(fileName: string, pathController: string): string {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  const workspaceName = workspaceFolders?.[0]?.name || "";

  return `
import 'package:flutter/material.dart';
import 'package:get/get.dart';
${pathController ? `import 'package:${workspaceName}/${pathController}/${fileName}_controller.dart';` : ""}

class ${fileName}Screen extends StatelessWidget {
  ${pathController ? `final ${fileName}Controller controller = Get.put(${fileName}Controller());` : ""}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('Hello World'),
      ),
    );
  }
}
`;
}
