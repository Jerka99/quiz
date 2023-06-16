import { trivia_categories } from "../functions/category.js";

const Addition = ({ modifyUrl, amount, fetch, category, difficulty }) => {
  return (
    <form onSubmit={fetch}>
      <div>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          name="difficulty"
          value={
            difficulty[0]?.toUpperCase() +
            difficulty?.substring(1)?.toLowerCase()
          }
          onChange={modifyUrl}
        >
          <option>Any Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select
          name="category"
          value={Object.keys(trivia_categories)[category - 8] ?? ""}
          onChange={modifyUrl}
        >
          {Object.entries(trivia_categories).map((element) => {
            return <option key={element[1]}>{element[0]}</option>;
          })}
        </select>
      </div>
      <div>
        <label htmlFor="amount">Amount of questions</label>
        <input
          type="number"
          name="amount"
          min={1}
          max={50}
          value={amount}
          onChange={modifyUrl}
          required
        />
      </div>
      <button type="submit">Start</button>
    </form>
  );
};

export default Addition;
