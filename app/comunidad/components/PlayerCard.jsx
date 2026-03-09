import React from 'react';
import styles from '../page.module.css';
import { useAuth } from '../context/AuthContext';

export default function PlayerCard({ jugador }) {
    const { isLoggedIn } = useAuth();

    const handleContact = () => {
        if (!isLoggedIn) {
            alert("Inicia sesión para contactar a este jugador.");
            return;
        }
        const cleanNumber = jugador.whatsapp.replace(/\D/g, '');
        const message = encodeURIComponent(`Hola ${jugador.nombre}! Vi en la comunidad de Las Cañas que juegas ${jugador.deporte} y estás buscando equipo. Se arma un partido?`);
        window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
    };

    const getExpirationText = (expiresAt) => {
        if (!expiresAt) return "";
        const diffHours = Math.floor((new Date(expiresAt) - new Date()) / (1000 * 60 * 60));
        if (diffHours < 0) return "Expirado";
        if (diffHours < 24) return `Expira en ${diffHours} horas`;
        return `Expira en ${Math.floor(diffHours / 24)} días`;
    };

    return (
        <div className={styles.card} style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div className={styles.cardTitle} style={{ marginBottom: 0 }}>{jugador.nombre}</div>
                <span style={{ fontSize: '0.75rem', color: '#ff6b6b', fontWeight: 600 }}>
                    {getExpirationText(jugador.expiresAt)}
                </span>
            </div>

            <div className={styles.cardMeta}>
                <span className={styles.tag}>{jugador.deporte}</span>
                <span style={{ fontSize: '0.85rem' }}>{jugador.posicion}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>🕒 {jugador.disponibilidad}</p>

            <button className={styles.btnAction} onClick={handleContact}>
                Contactar por WhatsApp
            </button>
        </div>
    );
}
