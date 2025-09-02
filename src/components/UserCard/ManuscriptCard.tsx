'use client';

import styles from './UserCard.module.css';
import Image from "next/image";
import { cactus } from "@/app/(views)/ui/fonts";
import { Work } from "@/types";
import { useState } from 'react';

interface Props {
  work: Work;
}

export default function ManuscriptCard({ work }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.userCard} onClick={toggleExpanded}>
      <div className={`${styles.containerAttribute} ${cactus.className}`}>
        {/* Card principal (siempre visible) */}
        <div className={styles.mainCardContent}>
          <div className={styles.titleRow}>
            <p className={styles.name}>{work.title}</p>
            <div className={styles.rightSection}>
              <p className={styles.workId}>ID: {work.id}</p>
              <div className={styles.expandIndicator}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  width={20}
                  height={20}
                  className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </div>
          </div>
          <div className={styles.containerNameAttribute}>
            <div className={styles.leftInfo}>
              <p className={styles.attribute}>Con premio: {work.prize ? "Sí" : "No"}</p>
              <p className={styles.attribute}>Autor: {work.user.name} {work.user.lastname}</p>
            </div>
            {work.file && (
              <div className={styles.iconGroup}>
                <button 
                  type="button" 
                  aria-label="Abrir correo"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    className={styles.link}
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${work.user.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#424242"
                      width={30}
                      height={30}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </a>
                </button>
                <a 
                  href={work.file} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src="/icons/downloadIcon.png"
                    alt="Descargar"
                    width={30}
                    height={30}
                  />
                </a>
              </div>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className={styles.expandedContent}>
            <div className={styles.expandedGrid}>
              {work.category && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Categoría:</span>
                  <span className={styles.detailValue}>{work.category}</span>
                </div>
              )}
              {work.workCode && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Código de trabajo:</span>
                  <span className={styles.detailValue}>{work.workCode}</span>
                </div>
              )}
              {work.authors && work.authors.length > 0 && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Autores adicionales:</span>
                  <span className={styles.detailValue}>
                    {work.authors.map((author, index) => (
                      <span key={author.id || index}>
                        {author.name} {author.lastname}
                        {index < work.authors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </span>
                </div>
              )}
              {work.description && (
                <div className={`${styles.detailItem} ${styles.fullWidth}`}>
                  <span className={styles.detailLabel}>Descripción:</span>
                  <span className={styles.detailValue}>{work.description}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}