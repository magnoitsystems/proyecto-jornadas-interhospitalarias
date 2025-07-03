'use client';
import styles from './RoundedCard.module.css';

interface RoundedCardProps {
  number: string | number;
  title: string;
  borderColor?: string;
  className?: string;
}

export default function CircularCard({ 
  number, 
  title, 
  borderColor = '#ffffff', 
  className = '' 
}: RoundedCardProps) {
  
  // Detectar si es un color multicolor (contiene coma o palabra clave de gradiente)
  const isMulticolor = borderColor.includes(',') || 
                      borderColor.includes('linear-gradient') || 
                      borderColor.includes('conic-gradient') ||
                      borderColor.includes('radial-gradient');
  
  const cardStyle = {
    '--border-color': borderColor,
  } as any;

  return (
    <div 
      className={`${styles.circularCard} ${isMulticolor ? styles.multicolorBorder : ''} ${className}`}
      style={cardStyle}
    >
      <div className={styles.content}>
        <span className={styles.number}>{number}</span>
        <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
}