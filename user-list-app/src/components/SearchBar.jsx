import React from "react";
import { Input, Box } from "@chakra-ui/react";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <Box mb={4}>
      <Input
        placeholder="Search by name, company, role, or country"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Box>
  );
};

export default SearchBar;
