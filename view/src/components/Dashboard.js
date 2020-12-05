import React, { useContext, useEffect, useState } from "react";
import Auth from "../utils/Auth";
import { signout, postWord, getAllWords, postAdmin, putWord, deleteWord } from "./authApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
/* eslint-disable jsx-a11y/anchor-is-valid */
export default function DashBoard() {
  const auth = useContext(Auth);
  const [words, setWords] = useState([]);
  const [word, setWord] = useState("");
  const [type, setType] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");
  const [id, setId] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [editing, setEditing] = useState(false);

  const handleLogout = async () => {
    const res = await signout();
    auth.setAuth(res.data.auth);
  };

  const handlePostWord = async (e) => {
    e.preventDefault();

    let arr = definition.split(",");
    arr = arr.map((w) => w.trim());
    const res = await postWord({
      word: word,
      definition: arr,
      type: type,
      example: example,
      phonetic: phonetic,
    }).then((r) => {
      handleClear();
      handleGetAllWords();
    });
  };

  const handlePostAdmin = async (e) => {
    e.preventDefault();
    const res = await postAdmin({
      email: "jer20081@gmail.com",
      adminID: "5fc9143e34c81941ec5ddd82",
    });
  };

  const handleClear = async (e) => {
    setEditing(false);
    setWord("");
    setDefinition("");
    setType("");
    setExample("");
    setPhonetic("");
    setId("");
  };

  const handleEdit = async (w) => {
    setEditing(true);
    setWord(w.word);
    setDefinition(w.definition);
    setType(w.type);
    setExample(w.example);
    setPhonetic(w.phonetic);
    setId(w._id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let arr = definition.toString().split(",");
    arr = arr.map((w) => w.trim());
    const res = await putWord({
      data: {
        word: word,
        definition: arr,
        type: type,
        example: example,
        phonetic: phonetic,
      },
      params: {
        wordId: id,
      },
    })
      .then(() => {
        handleClear();
        handleGetAllWords();
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log("res", res);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await deleteWord({
      params: {
        wordId: id,
      },
    })
      .then(() => {
        handleClear();
        handleGetAllWords();
      })
      .catch((err) => {
        console.log("err", err);
      });
    console.log("res", res);
  };

  function handleInputChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    if (e.target.name === "word") {
      setWord(value);
    }
    if (name === "type") {
      setType(value);
    } else if (name === "definition") {
      setDefinition(value);
    } else if (name === "example") {
      setExample(value);
    } else if (name === "phonetic") {
      setPhonetic(value);
    }
  }

  const handleGetAllWords = async (e) => {
    const res = await getAllWords();
    console.log(res.status);
    if (res.status === 200) {
      console.log("HERE");
      setWords(res.data.word);
    }
    console.log(res);
  };

  useEffect(() => {
    handleGetAllWords();
  }, []);

  return (
    <div>
      <div className="columns">
        <div className="column is-one-fifth mt-5 ml-1">
          <aside className="menu">
            <p className="menu-label">Administration</p>
            <ul className="menu-list">
              <li>
                <a className="is-active">Words</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </aside>
        </div>

        <div className="column is-one-fifth mt-5">
          <div className="field">
            <h1>Add Word</h1>
            <label className="label">Word</label>
            <div className="control">
              <input
                name="word"
                className="input"
                type="text"
                value={word}
                placeholder="SHUTNUP"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Type</label>
            <div className="control">
              <input
                name="type"
                className="input"
                type="text"
                value={type}
                placeholder="Verb"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Phonetic</label>
            <div className="control">
              <input
                name="phonetic"
                className="input"
                type="text"
                value={phonetic}
                placeholder="Shut Nup"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Definition</label>
            <div className="control">
              <textarea
                name="definition"
                className="textarea"
                value={definition}
                placeholder="This is the first, this is the second"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div className="field">
            <label className="label">Example</label>
            <div className="control">
              <textarea
                name="example"
                className="textarea"
                value={example}
                placeholder="This is the first, this is the second"
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div className="field is-grouped">
            {!editing ? (
              <div className="control">
                <button
                  className="button is-link is-small"
                  onClick={handlePostWord}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div className="control">
                <button
                  className="button is-link is-small"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            )}
            {editing ? (
              <div className="control">
                <button
                  className="button is-danger is-small"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
            <div className="control">
              <button
                className="button is-link is-light is-small"
                onClick={handleClear}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="column mt-5 mr-1">
          <table className="table is-striped  is-hoverable is-fullwidth mt-2">
            <tbody>
              <tr>
                <th>Words</th>
                <th>Type</th>
                <th>Definition</th>
                <th>Example</th>
                <th>Phonetic</th>
                <th></th>
              </tr>
              {words.map((word, idx) => {
                return (
                  <tr key={idx}>
                    <td>{word.word}</td>
                    <td>{word.type}</td>
                    <td className="content">
                      <ol className="mt-0" type="1">
                        {word.definition.map((def, idx) => {
                          return (
                            <li className="centerBlock" key={idx}>
                              {def}
                            </li>
                          );
                        })}
                      </ol>
                    </td>
                    <td>{word.example}</td>
                    <td>{word.phonetic}</td>
                    <td>
                      {" "}
                      <FontAwesomeIcon
                        className="playButton "
                        size="2x"
                        icon={faEdit}
                        name={word._id}
                        onClick={() => handleEdit(word)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
