import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="검색어 입력" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default SearchBar;
