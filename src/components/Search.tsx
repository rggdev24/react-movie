import type { Dispatch, SetStateAction } from "react";

function Search(props: {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  return (
    <input
      onChange={(e) => props.setSearch(e.target.value)}
      type="text"
      placeholder="Search"
      value={props.search}
    ></input>
  );
}

export default Search;
