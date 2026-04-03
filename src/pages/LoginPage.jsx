import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { User, Lock, Mail, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react'
import styles from './LoginPage.module.css'

export default function LoginPage() {
    const [params] = useSearchParams()
    const [isSignUp, setIsSignUp] = useState(params.get('mode') === 'signup')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { signIn, signUp } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const result = isSignUp
                ? await signUp(email, password, fullName)
                : await signIn(email, password)
            if (result.error) {
                setError(result.error.message)
            } else {
                navigate('/dashboard')
            }
        } catch (err) {
            setError('Terjadi kesalahan. Silakan coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.bg}>
                <div className={styles.bgOrb1} />
                <div className={styles.bgOrb2} />
            </div>

            {/* Logo */}
            <Link to="/" className={styles.logoLink}>
                <span>🏫</span>
                <span className="gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '18px' }}>Rancang Sekolah</span>
            </Link>

            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`glass-card glow-gold ${styles.card}`}
                >
                    {/* Header */}
                    <div className={styles.cardHeader}>
                        <div className={styles.icon}>
                            <Sparkles size={24} />
                        </div>
                        <h1 className={styles.title} style={{ fontFamily: 'var(--font-serif)' }}>
                            {isSignUp ? 'Mulai Perjalanan Anda' : 'Selamat Datang Kembali'}
                        </h1>
                        <p className={styles.subtitle}>
                            {isSignUp
                                ? 'Buat akun gratis dan mulai merancang sekolah impian'
                                : 'Masuk untuk melanjutkan rancangan sekolah Anda'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {isSignUp && (
                            <div className={styles.field}>
                                <label className={styles.label}>Nama Lengkap</label>
                                <div className={styles.inputWrap}>
                                    <User size={16} className={styles.inputIcon} />
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="Nama Anda"
                                        value={fullName}
                                        onChange={e => setFullName(e.target.value)}
                                        required={isSignUp}
                                        id="fullname-input"
                                    />
                                </div>
                            </div>
                        )}

                        <div className={styles.field}>
                            <label className={styles.label}>Email</label>
                            <div className={styles.inputWrap}>
                                <Mail size={16} className={styles.inputIcon} />
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="email@sekolah.sch.id"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    id="email-input"
                                />
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label}>Password</label>
                            <div className={styles.inputWrap}>
                                <Lock size={16} className={styles.inputIcon} />
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    className={styles.input}
                                    placeholder="Minimal 8 karakter"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    id="password-input"
                                    style={{ paddingRight: '44px' }}
                                />
                                <button
                                    type="button"
                                    className={styles.eyeBtn}
                                    onClick={() => setShowPass(!showPass)}
                                    id="toggle-password"
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={styles.error}
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            className={`btn btn-primary ${styles.submitBtn}`}
                            disabled={loading}
                            id="submit-auth-btn"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className={styles.spinner}
                                />
                            ) : (
                                <>
                                    {isSignUp ? 'Buat Akun & Mulai' : 'Masuk ke Dashboard'}
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Toggle */}
                    <div className={styles.toggle}>
                        <span style={{ color: 'var(--text-secondary)' }}>
                            {isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?'}
                        </span>
                        <button
                            className="btn btn-ghost"
                            onClick={() => setIsSignUp(!isSignUp)}
                            id="toggle-mode-btn"
                            style={{ padding: '4px 8px' }}
                        >
                            {isSignUp ? 'Masuk di sini' : 'Daftar gratis'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}


