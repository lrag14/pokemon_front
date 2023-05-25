import React from 'react';

const Search = ({ search, setSearch }) => {
   return (
      <div>
         <input
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cherche Ton PoKeMoNgfh"
         />
      </div>
   );
};

export default Search;
