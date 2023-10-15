import Link from "next/link";
import css from "./mainNav.module.css";

export default function MainNav(props) {
  return (
    <nav className={css.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
        <li>
          <Link href="/blogs">Blogs</Link>
        </li>
        <li>
          <Link href="/last-sales">Sales</Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link href="/user-profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
