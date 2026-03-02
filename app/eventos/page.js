"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const BASE_PRICE_PER_HOUR = 1200;
const ADMIN_APP_LINK = 'https://complejo-las-canas.vercel.app';
const WHATSAPP_NUMBER = '59899344344'; // From the image provided

export default function EventQuote() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [hours, setHours] = useState(3);

    // Options (with their counters for per-hour or per-unit extras)
    const [futbolHours, setFutbolHours] = useState(0);
    const [padelHours, setPadelHours] = useState(0);
    const [woodUnits, setWoodUnits] = useState(0);
    const [useDrinks, setUseDrinks] = useState(false);
    const [useGrill, setUseGrill] = useState(true); // Included default
    const [useCleaning, setUseCleaning] = useState(false);

    // AI/Smart Packages
    const applyPackage = (pkgType) => {
        if (pkgType === 'tercer_tiempo') {
            setHours(3);
            setFutbolHours(1);
            setPadelHours(0);
            setWoodUnits(1);
            setUseCleaning(true);
            setUseDrinks(true);
            setUseGrill(true);
        } else if (pkgType === 'infantil') {
            setHours(4);
            setFutbolHours(0);
            setPadelHours(0);
            setWoodUnits(0);
            setUseCleaning(true);
            setUseDrinks(false);
            setUseGrill(false);
        } else if (pkgType === 'torneo') {
            setHours(5);
            setFutbolHours(2);
            setPadelHours(2);
            setWoodUnits(2);
            setUseCleaning(true);
            setUseDrinks(true);
            setUseGrill(true);
        }
    };

    // Rules
    const [acceptedRules, setAcceptedRules] = useState(false);

    const priceDetails = useMemo(() => {
        let base = 0;
        if (hours === 1) base = 2000;
        else if (hours === 2) base = 3000;
        else if (hours === 3) base = 4200;
        else if (hours === 4) base = 5200;
        else if (hours === 5) base = 6000;
        else if (hours > 5) base = 6000 + ((hours - 5) * 1000);

        let extrasTotal = (futbolHours * 400) + (padelHours * 700) + (woodUnits * 500);
        let total = base + extrasTotal;

        return { base, extrasTotal, total };
    }, [hours, futbolHours, padelHours, woodUnits]);

    const handleSendWhatsApp = () => {
        if (!name || !date || !phone || !acceptedRules) return;

        const extras = [];
        if (futbolHours > 0) extras.push(`Cancha de fútbol x${futbolHours}h`);
        if (padelHours > 0) extras.push(`Cancha de pádel x${padelHours}h`);
        if (woodUnits > 0) extras.push(`Leña (¼ mt) x${woodUnits}`);
        if (useDrinks) extras.push(`Bebida a consignación`);
        if (useCleaning) extras.push(`Servicio de limpieza (+$500)`);
        if (useGrill) extras.push(`Parrillero`);

        const message = `¡Hola! 👋 Quería cotizar un evento en Las Cañas.

*Datos del cliente:*
- *Nombre:* ${name}
- *Teléfono:* ${phone}
- *Email:* ${email || 'No provisto'}

*Detalles del evento:*
- *Fecha:* ${date}
- *Duración Salón:* ${hours} horas

*Servicios Opcionales:*
${extras.length > 0 ? extras.map(e => `- ${e}`).join('\n') : "Ninguno"}

*Precio total estimado:* $${priceDetails.total} (Aprox.)

Acepto las reglas de la casa y quedo a la espera de confirmación de disponibilidad para esta fecha!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    const isFormValid = name.trim() !== '' && phone.trim() !== '' && date !== '' && acceptedRules;

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.header}>
                    <img src="/logo.png" alt="Las Cañas Logo" className={styles.logo} />
                    <h1 className={styles.title}>¡Calcula tu Fiesta en 3 Pasos!</h1>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', marginBottom: '32px', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                    <p style={{ marginBottom: '16px' }}><strong>¡Hola! 👋 Bienvenido al Complejo Deportivo Las Cañas. ⚽🎾🥳</strong></p>
                    <p style={{ marginBottom: '16px' }}>Queremos que organizar tu evento sea un placer, no un trámite. Tenés dos formas de avanzar:</p>
                    <p style={{ marginBottom: '16px' }}><strong>1️⃣ Presupuesto Instantáneo:</strong> Llená este formulario, elegí qué servicios necesitás (limpieza, parrillero, etc.) y envianos el detalle por WhatsApp ya pre-cotizado para agilizar la reserva.</p>
                    <p style={{ marginBottom: '16px' }}><strong>2️⃣ Charlemos:</strong> Si preferís que lo coordinemos juntos, ¡no te preocupes! Escribime tu consulta usando el botón de WhatsApp abajo o mandame un audio. Soy la responsable del complejo y voy a ayudarte personalmente para que no se te escape ningún detalle.</p>
                    <p>¡Estamos a las órdenes! 😊</p>
                </div>

                <div className={styles.imageGrid}>
                    <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400" className={styles.stepImage} alt="Parrillero" />
                    <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=400" className={styles.stepImage} alt="Salón Eventos" />
                    <img src="https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=400" className={styles.stepImage} alt="Diversión" />
                </div>

                <div className={styles.stepSection}>
                    <h2 className={styles.stepTitle}>1. Tus Datos</h2>
                    <div className={styles.inputGroup}>
                        <span className={styles.label}>Nombre:</span>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Tu nombre completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.label}>Celular:</span>
                        <input
                            type="tel"
                            className={styles.input}
                            placeholder="Ej: 099 123 456"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <span className={styles.label}>Email:</span>
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="Para enviarte la confirmación"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.stepSection}>
                    <h2 className={styles.stepTitle}>2. Fecha y Duración</h2>
                    <div className={styles.inputGroup}>
                        <span className={styles.label}>Fecha:</span>
                        <input
                            type="date"
                            className={styles.input}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.stepSection}>
                    <h2 className={styles.stepTitle}>2. ¿Cuántas horas?</h2>
                    <div className={styles.hoursControl}>
                        <button className={styles.btnRound} onClick={() => setHours(Math.max(1, hours - 1))}>-</button>
                        <span className={styles.hourDisplay}>{hours}</span>
                        <button className={styles.btnRound} onClick={() => setHours(hours + 1)}>+</button>
                        <span className={styles.priceHint}>horas de Salón</span>
                    </div>
                    <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>El salón incluye: Cocina, vajilla (50p), sillas/mesas, mantelería, parrillero, DirectTV, audio, AC, limpieza post-evento y más.</p>
                </div>

                <div className={styles.stepSection}>
                    <h2 className={styles.stepTitle}>3. Servicios Opcionales (Sumar)</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.95rem' }}>⚽ Cancha de Fútbol ($400/hr)</div>
                            </div>
                            <div className={styles.hoursControl} style={{ padding: '4px 12px' }}>
                                <button className={styles.btnRound} style={{ width: 28, height: 28 }} onClick={() => setFutbolHours(Math.max(0, futbolHours - 1))}>-</button>
                                <span className={styles.hourDisplay} style={{ fontSize: '1rem' }}>{futbolHours}</span>
                                <button className={styles.btnRound} style={{ width: 28, height: 28 }} onClick={() => setFutbolHours(futbolHours + 1)}>+</button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.95rem' }}>🎾 Cancha de Pádel ($700/hr)</div>
                            </div>
                            <div className={styles.hoursControl} style={{ padding: '4px 12px' }}>
                                <button className={styles.btnRound} style={{ width: 28, height: 28 }} onClick={() => setPadelHours(Math.max(0, padelHours - 1))}>-</button>
                                <span className={styles.hourDisplay} style={{ fontSize: '1rem' }}>{padelHours}</span>
                                <button className={styles.btnRound} style={{ width: 28, height: 28 }} onClick={() => setPadelHours(padelHours + 1)}>+</button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '0.95rem' }}>🪵 Leña ($500 el ¼ mt)</div>
                            </div>
                            <div className={styles.hoursControl} style={{ padding: '4px 12px' }}>
                                <button className={styles.btnRound} style={{ width: 28, height: 28 }} onClick={() => setWoodUnits(Math.max(0, woodUnits - 1))}>-</button>
                                <span className={styles.hourDisplay} style={{ fontSize: '1rem' }}>{woodUnits}</span>
                                <button className={styles.btnRound} style={{ width: 28, height: 28 }} onClick={() => setWoodUnits(woodUnits + 1)}>+</button>
                            </div>
                        </div>

                        <label className={styles.extraOption} style={{ marginTop: '8px' }}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={useDrinks}
                                onChange={(e) => setUseDrinks(e.target.checked)}
                            />
                            <span className={styles.extraIcon}>🍻</span>
                            <span className={styles.extraText}>Bebida a consignación (Se consulta por precio)</span>
                        </label>

                        <label className={styles.extraOption} style={{ marginTop: '8px' }}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={useGrill}
                                onChange={(e) => setUseGrill(e.target.checked)}
                            />
                            <span className={styles.extraIcon}>🥩</span>
                            <span className={styles.extraText}>Uso de Parrillero (Incluido en Salón)</span>
                        </label>

                        <label className={styles.extraOption} style={{ marginTop: '8px' }}>
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={useCleaning}
                                onChange={(e) => setUseCleaning(e.target.checked)}
                            />
                            <span className={styles.extraIcon}>🧹</span>
                            <span className={styles.extraText}>Limpieza Post-Evento (+$500)</span>
                        </label>
                    </div>
                </div>

                <div className={styles.stepSection}>
                    <h2 className={styles.stepTitle}>💡 Ideas Nuevas (Combos Prediseñados)</h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                        ¡Elegí una experiencia completa con un solo click y dejá la organización en nuestras manos!
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                        <button
                            className={`btn btn-dark`}
                            onClick={() => applyPackage('tercer_tiempo')}
                            style={{ justifyContent: 'flex-start', textAlign: 'left', padding: '16px', border: '1px solid rgba(242,169,0,0.3)' }}
                        >
                            <span style={{ fontSize: '1.5rem', marginRight: '16px' }}>🍖</span>
                            <div>
                                <strong style={{ display: 'block', color: 'var(--primary)', marginBottom: '4px' }}>El Super "Tercer Tiempo"</strong>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>3hs Salón + 1h Fútbol + Parrillero + Leña + Bebida fría + Limpieza</span>
                            </div>
                        </button>

                        <button
                            className={`btn btn-dark`}
                            onClick={() => applyPackage('infantil')}
                            style={{ justifyContent: 'flex-start', textAlign: 'left', padding: '16px', border: '1px solid rgba(62,207,142,0.3)' }}
                        >
                            <span style={{ fontSize: '1.5rem', marginRight: '16px' }}>🎈</span>
                            <div>
                                <strong style={{ display: 'block', color: '#3ecf8e', marginBottom: '4px' }}>Cumpleaños Infantil Sin Estrés</strong>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>4hs Salón (con espacio para inflables) + Limpieza Post-Fiesta</span>
                            </div>
                        </button>

                        <button
                            className={`btn btn-dark`}
                            onClick={() => applyPackage('torneo')}
                            style={{ justifyContent: 'flex-start', textAlign: 'left', padding: '16px', border: '1px solid rgba(255,255,255,0.3)' }}
                        >
                            <span style={{ fontSize: '1.5rem', marginRight: '16px' }}>🏆</span>
                            <div>
                                <strong style={{ display: 'block', color: 'white', marginBottom: '4px' }}>Torneo de Amigos Full Day</strong>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>5hs Salón + 2h Fútbol + 2h Pádel + Parrillero + 2 Leñas + Bebida</span>
                            </div>
                        </button>
                    </div>
                </div>

                <div className={styles.totalBox}>
                    <div className={styles.totalTitle}>Costo Estimado:</div>
                    <div className={styles.totalPrice}>${priceDetails.total}</div>
                </div>

                <label className={styles.rulesOption}>
                    <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={acceptedRules}
                        onChange={(e) => setAcceptedRules(e.target.checked)}
                    />
                    <span className={styles.rulesText}>
                        Acepto las Reglas de la Casa (Cuidados, ruidos molestos pasada la medianoche, y horarios de las instalaciones).
                    </span>
                </label>

                <button
                    className={styles.btnSubmit}
                    onClick={handleSendWhatsApp}
                    disabled={!isFormValid}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.659-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.575-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.001 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="white" />
                    </svg>
                    Enviar Solicitud por WhatsApp
                </button>

                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'underline', fontSize: '0.9rem' }}>
                        ← Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}
