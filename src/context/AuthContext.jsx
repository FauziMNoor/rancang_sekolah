import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Kalau supabase tidak dikonfigurasi, skip auth
        if (!supabase) {
            setLoading(false)
            return
        }

        const initializeAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setUser(session?.user ?? null)
            setLoading(false)
        }

        initializeAuth()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    const signIn = async (email, password) => {
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        setLoading(false)
        return { error }
    }

    const signUp = async (email, password, fullName) => {
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                }
            }
        })
        setLoading(false)
        return { error }
    }

    const signOut = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signOut()
        setLoading(false)
        return { error }
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}


