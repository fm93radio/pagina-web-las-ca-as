"use client";
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { supabase } from '../lib/supabaseClient';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isBefore, startOfDay, addMonths, subMonths, getDay } from 'date-fns';
import { es } from 'date-fns/locale';

const HORARIOS = ['14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
const DURACION = 60 // minutos

const SPORTS = [
  { id: null, label: 'Pádel', emoji: '🎾' },
  { id: null, label: 'Fútbol 5', emoji: '⚽' },
]

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [facilities, setFacilities] = useState([])
  const [selectedFacility, setSelectedFacility] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [reservedSlots, setReservedSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [loadingSlots, setLoadingSlots] = useState(false)

  // Formulario
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Loader inicial
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  // Cargar instalaciones
  useEffect(() => {
    supabase.from('facilities').select('*').eq('active', true).then(({ data }) => {
      if (data && data.length > 0) {
        setFacilities(data)
        setSelectedFacility(data[0])
      }
    })
  }, [])

  // Cargar slots ocupados cuando cambia fecha o instalación
  const fetchReserved = useCallback(async () => {
    if (!selectedFacility || !selectedDate) return
    setLoadingSlots(true)
    const dayStart = new Date(selectedDate)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(selectedDate)
    dayEnd.setHours(23, 59, 59, 999)

    const { data } = await supabase
      .from('reservations')
      .select('start_time, end_time')
      .eq('facility_id', selectedFacility.id)
      .neq('status', 'cancelled')
      .gte('start_time', dayStart.toISOString())
      .lte('start_time', dayEnd.toISOString())

    setReservedSlots(data || [])
    setLoadingSlots(false)
  }, [selectedFacility, selectedDate])

  useEffect(() => { fetchReserved() }, [fetchReserved])

  // Verificar si un horario está ocupado
  const isSlotTaken = (hora) => {
    const [h, m] = hora.split(':').map(Number)
    const slotStart = new Date(selectedDate)
    slotStart.setHours(h, m, 0, 0)
    const slotEnd = new Date(slotStart)
    slotEnd.setMinutes(slotEnd.getMinutes() + DURACION)

    return reservedSlots.some(r => {
      const rStart = new Date(r.start_time)
      const rEnd = new Date(r.end_time)
      return slotStart < rEnd && slotEnd > rStart
    })
  }

  // Días del mes para el calendario
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  })
  const firstDayOfWeek = getDay(startOfMonth(currentMonth)) // 0=dom

  // Enviar reserva
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      setError('Nombre y teléfono son requeridos.')
      return
    }
    setSubmitting(true)
    setError('')

    const [h, m] = selectedSlot.split(':').map(Number)
    const startTime = new Date(selectedDate)
    startTime.setHours(h, m, 0, 0)
    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + DURACION)

    const { error: err } = await supabase.from('reservations').insert([{
      facility_id: selectedFacility.id,
      customer_name: formData.name,
      customer_phone: formData.phone,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      total_amount: selectedFacility.price_per_hour || 0,
      paid_amount: 0,
      status: 'pending',
      notes: formData.notes || ''
    }])

    setSubmitting(false)
    if (err) {
      setError('Error al reservar: ' + err.message)
    } else {
      setSuccess(true)
      setShowForm(false)
      setSelectedSlot(null)
      fetchReserved()
    }
  }

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
          </nav>

          {/* Hero Section */}
          <section className={styles.hero}>
            <div className={styles.heroBg}></div>
            <div className={styles.heroContent}>
              <div className={styles.heroLeft}>
                <h1 className={styles.headline}>El Mejor <span className="text-primary">Pádel</span><br />Y <span className="text-primary">Fútbol</span> En<br />Tacuarembó.</h1>
                <p className={styles.subheadline}>Reserva en línea, disfruta y desconecta.</p>
              </div>

              {/* Widget dinámico */}
              <div className={styles.widgetSpace}>
                <div className={styles.widget}>
                  <h2 className={styles.widgetTitle}>Reservar cancha</h2>

                  {/* Selector de instalación */}
                  {facilities.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      {facilities.filter(f => f.name !== 'Salón de Eventos').map(f => (
                        <button
                          key={f.id}
                          onClick={() => { setSelectedFacility(f); setSelectedSlot(null); setSuccess(false) }}
                          style={{
                            flex: 1,
                            padding: '8px',
                            borderRadius: '8px',
                            border: selectedFacility?.id === f.id ? '2px solid #f2a900' : '1px solid #333',
                            background: selectedFacility?.id === f.id ? 'rgba(242,169,0,0.15)' : 'rgba(255,255,255,0.05)',
                            color: selectedFacility?.id === f.id ? '#f2a900' : '#aaa',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Navegación mes */}
                  <div className={styles.calendarHeader}>
                    <span style={{ cursor: 'pointer' }} onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>‹</span>
                    <span style={{ fontWeight: 600, color: 'white', fontSize: '0.9rem', textTransform: 'capitalize' }}>
                      {format(currentMonth, 'MMMM yyyy', { locale: es })}
                    </span>
                    <span style={{ cursor: 'pointer' }} onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>›</span>
                  </div>

                  {/* Calendario */}
                  <div className={styles.calendarGrid}>
                    {['D','L','M','M','J','V','S'].map((d, i) => (
                      <div key={i} className={styles.calendarDay}>{d}</div>
                    ))}
                    {/* Espacios vacíos al inicio */}
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {daysInMonth.map((day, i) => {
                      const isPast = isBefore(day, startOfDay(new Date()))
                      const isSelected = isSameDay(day, selectedDate)
                      return (
                        <div
                          key={i}
                          onClick={() => { if (!isPast) { setSelectedDate(day); setSelectedSlot(null); setSuccess(false) } }}
                          className={`${styles.calendarDate} ${isSelected ? styles.active : ''}`}
                          style={{
                            opacity: isPast ? 0.3 : 1,
                            cursor: isPast ? 'not-allowed' : 'pointer',
                            background: isSelected ? '#f2a900' : 'transparent',
                            color: isSelected ? '#000' : undefined,
                            fontWeight: isSelected ? 700 : undefined,
                            borderRadius: '6px'
                          }}
                        >
                          {format(day, 'd')}
                        </div>
                      )
                    })}
                  </div>

                  {/* Fecha seleccionada */}
                  <p style={{ color: '#f2a900', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', margin: '8px 0 4px' }}>
                    {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                  </p>

                  {/* Horarios */}
                  {loadingSlots ? (
                    <div style={{ textAlign: 'center', padding: '12px', color: '#888', fontSize: '0.8rem' }}>Cargando horarios...</div>
                  ) : (
                    <div className={styles.timeSlots}>
                      {HORARIOS.map(hora => {
                        const taken = isSlotTaken(hora)
                        const isSelected = selectedSlot === hora
                        return (
                          <div
                            key={hora}
                            onClick={() => { if (!taken) { setSelectedSlot(hora); setShowForm(true); setSuccess(false); setError('') } }}
                            className={styles.timeSlot}
                            style={{
                              background: taken ? 'rgba(255,50,50,0.15)' : isSelected ? 'rgba(242,169,0,0.3)' : undefined,
                              border: taken ? '1px solid rgba(255,50,50,0.3)' : isSelected ? '1px solid #f2a900' : undefined,
                              color: taken ? '#ff6b6b' : isSelected ? '#f2a900' : undefined,
                              cursor: taken ? 'not-allowed' : 'pointer',
                              fontSize: '0.82rem',
                              textDecoration: taken ? 'line-through' : 'none',
                              opacity: taken ? 0.6 : 1
                            }}
                          >
                            {hora} — {taken ? 'Ocupado' : 'Disponible'}
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Formulario de reserva */}
                  {showForm && selectedSlot && !success && (
                    <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(242,169,0,0.07)', borderRadius: '10px', border: '1px solid rgba(242,169,0,0.2)' }}>
                      <p style={{ color: '#f2a900', fontWeight: 700, fontSize: '0.82rem', marginBottom: '8px' }}>
                        Reservando {selectedFacility?.name} — {selectedSlot} hs
                      </p>
                      {error && <p style={{ color: '#ff6b6b', fontSize: '0.78rem', marginBottom: '8px' }}>{error}</p>}
                      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <input
                          placeholder="Nombre completo *"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #333', background: '#111', color: 'white', fontSize: '0.85rem' }}
                        />
                        <input
                          placeholder="Teléfono *"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #333', background: '#111', color: 'white', fontSize: '0.85rem' }}
                        />
                        <input
                          placeholder="Notas (opcional)"
                          value={formData.notes}
                          onChange={e => setFormData({ ...formData, notes: e.target.value })}
                          style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #333', background: '#111', color: 'white', fontSize: '0.85rem' }}
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => { setShowForm(false); setSelectedSlot(null) }}
                            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #333', background: 'transparent', color: '#aaa', cursor: 'pointer', fontSize: '0.82rem' }}
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={submitting}
                            style={{ flex: 2, padding: '10px', borderRadius: '8px', border: 'none', background: '#f2a900', color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}
                          >
                            {submitting ? 'Reservando...' : 'CONFIRMAR RESERVA'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Éxito */}
                  {success && (
                    <div style={{ marginTop: '12px', padding: '16px', background: 'rgba(62,207,142,0.1)', borderRadius: '10px', border: '1px solid rgba(62,207,142,0.3)', textAlign: 'center' }}>
                      <p style={{ color: '#3ecf8e', fontWeight: 700, fontSize: '0.95rem' }}>✅ ¡Reserva enviada!</p>
                      <p style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '4px' }}>Te contactaremos para confirmar el turno.</p>
                    </div>
                  )}

                  <div className={styles.secureText} style={{ marginTop: '12px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="#3ecf8e" /></svg>
                    Reserva en tiempo real — sin intermediarios
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
              </div>
              <div className={`glass-panel ${styles.card}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>⚽</div>
                  <div>
                    <h3 className={styles.cardTitle}>Fútbol 5</h3>
                    <p className={styles.cardSubtitle}>Césped Sintético</p>
                  </div>
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

          {/* Footer */}
          <footer className={styles.footer}>
            <div className={styles.footerCol}>
              <h3>Comunidad</h3>
              <p className={styles.subtitle}>Partidos Abiertos, Ranking Mensual.</p>
              <div className={styles.footerRow}>
                <span>Partidos Abiertos</span>
                <button className="btn btn-dark">Ver Partidos</button>
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
                <div className={styles.contactItem}><strong>Horarios:</strong> Lunes a Domingo, 14:00 - 00:00</div>
                <div className={styles.contactItem}><strong>Tel:</strong> +598 99 123 456</div>
              </div>
            </div>
          </footer>
        </main>
      )}
    </>
  )
}