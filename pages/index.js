import Head from "next/head";
import Layout from "../components/blog/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vladimir Popovic Official </title>
      </Head>
      <section className={utilStyles.headingMd}>Hero</section>
    </div>
  );
}
