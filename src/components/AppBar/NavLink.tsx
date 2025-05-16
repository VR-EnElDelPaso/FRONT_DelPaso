import { Link } from "react-router-dom";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      to={href}
      className="border-b-2 border-transparent hover:border-primary hover:text-primary transition duration-300"
    >
      {children}
    </Link>
  );
}
