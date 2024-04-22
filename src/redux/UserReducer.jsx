import { createSlice } from "@reduxjs/toolkit";
import { UserList } from "./Data";

const userSlice = createSlice({
    name: "users",
    initialState: UserList,
    reducers: {
        addUser: (state, action) => {
            console.log(action)
            state.push(action.payload);
        },
        updateCellValue: (state, action) => {
            const { id, name, email } = action.payload;
            const userIndex = state.findIndex(user => user.id === id);
            if(userIndex !== -1) {
                const userToUpdate = state[userIndex];
                userToUpdate.name = name;
                userToUpdate.email = email;
            }
        }
    }
})

export const {addUser, updateCellValue} = userSlice.actions;
export default userSlice.reducer;




// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchData } from "./api"; // Import the fetchUsers function

// // Define an async thunk to fetch initial state data
// export const fetchInitialUsers = createAsyncThunk(
//   "users/fetchInitialUsers",
//   async () => {
//     const response = await fetch("https://jsonplaceholder.typicode.com/todos"); //fetchData(); // Call the fetchUsers function
//     return response.data; 
//   }
// );

// const userSlice = createSlice({
//   name: "users",
//   initialState: [],
//   reducers: {
//     addUser: (state, action) => {
//       console.log(action);
//       state.push(action.payload);
//     },
//     // updateCellValue: (state, action) => {
//     //     const { id, name, email } = action.payload;
//     //     const userIndex = state.findIndex(user => user.id === id);
//     //     if(userIndex !== -1) {
//     //         const userToUpdate = state[userIndex];
//     //         userToUpdate.name = name;
//     //         userToUpdate.email = email;
//     //     }
//     // }
//     updateCellValue: (state, action) => {
//         const { id, ...updatedFields } = action.payload;
//         const userIndex = state.findIndex(data => data.id === id);
//         if (userIndex !== -1) {
//             Object.assign(state[userIndex], updatedFields);
//         }
//     }
//   },
//   extraReducers: (builder) => {
//     // builder.addCase(fetchInitialUsers.pending, (state, action) => {
//     //   state.isLoading = true;
//     // });
//     builder.addCase(fetchInitialUsers.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.data = action.payload;
//     });
//     // builder.addCase(fetchInitialUsers.rejected, (state, action) => {
//     //   console.log("Error", action.payload);
//     //   state.isError = true;
//     // });
//   },
// });

// export const { addUser, updateCellValue } = userSlice.actions;
// export default userSlice.reducer;
