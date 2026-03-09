import React from 'react';
import styles from '../page.module.css';

export default function TournamentCard({ torneo }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardMeta}>
                <span className={styles.tag}>{torneo.deporte}</span>
                {torneo.estado === "En curso" ? (
                    <span className={styles.tagGreen}>En curso</span>
                ) : (
                    <span className={styles.tag} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Abierto</span>
                )}
            </div>
            <h3 className={styles.cardTitle}>{torneo.nombre}</h3>
            <button
                className={styles.btnOutline}
                style={{ width: '100%', padding: '10px', marginTop: '16px', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}
            >
                Ver tabla
            </button>
        </div>
    );
}
