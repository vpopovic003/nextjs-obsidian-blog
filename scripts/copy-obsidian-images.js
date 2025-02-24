import fs from "fs";
import path from "path";

const OBSIDIAN_VAULT_PATH = "posts/attachments"; // Update this!
const NEXT_PUBLIC_IMAGES_PATH = path.join(process.cwd(), "public/images");

// Ensure the destination folder exists
if (!fs.existsSync(NEXT_PUBLIC_IMAGES_PATH)) {
  fs.mkdirSync(NEXT_PUBLIC_IMAGES_PATH, { recursive: true });
}

// Find and copy images
const imageFiles = fs
  .readdirSync(OBSIDIAN_VAULT_PATH)
  .filter((file) => file.endsWith(".png"));

imageFiles.forEach((file) => {
  const srcPath = path.join(OBSIDIAN_VAULT_PATH, file);
  const destPath = path.join(NEXT_PUBLIC_IMAGES_PATH, file);
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied: ${file}`);
});
