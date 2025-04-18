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
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);

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

        // FETCHING DATA FOR SYNONYMS
        data.meanings.map((meaning) => {
          meaning.synonyms.map((synonym) => {
            synonyms.push(synonym);
          });
        });

        // FETCHING DATA FOR ANTONYMS
        data.meanings.map((meaning) => {
          meaning.antonyms.map((antonym) => {
            antonyms.push(antonym);
          });
        });

        setWordData({
          word: data.word,
          phonetic: data.phonetics[0].text,
          partsOfSpeech: [...new Set(data.meanings)],
          definitions: [...new Set(definitions)],
          examples: [...new Set(examples)],
          synonyms: [...new Set(synonyms)],
          antonyms: [...new Set(antonyms)],
          // antonyms: antonyms,
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
          className={`py-6 min-h-[calc(100vh-(61.5px+48px))] ${
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
                {wordData.partsOfSpeech.map((partOfSpeech, i) => {
                  return (
                    <p
                      key={i}
                      className="bg-[#4d6aff] text-white py-1 px-2 min-w-16 text-center rounded-md font-semibold"
                    >
                      {partOfSpeech.partOfSpeech}
                    </p>
                  );
                })}
              </div>
            </div>
            {wordData.definitions.length !== 0 ? (
              <div className="definitions">
                <h2 className="font-bold text-lg mr-5 mt-4">Definitions: </h2>
                <ol className="list-decimal list-inside mt-2">
                  {wordData.definitions
                    .map((definition) => {
                      return <li key={definition}>{definition}</li>;
                    })
                    .slice(0, 7)}
                </ol>
              </div>
            ) : (
              ""
            )}
            {wordData.examples.length !== 0 ? (
              <div className="examples">
                <h2 className="font-bold text-lg mr-5 mt-4">Examples: </h2>
                <ol className="list-decimal list-inside mt-2 italic">
                  {wordData.examples
                    .map((example) => {
                      return <li key={example}>{example}</li>;
                    })
                    .slice(0, 5)}
                </ol>
              </div>
            ) : (
              ""
            )}
            {wordData.synonyms.length != 0 ? (
              <div className="synonyms">
                <h2 className="font-bold text-lg mr-5 mt-4">Synonyms: </h2>
                <div className="flex flex-wrap">
                  {wordData.synonyms.map((synonym) => {
                    return <span key={synonym}>{synonym}, &nbsp;</span>;
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
            {wordData.antonyms.length != 0 ? (
              <div className="synonyms">
                <h2 className="font-bold text-lg mr-5 mt-4">Antonyms: </h2>
                <div className="flex flex-wrap">
                  {wordData.antonyms.map((antonym) => {
                    return <span key={antonym}>{antonym}, &nbsp;</span>;
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
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
