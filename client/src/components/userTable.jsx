import React from 'react';

const UserTable = ({ tasks, onSort}) => {

    return (  
        <div>
        <table className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th onClick={()=> onSort('description')}>Description</th>
              <th onClick={()=> onSort('status')}>Status</th>
              <th onClick={()=> onSort('owner.name')}>Assigned To</th>
              <th onClick={()=> onSort('createdAt')}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index+1}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.owner.name}</td>
                <td>{task.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
 
export default UserTable;