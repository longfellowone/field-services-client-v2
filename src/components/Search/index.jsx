import React from 'react';
import { Query } from 'react-apollo';

const Search = () => {
  return (
    <>
      <div className="box">
        <SearchInput />
      </div>
      {/* <Results /> */}
    </>
  );
};

const SearchInput = () => {
  return (
    <>
      <form action=".">
        <div className="search">
          <input maxLength="70" placeholder="Start typing to begin search..." type="search" />
        </div>
      </form>
    </>
  );
};

const Results = () => {
  return (
    <>
      <div className="results">
        <div className="result">
          <div className="name">Result1</div>
          <div className="uom">ea</div>
        </div>
        <div className="result">
          <div className="name">Result2</div>
          <div className="uom">ft</div>
        </div>
        <div className="result">
          <div className="name">Result3</div>
          <div className="uom">ea</div>
        </div>
        <div className="result">
          <div className="name">Result4</div>
          <div className="uom">ea</div>
        </div>
      </div>
    </>
  );
};

export default Search;
