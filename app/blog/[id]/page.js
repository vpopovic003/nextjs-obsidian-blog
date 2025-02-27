import { getAllPostIds, getPostData } from "@/lib/posts";
import PostPage from "@/components/blog/post/Post";

export async function generateStaticParams() {
  const paths = await getAllPostIds();
  return paths.map((path) => ({ id: path.params.id }));
}

export default async function Post({ params }) {
  const { id } = await params;
  const postData = await getPostData(id);

  return <PostPage postData={postData} />;
}
