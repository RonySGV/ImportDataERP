import * as XLSX from 'xlsx';

export function ConvertImportToJson(file, setDataJson, setSnackbar) {
    if (file.type === "text/csv") {
        ConvertCsvToJson(file) // <-- convierte el archivo csv a json
            .then(jsonData => setDataJson(jsonData))
            .catch(error => {
                setSnackbar({
                    open: true,
                    message: "Error al intentar convertir el archivo " + error,
                    severity: "error",
                });
            });
    } else if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        ConvertXlsxToJson(file) // <-- convierte el archivo xlsx a json
            .then(jsonData => setDataJson(jsonData))
            .catch(error => {
                setSnackbar({
                    open: true,
                    message: "Error al intentar convertir el archivo " + error,
                    severity: "error",
                });
            });
    } else {
        setSnackbar({
            open: true,
            message: "Archivo no soportado",
            severity: "error",
        });
    }
}

export function ConvertXlsxToJson(file) {
    // function to convert xlsx to json
    const reader = new FileReader();
    const promise = new Promise((resolve) => {
        reader.onload = (event) => {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet);
            resolve(rows);
        };
    });
    reader.readAsBinaryString(file);
    return promise;
}

export function ConvertCsvToJson(file) {
    // function to convert csv to json
    const reader = new FileReader();
    const promise = new Promise((resolve) => {
        reader.onload = (event) => {
            const csvData = event.target.result;
            const jsonData = [];
            const lines = csvData.split("\r\n");
            const headers = lines[0].split(",");

            for (let i = 1; i < lines.length; i++) {
                const obj = {};
                const currentline = lines[i].split(",");
                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                jsonData.push(obj);
            }
            resolve(jsonData);
        };
    });
    reader.readAsText(file);
    return promise;
}

// Path: src\components\TabUploadFile.jsx
