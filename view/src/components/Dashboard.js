import React, { useContext, useEffect, useState } from "react";
import Auth from "../utils/Auth";
import { signout, postWord, getAllWords, postAdmin } from "./authApi";
/* eslint-disable jsx-a11y/anchor-is-valid */
export default function DashBoard() {
  const auth = useContext(Auth);
  const [words, setWords] = useState([]);
  const [word, setWord] = useState("");
  const [type, setType] = useState("");
  const [definition, setDefinition] = useState("");

  const handleLogout = async () => {
    const res = await signout();
    auth.setAuth(res.data.auth);
  };

  const handlePostWord = async (e) => {
    e.preventDefault();

    let arr = definition.split(",");
    arr = arr.map((w) => w.trim());
    console.log("arr", arr);
    const res = await postWord({
      word: word,
      definition: arr,
      type: type,
    }).then((r) => {
      setWord("");
      setDefinition("");
      setType("");
      handleGetAllWords();
    });
  };

  const handlePostAdmin = async (e) => {
    e.preventDefault();
    const res = await postAdmin({
      email: "jer20081@gmail.com",
      adminID: "5fc9143e34c81941ec5ddd82",
    });
    console.log(res);
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

        <div className="column mt-5 mr-1">
          <table className="table is-striped  is-hoverable is-fullwidth mt-2">
            <tbody>
              <tr>
                <th>Words</th>
                <th>Type</th>
                <th>Definition</th>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="column is-one-fifth mt-5 mr-1">
          <div className="field">
            <h1>Add Word</h1>
            <label className="label">Word</label>
            <div className="control">
              <input
                name="word"
                className="input"
                type="text"
                value={word}
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
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={handlePostWord}>
                Submit
              </button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
/*

 <Columns>
        <Menu className="sideMenu">
          <Columns.Column key={3}>
            <Menu.List title="Administration">
              <Menu.List.Item>Word Settings</Menu.List.Item>
              <Menu.List.Item onClick={handleLogout}>Logout</Menu.List.Item>
            </Menu.List>
          </Columns.Column>
        </Menu>
        <Columns.Column>
          <WordsMenu />
        </Columns.Column>
        <Columns.Column>
          <div>
            <Box>
              <Field>
              </Field>
            </Box>
          </div>
        </Columns.Column>
      </Columns>
*/
