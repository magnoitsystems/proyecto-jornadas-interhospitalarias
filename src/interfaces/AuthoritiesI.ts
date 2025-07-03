interface AuthorityGroup {
    position: string;
    names: string[];
}

interface AuthorityCardData {
    title: string;
    groups: AuthorityGroup[];
}

interface AuthoritiesCardProps {
    cardData: AuthorityCardData;
    variant?: 'default' | 'long';
    className?: string;
}