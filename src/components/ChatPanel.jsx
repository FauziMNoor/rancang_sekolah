import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, Loader2 } from 'lucide-react'
import styles from './ChatPanel.module.css'

function MdText({ text }) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return (
        <span>
            {parts.map((part, i) =>
                part.startsWith('**') && part.endsWith('**')
                    ? <strong key={i}>{part.slice(2, -2)}</strong>
                    : part
            )}
        </span>
    )
}

function renderMessage(content) {
    return content.split('\n').map((line, i) => {
        if (!line.trim()) return <br key={i} />
        if (line.startsWith('- ') || line.startsWith('• ')) {
            return <li key={i} style={{ marginLeft: 16, marginBottom: 2 }}><MdText text={line.slice(2)} /></li>
        }
        return <p key={i} style={{ marginBottom: 4 }}><MdText text={line} /></p>
    })
}

export default function ChatPanel({ messages, onSend, isGenerating, loadingMessage, blueprintReady, inputValue, onInputChange }) {
    const bottomRef = useRef(null)
    const textareaRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isGenerating])

    useEffect(() => {
        if (inputValue) {
            textareaRef.current?.focus()
        }
    }, [inputValue])

    const handleSend = () => {
        const text = inputValue.trim()
        if (!text || isGenerating) return
        onInputChange('') // Clear input via parent
        onSend(text)
        textareaRef.current?.focus()
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <div className={styles.botAvatar}>
                    <Bot size={18} />
                </div>
                <div>
                    <div className={styles.botName}>Asisten Kurikulum AI</div>
                    <div className={styles.botStatus}>
                        {isGenerating ? (
                            <span className={styles.generating}>
                                <motion.span
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    {'●'}
                                </motion.span>
                                {loadingMessage ? loadingMessage.text : 'Sedang memproses...'}
                            </span>
                        ) : (
                            <span className={styles.online}>{'● Online'}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.messages} id="chat-messages">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className={`${styles.messageRow} ${msg.role === 'user' ? styles.userRow : styles.assistantRow}`}
                        >
                            {msg.role === 'assistant' && (
                                <div className={styles.msgAvatar}>
                                    <Bot size={14} />
                                </div>
                            )}
                            <div className={`${styles.bubble} ${msg.role === 'user' ? styles.userBubble : styles.aiBubble}`}>
                                <div className={styles.bubbleContent}>
                                    {renderMessage(msg.content)}
                                </div>
                            </div>
                            {msg.role === 'user' && (
                                <div className={styles.userAvatarSmall}>
                                    <User size={14} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isGenerating && !loadingMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${styles.messageRow} ${styles.assistantRow}`}
                    >
                        <div className={styles.msgAvatar}><Bot size={14} /></div>
                        <div className={`${styles.bubble} ${styles.aiBubble}`}>
                            <div className={styles.typingDots}>
                                {[0, 1, 2].map(i => (
                                    <motion.span
                                        key={i}
                                        className={styles.typingDot}
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {loadingMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${styles.messageRow} ${styles.assistantRow}`}
                    >
                        <div className={styles.msgAvatar}><Bot size={14} /></div>
                        <div className={`${styles.bubble} ${styles.aiBubble} ${styles.loadingBubble}`}>
                            <motion.span
                                style={{ fontSize: '20px' }}
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            >
                                {loadingMessage.icon}
                            </motion.span>
                            <span className={styles.loadingText}>{loadingMessage.text}</span>
                            <motion.div
                                className={styles.loadingBar}
                                initial={{ width: '0%' }}
                                animate={{ width: '90%' }}
                                transition={{ duration: 5, ease: 'easeInOut' }}
                            />
                        </div>
                    </motion.div>
                )}

                <div ref={bottomRef} />
            </div>

            <div className={styles.inputArea}>
                {blueprintReady && (
                    <div className={styles.inputHint}>
                        Blueprint selesai! Anda masih bisa bertanya atau meminta revisi.
                    </div>
                )}
                <div className={styles.inputRow}>
                    <textarea
                        ref={textareaRef}
                        className={styles.textarea}
                        value={inputValue}
                        onChange={e => onInputChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={isGenerating ? 'Mohon tunggu...' : 'Ketik pesan Anda... (Enter untuk kirim)'}
                        disabled={isGenerating}
                        rows={2}
                        id="chat-input"
                    />
                    <button
                        className={styles.sendBtn}
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isGenerating}
                        id="send-message-btn"
                    >
                        {isGenerating
                            ? <Loader2 size={18} className={styles.spinIcon} />
                            : <Send size={18} />
                        }
                    </button>
                </div>
                <p className={styles.inputMeta}>Enter untuk kirim · Shift+Enter untuk baris baru</p>
            </div>
        </div>
    )
}


