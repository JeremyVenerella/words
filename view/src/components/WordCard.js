import React, { useContext, useEffect, useState } from "react";
import { getTts } from "./authApi";
/*  eslint-disable  jsx-a11y/anchor-is-valid */

export default function WordCard(props) {
  console.log("props", props.word);
  let word = props.word;

  const handleGetTts = async (e) => {
    const res = await getTts({
        params: {
          word: 'testing'
        }
      }).then(response => {
        // var snd = new Audio("data:audio/wav;base64," + base64string);
        // snd.play();
          console.log('resStatus', response.data.sound);
      });
  };
  useEffect(() => {
    handleGetTts();
  }, []);


  return (
    <div className="card mt-5">
      <div className="card-content">
        <div className="content">
          <div className="carHeader">
            <h1>{word.word}</h1>
          </div>

          <h3 className="has-text-justified">{word.type}</h3>
          <div className="content has-text-justified">
            <ol className="mt-0 ml-5" type="1">
              {word.definition.map((def, idx) => {
                return (
                  <li className="" key={"def" + idx}>
                    {def}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
      <footer className="card-footer"></footer>
    </div>
  );
}
