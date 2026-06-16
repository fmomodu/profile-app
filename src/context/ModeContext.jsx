import { createContext, useContext, useState } from 'react'

const ModeContext = createContext()

export function ModeProvider({ children }) {
    const [mode, setMode] = useState('light')

    function toggleMode() {
        setMode(mode === 'light' ? 'dark' : 'light')
    }

    return (
        <ModeContext.Provider value={{ mode, toggleMode}} >
            {children}
        </ModeContext.Provider>
    )
}
    export function useMode() {
        return useContext(ModeContext)

}
