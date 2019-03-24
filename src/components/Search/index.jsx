import React, { useState } from 'react';
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
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [menuHighlighted, setMenuHighlighted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Query query={SEARCH_QUERY} variables={{ input }}>
      {({ data, error }) => {
        if (error) {
          console.log(error);
          return null;
        }
        if (Object.entries(data).length === 0) return null;

        const handleKeyDown = e => {
          if (!menuOpen) return;

          if (e.key === 'Escape') {
            e.preventDefault();
            setHighlightedIndex(0);
            setMenuOpen(false);
          }
          if (e.key === 'ArrowDown' || e.key === 'Tab') {
            e.preventDefault();
            if (highlightedIndex === data.products.length - 1) return;
            setHighlightedIndex(highlightedIndex => highlightedIndex + 1);
          }
          if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (highlightedIndex === 0) return;
            setHighlightedIndex(highlightedIndex => highlightedIndex - 1);
          }
        };

        const handleChange = e => {
          e.preventDefault();
          setInput(e.target.value);
          e.target.value === '' ? setMenuOpen(false) : setMenuOpen(true);
          if (!menuHighlighted) {
            setHighlightedIndex(0);
          }
        };

        const handleMouseLeave = e => {
          e.preventDefault();
          setMenuHighlighted(false);
        };

        const handleSubmit = e => {
          e.preventDefault();
          setMenuOpen(false);
          setInput('');
          const product = data.products[highlightedIndex];
          const productID = product.ID;
          const name = product.name;
          const uom = product.uom;
          addItem({ variables: { productID, name, uom } });
        };

        const focusInput = input => input && input.focus();

        const results = data.products.map((product, index) => (
          <Result
            key={product.ID}
            result={product}
            handleSubmit={handleSubmit}
            index={index}
            highlightedIndex={highlightedIndex}
            setHighlightedIndex={setHighlightedIndex}
            setMenuHighlighted={setMenuHighlighted}
          />
        ));

        return (
          <>
            <div className={'box ' + (menuOpen ? 'menuopen' : '')}>
              <form action="." onSubmit={handleSubmit}>
                <div className="search">
                  <input
                    ref={focusInput}
                    value={input}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent appearance-none text-black pl-3 py-2 border-none m-0 outline-none tap-none sm:text-md"
                    placeholder="Search for an item..."
                    tabIndex="0"
                    type="search"
                  />
                </div>
              </form>
            </div>
            {menuOpen && (
              <div className="results" onMouseLeave={handleMouseLeave}>
                {results}
              </div>
            )}
          </>
        );
      }}
    </Query>
  );
};

const Result = ({
  result: { name, uom, matchedIndexes },
  handleSubmit,
  index,
  highlightedIndex,
  setHighlightedIndex,
  setMenuHighlighted,
}) => {
  const indexes = matchedIndexes ? matchedIndexes.map(i => i) : [];
  const taggedResult = name ? replaceAt(indexes, name) : name;

  const handleMouseEnter = e => {
    e.preventDefault();
    setHighlightedIndex(index);
    setMenuHighlighted(true);
  };

  return (
    <div
      className="result"
      style={highlightedIndex === index ? { background: '#f1f5f8' } : {}}
      onMouseEnter={handleMouseEnter}
      onClick={handleSubmit}
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
