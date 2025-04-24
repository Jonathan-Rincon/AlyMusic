import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header/Header';
import { ThemeProvider } from 'styled-components';

const theme = {
    colors: {
        background: {
            titleHeader: '#f0f0f0',
        },
        font: {
            titleHeader: '#333',
        },
    },
    fonts: {
        base: 'Arial, sans-serif', 
    },
};


describe("Header Component", () => {

    const appName = "AlyMusic";

    beforeEach(() => {
        render(
            <ThemeProvider theme={theme}>
                <Header appName={appName} />
            </ThemeProvider>
        );
    });

    it("Should display the appname correctly", () => {
        
        const appNameHeader = screen.getByText(appName);
        expect(appNameHeader).toBeInTheDocument();
    });
    it("Should not render additional elements", () => {
    
        // Inspeccionar el DOM completo para confirmar que no hay otros elementos de texto no deseados
        const allTextNodes = screen.queryAllByText((text) => text && text.trim() !== appName);
    
        // Verifica que no existan textos adicionales
        expect(allTextNodes.length).toBe(0); // Asegura que ningún texto adicional esté presente
    });
    
});