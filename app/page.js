"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className={styles.loaderOverlay}>
          <div className={styles.loaderContent}>
            <h1 className={styles.loaderText}>PREPÁRATE PARA LA EXPERIENCIA</h1>
            <h2 className={styles.loaderSubtext}>LAS CAÑAS</h2>
          </div>
        </div>
      )}
      {!loading && (
        <main className={`${styles.container} ${styles.fadeIn}`}>
          {/* Navbar */}
          <nav className={styles.navbar}>
            <div className={styles.logoArea}>
              <img src="/logo.png" alt="Logo Las Cañas" width="32" height="32" style={{ objectFit: 'contain' }} />
              <span>Las Cañas - Tu Lugar de Encuentro</span>
            </div>
            <div className={styles.navLinks}>
              <a href="#">Pádel</a>
              <a href="#">Fútbol 5</a>
              <a href="#">Eventos Privados</a>
              <a href="#">Comunidad</a>
            </div>
            <div className={styles.techLogos}>
              <span style={{ fontWeight: 600 }}>Next.js</span>
              <span style={{ color: '#3ecf8e', fontWeight: 600 }}>Supabase</span>
            </div>
          </nav>

          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroBg}></div>

            <div className={styles.heroContent}>
              <div className={styles.heroLeft}>
                <h1 className={styles.headline}>El Mejor <span className="text-primary">Pádel</span><br />Y <span className="text-primary">Fútbol</span> En<br />Tacuarembó.</h1>
                <p className={styles.subheadline}>Reserva en línea, disfruta y desconecta.</p>
              </div>

              <div className={styles.widgetSpace}>
                <div className={styles.widget}>
                  <h2 className={styles.widgetTitle}>Reservar cancha</h2>

                  <div className={styles.calendarHeader}>
                    <span style={{ cursor: 'pointer' }}>&lt;</span>
                    <span style={{ fontWeight: 600, color: 'white', fontSize: '0.95rem' }}>LUN 13 MAY 2024</span>
                    <span style={{ cursor: 'pointer' }}>&gt;</span>
                  </div>

                  <div className={styles.calendarGrid}>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                      <div key={i} className={styles.calendarDay}>{d}</div>
                    ))}
                    {/* Dummy Dates */}
                    <div className={styles.calendarDate}>6</div>
                    <div className={styles.calendarDate}>7</div>
                    <div className={styles.calendarDate}>8</div>
                    <div className={styles.calendarDate}>9</div>
                    <div className={styles.calendarDate}>10</div>
                    <div className={styles.calendarDate}>11</div>
                    <div className={styles.calendarDate}>12</div>
                    <div className={styles.calendarDate}>13</div>
                    <div className={styles.calendarDate}>14</div>
                    <div className={styles.calendarDate}>15</div>
                    <div className={styles.calendarDate}>16</div>
                    <div className={`${styles.calendarDate} ${styles.active}`}>17</div>
                    <div className={styles.calendarDate}>18</div>
                    <div className={styles.calendarDate}>19</div>
                  </div>

                  <div className={styles.timeSlots}>
                    <div className={styles.timeSlot}>19:00 - 20:00</div>
                    <div className={styles.timeSlot}>20:00 - 21:00</div>
                  </div>

                  <label className={styles.checkboxRow}>
                    <input type="checkbox" style={{ accentColor: '#f2a900', width: '16px', height: '16px' }} />
                    Evento de amigos
                  </label>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Link href="#" target="_blank" className={`btn btn-primary ${styles.btnConfirm}`} style={{ textDecoration: 'none', flex: 1, padding: '12px', fontSize: '14px' }}>
                      NUESTRA APP
                    </Link>
                    <Link href="#" target="_blank" className={`btn btn-outline ${styles.btnConfirm}`} style={{ textDecoration: 'none', flex: 1, padding: '12px', border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: '14px' }}>
                      WONA URUGUAY
                    </Link>
                  </div>

                  <div className={styles.secureText}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="#3ecf8e" />
                    </svg>
                    Recibe tu acceso al pagar
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className={styles.cardsContainer}>
              <div className={`glass-panel ${styles.card}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🎾</div>
                  <div>
                    <h3 className={styles.cardTitle}>Pádel</h3>
                    <p className={styles.cardSubtitle}>Cancha Premium</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <Link href="#" target="_blank" className={`btn btn-primary ${styles.cardBtn}`} style={{ marginTop: 0, padding: '8px 16px', fontSize: '0.85rem' }}>Nuestra App</Link>
                  <Link href="#" target="_blank" className={`btn btn-outline ${styles.cardBtn}`} style={{ marginTop: 0, padding: '8px 16px', fontSize: '0.85rem' }}>Wona</Link>
                </div>
              </div>

              <div className={`glass-panel ${styles.card}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>⚽</div>
                  <div>
                    <h3 className={styles.cardTitle}>Fútbol 5</h3>
                    <p className={styles.cardSubtitle}>Césped Sintético</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <Link href="#" target="_blank" className={`btn btn-primary ${styles.cardBtn}`} style={{ marginTop: 0, padding: '8px 16px', fontSize: '0.85rem' }}>Nuestra App</Link>
                  <Link href="#" target="_blank" className={`btn btn-outline ${styles.cardBtn}`} style={{ marginTop: 0, padding: '8px 16px', fontSize: '0.85rem' }}>Wona</Link>
                </div>
              </div>

              <div className={`glass-panel ${styles.card}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>🥂</div>
                  <div>
                    <h3 className={styles.cardTitle}>Salón de Eventos</h3>
                    <p className={styles.cardSubtitle}>Eventos Privados 50p</p>
                  </div>
                </div>
                <Link href="/eventos" className={`btn btn-outline ${styles.cardBtn}`}>Cotizar Evento</Link>
              </div>
            </div>
          </section>

          {/* Footer Section */}
          <footer className={styles.footer}>
            <div className={styles.footerCol}>
              <h3>Comunidad</h3>
              <p className={styles.subtitle}>Partidos Abiertos, Ranking Mensual.</p>

              <div className={styles.footerRow}>
                <span>Partidos Abiertos</span>
                <button className="btn btn-dark">Ver Partidos</button>
              </div>
              <div className={styles.footerRow}>
                <span>Partidos Privados</span>
                <button className="btn btn-dark">Armar Partido</button>
              </div>
            </div>

            <div className={styles.footerCol}>
              <h3>Experiencia Las Cañas</h3>
              <p className={styles.subtitle}>Fotos de grupos, Tercer tiempo</p>
              <div className={styles.gallery}>
                <img src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=400" className={styles.galleryImg} alt="Group 1" />
                <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=400" className={styles.galleryImg} alt="Group 2" />
              </div>
            </div>

            <div className={styles.footerCol}>
              <h3>Locación</h3>
              <p className={styles.subtitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--primary)' }}>📍</span> Tacuarembó, Uruguay
              </p>

              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <strong>Email:</strong> contacto@lascanas.uy
                </div>
                <div className={styles.contactItem}>
                  <strong>Horarios:</strong> Lunes a Domingo, 14:00 - 00:00
                </div>
                <div className={styles.contactItem}>
                  <strong>Duchas:</strong> Disponibles
                </div>
                <div className={styles.contactItem}>
                  <strong>Tel:</strong> +598 99 123 456
                </div>
              </div>
            </div>
          </footer>
        </main>
      )}
    </>
  );
}