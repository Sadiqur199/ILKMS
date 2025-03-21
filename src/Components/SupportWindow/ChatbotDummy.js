import React, {useState} from 'react';
import {useEffect} from 'react';


/*const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const mic = new speechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = "bn-BD"*/

function ChatbotDummy() {
    const [isListening, setIsListening] = useState(false)
    const [note, setNote] = useState(null)
    const [savedNotes, setSavedNotes] = useState([])


    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

        const mic = new speechRecognition()

        mic.continuous = true
        mic.interimResults = true
        mic.lang = "bn-BD"
        const handleListen = () => {
            if (!isListening) {
                mic.start()
                mic.onend = () => {
                    console.log('continue')
                    mic.start()
                }
            } else {
                mic.stop()
                mic.onend = () => {
                    console.log('stopped mic onclick')
                }
            }
            mic.onstart = () => {
                console.log('mics on')
            }

            mic.onresult = event => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('')
                setNote(transcript)
                console.log(transcript)
                mic.onerror = event => {
                    console.log(event.error)
                }
            }
        }


    }
    useEffect(() => {
        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

            const mic = new speechRecognition()

            mic.continuous = true
            mic.interimResults = true
            mic.lang = "bn-BD"
            if (!isListening) {
                mic.start()
                mic.onend = () => {
                    console.log('continue')
                    mic.start()
                }
            } else {
                mic.stop()
                mic.onend = () => {
                    console.log('stopped mic onclick')
                }
            }
            mic.onstart = () => {
                console.log('mics on')
            }

            mic.onresult = event => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('')
                setNote(transcript)
                console.log(transcript)
                mic.onerror = event => {
                    console.log(event.error)
                }
            }


        }

    }, [isListening])


    const handleSaveNote = () => {
        setSavedNotes([...savedNotes, note])
        setNote('')
    }
    return (
        <div style={{
            marginLeft: "400px",
            marginTop: '100px'
        }}>
            <div>
                <h2>current notes</h2>
                {isListening ? <span>mic</span> : <span>stop</span>}
                <button onClick={handleSaveNote} disabled={!note}>Save note</button>
                <button onClick={() => setIsListening(prevState => !prevState)}>start/stop</button>
                <p>{note}</p>
            </div>
            <div>
                <h2>saved notes</h2>
                {savedNotes.map(n => (
                    <p key={n}>{n}</p>
                ))}
            </div>
        </div>
    );
}

export default ChatbotDummy;
