import { useContext } from "react";
import FunContext from "../functions/kontekst";
import decoder from "../functions/decoder.js";

const Answers = ({ color, answer, check, checkFun, disabled }) => {
  const context = useContext(FunContext);

  const click = (e) => {
    checkFun();
    context(e);
  };

  return (
    <button
      className="answers"
      style={check ? { background: color } : { background: "whitesmoke" }}
      disabled={disabled}
      onClick={(e) => click(e)}
    >
      {decoder(answer)}
    </button>
  );
};

export default Answers;
