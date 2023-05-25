import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';

const Habitat = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);
   const { idOrName } = useParams();
   const [currentPage, setCurrentPage] = useState(1);
   const limit = 50;
   const offset = (currentPage - 1) * limit;

   const fetchData = async () => {
      const response = await axios.get(
         `https://pokeapi.co/api/v2/pokemon-habitat/${idOrName}`
      );
      setData(response.data);
      setLoading(false);
   };

   useEffect(() => {
      fetchData();
   }, []);

   return loading ? (
      <div>Loading...</div>
   ) : (
      <div>
         <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(data.pokemon_species.length / limit)}
            handlePreviousPage={() => setCurrentPage(currentPage - 1)}
            handleNextPage={() => setCurrentPage(currentPage + 1)}
            totalResults={data.pokemon_species.length}
            limit={limit}
            offset={offset}
         />
         <h1 className="title">Habitat: {data.name}</h1>
         <div className="main-div">
            {data.pokemon_species
               .slice(offset, offset + limit)
               .map((pokemon) => {
                  const url = pokemon.url.split('/')[6];
                  return (
                     <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
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

export default Habitat;
