import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const displayPages = 1; // Number of pages to display on each side of the current page

  const renderPages = () => {
    const renderedPages = [];
    let startPage = Math.max(currentPage - displayPages, 1);
    let endPage = Math.min(currentPage + displayPages, totalPages);

    if (startPage > 1) {
      renderedPages.push(
        <button key="start-ellipsis" className="pagination-button" disabled>
          {'...'}
        </button>
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      renderedPages.push(
        <button
          key={page}
          className={`pagination-button ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      );
    }

    if (endPage < totalPages) {
      renderedPages.push(
        <button key="end-ellipsis" className="pagination-button" disabled>
          {'...'}
        </button>
      );
    }

    return renderedPages;
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        {'<<'}
      </button>

      {renderPages()}

      <button
        className="pagination-button"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        {' >>'}
      </button>
    </div>
  );
};

export default Pagination;
