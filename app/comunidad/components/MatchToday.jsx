import React from 'react';
import styles from '../page.module.css';

export default function MatchToday({ partido }) {
    return (
        <div className={styles.matchTag}>
            <span className={styles.matchTime}>{partido.hora}</span>
            <span className={styles.matchTeams}>
                {partido.equipoA} vs {partido.equipoB}
            </span>
            <span className={styles.matchSport}>{partido.deporte}</span>
        </div>
    );
}
