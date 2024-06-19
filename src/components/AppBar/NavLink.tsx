interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
    return (
        <a className="text-base border-b-2 border-transparent hover:border-black transition duration-300 uppercase" href={href}>
            {children}
        </a>
    );
}