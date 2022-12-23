import { Button } from "@mui/material";
import React from "react";
import { saveAs } from 'file-saver'; // <-- libreria para descargar el archivo
import DownloadIcon from "@mui/icons-material/Download";

function DownloadJSONButton(props) {
    // funcion para descargar el archivo json
    function downloadJSON() {
        try {
            const fileName = props.fileName;  // <-- nombre del archivo
            const jsonContent =JSON.stringify(props.jsonContent);   // <-- contenido del archivo
            if (jsonContent.length <= 2) {
                alert("No hay datos para descargar");
            }else{
                const blob = new Blob([jsonContent], { type: "application/json" });
                saveAs(blob, fileName);  // <-- descarga el archivo
            }          
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <Button variant="contained" endIcon={<DownloadIcon />} onClick={downloadJSON}>
            Descargar Plantilla
        </Button> 
    );
}

export default DownloadJSONButton;
