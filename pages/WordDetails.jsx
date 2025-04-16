import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SpeakerWaveIcon, ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useTheme } from "../hooks/useTheme";

const WordDetails = () => {
  const [isDark, setisDark] = useTheme();
  const params = useParams();
  const word = params.word;
  const [wordData, setWordData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [definitions, setDefinitions] = useState([]);
  const [examples, setExamples] = useState([]);

  useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((res) => res.json())
      .then(([data]) => {
        // FETCHING DATA FOR DEFINITIONS
        data.meanings.map((meaning) => {
          meaning.definitions.map((definition) => {
            if (definition.definition) {
              definitions.push(definition.definition);
            }
          });
        });

        // FETCHING DATA FOR EXAMPLES
        data.meanings.map((meaning) =>
          meaning.definitions.map((definition) => {
            if (definition.example) {
              examples.push(definition.example);
            }
          })
        );

        setWordData({
          word: data.word,
          phonetic: data.phonetics[0].text,
          partsOfSpeech: data.meanings,
          definitions: definitions,
          examples: examples,
        });
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      });
  }, []);
  if (notFound) {
    return (
      <main
        className={`flex justify-center items-center min-h-[calc(100vh-(61.5px+48px))] ${
          isDark ? "bg-slate-700" : "bg-white"
        }`}
      >
        <button
          onClick={() => history.back()}
          className={`go-back ${
            isDark ? "text-white" : "text-black"
          } border fixed top-24 left-4 rounded-sm flex justify-between gap-1 py-1 px-2 mx-6 sm:mx-10 md:mx-24 lg:mx-40 xl:mx-48 cursor-pointer mb-6 items-center`}
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </button>
        <p className={`text-red-500 text-lg sm:text-xl md:text-2xl font-bold `}>
          Not found. Try something else...
        </p>
      </main>
    );
  }

  function pronounce() {
    const synth = window.speechSynthesis;
    const utterance = new window.SpeechSynthesisUtterance(wordData.word);
    synth.speak(utterance);
  }

  return (
    <>
      {wordData ? (
        <main
          className={`pt-6 min-h-[calc(100vh-(61.5px+48px))] ${
            isDark ? "bg-slate-700 text-white" : "bg-white text-black"
          }`}
        >
          <button
            onClick={() => history.back()}
            className="go-back border rounded-sm flex justify-between gap-1 py-1 px-2 mx-6 sm:mx-10 md:mx-24 lg:mx-40 xl:mx-48 cursor-pointer mb-6 items-center"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>
          <section
            className={`flex items-center justify-between px-6 sm:px-10 md:px-24 lg:px-40 xl:px-48 py-2 ${
              isDark ? "bg-slate-600" : "bg-slate-100"
            }`}
          >
            <div>
              <h1 className="font-bold text-4xl mb-2 lowercase">
                {wordData.word}
              </h1>
              <p
                className={`text-xl font-mono ${
                  isDark ? "text-[#b0b0e6]" : "text-[#4d6aff] "
                }`}
              >
                {wordData.phonetic}
              </p>
            </div>
            <button
              onClick={pronounce}
              className="wave-shadow bg-[#4d6aff] p-2 rounded-full cursor-pointer"
            >
              <SpeakerWaveIcon className="h-8 w-8 text-white" />
            </button>
          </section>
          <section className="details px-6 sm:px-10 md:px-24 lg:px-40 xl:px-48 mt-6">
            <div className="part-of-speech flex items-center">
              <h2 className="font-bold text-lg mr-5">Part of speech: </h2>
              <div className="flex items-center gap-4">
                {wordData.partsOfSpeech.map((partOfSpeech) => {
                  return (
                    <p
                      key={partOfSpeech.partOfSpeech}
                      className="bg-[#4d6aff] text-white py-1 px-2 min-w-16 text-center rounded-md font-semibold"
                    >
                      {partOfSpeech.partOfSpeech}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="definitions">
              <h2 className="font-bold text-lg mr-5 mt-4">Definitions: </h2>
              <ol className="list-decimal list-inside mt-2">
                {wordData.definitions
                  .map((definition) => {
                    return <li key={definition}>{definition}</li>;
                  })
                  .slice(0, 4)}
              </ol>
            </div>
            {/* .map((meaning)=>meaning.definitions.map((definition)=>definition.example)) */}
            <div className="examples">
              <h2 className="font-bold text-lg mr-5 mt-4">Examples: </h2>
              <ol className="list-decimal list-inside mt-2 italic">
                {wordData.examples.map((example) => {
                  return <li key={example}>{example}</li>;
                })}
              </ol>
            </div>
          </section>
        </main>
      ) : (
        // <!-- From Uiverse.io by adamgiebl -->
        <section
          className={`dots-container fixed top-0 ${
            isDark ? "bg-slate-700 text-white" : "bg-white text-black"
          }`}
        >
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      )}
    </>
  );
};

export default WordDetails;
