import React from 'react';

const SearchBox = ({ value, onChange}) => {
    return ( 
        <input
        type="text"
        name="search"
        className="form-control m-3"
        placeholder="Search Here..."
        value={value}
        onChange={e=> onChange(e)}
        />
    );
}

export default SearchBox;