import './globals.css';

export const metadata = {
  title: 'Las Cañas - Tu Lugar de Encuentro',
  description: 'Fútbol 5, Pádel y Eventos en Tacuarembó',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}