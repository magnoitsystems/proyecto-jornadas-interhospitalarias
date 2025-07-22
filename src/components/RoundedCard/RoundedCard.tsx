'use client';
import { cactus } from '@/app/(views)/ui/fonts';
import styles from './RoundedCard.module.css';
import {statisticAdmin} from "@/hooks/statisticAdmin";
import {useEffect, useState} from "react";
import Image from "next/image";

export default function CircularCard() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 728);
    };

    handleResize(); // set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const { data, loading, error } = statisticAdmin();

  const handleNext = () => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const handlePrev = () => {
      setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  if (loading) return <p className={styles.loadingProperties}>Cargando estadísticas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.containerProperties}>
      {isMobile ? (
          <div className={styles.sliderWrapper}>
              <button className={styles.arrow} onClick={handlePrev} aria-label="Anterior">
                  <Image src={"/icons/iconArrow2.png"} alt={"Icono de flecha para el carrusel de estadísticas"} width={25} height={25}/>
              </button>


            <div className={`${styles.circularCard} ${data[currentIndex].statistics === "Usuarios" ? styles.multicolorBorder : ''} `}>
              <div className={`${styles.content} ${cactus.className}`}>
                <h1 className={`${styles.number} ${cactus.className}`}>{data[currentIndex].statistics}</h1>
                <h4 className={`${styles.title} ${cactus.className}`}>{data[currentIndex].amount}</h4>
              </div>
            </div>

              <button className={styles.arrow} onClick={handleNext} aria-label="Siguiente">
                <Image src={"/icons/iconArrow.png"} alt={"Icono de flecha para el carrusel de estadísticas"} width={25} height={25}/>
              </button>

          </div>
      ) : (
          data.map((stat, index) => (
                <div className={`${styles.circularCard} ${stat.statistics === "Usuarios" ? styles.multicolorBorder : ''} `} key={index}>
                  <div className={`${styles.content} ${cactus.className}`}>
                    <h1 className={`${styles.number} ${cactus.className}`}>{stat.statistics}</h1>
                    <h4 className={`${styles.title} ${cactus.className}`}>{stat.amount}</h4>
                  </div>
                </div>
          ))
      )}
    </div>
  );
}