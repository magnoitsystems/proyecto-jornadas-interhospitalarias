'use client';

import { useEffect, useState } from 'react';
import RoundedCard from "@/components/RoundedCard/RoundedCard";
import styles from './page.module.css';

const cardData = [
  { number: "0", title: "Inscriptos", borderColor: "linear-gradient(45deg, red, blue, green, yellow)" },
  { number: "0", title: "Edad +50" },
  { number: "0", title: "Edad -50" },
  { number: "0", title: "Mujeres" },
  { number: "0", title: "Hombres" },
];

export default function AdminPanel() {
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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cardData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cardData.length - 1 : prev - 1));
  };

  return (
    <main>
      <div className={styles.roundedCards}>
        {isMobile ? (
          <div className={styles.sliderWrapper}>
            <button className={styles.arrow} onClick={handlePrev}>
              <img src="/icons/left-arrow.svg" alt="Anterior" />
            </button>

            <RoundedCard {...cardData[currentIndex]} />

            <button className={styles.arrow} onClick={handleNext}>
              <img src="/icons/right-arrow.svg" alt="Siguiente" />
            </button>
          </div>
        ) : (
          cardData.map((card, index) => (
            <RoundedCard key={index} {...card} />
          ))
        )}
      </div>
    </main>
  );
}
