import React, { useState } from 'react'

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
  const [totalPages] = useState(36); // Manually set since API doesn't return it

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + maxPagesToShow - 1);

    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");
    if (end < totalPages) pages.push(totalPages);

    return pages;
  };


  return (
    <div className="flex items-center gap-2 mt-8">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => changePage(1)}
        >
          First
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
        >
          Previous
        </button>

        {getPageNumbers().map((num, index) =>
          typeof num === "number" ? (
            <button
              key={index}
              className={`px-4 py-2 rounded-md ${
                num === page
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => changePage(num)}
            >
              {num}
            </button>
          ) : (
            <span key={index} className="px-2 text-gray-500">...</span>
          )
        )}

        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => changePage(page + 1)}
        >
          Next
        </button>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => changePage(totalPages)}
        >
          Last
        </button>
      </div>
  )
}

export default Pagination