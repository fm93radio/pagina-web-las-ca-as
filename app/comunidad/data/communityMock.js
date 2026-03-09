export const mockMatchesToday = [
    { id: 1, hora: "19:00", deporte: "Fútbol 5", equipoA: "Los Pibes", equipoB: "La Banda", createdAt: "2026-03-09T00:00:00Z", expiresAt: "2026-03-09T23:59:59Z" },
    { id: 2, hora: "20:00", deporte: "Pádel", equipoA: "Pareja 1 (Juan/Pedro)", equipoB: "Pareja 2 (Nico/Seba)", createdAt: "2026-03-09T00:00:00Z", expiresAt: "2026-03-09T23:59:59Z" },
    { id: 3, hora: "21:00", deporte: "Fútbol 5", equipoA: "Deportivo Norte", equipoB: "Atlético Sur", createdAt: "2026-03-09T00:00:00Z", expiresAt: "2026-03-09T23:59:59Z" },
];

export const mockPlayers = [
    {
        id: 1,
        nombre: "Martín Gómez",
        deporte: "Fútbol 5",
        posicion: "Golero",
        disponibilidad: "Lunes a Jueves, 19:00+",
        whatsapp: "099123456",
        createdAt: "2026-03-05T10:00:00Z",
        expiresAt: "2026-03-12T10:00:00Z"
    },
    {
        id: 2,
        nombre: "Lucas Rodríguez",
        deporte: "Pádel",
        posicion: "Drive",
        disponibilidad: "Fines de semana",
        whatsapp: "098123456",
        createdAt: "2026-03-08T15:00:00Z",
        expiresAt: "2026-03-15T15:00:00Z"
    },
    {
        id: 3,
        nombre: "Andrés Silva",
        deporte: "Fútbol 5",
        posicion: "Defensa",
        disponibilidad: "Todos los días 20:00",
        whatsapp: "097123456",
        createdAt: "2026-03-09T08:00:00Z",
        expiresAt: "2026-03-16T08:00:00Z"
    },
];

export const mockOpenMatches = [
    {
        id: 1,
        deporte: "Fútbol 5",
        dia: "Miércoles",
        hora: "21:00",
        cancha: "Cancha 1",
        currentPlayers: 7,
        maxPlayers: 10,
        status: "open",
        venue: "Las Cañas",
        createdAt: "2026-03-08T10:00:00Z",
        expiresAt: "2026-03-11T21:00:00Z" // Expira al inicio del partido
    },
    {
        id: 2,
        deporte: "Pádel",
        dia: "Jueves",
        hora: "19:00",
        cancha: "Cancha de Pádel 2",
        currentPlayers: 4,
        maxPlayers: 4,
        status: "full",
        venue: "Las Cañas",
        createdAt: "2026-03-08T11:00:00Z",
        expiresAt: "2026-03-12T19:00:00Z"
    }
];

export const mockTeams = [
    {
        id: 1,
        equipo: "Los Amigos FC",
        deporte: "Fútbol 5",
        dia: "Hoy",
        hora: "21:00",
        faltan: "1 Golero",
        nivel: "Tranqui",
        whatsapp: "099111222",
        createdAt: "2026-03-09T09:00:00Z",
        expiresAt: "2026-03-11T09:00:00Z"
    },
    {
        id: 2,
        equipo: "Tiki Taka",
        deporte: "Fútbol 5",
        dia: "Mañana",
        hora: "20:00",
        faltan: "2 Jugadores",
        nivel: "Competitivo",
        whatsapp: "099333444",
        createdAt: "2026-03-08T14:00:00Z",
        expiresAt: "2026-03-10T14:00:00Z"
    },
    {
        id: 3,
        equipo: "Pádel Pro",
        deporte: "Pádel",
        dia: "Sábado",
        hora: "10:00",
        faltan: "1 Jugador (Revés)",
        nivel: "Intermedio",
        whatsapp: "099555666",
        createdAt: "2026-03-07T18:00:00Z",
        expiresAt: "2026-03-09T18:00:00Z"
    },
];

export const mockTournaments = [
    { id: 1, nombre: "Liga Nocturna Apertura", deporte: "Fútbol 5", estado: "En curso", createdAt: "2026-03-01T00:00:00Z", expiresAt: "2026-05-01T00:00:00Z" },
    { id: 2, nombre: "Torneo Relámpago Fin de Semana", deporte: "Pádel", estado: "Inscripciones abiertas", createdAt: "2026-03-01T00:00:00Z", expiresAt: "2026-04-01T00:00:00Z" },
];

export const mockRanking = [
    { id: 1, equipo: "Los Pibes", pts: 15, createdAt: "2026-03-01T00:00:00Z", expiresAt: "2029-01-01T00:00:00Z" },
    { id: 2, equipo: "Deportivo Norte", pts: 12, createdAt: "2026-03-01T00:00:00Z", expiresAt: "2029-01-01T00:00:00Z" },
    { id: 3, equipo: "La Banda", pts: 10, createdAt: "2026-03-01T00:00:00Z", expiresAt: "2029-01-01T00:00:00Z" },
    { id: 4, equipo: "Atlético Sur", pts: 9, createdAt: "2026-03-01T00:00:00Z", expiresAt: "2029-01-01T00:00:00Z" },
    { id: 5, equipo: "Los Amigos FC", pts: 6, createdAt: "2026-03-01T00:00:00Z", expiresAt: "2029-01-01T00:00:00Z" },
];

export const mockResults = [
    { id: 1, equipoA: "Los Pibes", resA: 5, equipoB: "La Banda", resB: 3, createdAt: "2026-03-01T00:00:00Z", expiresAt: "2029-01-01T00:00:00Z" },
    { id: 2, equipoA: "Atlético Sur", resA: 2, equipoB: "Tiki Taka", resB: 2, createdAt: "2026-03-01T00:00:00Z", expiresAt: "2029-01-01T00:00:00Z" },
    { id: 3, equipoA: "Dep. Norte", resA: 4, equipoB: "Amigos FC", resB: 1, createdAt: "2026-03-01T00:00:00Z", expiresAt: "2029-01-01T00:00:00Z" },
];
