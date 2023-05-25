import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';

const Type = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const { element } = useParams();
   const [currentPage, setCurrentPage] = useState(1);
   const limit = 50;
   const offset = (currentPage - 1) * limit;

   const fetchData = async () => {
      const response = await axios.get(
         `https://pokeapi.co/api/v2/type/${element}`
      );
      setData(response.data);
      setLoading(false);
   };

   useEffect(() => {
      fetchData();
   }, []);

   return loading ? (
      <div>Chargement...</div>
   ) : (
      <div>
         <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(data.pokemon.length / limit)}
            handlePreviousPage={() => setCurrentPage(currentPage - 1)}
            handleNextPage={() => setCurrentPage(currentPage + 1)}
            totalResults={data.pokemon.length}
            limit={limit}
            offset={offset}
         />
         <h1 className="title">Type: {data.name}</h1>
         <div className="main-div">
            {data.pokemon.slice(offset, offset + limit).map((pokemon) => {
               const url = pokemon.pokemon.url.split('/')[6];
               return (
                  <Link
                     to={`/pokemon/${pokemon.pokemon.name}`}
                     key={pokemon.pokemon.name}>
                     <div className="link-card">
                        <div>{pokemon.pokemon.name}</div>
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

export default Type;
