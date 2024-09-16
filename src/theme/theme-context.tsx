'use client';
import React from 'react';
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "drobs-local-storage-react";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from "@/theme/theme";

export type ThemeModeType = 'dark' | 'light';
export type ThemeModeContextType = {
    mode: ThemeModeType;
    setMode: (value: ThemeModeType) => void;
};
export const _DEFAULT_THEME_MODE:ThemeModeType = 'dark';
export const _STORAGE_KEY_THEME_MODE:string = 'themeMode';
export const ThemeModeContext = createContext<ThemeModeContextType>({mode: _DEFAULT_THEME_MODE, setMode: () => {}});

export default function ThemeModeContextProvider({children,}: Readonly<{children: React.ReactNode;}>) {
    const [ defaultMode,  ] = useLocalStorage(_STORAGE_KEY_THEME_MODE as ThemeModeType, _DEFAULT_THEME_MODE);
    const [mode, setMode] = useState<ThemeModeType>(_DEFAULT_THEME_MODE);
    const [currentTheme, setCurrentTheme] = useState(darkTheme);

    useEffect(() => {
        setMode(defaultMode as ThemeModeType);
    },[]);

    useEffect(() => {
        switch (mode) {
            case 'dark':
                setCurrentTheme(darkTheme);
                break;
            case 'light':
                setCurrentTheme(lightTheme);
                break;
            default:
                setCurrentTheme(darkTheme);
                break;
        }
    }, [mode]);

    return (
        <ThemeModeContext.Provider value={{mode, setMode}}>
            <ThemeProvider theme={currentTheme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );
}