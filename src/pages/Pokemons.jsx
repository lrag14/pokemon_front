import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '../components/Search.jsx';
import Pagination from '../components/Pagination.jsx';

const Pokemons = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [currentPage, setCurrentPage] = useState(1);
   const limit = 50;
   const offset = (currentPage - 1) * limit;
   const [search, setSearch] = useState('');

   const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
         `https://pokeapi.co/api/v2/pokemon?limit=10000`
      );
      setData(response.data.results);
      setLoading(false);
   };

   useEffect(() => {
      fetchData();
      setCurrentPage(1); // Réinitialise la page à 1 lorsqu'une nouvelle requête est effectuée
   }, [search]);

   const handlePreviousPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      }
   };

   const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
   };

   const filterPokemons = (pokemon) => {
      return pokemon.name.toLowerCase().includes(search.toLowerCase());
   };

   const filteredPokemons = search ? data?.filter(filterPokemons) : data;

   const paginatedPokemons = filteredPokemons?.slice(offset, offset + limit);

   const totalResults = filteredPokemons?.length || 0;
   const totalPages = Math.ceil(totalResults / limit);

   const showPagination = totalResults > limit;

   const handleClearSearch = () => {
      setSearch('');
   };

   return (
      <div>
         <Search search={search} setSearch={setSearch} />
         <button onClick={handleClearSearch}>Clear</button>

         <h1 className="title">Pokemons</h1>
         <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
            totalResults={totalResults}
            limit={limit}
            offset={offset}
         />
         <div className="main-div">
            {loading ? (
               <div>Loading...</div>
            ) : paginatedPokemons?.length === 0 ? (
               <div>No results found.</div>
            ) : (
               paginatedPokemons?.map((pokemon, index) => {
                  const url = pokemon.url.split('/')[6];
                  return (
                     <Link to={`/pokemon/${pokemon.name}`} key={index}>
                        <div className="link-card">
                           <div>{pokemon.name}</div>
                           <img
                              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url}.png`}
                              alt=""
                           />
                        </div>
                     </Link>
                  );
               })
            )}
         </div>
      </div>
   );
};

export default Pokemons;
