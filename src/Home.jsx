// import logo from './logo.svg';
// import './App.css';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// function Home() {

//   const users = useSelector((state) => state.users);
//   console.log(users)

//   return (
//     <div className='container'>
//       <h2>CRUD</h2>
//       <Link to="/create" className='btn btn-success my-3'>Create +</Link>
//       <table className='table'>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr key={index}>
//               <td>{user.id}</td>
//                             <td>{user.name}</td>
//                             <td>{user.email}</td>
//                             <td>
//                               <button className='btn btn-primary'>Edit</button>
//                               <button className='btn btn-danger'>Delete</button>
//                             </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Home;


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { updateCellValue } from './redux/UserReducer'

function Home() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(users);

  const [editableUsers, setEditableUsers] = useState(users);
  const [editedData, setEditedData] = useState([]);

  const handleEditCellChange = (newRow) => {
    setEditableUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === newRow.id ? { ...user, ...newRow } : user))
    );
    // dispatch(updateCellValue(newRow));
    // Track edited data
    setEditedData((prevData) => [...prevData, newRow]);
    console.log(newRow)
    const updatedUsers = JSON.parse(localStorage.getItem('editableUsers')) || [];
    const index = updatedUsers.findIndex((user) => user.id === newRow.id);
    if (index !== -1) {
      updatedUsers[index] = newRow;
    } else {
      updatedUsers.push(newRow);
    }
    localStorage.setItem('editableUsers', JSON.stringify(updatedUsers));

    console.log(newRow);
  };

  const handleSave = () => {
    console.log(JSON.stringify(editedData));
  };
  

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, editable: false },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
  ];

  return (
    <div className='container'>
      <h2>CRUD</h2>
      <Link to='/create' className='btn btn-success my-3'>
        Create +
      </Link>
      <button onClick={handleSave} className='btn btn-primary my-3'>
        Save
      </button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          editMode='row'
          rows={editableUsers}
          columns={columns}
          pageSize={5}
          editable
          processRowUpdate={handleEditCellChange}
        />
      </div>
    </div>
  );
}

export default Home;



// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { DataGrid } from '@mui/x-data-grid';
// import { updateCellValue } from './redux/UserReducer';
// import { fetchColumns, fetchData } from './redux/api'

// function Home() {
//   const dispatch = useDispatch();
//   const [columns, setColumns] = useState([]);
//   const [editableUsers, setEditableUsers] = useState([]);

//   useEffect(() => {
//     // Fetch columns from the API when component mounts
//     const fetchColumnsData = async () => {
//       const fetchedColumns = await fetchColumns();
//       setColumns(fetchedColumns);
//     };
//     fetchColumnsData();

//     // Fetch data from the API when component mounts
//     const fetchDataFromApi = async () => {
//       const data = await fetchData();
//       setEditableUsers(data);
//     };
//     fetchDataFromApi();
//   }, []);

//   const handleEditCellChange = (newRow) => {
//     setEditableUsers((prevUsers) =>
//       prevUsers.map((user) => (user.id === newRow.id ? { ...user, ...newRow } : user))
//     );
//     dispatch(updateCellValue(newRow));
//     console.log(newRow)
//     const updatedUsers = JSON.parse(localStorage.getItem('editableUsers')) || [];
//     const index = updatedUsers.findIndex((user) => user.id === newRow.id);
//     if (index !== -1) {
//       updatedUsers[index] = newRow;
//     } else {
//       updatedUsers.push(newRow);
//     }
//     localStorage.setItem('editableUsers', JSON.stringify(updatedUsers));

//     console.log(newRow);
//   };

//   return (
//     <div className='container'>
//       <h2>CRUD</h2>
//       <Link to='/create' className='btn btn-success my-3'>
//         Create +
//       </Link>
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           editMode='row'
//           rows={editableUsers}
//           columns={columns}
//           pageSize={5}
//           editable
//           processRowUpdate={handleEditCellChange}
//         />
//       </div>
//     </div>
//   );
// }

// export default Home;