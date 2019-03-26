import React, { useState, useRef } from 'react';

import './test.css';

export const Test = () => {
  return (
    <>
      <div className="container">
        <Search />
        <Items />
      </div>
    </>
  );
};

const Search = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef();

  const handleFocus = () => {
    setMenuOpen(true);
    document.body.classList.add('noscrollbody');
  };

  // document.body.classList.remove('noscrollbody');

  return (
    <>
      <div className={menuOpen ? 'overlay' : ''} onTouchStart={() => inputRef.current.blur()}>
        <input onFocus={handleFocus} ref={inputRef} onTouchStart={e => e.stopPropagation()} />
        <div className="results" style={{ display: !menuOpen ? 'none' : '' }}>
          <Results />
        </div>
      </div>
    </>
  );
};

const Items = () => {
  let items = [];
  for (var i = 0; i < 200; i++) {
    items.push(<div key={Math.random()}>Item</div>);
  }

  return <>{items}</>;
};

const Results = () => {
  let results = [];
  for (var i = 0; i < 10; i++) {
    results.push(<div key={Math.random()}>Result</div>);
  }

  console.log(results);

  return <>{results}</>;
};
