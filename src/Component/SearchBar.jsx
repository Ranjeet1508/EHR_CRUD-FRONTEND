// SearchBar.jsx

import React, { useState } from 'react';
import { Input, InputGroup, InputRightElement, IconButton, Flex } from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value); 
  };

  const handleSearch = () => {
    onSearch(searchTerm); 
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch(''); 
  };

  return (
    <Flex justifyContent="center">
      <InputGroup w="60vh">
        <Input
          placeholder="Search Patient"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <InputRightElement>
          {searchTerm ? (
            <IconButton
              aria-label="Clear"
              icon={<CloseIcon />}
              onClick={handleClear}
            />
          ) : (
            <IconButton
              aria-label="Search"
              icon={<SearchIcon />}
              onClick={handleSearch}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
