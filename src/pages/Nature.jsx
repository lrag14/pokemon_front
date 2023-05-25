import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Nature = () => {
   const [natureData, setNatureData] = useState(null);
   const [loading, setLoading] = useState(true);
   const { idOrNature } = useParams();

   const fetchNatureData = async () => {
      const response = await axios.get(
         `https://pokeapi.co/api/v2/nature/${idOrNature}`
      );
      setNatureData(response.data);
      setLoading(false);
   };

   return loading ? (
      <div>Loadin.</div>
   ) : (
      <div>
         <h1 className="title">Nature: {natureData.name}</h1>
         <div>
            <h2>Pokémon with this nature:</h2>
            <ul>
               {natureData.pokemon.map((pokemon) => (
                  <li key={pokemon.id}>
                     <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default Nature;
