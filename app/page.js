import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import Hero from "@/components/front/Hero";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vladimir Popovic Official </title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Hero />
      </section>
    </div>
  );
}
