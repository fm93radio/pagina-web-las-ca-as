import React from 'react';
import styles from '../page.module.css';

export default function RankingTable({ rankingData }) {
    return (
        <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
            {rankingData.map((rank, index) => (
                <div key={rank.id} className={styles.listItem}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span className={styles.rankNumber}>{index + 1}</span>
                        <span style={{ fontWeight: 600 }}>{rank.equipo}</span>
                    </div>
                    <span className={styles.points}>{rank.pts} pts</span>
                </div>
            ))}
        </div>
    );
}
