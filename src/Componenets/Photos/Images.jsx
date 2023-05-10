import React, { useEffect, useState } from "react";
import "./Images.css";
import axios from "axios";
import { useInfiniteQuery, useQuery } from "react-query";
import { Dna } from "react-loader-spinner";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Images = () => {
  const fetchImages = async ({pageParam = 1}) => {
    const response = await axios.get(
      `https://api.unsplash.com/photos/?client_id=W5R_xL3DvFvEfEY2PmyR3uTzhaRMT3xZv_53VS9OF4I&per_page=30&page=${pageParam}`
    );
    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 340) {
        return pages.length + 1
      } else {
        return undefined;
      }
      
    }

  });

  console.log(data);

  useEffect(() => {

    const onScroll = (event) => {
      // ScrollHeight, the height of the entire document, including non-visible content
      // Scroll top,  the number of pixels that the document is currently scrolled vertically
      // client height, the height of the visible area of the document
      const { scrollHeight, scrollTop, clientHeight } = event.currentTarget.scrollElement

      if (scrollHeight - scrollTop <= clientHeight * 1.3) {
        console.log('This is inifite scrolling');
      } else {
        console.log('.....');
      }

    }

    document.addEventListener("scroll", onscroll);
    return () => {
      document.removeEventListener("scroll", onScroll)
    }

  }, []);

  if (isLoading) {
    return <Dna />;
  }

  if (isError) {
    return <p>ERROR: {error.message}</p>;
  }


  return (
    <div className="imagesList">
      <ImageList variant="masonry" cols={3} gap={10}>
        {/* {data?.map((image) => {
          return (
            <ImageListItem key={image.id}>
              <img
                className="image"
                src={image.urls?.regular}
                alt={image.alt_description}
                loading="lazy"
              />
            </ImageListItem>
          );
        })} */}
      </ImageList>
    </div>
  );
};

export default Images;
