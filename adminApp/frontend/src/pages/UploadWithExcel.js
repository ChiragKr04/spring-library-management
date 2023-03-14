import React from 'react'
import Papa from 'papaparse';

export default function UploadWithExcel() {
  const [file, setFile] = React.useState(null);
  const [data, setData] = React.useState(null);

  const checkValidFile = (fileName) => {
    if (!fileName.endsWith('.csv')
      && !fileName.endsWith('.xls')
      && !fileName.endsWith('.xlsx')) {
      return false;
    }
    return true;
  }

  const handleFileChange = (event) => {
    const allowedTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    const selectedFile = event.target.files[0];
    if (checkValidFile(selectedFile.name)) {
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        Papa.parse(selectedFile, {
          complete: (results) => {
            console.log(results.data);
            setData(results.data);
          }
        });
      } else {
        setFile(null);
        setData(null);
      }
    } else {
      alert('You can upload .csv, .xls, .xlsx files only.');
      setFile("");
      setData("");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const allowedTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    const selectedFile = event.dataTransfer.files[0];
    if (checkValidFile(selectedFile.name)) {
      if (selectedFile && allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        Papa.parse(selectedFile, {
          complete: (results) => {
            const jsonData = JSON.parse(JSON.stringify(results.data));
            console.log(jsonData);
            setData(jsonData);
          }
        });
      } else {
        setFile(null);
        setData(null);
      }
    } else {
      alert('You can upload .csv, .xls, .xlsx files only.');
      setFile("");
      setData("");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv, .xls, .xlsx"
        onChange={handleFileChange} />
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: '2px dashed gray',
          borderRadius: '5px',
          padding: '25px',
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <p>Drag and drop your file here</p>
      </div>
      {data && (
        <div>
          <h2>Selected File:</h2>
          <p>{file.name}</p>
          <h2>CSV Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

