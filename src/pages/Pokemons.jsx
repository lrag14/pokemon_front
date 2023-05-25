import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import Paggination from '../components/Paggination';

const Pokemons = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const [currentPage, setCurrentPage] = useState(1);
   const limit = 20;
   const offset = (currentPage - 1) * limit;
   const [search, setSearch] = useState('');

   const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
         `https://pokeapi.co/api/v2/pokemon?search=${search}&limit=${limit}&offset=${offset}`
      );
      setData(response.data.results);
      setLoading(false);
   };

   useEffect(() => {
      fetchData();
   }, [currentPage, search]);

   const handlePreviousPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      }
   };

   const handleNextPage = () => {
      setCurrentPage(currentPage + 1);
   };
   // ////////////////////////////
   const filterPokemons = (pokemon) => {
      return pokemon.name.toLowerCase().includes(search.toLowerCase());
   };
   const filteredPokemons = search ? data?.filter(filterPokemons) : data;
   const totalResults = filteredPokemons?.length || 0;
   const totalPages = Math.ceil(totalResults / limit);
   const showPagination = totalResults > limit;
   // ://///////////////////////////////////////
   return (
      <div>
         <Search search={search} setSearch={setSearch} />

         <h1 className="title">Pokemons</h1>
         <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
         />
         <div className="main-div">
            {loading ? (
               <div>Loading...</div>
            ) : filteredPokemons?.length === 0 ? (
               <div>No results found.</div>
            ) : (
               filteredPokemons?.map((pokemon, index) => {
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
         {showPagination && (
            <Paggination
               currentPage={currentPage}
               totalPages={totalPages}
               handlePreviousPage={handlePreviousPage}
               handleNextPage={handleNextPage}
            />
         )}
      </div>
   );
};

export default Pokemons;
