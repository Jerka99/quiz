import knutShuffle from "../functions/knutShuffle.js";
import decoder from "../functions/decoder.js";
import Answers from "./Answers.jsx";
import { useEffect, useState } from "react";

const QuestionsAndAnswers = ({
  index,
  question,
  correct_answer,
  incorrect_answers,
  increaseIndex,
}) => {
  const [answers, setAnswers] = useState([]);
  const [check, setCheck] = useState(false);
  const [disabled, setDisable] = useState(false);

  useEffect(() => {
    setAnswers(knutShuffle(incorrect_answers, correct_answer));
  }, [index]);

  const checkFun = (x) => {
    setCheck(true);
    setDisable(true);
    setTimeout(() => {
      increaseIndex();
      setDisable(false);
    }, 1500);
  };

  return (
    <div id="questions-and-answers">
      <div id="question">
        <h3>{decoder(question)}</h3>
      </div>
      <div id="answers-holder">
        {answers.map((answer) => {
          if (answer == correct_answer)
            return (
              <Answers
                key={answer}
                color="green"
                answer={answer}
                check={check}
                checkFun={checkFun}
                disabled={disabled}
              />
            );
          else
            return (
              <Answers
                key={answer}
                color="red"
                answer={answer}
                check={check}
                checkFun={checkFun}
                disabled={disabled}
              />
            );
        })}
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;
