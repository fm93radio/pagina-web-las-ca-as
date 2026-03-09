import React from 'react';
import styles from '../page.module.css';

export default function ResultsList({ resultsData }) {
    return (
        <div>
            {resultsData.map(res => (
                <div key={res.id} className={styles.matchResult}>
                    <span className={styles.matchTeam}>{res.equipoA}</span>
                    <span className={styles.matchScore}>{res.resA} - {res.resB}</span>
                    <span className={styles.matchTeam}>{res.equipoB}</span>
                </div>
            ))}
        </div>
    );
}
