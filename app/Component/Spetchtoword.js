"use client"; // Mark this as a Client Component

import { useState, useEffect } from "react";
import { data } from "../data/data"; // Assuming your data is stored in this path
import Link from "next/link";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState("");
  const [recognition, setRecognition] = useState(null);
  const [voice, setVoice] = useState("female"); // Default voice is female

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
        console.error("Speech recognition not supported in this browser.");
        return;
      }

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US"; // You can change the language if needed

      recognitionInstance.onresult = (event) => {
        const transcriptResult = event.results[0][0].transcript;
        setTranscript(transcriptResult);
        getAnswer(transcriptResult);
      };

      recognitionInstance.onerror = (event) => {
        const errorMessage = event.error || event.message || "An unknown error occurred";
        console.error("Speech recognition error:", errorMessage);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const getAnswer = (transcript) => {
    const normalizedInput = transcript.trim().toLowerCase();

    for (let item of data) {
      const normalizedQuestion = item.question.toLowerCase();
      if (normalizedQuestion.includes(normalizedInput)) {
        setAnswer(item.answer);
        speakText(item.answer);
        return;
      }
    }

    const noAnswer = "Sorry, I couldn't find an answer to that.";
    setAnswer(noAnswer);
    speakText(noAnswer);
  };

  const speakText = (text) => {
    if (text !== "") {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US"; // Language for speech (adjust if necessary)
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = voice === "female" ? 1.5 : 0.9; // Adjust pitch for female or male voice
      window.speechSynthesis.speak(speech);
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      console.error("Speech recognition not initialized.");
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const switchVoice = (type) => {
    setVoice(type);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Speech to Text & Search</h1>
      
      {/* Voice Type Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => switchVoice("female")}
          className="px-8 py-3 text-white bg-pink-500 font-semibold rounded-full shadow-lg"
        >
          Girls Assistant
        </button>
        <button
          onClick={() => switchVoice("male")}
          className="px-8 py-3 text-white bg-blue-500 font-semibold rounded-full shadow-lg"
        >
          Boys Assistant
        </button>
        <button
          onClick={() => switchVoice("male")}
          className="px-8 py-3 text-white bg-blue-500 font-semibold rounded-full shadow-lg"
        >
         <Link href="/news">News</Link>  
        </button>
      </div>

      {/* Microphone Button */}
      <button
        onClick={toggleListening}
        className={`px-8 py-3 text-white font-semibold rounded-full shadow-lg transition-all transform ${
          isListening ? "bg-red-600 scale-105" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {isListening ? "Stop Listening" : "Start Speaking"}
      </button>

      {/* Displaying the Transcript */}
      <div className="mt-6 p-6 bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <p className="text-gray-700 text-lg">
          <strong className="text-gray-900">You said:</strong> {transcript || "Your speech will appear here..."}
        </p>
      </div>

      {/* Displaying the Answer */}
      {answer && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
          <p className="text-gray-700 text-lg">
            <strong className="text-gray-900">Answer:</strong> {answer}
          </p>
        </div>
      )}
    </div>
  );
};

export default SpeechToText;
