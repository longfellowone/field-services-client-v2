import React, { useState, useRef, useEffect } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const SEARCH_QUERY = gql`
  query($input: String!) {
    products(name: $input) {
      ID
      name
      uom
      matchedIndexes
    }
  }
`;

export const Search = ({ addItem }) => {
  const [input, setInput] = useState('');
  // const [highlightedIndex, setHighlightedIndex] = useState(0);
  // const [menuHighlighted, setMenuHighlighted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    return () => document.body.classList.remove('noscrollbody');
  }, []);

  return (
    <Query query={SEARCH_QUERY} variables={{ input }}>
      {({ data, error }) => {
        if (error) {
          console.log(error);
          return null;
        }
        if (Object.entries(data).length === 0) return null;

        // const handleKeyDown = e => {
        //   if (!menuOpen) return;

        //   if (e.key === 'Escape') {
        //     e.preventDefault();
        //     setHighlightedIndex(0);
        //     setMenuOpen(false);
        //   }
        //   if (e.key === 'ArrowDown' || e.key === 'Tab') {
        //     e.preventDefault();
        //     if (highlightedIndex === data.products.length - 1) return;
        //     setHighlightedIndex(highlightedIndex => highlightedIndex + 1);
        //   }
        //   if (e.key === 'ArrowUp') {
        //     e.preventDefault();
        //     if (highlightedIndex === 0) return;
        //     setHighlightedIndex(highlightedIndex => highlightedIndex - 1);
        //   }
        // };

        const handleChange = e => {
          e.preventDefault();
          setMenuOpen(true);
          setInput(e.target.value);
          // e.target.value === '' ? setMenuOpen(false) : setMenuOpen(true);
          // if (!menuHighlighted) {
          //   setHighlightedIndex(0);
          // }
        };

        // const handleMouseLeave = e => {
        //   e.preventDefault();
        //   setMenuHighlighted(false);
        // };

        const handleSubmit = (e, index) => {
          e.preventDefault();
          // setMenuHighlighted(false);
          const product = data.products[index];
          const productID = product.ID;
          const name = product.name;
          const uom = product.uom;
          addItem({ variables: { productID, name, uom } });
          closeSearch();
        };

        const handleFocus = () => {
          setMenuOpen(true);
          document.body.classList.add('noscrollbody');
        };

        const closeSearch = () => {
          setInput('');
          setMenuOpen(false);
          document.body.classList.remove('noscrollbody');
        };

        const results = data.products.map((product, index) => (
          <Result
            key={product.ID}
            result={product}
            handleSubmit={handleSubmit}
            index={index}
            // highlightedIndex={highlightedIndex}
            // setHighlightedIndex={setHighlightedIndex}
            // setMenuHighlighted={setMenuHighlighted}
          />
        ));

        return (
          <div
            className={menuOpen ? 'overlay' : 'flex'}
            onTouchStart={() => inputRef.current.blur()}
          >
            <div className={menuOpen ? 'container' : 'flex'}>
              <form
                action="."
                className={menuOpen ? 'search' : 'flex'}
                onSubmit={e => e.preventDefault()}
              >
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
                {results}
              </div>
            </div>
          </div>
          // <>
          //   <div className={menuOpen ? 'menuopen' : ''}>
          //     <form action="." onSubmit={handleSubmit}>
          //       <div className="search">
          //         <input
          //           className="searchinput"
          //           value={input}
          //           onChange={handleChange}
          //           onKeyDown={handleKeyDown}
          //           onClick={handleClick}
          //           onFocus={handleClick}
          //           placeholder="Search for an item..."
          //           tabIndex="0"
          //           type="search"
          //         />
          //         <div className={menuOpen ? 'results' : ''}>
          //           {menuOpen && <div onMouseLeave={handleMouseLeave}>{results}</div>}
          //         </div>
          //       </div>
          //     </form>
          //   </div>
          // </>
        );
      }}
    </Query>
  );
};

const Result = ({
  result: { name, uom, matchedIndexes },
  handleSubmit,
  index,
  // highlightedIndex,
  // setHighlightedIndex,
  // setMenuHighlighted,
}) => {
  const indexes = matchedIndexes ? matchedIndexes.map(i => i) : [];
  const taggedResult = name ? replaceAt(indexes, name) : name;

  // const handleMouseEnter = e => {
  //   e.preventDefault();
  //   setHighlightedIndex(index);
  //   setMenuHighlighted(true);
  // };

  return (
    <div
      className="result"
      // style={highlightedIndex === index ? { background: '#f1f5f8' } : {}}
      // onMouseEnter={handleMouseEnter}
      // onClick={handleSubmit}
      onClick={e => handleSubmit(e, index)}
    >
      <div className="name">{taggedResult}</div>
      <div className="uom">{uom}</div>
    </div>
  );
};

function replaceAt(indexArray, string) {
  const newString = [...string];
  const replaceValue = i =>
    (newString[i] = (
      <span style={{ fontWeight: 400 }} key={i}>
        {newString[i]}
      </span>
    ));
  indexArray.map(replaceValue);
  return newString;
}

// const Search = () => {
//   return (
//     <>
//       <div className="box">
//         <SearchInput />
//       </div>
//       {/* <Results /> */}
//     </>
//   );
// };

// const SearchInput = () => {
//   return (
//     <>
//       <form action=".">
//         <div className="search">
//           <input maxLength="70" placeholder="Start typing to begin search..." type="search" />
//         </div>
//       </form>
//     </>
//   );
// };

// const Results = () => {
//   return (
//     <>
//       <div className="results">
//         <div className="result">
//           <div className="name">Result1</div>
//           <div className="uom">ea</div>
//         </div>
//       </div>
//     </>
//   );
// };

export default Search;
