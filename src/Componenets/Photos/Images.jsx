import React, { useEffect } from "react";
import "./Images.css";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { Dna } from "react-loader-spinner";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Images = () => {
  const fetchImages = async (page = 1) => {
    const response = await axios.get(
      `https://api.unsplash.com/photos?client_id=W5R_xL3DvFvEfEY2PmyR3uTzhaRMT3xZv_53VS9OF4I&per_page=30&page=${page}`
    );
    return response.data;
  };

  const { data, isLoading, isError, error, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ["images"],
      ({ pageParam = 1 }) => fetchImages(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return lastPage.length > 0 ? nextPage : undefined;
        },
      }
    );

  useEffect(() => {
    let fetching = false;

    const onScroll = async (event) => {
      // ScrollHeight, the height of the entire document, including non-visible content
      // Scroll top,  the number of pixels that the document is currently scrolled vertically
      // client height, the height of the visible area of the document
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <Dna />;
  }

  if (isError) {
    return <p>ERROR: {error.message}</p>;
  }

  console.log(data);
  return (
    <div className="imagesList">
      <ImageList variant="masonry" cols={3} gap={13}>
        {data.pages.map((page) =>
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
                  {image.user?.first_name } {image.user?.last_name}
                </p>
            </ImageListItem>
          ))
        )}
      </ImageList>
    </div>
  );
};

export default Images;
