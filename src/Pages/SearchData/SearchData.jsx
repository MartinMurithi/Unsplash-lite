import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

function SearchData() {
  const [search, setSearch] = useState("");
  // const SEARCH_API_URL = `https://api.unsplash.com/search/photos?client_id=W5R_xL3DvFvEfEY2PmyR3uTzhaRMT3xZv_53VS9OF4I&page=1&per_page=30&query=${search}`;

  const searchImages = async (page = 1) => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=W5R_xL3DvFvEfEY2PmyR3uTzhaRMT3xZv_53VS9OF4I&page=${page}&per_page=30&query=${search}`
    );
    return response.data.results;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["data"],
    ({ pageParam = 1 }) => searchImages(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.length > 0 ? nextPage : undefined;
      },
    },
    { enabled: false }
  );

  // refetch, fetches data manually
  // By default, react query fetches data when a component is mounted, to prevent that, set enabled = false.

  useEffect(() => {
    const onScroll = async (event) => {
      let fetching = false;
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        if (hasNextPage) await fetchNextPage();
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <ThreeDots />;
  }

  if (isError) {
    return <p>ERROR : {error.message}</p>;
  }

  const handleSearch = () => {
    refetch();
  };
  return (
    <>
      <div>
        <input
          type="search"
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
        <p className="searchText">
          Trending: 3D, Nature, Wallpapers, love, film
        </p>
      </div>

      {/* Uses the same css styles with the images list */}
      <div className="imageList">
        <ImageList variant="masonry" cols={3} gap={10}>
          {data?.pages?.map((page) =>
            page.map((image) => (
              <ImageListItem key={image.id}>
                <img
                  className="image"
                  src={image.urls?.small}
                  alt={image.alt_description}
                  color={image.color}
                  loading="lazy"
                />
                <p className="authorNames">
                  {image.user?.first_name} {image.user?.last_name}
                </p>
              </ImageListItem>
            ))
          )}
        </ImageList>
      </div>
    </>
  );
}

export default SearchData;
