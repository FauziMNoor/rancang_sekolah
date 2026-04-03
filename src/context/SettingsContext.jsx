import { createContext, useContext, useState, useEffect } from 'react'

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState({
        apiKey: '',
        baseUrl: 'https://api.openai.com/v1',
        aiModel: 'gpt-4o'
    })

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    // Muat setting dari localStorage bila ada
    useEffect(() => {
        const savedSettings = localStorage.getItem('rancang_ai_settings')
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings))
        }
    }, [])

    const updateSettings = (newSettings) => {
        const merged = { ...settings, ...newSettings }
        setSettings(merged)
        localStorage.setItem('rancang_ai_settings', JSON.stringify(merged))
    }

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen)
    }

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, isSettingsOpen, toggleSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    return useContext(SettingsContext)
}


