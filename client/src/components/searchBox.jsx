import React from 'react';

const SearchBox = ({ value, onChange}) => {
    return ( 
        <input
        type="text"
        name="search"
        className="form-control"
        placeholder="Search Here..."
        value={value}
        onChange={e=> onChange(e.currentTarget.value)}
        />
    );
}
 
export default SearchBox;