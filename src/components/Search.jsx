import React from 'react';

const Search = ({ search, setSearch }) => {
   return (
      <div>
         <input
            onChange={(data) => setSearch(data.results.name)}
            placeholder="Cherche Ton PoKeMoNgfh"
         />
      </div>
   );
};

export default Search;
