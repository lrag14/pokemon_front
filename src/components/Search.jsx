const Search = ({ search, setSearch }) => {
   const handleSearchChange = (event) => {
      setSearch(event.target.value); // Met à jour la valeur de recherche lors de la saisie
   };

   return (
      <div>
         <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Chercher un Pokémon"
         />
      </div>
   );
};
export default Search;
