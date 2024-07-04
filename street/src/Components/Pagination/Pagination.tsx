import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Pagination.module.css'


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  publicId: string | undefined;
}

export default function Pagination({ currentPage, totalPages, onPageChange, publicId }: PaginationProps) {

  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    navigate(`/statistiken/${publicId}/spiele/${page}`);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        startPage = 1;
        endPage = maxPagesToShow - 2;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - (maxPagesToShow - 3);
        endPage = totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (startPage > 2) pageNumbers.unshift('...');
      if (startPage > 1) pageNumbers.unshift(1);

      if (endPage < totalPages - 1) pageNumbers.push('...');
      if (endPage < totalPages) pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button 
        onClick={() => handlePageChange(1)} 
        disabled={currentPage === 1} 
        className="pagination-button">
        First
      </button>
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        className="pagination-button">
        Previous
      </button>
      {generatePageNumbers().map((page, index) => (
        typeof page === 'string' ? (
          <span key={index} className="pagination-ellipsis">{page}</span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageChange(page as number)}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`}>
            {page}
          </button>
        )
      ))}
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className="pagination-button">
        Next
      </button>
      <button 
        onClick={() => handlePageChange(totalPages)} 
        disabled={currentPage === totalPages} 
        className="pagination-button">
        Last
      </button>
    </div>
  );
}
