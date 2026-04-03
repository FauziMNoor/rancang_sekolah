import { motion } from 'framer-motion'
import styles from './ProfilAlumniView.module.css'

export default function ProfilAlumniView({ data }) {
    if (!data || !data.profiles) return (
        <div className={styles.empty}>Belum ada data profil alumni</div>
    )

    return (
        <div className={styles.container}>
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.title}
            >
                🎓 Profil Kelulusan Ideal
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={styles.subtitle}
            >
                Karakteristik komprehensif yang akan dimiliki oleh setiap santri/siswa saat lulus.
            </motion.p>

            <div className={styles.grid}>
                {data.profiles.map((profile, i) => (
                    <motion.div
                        key={i}
                        className={styles.card}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.2 }}
                    >
                        <div className={styles.cardHeader}>
                            <span className={styles.icon}>{profile.icon || '👨‍🎓'}</span>
                            <h3 className={styles.cardTitle}>{profile.title}</h3>
                        </div>
                        <p className={styles.cardDesc}>{profile.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}


