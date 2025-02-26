import matter from "gray-matter";

import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function getS3Posts() {
  const command = new ListObjectsV2Command({ Bucket: "keen-obsidian" });

  // Get array of all post objects, containing Key (full file path), but not contents
  const { Contents } = await s3.send(command);
  // Filter by posts
  const filteredPosts = Contents.filter((post) =>
    post.Key.startsWith("obsidian_online/posts/post"),
  );
  // Return array of all blog posts names from obsidian online
  const postKeys = [];
  filteredPosts.forEach((post) =>
    postKeys.push(post.Key.replace("obsidian_online/posts/", "")),
  );

  return postKeys;
}

console.log(getS3Posts());

export async function getS3PostContents(post) {
  const command = new GetObjectCommand({
    Bucket: "keen-obsidian",
    Key: `obsidian_online/posts/${post}`,
  });

  const response = await s3.send(command);

  // Convert S3 response body stream to string
  const streamToString = async (stream) => {
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString("utf-8"); // Markdown content as a string
  };

  const markdownContent = await streamToString(response.Body);
  // Return markdown file content
  return markdownContent;
}

export async function getSortedPostsData() {
  // Get file names under /posts and filter only files
  const fileNames = await getS3Posts();

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");

      const fileContents = await getS3PostContents(fileName);

      const matterResult = matter(fileContents);
      frontMatterObsidianToMD(matterResult.data);

      return {
        id,
        ...matterResult.data,
      };
    }),
  );
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllPostIds() {
  const fileNames = await getS3Posts();

  return fileNames.map((fileName) => ({
    params: { id: fileName.replace(/\.md$/, "") },
  }));
}

export async function getPostData(id) {
  const fileContents = await getS3PostContents(`${id}.md`);

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

  let replacedImagesText = content.replace(
    imageRegex,
    "![](https://keen-obsidian.s3.eu-north-1.amazonaws.com/obsidian_online/posts/attachments/$1)",
  );
  let replacedLinksText = replacedImagesText.replace(linkRegex, "[$1]($1)");

  console.log(replacedImagesText);
  return replacedLinksText;
}
