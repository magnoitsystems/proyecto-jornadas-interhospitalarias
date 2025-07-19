import styles from './SummaryCard.module.css';

type Props = {
    eventos: string[];
    invitados: string[];
    coordinadores: string[];
}

export default function SummaryCard({eventos, invitados, coordinadores}: Props){
    return(

      <section className={styles.summaryCardPropertie}>
          <div className={styles.completyCardProperties}>
              <div className={styles.cardProperties}>
                  <h1>Eventos a Realizar</h1>
              </div>
              <div className={styles.infoCardProperties}>
                  {eventos.map((evento, index) => (
                      <li key={index}>{evento}</li>
                  ))}
              </div>
          </div>
          <div className={styles.completyCardProperties}>
              <div className={`${styles.cardProperties} ${styles.middleCardProperties}`}>
                  <h1>Invitados</h1>
              </div>
              <div className={`${styles.middleInfoCardProperties}`}>
                  {invitados.map((invitado, index) => (
                      <li key={index}>{invitado}</li>
                  ))}
              </div>
          </div>
          <div className={styles.completyCardProperties}>
              <div className={styles.cardProperties}>
                  <h1>Coordinadores</h1>
              </div>
              <div className={styles.infoCardProperties}>
                  {coordinadores.map((coordinador, index) => (
                      <li key={index}>{coordinador}</li>
                  ))}
              </div>
          </div>
      </section>
    );
}