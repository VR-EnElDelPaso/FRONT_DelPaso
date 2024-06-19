import { ReactNode } from 'react';

interface SocialMediaIconProps {
    href: string;
    ariaLabel: string;
    children: ReactNode;
}

export default function SocialMediaIcon({ href, ariaLabel, children }: SocialMediaIconProps) {
    return (
        <a href={href} aria-label={ariaLabel} className="cursor-pointer block p-2 rounded-full transition duration-300 ease-in-out hover:bg-white hover:bg-opacity-20">
            {children}
        </a>
    );
}