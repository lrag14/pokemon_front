export const Pagination = ({
   currentPage,
   totalPages,
   handlePreviousPage,
   handleNextPage,
}) => {
   return (
      <div className="pagination">
         {currentPage > 1 && (
            <button onClick={handlePreviousPage}>◀️</button> // Bouton "Précédent" s'il y a une page précédente
         )}
         <p>{`${currentPage} / ${totalPages}`}</p> // Affiche le numéro de page
         actuel et le nombre total de pages
         {currentPage < totalPages && (
            <button onClick={handleNextPage}>▶️</button> // Bouton "Suivant" s'il y a une page suivante
         )}
      </div>
   );
};
