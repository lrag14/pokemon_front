import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Natures = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(true);

   const fetchData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/nature/');
      console.log(response.data);
      setData(response.data.results);
      setLoading(false);
   };

   useEffect(() => {
      fetchData();
   }, []);

   return loading ? (
      <div>Loading...</div>
   ) : (
      <div>
         <h1 className="title">Natures</h1>
         <div className="all-type">
            {data.map((types) => {
               return (
                  <Link
                     className="type-box"
                     // to={`/nature/${types.name}`}
                     key={types.name}>
                     {types.name}
                  </Link>
               );
            })}
         </div>
      </div>
   );
};

export default Natures;
