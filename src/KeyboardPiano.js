import React, { useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function KeyboardPiano() {
  const navigate = useNavigate();
  const keys = [
    'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
    'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
    'C5', 'D5'
  ];

  //Direct accessing of files from public folder isn't working, so referenced it using 'PUBLIC_URL'

  const audioFiles = useMemo(() => ({
    'C3': `${process.env.PUBLIC_URL}/audio/C3.wav`,
    'C#3': `${process.env.PUBLIC_URL}/audio/Cs3.wav`,
    'D3': `${process.env.PUBLIC_URL}/audio/D3.wav`,
    'D#3': `${process.env.PUBLIC_URL}/audio/Ds3.wav`,
    'E3': `${process.env.PUBLIC_URL}/audio/E3.wav`,
    'F3': `${process.env.PUBLIC_URL}/audio/F3.wav`,
    'F#3': `${process.env.PUBLIC_URL}/audio/Fs3.wav`,
    'G3': `${process.env.PUBLIC_URL}/audio/G3.wav`,
    'G#3': `${process.env.PUBLIC_URL}/audio/Gs3.wav`,
    'A3': `${process.env.PUBLIC_URL}/audio/A3.wav`,
    'A#3': `${process.env.PUBLIC_URL}/audio/As3.wav`,
    'B3': `${process.env.PUBLIC_URL}/audio/B3.wav`,
    'C4': `${process.env.PUBLIC_URL}/audio/C4.wav`,
    'C#4': `${process.env.PUBLIC_URL}/audio/Cs4.wav`,
    'D4': `${process.env.PUBLIC_URL}/audio/D4.wav`,
    'D#4': `${process.env.PUBLIC_URL}/audio/Ds4.wav`,
    'E4': `${process.env.PUBLIC_URL}/audio/E4.wav`,
    'F4': `${process.env.PUBLIC_URL}/audio/F4.wav`,
    'F#4': `${process.env.PUBLIC_URL}/audio/Fs4.wav`,
    'G4': `${process.env.PUBLIC_URL}/audio/G4.wav`,
    'G#4': `${process.env.PUBLIC_URL}/audio/Gs4.wav`,
    'A4': `${process.env.PUBLIC_URL}/audio/A4.wav`,
    'A#4': `${process.env.PUBLIC_URL}/audio/As4.wav`,
    'B4': `${process.env.PUBLIC_URL}/audio/B4.wav`,
    'C5': `${process.env.PUBLIC_URL}/audio/C5.wav`,
    'D5': `${process.env.PUBLIC_URL}/audio/D5.wav`,
  }), []);

  const keyboardMapping = useMemo(() => ({
    'a': 'C3', 'b': 'C#3', 'c': 'D3', 'd': 'D#3', 'e': 'E3', 'f': 'F3',
    'g': 'F#3', 'h': 'G3', 'i': 'G#3', 'j': 'A3', 'k': 'A#3', 'l': 'B3',
    'm': 'C4', 'n': 'C#4', 'o': 'D4', 'p': 'D#4', 'q': 'E4', 'r': 'F4',
    's': 'F#4', 't': 'G4', 'u': 'G#4', 'v': 'A4', 'w': 'A#4', 'x': 'B4',
    'y': 'C5', 'z': 'D5'
  }), []);

  const playNote = useCallback((note) => {
    try {
      console.log(`Playing note: ${note}`); // Debug which note is playing
      const audio = new Audio(audioFiles[note]);
      audio.play();
      
      const keyElement = document.querySelector(`[data-note="${note}"]`);
      if (keyElement) {
        keyElement.classList.add('active');
        setTimeout(() => {
          keyElement.classList.remove('active');
        }, 300);
      }
    } catch (error) {
      console.error(`Error playing note ${note}:`, error);
    }
  }, [audioFiles]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (keyboardMapping[key]) {
        playNote(keyboardMapping[key]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyboardMapping, playNote]);

  // For mini-screens just rotate the device for good UI/UX
  useEffect(() => {
    const rotateMessage = document.createElement('div');
    rotateMessage.className = 'rotate-device-message';
    
    rotateMessage.innerHTML = `
      <div class="rotate-content">
        <h2>Please Rotate Your Device</h2>
        <div class="rotate-icon">📱</div>
        <p class="rotate-message">For the best piano experience, please use landscape orientation.</p>
        <p>Rotate your device to see the full piano keyboard.</p>
      </div>
    `;
    
    const pianoContainer = document.querySelector('.piano-container');
    pianoContainer.appendChild(rotateMessage);
    
    return () => {
      rotateMessage.remove();
    };
  }, []);

  return (
    <div className="piano-container">
      <header className="piano-header">
        <h1>Virtual Piano</h1>
      </header>
      <p className="keyboard-instructions">
        (Click on the keys or Use your computer keyboard [A-Z] to play notes)
      </p>
      <div className="piano">
        {keys.map((key, index) => {
          const keyboardKey = Object.keys(keyboardMapping).find(
            k => keyboardMapping[k] === key
          )?.toUpperCase();
          
          return (
            <div
              key={key}
              data-note={key}
              className={`piano-key ${key.includes('#') ? 'black-key' : 'white-key'}`}
              onClick={() => playNote(key)}
            >
              {!key.includes('#') && (
                <span className="note-label">
                  <span className="note-name">{key}</span>
                  {keyboardKey && <span className="keyboard-key">({keyboardKey})</span>}
                </span>
              )}
              {key.includes('#') && keyboardKey && (
                <span className="keyboard-key">({keyboardKey})</span>
              )}
            </div>
          );
        })}
      </div>
      <button className="navigate-to-home" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}

export default KeyboardPiano;