import { getSortedPostsData } from "../../lib/posts";
import BlogPage from "@/components/blog/Blog.js";

export async function generateStaticParams() {
  const posts = await getSortedPostsData();
  return posts;
}
// Re-fetch S3 data every 60 seconds
export const revalidate = 60;

export default async function Blog() {
  const posts = await getSortedPostsData();
  return <BlogPage posts={posts} />;
}
