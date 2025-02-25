import styles from "@/styles/front/Hero.module.scss";
import Nav from "@/components/Nav";

const Hero = () => {
  return (
    <div className={styles["hero"]}>
      <Nav />
    </div>
  );
};

export default Hero;
