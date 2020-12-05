import React, { useEffect, useState } from "react";
import WordCard from "../components/WordCard";
import { getAllWords } from "../components/authApi";
/* eslint-disable jsx-a11y/anchor-is-valid */
export default function WordsView() {
  const [words, setWords] = useState([]);
  const [filterWords, setfilterWords] = useState([]);

  const handleGetAllWords = async (e) => {
    const res = await getAllWords();
    if (res.status === 200) {
      setWords(res.data.word);
      setfilterWords(res.data.word);
      console.log('words', res.data.word)
    }
  };

  const handleSelectChange = (e) => {
      let val = e.target.value;
      if (!val){
          setfilterWords(words);
      }else{
          setfilterWords(words.filter( f => {
             return f.type === e.target.value
          }))
      }
  };
  useEffect(() => {
    handleGetAllWords();
  }, []);

  return (
    <div>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">NicoleSWords</h1>
          </div>
        </div>
      </section>
      <section>
        <div className="searchfield">
          <div className="field has-addons has-addons-centered mt-5">
            <p className="control">
              <span className="select">
                <select onChange={handleSelectChange}>
                  <option> </option>
                  <option>Noun</option>
                  <option>Pronoun</option>
                  <option>Verb</option>
                  <option>Adjective</option>
                  <option>Adverb</option>
                  <option>Preposition</option>
                  <option>Conjunction</option>
                </select>
              </span>
            </p>
            <div className="control">
              <input
                className="input"
                type="text"
              />
            </div>
            <div className="control">
              <a className="button is-info">Search</a>
            </div>
          </div>
        </div>
        <div className="cardSize">
          {filterWords.map((w, idx) => (
            <WordCard key={idx} word={w} />
          ))}
        </div>
      </section>
    </div>
  );
}
