import React, { useState, useRef } from 'react';

import './test.css';

export const Test = () => {
  return (
    <>
      <div className="container">
        <div className="box">
          <Search />
        </div>
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

  const handleSubmit = () => {
    setMenuOpen(false);
    document.body.classList.remove('noscrollbody');
  };

  return (
    <>
      <div className={menuOpen ? 'overlay' : 'flex'} onTouchStart={() => inputRef.current.blur()}>
        <div className={menuOpen ? 'container' : 'flex'}>
          <div className={menuOpen ? 'box search' : 'flex'}>
            <div className="back" style={{ display: !menuOpen ? 'none' : '' }}>
              B
            </div>
            <input onFocus={handleFocus} ref={inputRef} onTouchStart={e => e.stopPropagation()} />
            <div className="close" style={{ display: !menuOpen ? 'none' : '' }}>
              X
            </div>
          </div>
          <div className="results" style={{ display: !menuOpen ? 'none' : '' }}>
            <Results handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </>
  );
};

const Results = ({ handleSubmit }) => {
  let results = [];
  for (let i = 0; i < 10; i++) {
    results.push(
      <div key={Math.random()} className="result" onClick={handleSubmit}>
        <div className="name">Result</div>
        <div className="uom">ft</div>
      </div>,
    );
  }
  return <>{results}</>;
};

const Items = () => {
  let items = [];
  for (let i = 0; i < 15; i++) {
    items.push(
      <div key={Math.random()} className="item">
        <div className="name">Item</div>
        <div className="quantity">100</div>
        <div className="uom">ft</div>
      </div>,
    );
  }
  for (let i = 0; i < 15; i++) {
    items.push(
      <div key={Math.random()} className="item">
        <div className="name">Item</div>
        <div className="quantity">
          <input />
        </div>
        <div className="uom">ft</div>
      </div>,
    );
  }
  return <>{items}</>;
};
