import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ href, children, className, onClick }: NavLinkProps) => {
  const defaultClassName =
    "text-gray-700 hover:text-primary transition-colors duration-200 font-medium text-sm lg:text-base focus:outline-none focus:text-primary";

  return (
    <Link to={href} className={className || defaultClassName} onClick={onClick}>
      {children}
    </Link>
  );
};

export default NavLink;
