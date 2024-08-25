import * as fs from "fs";
import * as path from "path";

export function isFlutterProject(root: string): boolean {
  if (!root) return false;

  const flutterDirectories = [
    "android",
    "ios",
    "macos",
    "windows",
    "linux",
    "web",
  ];

  const pubspecPath = path.join(root, "pubspec.yaml");
  const pubspecExists = fs.existsSync(pubspecPath);
  const libExists = fs.existsSync(path.join(root, "lib"));
  const platformExists = flutterDirectories.some(dir => fs.existsSync(path.join(root, dir)));

  if (!pubspecExists) return false;

  const pubspecContent = fs.readFileSync(pubspecPath, "utf8");
  const isFlutterDependency = pubspecContent.includes("flutter:");

  return pubspecExists && libExists && platformExists && isFlutterDependency;
}
