// api.js

export const fetchData = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const fetchColumns = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();

    // Assuming the first item in the response has all the column names
    const columns = Object.keys(data[0]).map((key) => ({
      field: key,
      headerName: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
      width: 150, // Set a default width
      editable: true, // Assume all columns are editable
    }));

    return columns;
  } catch (error) {
    console.error('Error fetching columns:', error);
    return [];
  }
};
