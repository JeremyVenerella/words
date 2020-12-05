import React, { useContext, useEffect, useState } from "react";
import { getTts } from "./authApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
/*  eslint-disable  jsx-a11y/anchor-is-valid */

export default function WordCard(props) {
  let word = props.word;
  
  const handleGetTts = async (e) => {
    const res = await getTts({
      params: {
        word:
          word.phonetic +
          ". For example. " +
          word.phonetic +
          word.example.replace(word.word, ""),
      },
    })
      .then((response) => {
          var snd = new Audio("data:audio/mp3;base64," + response.data.sound);
          snd.play();
      })
      .catch((err) => {
        console.log("TTSerr", err);
      });
  };

  const handleClick = (e) => {    
    handleGetTts();
  }

  return (
    <div className="card mt-5">
      <div className="card-content">
        <div className="content">
          <div className="carHeader columns">
          <div className="column is-one-quarter">
              
            </div>
            <div  className="column">
              <h1>{word.word}</h1>
            </div>
            <div className="column is-one-quarter">
              <FontAwesomeIcon
                className="playButton "
                size="3x"
                icon={faPlayCircle}
                onClick={handleClick}
              />
            </div>
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
      <footer className="card-footer">
        <div className="m-5 ">
          <p>Ex. {word.example}</p>
        </div>
      </footer>
    </div>
  );
}
