import React from 'react';
import { AuthProvider } from './context/AuthContext';

export default function ComunidadLayout({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}
