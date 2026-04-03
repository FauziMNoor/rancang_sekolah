import { useState, useEffect } from 'react'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { INITIAL_AI_MESSAGE, AI_QUESTIONS, LOADING_MESSAGES, MOCK_TIMELINE, MOCK_CORESKILLS } from '../data/demoData'
import { useSettings } from '../context/SettingsContext'
import html2pdf from 'html2pdf.js'
import ChatPanel from '../components/ChatPanel'
import PreviewPanel from '../components/PreviewPanel'
import { ArrowLeft, Download, Share2, Settings, Loader2 } from 'lucide-react'
import styles from './BuilderPage.module.css'

export default function BuilderPage() {
    const { id } = useParams()
    const { user } = useAuth()
    const { settings, toggleSettings } = useSettings()
    const navigate = useNavigate()

    const [blueprint, setBlueprint] = useState(null)
    const [messages, setMessages] = useState([])
    const [isGenerating, setIsGenerating] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState(null)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [blueprintReady, setBlueprintReady] = useState(false)
    const [isFetchingInfo, setIsFetchingInfo] = useState(true)
    const [chatInput, setChatInput] = useState('')
    const [isDownloading, setIsDownloading] = useState(false)

    // Load Session Chat & Blueprint dari Supabase
    useEffect(() => {
        const fetchBlueprintData = async () => {
            setIsFetchingInfo(true)

            // 1. Ambil Data Blueprint
            const { data: bpData, error: bpError } = await supabase
                .from('blueprints')
                .select('*')
                .eq('id', id)
                .single()

            if (bpData) {
                setBlueprint(bpData)
                if (bpData.status === 'completed') {
                    setBlueprintReady(true)
                }

                // 2. Ambil Riwayat Percakapan
                const { data: chatData } = await supabase
                    .from('chat_sessions')
                    .select('*')
                    .eq('blueprint_id', id)
                    .order('created_at', { ascending: true })

                if (chatData && chatData.length > 0) {
                    setMessages(chatData)
                    // Atur index pertanyaan AI berdasarkan jumlah pertanyaan yang sudah AI lemparkan
                    const aiQuestionsCount = chatData.filter(m => m.role === 'assistant').length - 1
                    setQuestionIndex(aiQuestionsCount)
                } else {
                    // Jika belum ada riwayat chat, inisiasi pesan pertama AI
                    const initialMsg = { blueprint_id: id, role: 'assistant', content: INITIAL_AI_MESSAGE }

                    // Kita tak usah await ini agar instant di layar
                    supabase.from('chat_sessions').insert([initialMsg]).then()

                    setMessages([{ ...initialMsg, id: Date.now().toString() }])
                }
            } else {
                // Return ke my dashboard kalau BP tak ditemukan
                navigate('/dashboard')
            }
            setIsFetchingInfo(false)
        }

        if (id && id !== 'new') {
            fetchBlueprintData()
        } else {
            setIsFetchingInfo(false)
            navigate('/dashboard')
        }
    }, [id, navigate])

    // Fungsi menyimpan tiap baris obrolan
    const saveMessageToDB = async (role, content) => {
        const newMsg = { blueprint_id: id, role, content }
        const tempId = Date.now().toString()

        // Optimistic UI update
        setMessages(prev => [...prev, { ...newMsg, id: tempId }])

        const { data, error } = await supabase
            .from('chat_sessions')
            .insert([newMsg])
            .select()
            .single()

        if (data) {
            setMessages(prev => prev.map(m => m.id === tempId ? data : m))
        }
    }

    const handleSendMessage = async (text) => {
        setIsGenerating(true)
        await saveMessageToDB('user', text)

        const currentMessages = [...messages, { role: 'user', content: text }]

        // 1. Prompt Sistem untuk membimbing karakter AI (Mode Wawancara vs Mode Revisi)
        let systemPromptContent = ''
        if (blueprintReady) {
            systemPromptContent = `Anda adalah Asisten Pakar Perancang Kurikulum Pendidikan. Pengguna sudah memiliki Blueprint dan meminta revisi. 
Pahami instruksi revisinya dan jawab dengan ramah bahwa Anda akan segera memperbarui dokumen blueprint sesuai arahannya. 
Pastikan Anda HANYA membalas dengan ringkas, dan WAJIB akhiri kalimat Anda DENGAN PERSIS BARIS TEKS: [GENERATE_NOW]`
        } else {
            systemPromptContent = `Anda adalah Asisten Pakar Perancang Kurikulum Pendidikan. Tujuan Anda mengumpulkan informasi fondasi tentang sekolah atau kurikulum.

PENTING: PERHATIKAN 3 SKENARIO INI:
1. Jika pengguna jelas-jelas menempel/copy-paste isi dokumen, proposal, atau rincian silabus yang panjang (Reverse Engineering Blueprint), puji kelengkapan dokumennya, beri tahu bahwa Anda siap mengolahnya saat ini juga. JANGAN mengajukan pertanyaan apapun. Segera akhiri balasan Anda DENGAN PERSIS BARIS TEKS: [GENERATE_NOW]

2. Jika pengguna ingin menjawab pertanyaan secara interaktif, ajukan HANYA 1 pertanyaan fondasi yang tajam setiap balasan (tentang durasi pendidikan, target siswa, dll). Biarkan interaktif. Tunggu dia menjawab.

3. Jika mode interaktif ini dirasa sudah mengumpulkan 3 atau 4 jawaban yang kuat, berhentilah bertanya, balas dan akhiri kalimat Anda SELESAI DENGAN PERSIS BARIS TEKS: [GENERATE_NOW]`
        }

        const systemPrompt = {
            role: 'system',
            content: systemPromptContent
        }

        const apiMessages = [
            systemPrompt,
            ...currentMessages.map(m => ({ role: m.role, content: m.content }))
        ]

        try {
            // 2. Tembak permintaan ke API Model Pilihan (OpenAI/SumoPod)
            const res = await fetch(`${settings.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${settings.apiKey}`
                },
                body: JSON.stringify({
                    model: settings.aiModel,
                    messages: apiMessages,
                    temperature: 0.7
                })
            })

            if (!res.ok) throw new Error("API Error")

            const data = await res.json()
            const aiText = data.choices[0].message.content

            // 3. Deteksi instruksi rahasia apakah AI sudah siap membuat blueprint
            if (aiText.includes('[GENERATE_NOW]')) {
                const cleanText = aiText.replace('[GENERATE_NOW]', '').trim()
                if (cleanText) await saveMessageToDB('assistant', cleanText)

                // Memicu penciptaan Blueprint Visual!
                await startRealAIGeneration(currentMessages)
            } else {
                await saveMessageToDB('assistant', aiText)
            }
        } catch (e) {
            console.error(e)
            await saveMessageToDB('assistant', "Mohon maaf, koneksi ke Provider API saya terputus. Mohon pastikan Kredensial API AI di menu pengaturan sudah valid dan masih aktif.")
        } finally {
            setIsGenerating(false)
        }
    }

    const startRealAIGeneration = async (chatContext) => {
        setIsGenerating(true)

        // Memutar visual animasi pemuatan artifisial
        for (let i = 0; i < LOADING_MESSAGES.length; i++) {
            setLoadingMessage(LOADING_MESSAGES[i])
            await new Promise(r => setTimeout(r, 600))
        }

        setLoadingMessage({ text: 'Mengonversi ke Skema Visual...', icon: '🧠' })

        const isRevision = blueprintReady

        // Prompt Sistem Khusus Mengekstrak Data Obrolan menjadi Objek JSON
        const extractionPrompt = {
            role: 'system',
            content: `Berdasarkan seluruh percakapan pengguna, buatlah ATAU perbarui cetak biru (blueprint) kurikulum sekolah dalam format JSON SAJA. Jangan tambahkan teks di luar JSON. Pastikan menggunakan properti yang valid dan string harus di-escape dengan benar.

INFORMASI PENTING (DATA EKSISTING SEKARANG):
${blueprintReady ? JSON.stringify(blueprint) : 'Belum ada blueprint (Buat baru dari awal)'}

TUGAS ANDA:
Jika pengguna meminta revisi/mengubah teks tertentu dari data eksisting di atas, maka modifikasilah HANYA pada bagian yang diperintahkan pengguna, sedangkan sisa datanya tetap JANGAN DIHILANGKAN (pertahankan dari DATA EKSISTING).

Struktur JSON yang WAJIB Anda patuhi persis seperti ini:
{
  "title": "Nama Sekolah",
  "data_mindmap": { "school_name": "Nama Sekolah", "pillars": [ { "title": "Pilar 1", "desc": "Deskripsi", "icon": "🕌", "color": "#c9a84c" } ] },
  "data_timeline": [ { "year": 1, "phase": "Nama Fase", "label": "Kelas Brapa", "semesters": ["Kegiatan 1"], "output_tags": ["Output Target"], "color": "#4f8ef7" } ],
  "data_coreskills": [ { "id": 1, "label": "Skill Utama", "sub": "Skill Turunan 1, Turunan 2", "icon": "🧠" } ],
  "data_visimisi": { "visi": "Teks Visi", "misi": ["Misi 1"], "tujuan": ["Tujuan 1"] },
  "data_roadmap": { "phases": [ { "name": "Fase 1", "year": "2026", "focus": "Fokus Strategis", "target": "Target Terukur" } ] },
  "data_profil_alumni": { "profiles": [ { "title": "Berakhlak", "description": "Deskripsi Profil", "icon": "🎓" } ] },
  "data_diferensiasi": { "competitors": ["Sekolah Umum", "Pesantren Biasa"], "features": [ { "name": "Fitur Unggulan", "competitor_values": [false, true], "our_value": true } ] },
  "data_kurikulum": [ { "category": "Diniyah & Karakter", "percentage": 40, "color": "#c9a84c", "subjects": ["Aqidah", "Fikih", "Akhlak"] } ]
}`
        }

        const apiMessages = [
            extractionPrompt,
            ...chatContext.map(m => ({ role: m.role, content: m.content }))
        ]

        try {
            const res = await fetch(`${settings.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${settings.apiKey}`
                },
                body: JSON.stringify({
                    model: settings.aiModel,
                    messages: apiMessages,
                    response_format: { type: "json_object" }, // Memaksa agar respons dipastikan JSON
                    temperature: 0.3 // Logika lebih konsisten
                })
            })

            if (!res.ok) throw new Error("Extraction API Error")

            const data = await res.json()
            const aiJsonStr = data.choices[0].message.content
            const generatedBlueprint = JSON.parse(aiJsonStr)

            // Simpan Data Blueprint Ke Database Supabase Asli Kita
            const { data: updatedDb, error } = await supabase
                .from('blueprints')
                .update({
                    title: generatedBlueprint.title,
                    status: 'completed',
                    data_mindmap: generatedBlueprint.data_mindmap,
                    data_timeline: generatedBlueprint.data_timeline,
                    data_coreskills: generatedBlueprint.data_coreskills,
                    data_visimisi: generatedBlueprint.data_visimisi,
                    data_roadmap: generatedBlueprint.data_roadmap,
                    data_profil_alumni: generatedBlueprint.data_profil_alumni,
                    data_diferensiasi: generatedBlueprint.data_diferensiasi,
                    data_kurikulum: generatedBlueprint.data_kurikulum
                })
                .eq('id', id)
                .select()
                .single()

            if (updatedDb) {
                setBlueprint(updatedDb)
                setBlueprintReady(true)

                if (isRevision) {
                    await saveMessageToDB('assistant', `✨ **Pembaruan Berhasil Diterapkan!**\n\nPanel di sisi kanan sekarang sudah menampilkan versi terbaru dokumen Anda sesuai request tersebut. \n\nAda bagian lain yang ingin diubah?`)
                } else {
                    await saveMessageToDB('assistant', `✨ **Blueprint Sekolah Anda sudah siap!**\n\nSaya telah mengekstrasi obrolan Anda menjadi **8 artefak visual yang komprehensif**.\n\nSilakan jelajahi mahakaryanya di panel kanan! Jika ada yang kurang pas, Anda langsung blok teksnya dan minta saya merevisinya. →`)
                }
            }

        } catch (e) {
            console.error("JSON Parse Error atau API gagal: ", e)
            await saveMessageToDB('assistant', `Maaf, saya gagal merangkai output desain Blueprint. Coba lagi dalam beberapa saat.`)
        } finally {
            setLoadingMessage(null)
            setIsGenerating(false)
        }
    }

    const handleAIHighlight = (selectedText, customInstruction) => {
        const fullMessage = `> "${selectedText}"\n\nRevisi bagian di atas ini mengikuti perintah ini: ${customInstruction}\nPastikan sisa data yang lain tetap utuh.`
        handleSendMessage(fullMessage)
    }

    const handleDownloadPdf = () => {
        setIsDownloading(true)
        const element = document.getElementById('pdf-export-content')
        if (!element) {
            setIsDownloading(false)
            return
        }

        const opt = {
            margin: 10,
            filename: `${blueprint?.title || 'blueprint'}-sekolah.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, backgroundColor: '#040914' },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
        }

        html2pdf().from(element).set(opt).save().then(() => setIsDownloading(false)).catch(() => setIsDownloading(false))
    }

    if (isFetchingInfo) {
        return <div className={styles.page} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Memuat Asisten...</p></div>
    }

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link to="/dashboard" className="btn btn-ghost" style={{ padding: '8px 12px' }} id="back-to-dashboard">
                        <ArrowLeft size={16} />
                        Dashboard
                    </Link>
                    <div className={styles.headerSep} />
                    <div className={styles.headerTitle}>
                        <span className={styles.headerDot} />
                        <span>{blueprint?.title || 'Blueprint Baru'}</span>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <button className="btn btn-ghost" onClick={toggleSettings} title="Pengaturan AI">
                        <Settings size={15} /> Kredensial AI
                    </button>
                    {blueprintReady && (
                        <>
                            <button className="btn btn-secondary" id="share-btn">
                                <Share2 size={15} /> Bagikan
                            </button>
                            <button
                                className="btn btn-primary"
                                id="download-btn"
                                onClick={handleDownloadPdf}
                                disabled={isDownloading}
                            >
                                {isDownloading ? <Loader2 size={15} className="spin" /> : <Download size={15} />}
                                {isDownloading ? ' Mengunduh...' : ' Unduh PDF'}
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* Split Screen */}
            <div className={styles.splitScreen}>
                {/* LEFT: Chat Panel */}
                <div className={styles.chatSide}>
                    <ChatPanel
                        messages={messages}
                        onSend={handleSendMessage}
                        isGenerating={isGenerating}
                        loadingMessage={loadingMessage}
                        blueprintReady={blueprintReady}
                        inputValue={chatInput}
                        onInputChange={setChatInput}
                    />
                </div>

                {/* DIVIDER */}
                <div className={styles.divider} />

                {/* RIGHT: Preview Panel */}
                <div className={styles.previewSide}>
                    <PreviewPanel
                        blueprint={blueprint}
                        isGenerating={isGenerating}
                        loadingMessage={loadingMessage}
                        blueprintReady={blueprintReady}
                        onAIHighlight={handleAIHighlight}
                    />
                </div>
            </div>
        </div>
    )
}



