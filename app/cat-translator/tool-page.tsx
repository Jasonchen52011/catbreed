// app/cat-translator/tool-page.tsx
'use client'; // Client component declaration

import { useState, useRef, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Define emotion types and sound mapping
type Emotion = 'happy' | 'sad' | 'angry' | 'normal';


// Sound file mapping table
// You need to ensure these sound files exist in the /public/voice/ directory
// Each emotion can have 1-3 sound files, one will be randomly selected during playback
// Primary audio file list (prioritize files with good compatibility)
const soundMap: Record<Emotion, string[]> = {
  happy: ['/voice/happy.mp3', '/voice/happy1.mp3', '/voice/happy2.mp3', '/voice/happy3.mp3'],
  sad: ['/voice/Sad1.mp3', '/voice/Sad2.mp3', '/voice/Sad3.mp3'],
  angry: ['/voice/angry.mp3', '/voice/angry3.mp3'],
  normal: ['/voice/normal.mp3', '/voice/normal2.mp3', '/voice/normal3.mp3', '/voice/normal4.mp3'],
};

// Fallback audio files (used when primary files fail to load)
const fallbackSounds: Record<Emotion, string> = {
  happy: '/voice/happy.mp3',
  sad: '/voice/Sad1.mp3', 
  angry: '/voice/angry.mp3',
  normal: '/voice/normal.mp3',
};

// Helper function: randomly select an element from array (kept but now directly using index in new logic)

export default function CatTranslatorPage() {
  // State variable: user input text
  const [inputText, setInputText] = useState<string>('');
  // State variable: AI analyzed emotion
  const [detectedEmotion, setDetectedEmotion] = useState<Emotion | null>(null);
  // State variable: message shown to user, describing the cat's possible mood
  const [catResponseMessage, setCatResponseMessage] = useState<string>('');
  // State variable: loading status
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State variable: error message
  const [error, setError] = useState<string | null>(null);
  // State variable: audio playing status
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // State variable: audio loading status
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  // State variable: currently selected audio file
  const [selectedAudioFile, setSelectedAudioFile] = useState<string | null>(null);
  // State variable: audio loading error message
  const [audioError, setAudioError] = useState<string | null>(null);
  // Audio reference
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Play timeout reference
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle text translation (emotion classification)
  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please type something for your cat!');
      setCatResponseMessage('');
      setDetectedEmotion(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setCatResponseMessage('');
    setDetectedEmotion(null);
    setIsPlaying(false);
    setIsLoadingAudio(false);
    setSelectedAudioFile(null); // Clear previously selected audio file
    setAudioError(null); // Clear audio error message
    // Clean up previous audio completely to prevent auto-play
    if (audioRef.current) {
      // Remove all event listeners to prevent any auto-play
      audioRef.current.onplay = null;
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.oncanplaythrough = null;
      audioRef.current.onloadeddata = null;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }

    try {
      const response = await fetch('/api/identify/cat-translator-online', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Even if there's an error, we can still play sound if API returned default emotion
        const emotion = data.emotion as Emotion;
        if (emotion && ['happy', 'sad', 'angry', 'normal'].includes(emotion) && soundMap[emotion]) {
          setDetectedEmotion(emotion);
          // Don't pre-select audio file, let user decide when to play
          
          setCatResponseMessage(`"${inputText}" in cat meows...`);
          
          // If it's a quota error, show friendly message
          if (data.isQuotaError) {
            setError('Note: Our AI is resting, but here\'s a meow for you! 🐱');
          }
        } else {
          throw new Error(data.error || 'Something went wrong with the translation.');
        }
      } else {
        const emotion = data.emotion as Emotion; // API should return format like { "emotion": "happy" }

        if (emotion && ['happy', 'sad', 'angry', 'normal'].includes(emotion) && soundMap[emotion]) {
          setDetectedEmotion(emotion);
          // Don't pre-select audio file, let user decide when to play
          
          // Set more friendly user message based on emotion
          let friendlyMessage = `"${inputText}" in cat meows...`;
          setCatResponseMessage(friendlyMessage);
        } else {
          // If API returned unexpected emotion (shouldn't happen in theory, since prompt restricts it)
          console.warn("Received an unexpected emotion from API:", data.emotion);
          setDetectedEmotion('normal'); // Default to normal
          // Don't pre-select audio file, let user decide when to play
          setCatResponseMessage("Hmm, that's an interesting way to put it! Let's say your cat is just being a cat.");
        }
      }

    } catch (err: any) {
      setError(err.message || 'Failed to understand your kitty talk input.');
      setCatResponseMessage('');
      setDetectedEmotion(null);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to clean up audio and timeout
  const cleanupAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
      playTimeoutRef.current = null;
    }
  };

  // Function to handle sound playing - select and play audio file when user clicks
  const handlePlaySound = () => {
    if (!detectedEmotion || isPlaying || isLoadingAudio) {
      return;
    }

    // Select audio file when user clicks play (not during translation)
    if (!selectedAudioFile) {
      const soundFiles = soundMap[detectedEmotion];
      if (soundFiles && soundFiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * soundFiles.length);
        const selectedFile = soundFiles[randomIndex];
        setSelectedAudioFile(selectedFile);
        console.log(`Selected audio file for emotion "${detectedEmotion}":`, selectedFile);
        // Load and play this newly selected file
        loadAndPlayAudio(selectedFile);
        return;
      } else {
        // If soundFiles is invalid, use fallback audio
        const fallbackFile = fallbackSounds[detectedEmotion];
        console.warn(`soundFiles invalid, using fallback audio:`, fallbackFile);
        setSelectedAudioFile(fallbackFile);
        loadAndPlayAudio(fallbackFile);
        return;
      }
    }

    // If audio is already loaded and is the same file, play directly
    if (audioRef.current && audioRef.current.src.endsWith(selectedAudioFile)) {
      console.log('Reusing already loaded audio file:', selectedAudioFile);
      audioRef.current.currentTime = 0; // Reset to beginning
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAudioError(null);
          console.log('Reused audio playback successful:', selectedAudioFile);
        })
        .catch((playError) => {
          console.warn(`Reused audio playback failed: ${selectedAudioFile}`, playError);
          // If reuse fails, reload
          loadAndPlayAudio(selectedAudioFile);
        });
      return;
    }

    // Different file, need to reload
    loadAndPlayAudio(selectedAudioFile);
  };

  // Function to load and play audio
  const loadAndPlayAudio = (audioFile?: string) => {
    const soundToPlay = audioFile || selectedAudioFile;
    if (!soundToPlay) return;
    
    // Clean up previous audio
    cleanupAudio();
    setIsLoadingAudio(true);
    
    console.log('Loading audio file for first time:', soundToPlay);
    
    const audio = new Audio();
    audioRef.current = audio;
    
    // Set audio properties
    audio.preload = 'auto';
    audio.volume = 0.8;
    audio.crossOrigin = 'anonymous';
    
    let hasStartedPlaying = false;
    
    // Play start event
    audio.onplay = () => {
      hasStartedPlaying = true;
      setIsLoadingAudio(false);
      setIsPlaying(true);
      setAudioError(null); // Clear error message when playback succeeds
      console.log('Audio started playing:', soundToPlay);
    };
    
    // Play end event
    audio.onended = () => {
      console.log('Audio playback ended');
      setIsPlaying(false);
      setIsLoadingAudio(false);
      // Don't clean up audio object, keep for reuse
    };
    
    // Error handling
    audio.onerror = (e) => {
      console.error(`Audio loading failed: ${soundToPlay}`, e);
      console.error('Audio error details:', {
        error: e,
        audioSrc: audio.src,
        audioReadyState: audio.readyState,
        audioNetworkState: audio.networkState,
        audioError: audio.error,
        eventDetails: e instanceof Event ? {
          isTrusted: e.isTrusted,
          type: e.type,
          eventPhase: e.eventPhase,
          timeStamp: e.timeStamp
        } : 'Non-event error'
      });
      
      // Check if it's a specific problematic file (non-standard sample rate)
      const problematicFiles = ['/voice/normal2.mp3', '/voice/normal3.mp3'];
      const isProblematicFile = problematicFiles.includes(soundToPlay);
      
      if (isProblematicFile) {
        console.warn(`Detected problematic file ${soundToPlay}, sample rate incompatible, switching to fallback audio`);
        setAudioError(`Audio format incompatible, switched to fallback audio`);
      }
      
      // If current audio loading failed, try using fallback audio
      if (detectedEmotion && soundToPlay !== fallbackSounds[detectedEmotion]) {
        console.log(`Trying fallback audio: ${fallbackSounds[detectedEmotion]}`);
        setSelectedAudioFile(fallbackSounds[detectedEmotion]);
        // Don't retry immediately, let user manually click play button
        setIsLoadingAudio(false);
        setIsPlaying(false);
        cleanupAudio();
        return;
      }
      
      setAudioError(`Audio loading failed, please try again`);
      setIsLoadingAudio(false);
      setIsPlaying(false);
      cleanupAudio();
    };
    
    // When audio can be played
    audio.oncanplaythrough = () => {
      console.log('Audio can be played:', soundToPlay);
      audio.play()
        .then(() => {
          console.log('Audio playback successful:', soundToPlay);
        })
        .catch((playError) => {
          console.warn(`Audio playback failed: ${soundToPlay}`, playError);
          setIsLoadingAudio(false);
          setIsPlaying(false);
          cleanupAudio();
        });
    };
    
    // Set audio source and start loading
    audio.src = soundToPlay;
    audio.load();
    
    // Safety timeout - ensure state doesn't get stuck permanently
    playTimeoutRef.current = setTimeout(() => {
      if (!hasStartedPlaying && audioRef.current === audio) {
        console.warn('Audio loading timeout, resetting state');
        setIsLoadingAudio(false);
        setIsPlaying(false);
        cleanupAudio();
      }
    }, 5000); // 5 second timeout
  };

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, []);

  return (
    <div className="container max-w-5xl mx-auto p-2 mb-10">
      <main className="w-full max-w-5xl items-center bg-white shadow-xl border border-gray-100 rounded-lg p-4 md:p-8">
        <div className="flex flex-col md:flex-row  gap-4 md:gap-8">
          {/* 左边：用户输入区域 */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gary-800 mb-3">
                Your Words
                <i className="text-primary-yellow fas fa-user ms-2"></i>
            </h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type what you want to say to your cat..." // 在这里输入你想对猫咪说的话...
              className="w-full h-48 md:h-64 p-3 border border-primary-light rounded-md focus:ring-2 focus:ring-primary-light focus:border-transparent resize-none text-gray-700"
              aria-label="Your words to translate"
            />
          </div>

          {/* 右边：狗狗语言结果框 */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gary-800 mb-3">
                Kitty&apos;s Vibe
                <i className="text-primary-yellow fas fa-cat ms-2"></i>
            </h2>
            <div
              className="w-full h-48 md:h-64 p-3 border border-gray-300 rounded-md bg-white-50 flex flex-col items-center justify-center text-center text-gray-700 overflow-y-auto"
              aria-live="polite"
            >
              {isLoading ? (
                <p>Tuning into cat frequencies...</p> // 正在调整到猫咪的频率...
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : catResponseMessage ? (
                <>
                  <p className="text-lg">{catResponseMessage}</p>
                </>
              ) : (
                <p className="text-gray-500">Your cat&apos;s reaction will appear here!</p> // 猫咪的反应会显示在这里！
              )}

                {detectedEmotion && !isLoading && !error && (
            <div className="mt-6 text-center">
              <button
                onClick={handlePlaySound}
                disabled={isPlaying || isLoadingAudio}
                className="px-6 py-2 bg-gray-800 hover:bg-primary-light text-white font-semibold rounded-lg shadow-md transition-colors disabled:opacity-50"
                aria-label="Play generated cat sound"
              >
                {isLoadingAudio ? 'Loading... 🎵' : isPlaying ? 'Playing... 🔊' : 'Hear the Meow! 🔊'}
              </button>
              {(isLoadingAudio || audioError) && (
                <div className="mt-2 text-sm text-gray-600">
                  {isLoadingAudio ? 'Preparing your cat sound...' : 
                   audioError ? <span className="text-orange-600">{audioError}</span> : ''}
                </div>
              )}
            </div>
          )}
          
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleTranslate}
            disabled={isLoading}
            className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'See Kitty Vibe!'}
            <i className={`${isLoading ? 'fas fa-spinner animate-spin' : 'fas fa-paw'} ms-2`}></i>
          </button>
        </div>
      </main>

    </div>
  );
}