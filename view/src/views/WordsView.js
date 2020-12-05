import React, { useEffect, useState } from "react";
import WordCard from "../components/WordCard";
import { getAllWords } from "../components/authApi";

export default function WordsView() {
  const [words, setWords] = useState([]);

  const handleGetAllWords = async (e) => {
    const res = await getAllWords();
    if (res.status === 200) {
      console.log("HERE");
      setWords(res.data.word);
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
        <div className="cardSize">
          {words.map((w, idx) => (
            <WordCard key={idx} word={w} />
          ))}
        </div>
      </section>
    </div>
  );
}
