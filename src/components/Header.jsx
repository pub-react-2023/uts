import { GiGalaxy } from "react-icons/gi";
import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import { pages } from "../main";

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        <GiGalaxy size={24} />
        <div>UTS React 2023</div>
      </Link>
      <nav>
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <NavLink key={page.path} to={page.path}>
              <Icon size={24} />
              {page.title}
            </NavLink>
          );
        })}
      </nav>
      <Button>Login</Button>
    </header>
  );
}
