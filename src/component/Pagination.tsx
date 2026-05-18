// components/Pagination.tsx

"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const handleClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const generatePages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (
        (i === currentPage - 2 && currentPage > 4) ||
        (i === currentPage + 2 && currentPage < totalPages - 3)
      ) {
        pages.push("...");
      }
    }

    return Array.from(new Set(pages));
  };

  const baseButtonClasses = `w-9 h-9 flex items-center justify-center rounded-[4px] text-sm border font-sora transition`;

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap font-sora">
      {/* Prev Button */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={isFirst}
        className={`${baseButtonClasses} ${
          isFirst
            ? "text-[#C4CDD5] border-[#C4CDD5] cursor-not-allowed"
            : "text-black border-black hover:bg-gradient-to-r hover:from-[#154565] hover:to-[#793146] hover:text-white"
        }`}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page Numbers */}
      {generatePages().map((page, idx) =>
        page === "..." ? (
          <span
            key={idx}
            className="w-9 h-9 flex items-center justify-center text-[#C4CDD5] text-sm select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => handleClick(Number(page))}
            className={`${baseButtonClasses} ${
              currentPage === page
                ? "bg-gradient-to-r from-[#154565] to-[#793146] text-white border-transparent"
                : "text-black border-black hover:bg-gradient-to-r hover:from-[#154565] hover:to-[#793146] hover:text-white"
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={isLast}
        className={`${baseButtonClasses} ${
          isLast
            ? "text-[#C4CDD5] border-[#C4CDD5] cursor-not-allowed"
            : "text-black border-black hover:bg-gradient-to-r hover:from-[#154565] hover:to-[#793146] hover:text-white"
        }`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
