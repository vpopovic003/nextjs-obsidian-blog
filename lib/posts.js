import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts and filter only files
  const fileNames = fs
    .readdirSync(postsDirectory)
    .map((fileName) => path.join(postsDirectory, fileName)) // Convert to full path
    .filter((filePath) => fs.statSync(filePath).isFile()) // Ensure it's a file
    .map((filePath) => path.basename(filePath)); // Convert back to filename

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    frontMatterObsidianToMD(matterResult.data);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .map((fileName) => path.join(postsDirectory, fileName)) // Convert to full path
    .filter((filePath) => fs.statSync(filePath).isFile()) // Ensure it's a file
    .map((filePath) => path.basename(filePath)); // Convert back to filename

  return fileNames.map((fileName) => ({
    params: { id: fileName.replace(/\.md$/, "") },
  }));
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    throw new Error(`Post not found or is a directory: ${id}`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  matterResult.content = contentObsidianToMD(matterResult.content);
  matterResult.data = frontMatterObsidianToMD(matterResult.data);

  return {
    id,
    content: matterResult.content,
    ...matterResult.data,
  };
}

function frontMatterObsidianToMD(data) {
  let newData = data;
  if (typeof newData.date !== "string") {
    newData.date = newData.date.toISOString().split("T")[0];
  }
  return newData;
}

function contentObsidianToMD(content) {
  let linkRegex = /\[\[([^\]]+)\]\]/g;
  let imageRegex = /!\[\[([^\]]+)\]\]/g;

  let replacedImagesText = content.replace(imageRegex, "![](/images/$1)");
  let replacedLinksText = replacedImagesText.replace(linkRegex, "[$1]($1)");

  return replacedLinksText;
}
