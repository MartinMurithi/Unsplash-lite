import React, { useEffect } from "react";
import "./Images.css";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { Dna } from "react-loader-spinner";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Modal from "../Modal/Modal";

function Images() {
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
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
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

  // console.log(data);

  return (
    <>
      <p className="reccommendation">Reccommended for you</p>
      <div className="imagesList">
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            350: 1,
            750: 2,
            900: 3,
          }}
        >
          <Masonry gutter="20px">
            {data &&
              data.pages &&
              data.pages.map((page) =>
                page?.map((image) => (
                  <div className="imgContainer" key={image.id}>
                    {/* <a
                      href={image.urls?.regular}
                      target="_blank"
                      rel="noopener noreferrer"
                    > */}
                      <img
                        className="image"
                        src={image.urls?.small}
                        alt={image.alt_description}
                        color={image.color}
                        loading="lazy"
                      />
                      <Modal image={image} className="modal" />
                    {/* </a> */}
                  </div>
                ))
              )}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}

export default Images;
