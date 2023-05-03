import React, { useState } from "react";
import { useQuery } from "react-query";
import { Rings } from "react-loader-spinner";
import Character from "./Character";

const Characters = () => {
  const [page, setPage] = useState(1);

  const fetchCharacters = async ({ queryKey }) => {
    console.log(queryKey);
    let response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    return response.json();
  };

  const { data, status, error, isPreviousData } = useQuery({
    queryKey: ["characters", page],
      queryFn: fetchCharacters,
    keepPreviousData: true
  });

  if (status === "loading") {
    return <Rings />;
  }
  if (status === "error") {
    return <div>{error.message}</div>;
  }

  return (
    <div className="parentContainer">
      <div className="charactersContainer">
        {data.results.map((datum) => {
          return (
            <div key={datum.id}>
              <Character character={datum} />
            </div>
          );
        })}
      </div>
      <div className="btns">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <button disabled={isPreviousData || !data.info.next} onClick={()=>setPage((next)=> next + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Characters;
