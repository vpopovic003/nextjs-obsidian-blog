import styles from "@/styles/front/Hero.module.scss";
import utilStyles from "../../styles/utils.module.css";
import Image from "next/image";

const Hero = () => {
  return (
    <div className={styles["hero"]}>
      <div className={styles["hero__img-box"]}>
        <Image
          src={"/images/profile.png"}
          alt={"Profile photo"}
          width={150}
          height={150}
        />
      </div>
      <h2 className={utilStyles.headingLg}>Vladimir Popovic</h2>
      <small className={utilStyles.lightText}>Frontend Developer</small>
    </div>
  );
};

export default Hero;
