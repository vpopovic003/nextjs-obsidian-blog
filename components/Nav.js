import styles from "@/styles/Nav.module.scss";
import Link from "next/link";

const menu = [
  {
    menuItem: "/",
    menuTitle: "Home",
  },
  {
    menuItem: "blog",
    menuTitle: "Blog",
  },
  {
    menuItem: "contact",
    menuTitle: "Contact",
  },
];

const Nav = () => {
  return (
    <div className={styles["nav"]}>
      <ul className={styles["nav__menu-items"]}>
        {menu.map((item) => (
          <Link href={item.menuItem}>
            <li key={menu.item}>{item.menuTitle}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
