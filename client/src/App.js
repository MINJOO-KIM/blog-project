import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfArticles, setListOfArticles] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getArticles").then((response) => {
      setListOfArticles(response.data);
    });
  }, []);

  const createArticle = () => {
    Axios.post("http://localhost:3001/createArticle", {
      title,
      content,
      date,
    }).then((response) => {
      setListOfArticles([
        ...listOfArticles,
        {
          title,
          content,
          date,
        },
      ]);
    });
  };

  return (
    <div className="App">
      <div className="articleDisplay">
        {listOfArticles.map((article) => {
          return (
            <div>
              <h1> Title: {article.title}</h1>
              <h1> Content: {article.content}</h1>
              <h1> Date: {article.date}</h1>
            </div>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="Title..."
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Content..."
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Date..."
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        <button onClick={createArticle}> 글 작성 </button>
      </div>
    </div>
  );
}

export default App;
