import React from 'react';

const Pagination = ({
   currentPage,
   totalPages,
   handlePreviousPage,
   handleNextPage,
   totalResults,
   limit,
   offset,
}) => {
   const currentPageResults = Math.min(offset + limit, totalResults);

   return (
      <div className="pagination">
         {currentPage > 1 && <button onClick={handlePreviousPage}>◀️</button>}
         <p>{`${offset + 1}-${currentPageResults} of ${totalResults}`}</p>
         {currentPage < totalPages && (
            <button onClick={handleNextPage}>▶️</button>
         )}
      </div>
   );
};

export default Pagination;
