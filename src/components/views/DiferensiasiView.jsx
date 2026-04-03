import { motion } from 'framer-motion'
import styles from './DiferensiasiView.module.css'

export default function DiferensiasiView({ data }) {
    if (!data || !data.competitors || !data.features) return (
        <div className={styles.empty}>Belum ada data diferensiasi</div>
    )

    return (
        <div className={styles.container}>
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.title}
            >
                📊 Tabel Diferensiasi & Proposisi Nilai
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={styles.subtitle}
            >
                Perbandingan fitur utama sekolah Anda vs model sekolah lain di pasaran.
            </motion.p>

            <motion.div
                className={styles.tableWrapper}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
            >
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.thFeature}>Fitur / Nilai Jual</th>
                            {data.competitors.map((comp, idx) => (
                                <th key={idx} className={styles.thCompetitor}>{comp}</th>
                            ))}
                            <th className={styles.thOurs}>Sekolah Kita</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.features.map((feat, rowIdx) => (
                            <tr key={rowIdx} className={styles.tr}>
                                <td className={styles.tdFeature}>{feat.name}</td>
                                {feat.competitor_values.map((val, colIdx) => (
                                    <td key={colIdx} className={styles.tdValue}>
                                        {val ? <span className={styles.check}>✓</span> : <span className={styles.cross}>✗</span>}
                                    </td>
                                ))}
                                <td className={`${styles.tdValue} ${styles.tdOurs}`}>
                                    {feat.our_value ? <span className={styles.checkOurs}>✓</span> : <span className={styles.cross}>✗</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    )
}


