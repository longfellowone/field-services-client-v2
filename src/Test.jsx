import React, { useState, useRef, useEffect } from 'react';

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

  useEffect(() => {
    return () => document.body.classList.remove('noscrollbody');
  }, []);

  return (
    <>
      <div className={menuOpen ? 'overlay' : 'flex'} onTouchStart={() => inputRef.current.blur()}>
        <div className={menuOpen ? 'container' : 'flex'}>
          <div className={menuOpen ? 'search' : 'flex'}>
            <div className="back" style={{ display: !menuOpen ? 'none' : 'none' }}>
              B
            </div>
            <input
              ref={inputRef}
              className="searchinput"
              onFocus={handleFocus}
              onTouchStart={e => e.stopPropagation()}
              maxLength="50"
              placeholder="Search for an item..."
              tabIndex="0"
              type="search"
            />
            <div className="close" style={{ display: !menuOpen ? 'none' : 'none' }}>
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
      <div key={Math.random()} className="result" onMouseDown={handleSubmit}>
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
      <div key={Math.random()} className="box">
        <div className="name">Item</div>
        <QuantityInput quantity="100" />
        <div className="uom">ft</div>
      </div>,
    );
  }

  return <>{items}</>;
};

const QuantityInput = ({ quantity, productID, orderID }) => {
  const [input, setInput] = useState(quantity);
  const [editable, setEditable] = useState(false);

  const focusInput = input => input && input.focus();

  const handleBlur = (e, func) => {
    setEditable(false);

    console.log(isNaN(e.target.value));

    if (e.target.value === '' || isNaN(e.target.value)) {
      setInput(0);
      return;
      // return func({ variables: { input: 0 } });
    }

    setInput(parseInt(e.target.value));
    // func({ variables: { input: e.target.value } });
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleFocus = e => {
    e.preventDefault();
    e.target.select();
  };

  return editable ? (
    <div className="quantity">
      <input
        ref={focusInput}
        value={input}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={e => handleBlur(e)}
        pattern="[0-9]*"
        type="tel"
        autoComplete="off"
        maxLength="6"
      />
    </div>
  ) : (
    <div className="quantity" onFocus={() => setEditable(true)} tabIndex="0">
      {input}
    </div>
  );
};
