import React from 'react';
import TableHeader from "./tableHeader";
import { Link } from "react-router-dom";

const UserTable = ({ tasks, onSort, sortColumn}) => {

  const columns = [
    { path:"description" ,label : "Description"},
    { path:"status" ,label : "Status"},
    { path:"owner.name" ,label : "User"},
    { path:"createdAt" , label : "Assigned Date"},
    { path:"deadline" ,label : "Deadline"},
    
  ]
  
    return (  
        <div>
        <table className="table table-bordered">
          <TableHeader
          columns = {columns}
          onSort = {onSort}
          sortColumn = {sortColumn}
          />
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.owner.name}</td>
                <td>{task.createdAt}</td>
                <td>{task.deadline}</td>
                <td>{<Link to={`/updatetask/${task._id}`}><i className="fa fa-pencil-square-o"></i></Link>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
 
export default UserTable;