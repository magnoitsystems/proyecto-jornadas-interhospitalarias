import styles from "./AuthoritiesCard.module.css";
import AuthoritiesSubSection from "@/components/AuthoritiesCard/Card/AuthoritiesSubSection";
import { cactus } from '@/app/(views)/ui/fonts';
import { AuthoritiesCardProps, AuthorityGroup } from '../../../types/index';

export default function AuthoritiesCard({
  cardData,
  variant = 'default',
  className = ''
}: AuthoritiesCardProps) {
  return (
    <div className={`
      ${styles.card} 
      ${variant === 'long' ? styles.longCard : ''} 
      ${className}
    `}>
      <h3 className={`${styles.title} ${styles.marginLeft} ${cactus.className}`}>
        {cardData.title}
      </h3>

      {cardData.groups.map((group: AuthorityGroup, index: number) => (
        <AuthoritiesSubSection
          key={`${group.position}-${index}`}
          authorityGroup={group}
        />
      ))}
    </div>
  );
}
