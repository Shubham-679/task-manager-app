import React from 'react';

const TableHeader = ({ onSort, sortColumn, columns}) => {
    const raiseSort = (path) => {
        const sortColumns = { ...sortColumn }
        if (sortColumns.path === path) {
          sortColumns.order = sortColumns.order === "asc" ? "desc" : "asc";
        } else {
          sortColumns.path = path;
          sortColumns.order = "asc";
        }
        onSort(sortColumns)
      }
      const renderSortIcon = (column) => {
        const sortCoulmn = {...sortColumn}
        if(column.path !== sortCoulmn.path ) return null;
        if (sortCoulmn.order === "asc") return <i className="fa fa-sort-asc"></i> 
        return <i className="fa fa-sort-desc"></i>
      }
    return ( 
        <thead>
        <tr>
          {columns.map((column) => (
            <th
            key={column.path} 
            onClick={() => raiseSort(column.path)}>{column.label}
            {renderSortIcon(column)} 
            </th>
          ))}
        </tr>
      </thead>
     );
}
 
export default TableHeader;