import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./SearchData.css";
import { FaSearch } from "react-icons/fa";
import Modal from "../../Componenets/Modal/Modal";

function SearchData() {
  const [search, setSearch] = useState("");

  const searchImages = async (page = 1) => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_CLIENT_ID}&page=${page}&per_page=30&query=${search}`
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

  const handleInputSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    refetch();
  };
  return (
    <>
      <div className="searchUtils">
        <input
          type="search"
          id="searchInput"
          placeholder="Search high resolution images"
          value={search}
          onChange={handleInputSearch}
        />
        <button className="searchBtn" onClick={handleSearch}>
          Search
        </button>
        <FaSearch className="searchIcon" onClick={handleSearch} />
      </div>

      {search ? <p className="textResults">{search}</p> : null}

      {/* Uses the same css styles with the images list */}
      <div className="imagesList">
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            350: 1,
            750: 2,
            900: 3,
          }}
        >
          <Masonry gutter="20px">
            {data.pages.length > 0 ? (
              data.pages &&
              data.pages.map((page) =>
                page?.map((image) => (
                  <div className="imgContainer" key={image.id}>
                    <a
                      href={image.urls?.regular}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        className="image"
                        src={image.urls?.small}
                        alt={image.alt_description}
                        color={image.color}
                        loading="lazy"
                      />
                      <Modal image={image} className="modal" />
                    </a>
                  </div>
                ))
              )
            ) : (
              <ThreeDots />
            )}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

export default SearchData;
