import React from 'react';
import styles from '../page.module.css';
import { useAuth } from '../context/AuthContext';

export default function OpenMatchCard({ match }) {
    const { isLoggedIn } = useAuth();

    // Logic overrides based on manual status
    let isJoinable = true;
    let btnLabel = "Unirme al partido";
    let btnBg = "var(--primary, #f2a900)";
    let btnColor = "#000";

    switch (match.status) {
        case "full":
            isJoinable = false;
            btnLabel = "Partido Completo";
            btnBg = "rgba(255,255,255,0.05)";
            btnColor = "#666";
            break;
        case "started":
            isJoinable = false;
            btnLabel = "🚀 En juego";
            btnBg = "rgba(62, 207, 142, 0.2)";
            btnColor = "#3ecf8e";
            break;
        case "finished":
            isJoinable = false;
            btnLabel = "🏁 Finalizado";
            btnBg = "rgba(255,255,255,0.05)";
            btnColor = "#aaa";
            break;
        default:
            // "open" handles currentPlayers vs maxPlayers just in case
            if (match.currentPlayers >= match.maxPlayers) {
                isJoinable = false;
                btnLabel = "Partido Completo";
                btnBg = "rgba(255,255,255,0.05)";
                btnColor = "#666";
            }
            break;
    }

    const handleJoin = () => {
        if (!isLoggedIn) {
            alert("Inicia sesión para publicarte o unirte a la comunidad.");
            return;
        }
        if (!isJoinable) return;
        alert(`Te has unido exitosamente al partido del ${match.dia} en Las Cañas.`);
    };

    return (
        <div className={styles.card} style={{
            borderColor: match.venue === "Las Cañas" ? 'var(--primary, #f2a900)' : 'rgba(255,255,255,0.1)',
            background: 'linear-gradient(135deg, rgba(242, 169, 0, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)'
        }}>
            {match.venue === "Las Cañas" && (
                <div style={{
                    background: 'var(--primary, #f2a900)',
                    color: '#000',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    marginBottom: '12px'
                }}>
                    Organizado en Las Cañas
                </div>
            )}

            <div className={styles.cardTitle}>{match.deporte}</div>
            <div className={styles.cardMeta} style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, color: '#fff' }}>{match.dia} {match.hora}</span>
                <span>•</span>
                <span>{match.cancha}</span>
            </div>

            <div style={{ marginTop: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '8px' }}>
                    <span>Jugadores: {match.currentPlayers} / {match.maxPlayers}</span>
                    {!isJoinable ? (
                        <span style={{ color: match.status === 'started' ? '#3ecf8e' : '#ff6b6b', fontWeight: 'bold' }}>
                            {match.status === 'started' ? 'En Juego' : 'Cerrado'}
                        </span>
                    ) : (
                        <span style={{ color: '#3ecf8e', fontWeight: 'bold' }}>Faltan {match.maxPlayers - match.currentPlayers}</span>
                    )}
                </div>

                {/* Progress bar logic updated based on max bounds */}
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${Math.min((match.currentPlayers / match.maxPlayers) * 100, 100)}%`,
                        height: '100%',
                        background: !isJoinable && match.status !== 'started' ? '#ff6b6b' : 'var(--primary, #f2a900)',
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>

            <button
                onClick={handleJoin}
                disabled={!isJoinable}
                style={{
                    width: '100%',
                    padding: '12px',
                    background: btnBg,
                    color: btnColor,
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: !isJoinable ? 'not-allowed' : 'pointer'
                }}
            >
                {btnLabel}
            </button>
        </div>
    );
}
