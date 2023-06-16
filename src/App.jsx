import { Fragment, useRef, useState } from "react";
import axios from "axios";
import FunContext from "./functions/kontekst";
import { trivia_categories } from "./functions/category.js";
import capitalize from "./functions/capitalize.js";
import QuestionsAndAnswers from "./components/QuestionsAndAnswers";
import "./App.css";
import Addition from "./components/Addition";

function App() {
  const [task, setTask] = useState([]);
  const [question_index, setIndex] = useState(0);
  const [correct, setCorrectAnswer] = useState(0);
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState({
    link: "https://opentdb.com/api.php?",
    amount: 1,
    difficulty: "",
    category: "",
  });
  const urlExists = useRef("");

  const fetch = (e) => {
    e.preventDefault();
    console.log(e)
    setTask([]);
    setLoading(true)
    urlExists.current = `${url.link}&amount=${url.amount}&difficulty=${url.difficulty}&category=${url.category}`;
    axios.get(urlExists.current).then((data) => {
      setTask(data.data.results);
    }).finally(() => setLoading(false))
  };

  const increaseIndex = () => {
    setIndex((prev) => prev + 1);
  };

  const countCorrectanswers = (e) => {
    if (task[question_index].correct_answer == e.currentTarget.textContent)
      setCorrectAnswer(correct + 1);
  };

  const modifyUrl = (e) => {
    const name = e.currentTarget.name;
    let value = e.currentTarget.value;
    if (name == "amount") {
      value > 50 ? (value = 50) : value;
    }
    if (name == "category") {
      value = trivia_categories[value];
    }
    if (name == "difficulty") {
      value == "Any Difficulty" ? (value = "") : (value = value.toLowerCase());
    }
    setUrl((prev) => ({ ...prev, [name]: value }));
  };

  const resetFun = () => {
    setIndex(0);
    setCorrectAnswer(0);
    setTask([]);
    setUrl({
      link: "https://opentdb.com/api.php?",
      amount: 1,
      difficulty: "",
      category: "",
    });
    urlExists.current = "";
  };

  return (
    <div id="quiz-holder">
      <div
        id="additions"
        style={urlExists.current ? { display: "none" } : { display: "flex" }}
      >
        <Addition
          modifyUrl={modifyUrl}
          fetch={fetch}
          amount={url.amount}
          category={url.category}
          difficulty={url.difficulty}
        />
      </div>

      <div
        id="game"
        style={urlExists.current ? { display: "block" } : { display: "none" }}
      >
        <div id="title">
          <h3>
            Category:{" "}
            {Object.keys(trivia_categories)[parseInt(url.category) - 8] ??
              `Any Category - ${
                capitalize(task[question_index]?.category) ?? ""
              }`}
          </h3>
          <h3>
            Difficulty:{" "}
            {url.difficulty == ""
              ? `Any Difficulty - ${
                  capitalize(task[question_index]?.difficulty) ?? ""
                }`
              : capitalize(url.difficulty)}
          </h3>
          {!loading &&<div id="question-number">
             <h3>
              {question_index > parseInt(url.amount) - 1
                ? question_index
                : question_index + 1}{" "}
              / {task.length}
            </h3>
          </div>}
        </div>

        {question_index == url.amount ? (
          <button id="reset" onClick={resetFun}>
            Reset
          </button>
        ) : null}
        {!loading ? task.map((element, index) => {
          if (question_index == index && !loading) {
            return (
              <Fragment key={element.question}>
                <FunContext.Provider value={countCorrectanswers}>
                  <QuestionsAndAnswers
                    index={index}
                    question={element.question}
                    correct_answer={element.correct_answer}
                    incorrect_answers={element.incorrect_answers}
                    increaseIndex={increaseIndex}
                  />
                </FunContext.Provider>
              </Fragment>
            );
          }
        }) : <div id="spinner"></div>}
        <div id="correct-answers">
          <h3>correct answers: </h3>
          <h3>{correct}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
