"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Context
import { useAuth } from './context/AuthContext';

// Components
import MatchToday from './components/MatchToday';
import OpenMatchCard from './components/OpenMatchCard';
import PlayerCard from './components/PlayerCard';
import TeamCard from './components/TeamCard';
import TournamentCard from './components/TournamentCard';
import RankingTable from './components/RankingTable';
import ResultsList from './components/ResultsList';

// Data
import {
    mockMatchesToday,
    mockPlayers,
    mockTeams,
    mockOpenMatches,
    mockTournaments,
    mockRanking,
    mockResults
} from './data/communityMock';

// Utils
import { sanitizeInput } from '../../utils/sanitize';

export default function ComunidadPage() {
    const { isLoggedIn, login, logout } = useAuth();

    const [showPlayerForm, setShowPlayerForm] = useState(false);
    const [showTeamForm, setShowTeamForm] = useState(false);

    // Form states
    const [playerForm, setPlayerForm] = useState({ nombre: '', deporte: 'Fútbol 5', posicion: '', dias: '', horario: '', whatsapp: '' });
    const [teamForm, setTeamForm] = useState({ equipo: '', deporte: 'Fútbol 5', dia: '', hora: '', posicion: '', nivel: 'Tranqui', whatsapp: '' });

    // Filter valid data based on expiration dates
    const now = new Date();
    const activeMatchesToday = mockMatchesToday.filter(m => new Date(m.expiresAt) > now);
    const activeOpenMatches = mockOpenMatches.filter(m => new Date(m.expiresAt) > now);
    const activePlayers = mockPlayers.filter(p => new Date(p.expiresAt) > now);
    const activeTeams = mockTeams.filter(t => new Date(t.expiresAt) > now);
    const activeTournaments = mockTournaments.filter(t => new Date(t.expiresAt) > now);
    const activeRanking = mockRanking.filter(r => new Date(r.expiresAt) > now);
    const activeResults = mockResults.filter(r => new Date(r.expiresAt) > now);

    const validateWhatsApp = (number) => {
        const regex = /^[0-9]{8,15}$/;
        return regex.test(number);
    };

    const handlePlayerSubmit = (e) => {
        e.preventDefault();
        if (!validateWhatsApp(playerForm.whatsapp)) {
            alert("Por favor, ingresa un número de WhatsApp válido (solo números, entre 8 y 15 dígitos).");
            return;
        }

        const sanitizedData = {
            nombre: sanitizeInput(playerForm.nombre),
            deporte: sanitizeInput(playerForm.deporte),
            posicion: sanitizeInput(playerForm.posicion),
            dias: sanitizeInput(playerForm.dias),
            horario: sanitizeInput(playerForm.horario),
            whatsapp: playerForm.whatsapp
        };

        console.log("RATE LIMIT CHECK // TODO: Implement API rate limits");
        console.log("Submitting Player:", sanitizedData);

        alert('¡Genial! Estarás visible en la lista de jugadores disponibles pronto.');
        setShowPlayerForm(false);
        setPlayerForm({ nombre: '', deporte: 'Fútbol 5', posicion: '', dias: '', horario: '', whatsapp: '' });
    };

    const handleTeamSubmit = (e) => {
        e.preventDefault();
        if (!validateWhatsApp(teamForm.whatsapp)) {
            alert("Por favor, ingresa un número de WhatsApp válido (solo números, entre 8 y 15 dígitos).");
            return;
        }

        const sanitizedData = {
            equipo: sanitizeInput(teamForm.equipo),
            deporte: sanitizeInput(teamForm.deporte),
            dia: sanitizeInput(teamForm.dia),
            hora: sanitizeInput(teamForm.hora),
            posicion: sanitizeInput(teamForm.posicion),
            nivel: sanitizeInput(teamForm.nivel),
            whatsapp: teamForm.whatsapp
        };

        console.log("RATE LIMIT CHECK // TODO: Implement API rate limits");
        console.log("Submitting Team:", sanitizedData);

        alert('¡Publicado! Tu equipo ahora aparecerá buscando jugadores.');
        setShowTeamForm(false);
        setTeamForm({ equipo: '', deporte: 'Fútbol 5', dia: '', hora: '', posicion: '', nivel: 'Tranqui', whatsapp: '' });
    };

    const toggleAuthFormWrapper = (setter) => {
        if (!isLoggedIn) {
            alert("Inicia sesión para publicarte o unirte a la comunidad.");
            return;
        }
        if (setter === setShowPlayerForm) {
            setShowPlayerForm(!showPlayerForm);
            setShowTeamForm(false);
        } else {
            setShowTeamForm(!showTeamForm);
            setShowPlayerForm(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Auth Mock Bar */}
            <div style={{
                position: 'fixed', top: 0, right: 0,
                padding: '12px 24px',
                background: 'rgba(0,0,0,0.8)',
                borderBottomLeftRadius: '16px',
                borderLeft: '1px solid rgba(242,169,0,0.3)',
                borderBottom: '1px solid rgba(242,169,0,0.3)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <div style={{ fontSize: '0.85rem', color: '#aaa' }}>
                    Estado: <strong style={{ color: isLoggedIn ? '#3ecf8e' : '#ff6b6b' }}>{isLoggedIn ? 'Autenticado' : 'Invitado'}</strong>
                </div>
                {isLoggedIn ? (
                    <button onClick={logout} className={styles.btnOutline} style={{ padding: '6px 12px', minWidth: 'auto', fontSize: '0.8rem' }}>Cerrar Sesión</button>
                ) : (
                    <button onClick={login} className={styles.btnPrimary} style={{ padding: '6px 12px', minWidth: 'auto', fontSize: '0.8rem' }}>Login Test</button>
                )}
            </div>

            <header className={styles.header}>
                <h1 className={styles.title}>Comunidad Las Cañas</h1>
                <p className={styles.subtitle}>
                    Mucho más que una cancha. Encuentra equipo, compite en nuestros torneos y sé parte de la comunidad deportiva.
                </p>
            </header>

            {/* Partidos de Hoy */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>📅 Partidos de hoy en Las Cañas</h2>
                <div>
                    {activeMatchesToday.map(partido => (
                        <MatchToday key={partido.id} partido={partido} />
                    ))}
                </div>
            </section>

            {/* Partidos Abiertos en Las Cañas */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🔥 Partidos Abiertos en Las Cañas</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                    ¡Sumate a un partido que ya está armado y listo para jugarse en nuestras instalaciones!
                </p>
                <div className={styles.grid}>
                    {activeOpenMatches.map(match => (
                        <OpenMatchCard key={match.id} match={match} />
                    ))}
                </div>
            </section>

            {/* ¿Quieres Jugar? */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🎯 ¿Quieres Jugar?</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                    Junta a tu equipo ideal. Publica si estás buscando dónde jugar o si a tu equipo le falta alguien.
                </p>

                <div className={styles.btnGroup}>
                    <button
                        className={`${styles.btn} ${showPlayerForm ? styles.btnPrimary : styles.btnOutline}`}
                        onClick={() => toggleAuthFormWrapper(setShowPlayerForm)}
                    >
                        🙋‍♂️ Busco Equipo
                    </button>
                    <button
                        className={`${styles.btn} ${showTeamForm ? styles.btnPrimary : styles.btnOutline}`}
                        onClick={() => toggleAuthFormWrapper(setShowTeamForm)}
                    >
                        👥 Buscamos Jugador
                    </button>
                </div>

                {/* Expandable Form: Player */}
                {showPlayerForm && isLoggedIn && (
                    <div className={styles.formBox}>
                        <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', color: '#fff' }}>Publicar que buscas equipo</h3>
                        <form onSubmit={handlePlayerSubmit}>
                            <div className={styles.grid2Col} style={{ gap: '20px', marginBottom: '16px' }}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Tu Nombre</label>
                                    <input required maxLength="60" type="text" className={styles.input} value={playerForm.nombre} onChange={e => setPlayerForm({ ...playerForm, nombre: e.target.value })} placeholder="Ej: Juan Pérez" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Deporte</label>
                                    <select className={styles.input} value={playerForm.deporte} onChange={e => setPlayerForm({ ...playerForm, deporte: e.target.value })}>
                                        <option value="Fútbol 5">Fútbol 5</option>
                                        <option value="Pádel">Pádel</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Posición (Opcional)</label>
                                    <input maxLength="30" type="text" className={styles.input} value={playerForm.posicion} onChange={e => setPlayerForm({ ...playerForm, posicion: e.target.value })} placeholder="Ej: Golero, Drive..." />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Días Disponibles</label>
                                    <input required maxLength="50" type="text" className={styles.input} value={playerForm.dias} onChange={e => setPlayerForm({ ...playerForm, dias: e.target.value })} placeholder="Ej: Lunes a Miércoles" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Horario Aproximado</label>
                                    <input required maxLength="30" type="text" className={styles.input} value={playerForm.horario} onChange={e => setPlayerForm({ ...playerForm, horario: e.target.value })} placeholder="Ej: Después de las 19hs" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>WhatsApp de contacto</label>
                                    <input required pattern="^[0-9]{8,15}$" type="tel" className={styles.input} value={playerForm.whatsapp} onChange={e => setPlayerForm({ ...playerForm, whatsapp: e.target.value })} placeholder="Ej: 099123456" />
                                </div>
                            </div>
                            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} style={{ width: '100%' }}>Publicar mi disponibilidad</button>
                        </form>
                    </div>
                )}

                {/* Expandable Form: Team */}
                {showTeamForm && isLoggedIn && (
                    <div className={styles.formBox}>
                        <h3 style={{ marginBottom: '16px', fontSize: '1.2rem', color: '#fff' }}>Publicar que a tu equipo le falta alguien</h3>
                        <form onSubmit={handleTeamSubmit}>
                            <div className={styles.grid2Col} style={{ gap: '20px', marginBottom: '16px' }}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Nombre del Equipo</label>
                                    <input required maxLength="60" type="text" className={styles.input} value={teamForm.equipo} onChange={e => setTeamForm({ ...teamForm, equipo: e.target.value })} placeholder="Ej: Los Pibes" />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Deporte</label>
                                    <select className={styles.input} value={teamForm.deporte} onChange={e => setTeamForm({ ...teamForm, deporte: e.target.value })}>
                                        <option value="Fútbol 5">Fútbol 5</option>
                                        <option value="Pádel">Pádel</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Día del Partido</label>
                                    <input required maxLength="50" type="text" className={styles.input} value={teamForm.dia} onChange={e => setTeamForm({ ...teamForm, dia: e.target.value })} placeholder="Ej: Hoy, Mañana, Sábado..." />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Hora del Partido</label>
                                    <input required maxLength="30" type="time" className={styles.input} value={teamForm.hora} onChange={e => setTeamForm({ ...teamForm, hora: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Posición que falta</label>
                                    <input required maxLength="30" type="text" className={styles.input} value={teamForm.posicion} onChange={e => setTeamForm({ ...teamForm, posicion: e.target.value })} placeholder="Ej: 1 Golero, 1 Revés..." />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Nivel del Partido</label>
                                    <select className={styles.input} value={teamForm.nivel} onChange={e => setTeamForm({ ...teamForm, nivel: e.target.value })}>
                                        <option value="Tranqui">Tranqui (Amateur)</option>
                                        <option value="Intermedio">Intermedio</option>
                                        <option value="Competitivo">Competitivo (Picante)</option>
                                    </select>
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>WhatsApp de contacto</label>
                                    <input required pattern="^[0-9]{8,15}$" type="tel" className={styles.input} value={teamForm.whatsapp} onChange={e => setTeamForm({ ...teamForm, whatsapp: e.target.value })} placeholder="Ej: 099123456" />
                                </div>
                            </div>
                            <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} style={{ width: '100%' }}>Publicar requerimiento</button>
                        </form>
                    </div>
                )}

                <div className={styles.grid2Col}>
                    {/* List of Players */}
                    <div>
                        <h3 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Jugadores disponibles</h3>
                        <div className={styles.grid} style={{ gridTemplateColumns: '1fr' }}>
                            {activePlayers.map(jugador => (
                                <PlayerCard key={jugador.id} jugador={jugador} />
                            ))}
                        </div>
                    </div>

                    {/* List of Teams */}
                    <div>
                        <h3 style={{ marginBottom: '16px', fontSize: '1.2rem' }}>Equipos buscando jugador</h3>
                        <div className={styles.grid} style={{ gridTemplateColumns: '1fr' }}>
                            {activeTeams.map(equipo => (
                                <TeamCard key={equipo.id} equipo={equipo} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Torneos Activos */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>🏆 Torneos Activos</h2>
                <div className={styles.grid}>
                    {activeTournaments.map(torneo => (
                        <TournamentCard key={torneo.id} torneo={torneo} />
                    ))}
                </div>
            </section>

            {/* Ranking & Resultados */}
            <section className={styles.section}>
                <div className={styles.grid2Col}>
                    <div>
                        <h2 className={styles.sectionTitle}>🏅 Ranking</h2>
                        <RankingTable rankingData={activeRanking} />
                        <button className={styles.btnOutline} style={{ width: '100%', padding: '12px', marginTop: '16px', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }}>
                            Ver ranking completo
                        </button>
                    </div>

                    <div>
                        <h2 className={styles.sectionTitle}>🔥 Últimos Resultados</h2>
                        <ResultsList resultsData={activeResults} />
                    </div>
                </div>
            </section>

            {/* Galería */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>📸 Galería de la Comunidad</h2>
                <div className={styles.gallery}>
                    <img src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=400" className={styles.galleryImg} alt="Comunidad F5" />
                    <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=400" className={styles.galleryImg} alt="Tercer Tiempo" />
                    <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=400" className={styles.galleryImg} alt="Fútbol" />
                    <img src="https://images.unsplash.com/photo-1554068865-c7ec937904ba?auto=format&fit=crop&q=80&w=400" className={styles.galleryImg} alt="Pádel" />
                </div>
            </section>

            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'underline', fontSize: '1rem' }}>
                    ← Volver a Reservas
                </Link>
            </div>

        </div>
    );
}
