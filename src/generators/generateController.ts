
export function generateController(fileName: string): string {
    return `
  import 'package:get/get.dart';
  
  class ${fileName}Controller extends GetxController {
  
  }
  `;
  }
  