// component/Search.tsx (update if needed)
"use client";

import React, { useState } from 'react';

interface SearchProps {
  className?: string;
  onSearch?: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ className = '', onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder="Search PDFs..."
        value={searchTerm}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default Search;