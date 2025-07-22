'use client';
import { cactus } from '@/app/(views)/ui/fonts';
import styles from './RoundedCard.module.css';
import {statisticAdmin} from "@/hooks/statisticAdmin";

interface RoundedCardProps {
  borderColor?: string;
  className?: string;
}

export default function CircularCard({
  borderColor = '#ffffff', 
  className = '' 
}: RoundedCardProps) {

  const { data, loading, error } = statisticAdmin();

  // const handleNext = () => {
  //     setCurrentIndex((prev) => (prev + 1) % cardData.length);
  // };
  //
  // const handlePrev = () => {
  //     setCurrentIndex((prev) => (prev === 0 ? cardData.length - 1 : prev - 1));
  // };

  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p>Error: {error}</p>;
  
  // Detectar si es un color multicolor (contiene coma o palabra clave de gradiente)
  const isMulticolor = borderColor.includes(',') || 
                      borderColor.includes('linear-gradient') || 
                      borderColor.includes('conic-gradient') ||
                      borderColor.includes('radial-gradient');
  
  const cardStyle = {
    '--border-color': borderColor,
  } as any;

  return (
    <div className={styles.containerProperties}>
      {data.map((stat, index) => (
      <div className={`${styles.circularCard} ${isMulticolor ? styles.multicolorBorder : ''} ${className}`}
        style={cardStyle} key={index}>
        <div className={`${styles.content} ${cactus.className}`}>
          <h1 className={`${styles.number} ${cactus.className}`}>{stat.statistics}</h1>
          <h4 className={`${styles.title} ${cactus.className}`}>{stat.amount}</h4>
        </div>
      </div>
      ))}
    </div>
  );
}