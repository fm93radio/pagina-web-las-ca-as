import React from 'react';
import Link from 'next/link';
import styles from '../page.module.css';
import { useAuth } from '../context/AuthContext';

export default function TeamCard({ equipo }) {
    const { isLoggedIn } = useAuth();

    const handleContact = () => {
        if (!isLoggedIn) {
            alert("Inicia sesión para contactar a este equipo.");
            return;
        }
        const cleanNumber = equipo.whatsapp.replace(/\D/g, '');
        const message = encodeURIComponent(`Hola! Vi que a su equipo ${equipo.equipo} le falta ${equipo.faltan} para jugar el ${equipo.dia}. Me interesa!`);
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
                <div className={styles.cardTitle} style={{ marginBottom: 0 }}>
                    {equipo.equipo} <span style={{ fontSize: '0.8rem', color: '#aaa', fontWeight: 400 }}>({equipo.nivel})</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#ff6b6b', fontWeight: 600 }}>
                    {getExpirationText(equipo.expiresAt)}
                </span>
            </div>

            <div className={styles.cardMeta} style={{ marginBottom: '8px' }}>
                <span className={styles.tag}>{equipo.deporte}</span>
                <span style={{ fontSize: '0.85rem' }}>{equipo.dia} a las {equipo.hora}</span>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600, margin: '12px 0' }}>
                Falta: {equipo.faltan}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                <button className={styles.btnAction} onClick={handleContact} style={{ margin: 0 }}>
                    Contactar por WhatsApp
                </button>
                <Link
                    href="/"
                    className={styles.btnOutline}
                    style={{
                        fontSize: '0.85rem',
                        padding: '10px',
                        textAlign: 'center',
                        borderRadius: '8px',
                        textDecoration: 'none'
                    }}
                >
                    Reservar Cancha
                </Link>
            </div>
        </div>
    );
}
