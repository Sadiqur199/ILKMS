import React, { useState, useRef, useEffect } from 'react';

const SpeechToText = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.lang = 'bn-BD'; // Set the language to Bangla

  const handleStart = () => {
    setIsListening(true);
    recognition.start();
  };

  const handleEnd = () => {
    setIsListening(false);
    recognition.stop();
  };

  const handleInputTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputText.trim()) {
      const newChat = { text: inputText, isUser: true };
      setChatHistory([...chatHistory, newChat]);
      setInputText('');
    }
  };

  const chatWindowRef = useRef(null);

  const scrollToBottom = () => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  };

  useEffect(() => {
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
    };

    recognition.onend = () => {
      if (isListening) {
        recognition.start();
      }
    };
  }, [isListening]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

//   recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     setInputText(transcript);
//   };

//   recognition.onend = () => {
//     setIsListening(false);
//   };

  return (
    <div style={{
        marginLeft: "400px",
        marginTop: '100px'
    }}>
      <div ref={chatWindowRef} style={{ height: '300px', overflowY: 'scroll' }}>
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ textAlign: chat.isUser ? 'right' : 'left' }}>
            <p>{chat.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={inputText} onChange={handleInputTextChange} />
        <button type="submit">Send</button>
      </form>
      <div>
        <button onClick={handleStart} disabled={isListening}>
          Start
        </button>
        <button onClick={handleEnd} disabled={!isListening}>
          End
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
