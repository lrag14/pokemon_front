import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from '../components/Search.jsx';

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
         `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
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

   return loading ? (
      <div>Chargement</div>
   ) : (
      <div>
         <Search search={search} setSearch={setSearch} />

         <h1 className="title">Pokemons</h1>
         <div className="pagination">
            <button onClick={handlePreviousPage}>◀️</button>
            <p>{currentPage}</p>
            <button onClick={handleNextPage}>▶️</button>
         </div>
         <div className="main-div">
            {data.map((pokemon, index) => {
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
            })}
         </div>
      </div>
   );
};

export default Pokemons;
