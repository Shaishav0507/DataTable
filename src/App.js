// import logo from './logo.svg';
// import './App.css';
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Home from './Home';
// import Create from './Create';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/create' element={<Create />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;





import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

function App() {
  const [data, setData] = useState([
    { id: 1, name: '', country: 'India' },
    { id: 2, name: '', country: 'USA' },
    { id: 3, name: '', country: 'Australia' },
    { id: 4, name: '', country: 'Canada' },
    { id: 5, name: '', country: 'New Zealand' },
    { id: 6, name: '', country: 'Paris' },
    { id: 7, name: '', country: 'UK' },
    { id: 8, name: '', country: 'Russia' },
  ]);

  const handleCountryChange = (id, newValue) => {
    const updatedData = data.map((row) =>
      row.id === id ? { ...row, country: newValue, name: newValue === 'India' ? 'Rakesh' : row.name } : row
    );
    setData(updatedData);

    // Update the modified rows in localStorage
    const modifiedRow = updatedData.find((row) => row.id === id);
    const editedRows = JSON.parse(localStorage.getItem('editedRows')) || [];
    const existingEditedRow = editedRows.find((row) => row.id === id);

    if (modifiedRow && (!existingEditedRow || modifiedRow.name !== existingEditedRow.name)) {
      // Update local storage
      const updatedEditedRows = [...editedRows.filter((row) => row.id !== id), modifiedRow];
      localStorage.setItem('editedRows', JSON.stringify(updatedEditedRows));
    }

    return updatedData;
  };

  const handleSave = () => {
    const modifiedRows = JSON.parse(localStorage.getItem('editedRows')) || [];
    console.log(modifiedRows);

    // Clear localStorage (if needed)
    localStorage.removeItem('editedRows');
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      editable: false,
    },
    {
      field: 'country',
      headerName: 'Country',
      width: 130,
      editable: true,
      renderCell: (params) => (
        <select
          value={params.value}
          onChange={(e) => handleCountryChange(params.id, e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {['India', 'USA', 'Australia', 'Manual'].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
  ];

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     Papa.parse(file, {
  //       complete: (result) => {
  //         const uploadedRows = result.data.slice(0); // Exclude header row
  //         const updatedData = data.map((row) => {
  //           const uploadedRow = uploadedRows.find((item) => Number(item.ID) === row.id);
  //           if (uploadedRow) {
  //             if (row.name !== uploadedRow.Name) {
  //               row.country = uploadedRow.Country;
  //               row.name = uploadedRow.Name;
  //               return row;
  //             }
  //           }
  //           return row;
  //         });
  //         setData(updatedData);
  
  //         // Update the modified rows in localStorage
  //         const editedRows = JSON.parse(localStorage.getItem('editedRows')) || [];
  //         const updatedEditedRows = [...editedRows, ...uploadedRows];
  //         localStorage.setItem('editedRows', JSON.stringify(updatedEditedRows));
  //       },
  //       header: true, // Treat the first row as header
  //     });
  //   }
  // };  

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     Papa.parse(file, {
  //       complete: (result) => {
  //         const uploadedRows = result.data.slice(0).map(row => {
  //           const lowercaseRow = {};
  //           Object.keys(row).forEach(key => {
  //             lowercaseRow[key.toLowerCase()] = key === 'id' ? Number(row[key]) : row[key];
  //           });
  //           return lowercaseRow;
  //         }); // Exclude header row and convert keys to lowercase
  //         const updatedData = data.map((row) => {
  //           const uploadedRow = uploadedRows.find((item) => item.id === row.id);
  //           if (uploadedRow) {
  //             if (row.name !== uploadedRow.name) {
  //               row.country = uploadedRow.country;
  //               row.name = uploadedRow.name;
  //               return row;
  //             }
  //           }
  //           return row;
  //         });
  //         console.log(updatedData); // Log all rows, including unchanged ones
  //         setData(updatedData);
  
  //         // Update the modified rows in localStorage
  //         const editedRows = JSON.parse(localStorage.getItem('editedRows')) || [];
  //         const updatedEditedRows = [...editedRows, ...uploadedRows];
  //         localStorage.setItem('editedRows', JSON.stringify(updatedEditedRows));
  //       },
  //       header: true, // Treat the first row as header
  //     });
  //   }
  // };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const uploadedRows = XLSX.utils.sheet_to_json(worksheet, { header: 0 }).slice(0); // Exclude header row
        
        // const updatedData = data.map((row) => {
        //   const uploadedRow = uploadedRows.find((uploadedRow) => uploadedRow.ID === row.id);
        //   if (uploadedRow && row.name !== uploadedRow.Name) {
        //     return { ...row, country: uploadedRow.Country, name: uploadedRow.Name };
        //   }
        //   return row;
        // });
        
        // console.log("Updated Data:", updatedData);
        // setData(updatedData);
  
        // Update the modified rows in localStorage
        // const editedRows = JSON.parse(localStorage.getItem('editedRows')) || [];
        // const updatedEditedRows = [...editedRows, ...uploadedRows];
        
        const editedRows = JSON.parse(localStorage.getItem('editedRows')) || [];

        // Merge uploaded rows with existing data, updating existing records and adding new records if they don't exist
        const updatedEditedRows = editedRows.map(existingRow => {
          const uploadedRow = uploadedRows.find(row => String(row.ID).toLowerCase() === String(existingRow.id).toLowerCase());
          return uploadedRow ? { ...existingRow, name: uploadedRow.Name, country: uploadedRow.Country } : existingRow;
        });

        uploadedRows.forEach(uploadedRow => {
          const exists = updatedEditedRows.some(existingRow => String(existingRow.id).toLowerCase() === String(uploadedRow.ID).toLowerCase());
          if (!exists) {
            updatedEditedRows.push({ id: uploadedRow.ID, name: uploadedRow.Name, country: uploadedRow.Country });
          }
        });

        localStorage.setItem('editedRows', JSON.stringify(updatedEditedRows));
      };
      reader.readAsArrayBuffer(file);
    }
  };
  
  
  return (
    <div style={{ height: 700, width: '100%' }}>
      <button onClick={handleSave}>Save Modified Rows</button>
      <input type="file" accept=".xlsx, .csv" onChange={handleFileUpload} />
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

export default App;
