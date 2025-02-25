import { notFound } from "next/navigation";
import { getAllPostIds, getPostData } from "@/lib/posts";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Date from "@/components/date";
import Layout from "@/components/blog/layout";
import utilStyles from "@/styles/utils.module.css";
import Head from "next/head";

const CodeBlock = ({ language, codestring }) => {
  return (
    <SyntaxHighlighter language={language} style={prism} PreTag="div">
      {codestring}
    </SyntaxHighlighter>
  );
};

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({ id: path.params.id }));
}

export default async function Post({ params }) {
  const postData = await getPostData(params.id);

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <CodeBlock
                  codestring={String(children).replace(/\n$/, "")}
                  language={match[1]}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {postData.content}
        </ReactMarkdown>
      </article>
    </Layout>
  );
}
