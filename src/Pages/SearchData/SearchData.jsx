import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

function SearchData() {
  const [search, setSearch] = useState("");
  const SEARCH_API_URL = `https://api.unsplash.com/search/photos?client_id=W5R_xL3DvFvEfEY2PmyR3uTzhaRMT3xZv_53VS9OF4I&page=1&per_page=30&query=${search}`;

  const searchImages = async () => {
    const response = await axios.get(SEARCH_API_URL);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: "search",
    queryFn: searchImages,
  });

  if (isLoading) {
    return <ThreeDots />;
  }

  if (isError) {
    return <p>ERROR : {error.message}</p>;
  }

  const handleSearch = () => {
    console.log(data);
  };
 

  return (
    <div className="searchContainer">
      <input
        type="search"
        name="search"
        id="searchInput"
        placeholder="Search high resolution images"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button className="searchBtn" onClick={handleSearch}>
        Search
      </button>
      <p className="searchText">Trending: 3D, Nature, Wallpapers, love, film</p>
    </div>
  );
}

export default SearchData;
