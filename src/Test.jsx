import React, { useState, useRef, useEffect } from 'react';

import './test.css';

export const Test = () => {
  return (
    <>
      <div className="container">
        <div className="box">
          {/* style={{ paddingLeft: "0.5rem" }} */}
          <Search />
        </div>
        <Items />
      </div>
    </>
  );
};

const Search = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [input, setInput] = useState('');
  const inputRef = useRef();

  const handleFocus = () => {
    setMenuOpen(true);
    document.body.classList.add('noscrollbody');
  };

  const handleSubmit = () => {
    closeSearch();
  };

  const closeSearch = () => {
    setInput('');
    setMenuOpen(false);
    document.body.classList.remove('noscrollbody');
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  useEffect(() => {
    return () => document.body.classList.remove('noscrollbody');
  }, []);

  return (
    <div className={menuOpen ? 'overlay' : 'flex'} onTouchStart={() => inputRef.current.blur()}>
      <div className={menuOpen ? 'container' : 'flex'}>
        <form action="." className={menuOpen ? 'search' : 'flex'}>
          {/* <div
            className="back"
            style={{ display: menuOpen ? "" : "none" }}
            onTouchStart={e => e.stopPropagation()}
            onMouseDown={handleClose}
          >
            <img
              src="https://img.icons8.com/ios/25/000000/left.png"
              alt="back"
            />
          </div> */}
          <input
            ref={inputRef}
            value={input}
            className="searchinput"
            onTouchStart={e => e.stopPropagation()}
            onChange={handleChange}
            onFocus={handleFocus}
            maxLength="50"
            placeholder="Search for an item..."
            tabIndex="0"
            type="search"
          />
          <div
            className="delete"
            style={{ display: menuOpen ? '' : 'none' }}
            onTouchStart={e => e.stopPropagation()}
            onMouseDown={closeSearch}
          >
            <img src="https://img.icons8.com/ios/15/000000/delete-sign.png" alt="delete" />
          </div>
        </form>
        <div className="results" style={{ display: !menuOpen ? 'none' : '' }}>
          <Results handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

const Results = ({ handleSubmit }) => {
  let results = [];
  for (let i = 0; i < 10; i++) {
    results.push(
      <div key={Math.random()} className="result" onMouseDown={handleSubmit}>
        {/* <div className="add">
          <img
            src="https://img.icons8.com/color/20/000000/plus.png"
            alt="add"
          />
        </div> */}
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
  for (let i = 0; i < 1; i++) {
    items.push(
      <div key={Math.random()} className="box">
        <div className="name">Item (New)</div>
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

    if (e.target.value === '' || isNaN(e.target.value)) {
      setInput(0);
      return;
      // return func({ variables: { input: 0 } });
    }

    setInput(parseInt(e.target.value, 10));
    // func({ variables: { input: e.target.value } });
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  return editable ? (
    <div className="quantity">
      <input
        ref={focusInput}
        value={input}
        onChange={handleChange}
        onFocus={e => e.target.select()}
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
