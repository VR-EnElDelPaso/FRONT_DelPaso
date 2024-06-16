import { ReactNode } from 'react';

interface SocialIconProps {
    href: string;
    ariaLabel: string;
    children: ReactNode;
}

export default function SocialIcon({ href, ariaLabel, children }: SocialIconProps) {
    return (
        <a href={href} aria-label={ariaLabel} className="cursor-pointer hover:text-gray-600">
            {children}
        </a>
    );
}