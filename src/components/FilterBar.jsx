import React from "react";

const FilterBar = ({
  filter,
  setFilter,
  sort,
  setSort,
  search,
  setSearch,
}) => {
  return (
    <div>
      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="None">Sort</option>
        <option value="High">High</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
};

export default FilterBar;