import { Button } from "@mui/material";
import React from "react";
import { saveAs } from 'file-saver';
import DownloadIcon from "@mui/icons-material/Download";

function DownloadJSONButton(props) {

    function downloadJSON() {
        try {
            const fileName = props.fileName;
            const jsonContent =JSON.stringify(props.jsonContent);
            if (jsonContent.length <= 2) {
                alert("No hay datos para descargar");
            }else{
                const blob = new Blob([jsonContent], { type: "application/json" });
                saveAs(blob, fileName);
                console.log(jsonContent);
            }          
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <Button variant="contained" endIcon={<DownloadIcon />} onClick={downloadJSON} style={{ paddingRight: "1.5rem" , paddingLeft: "1.5rem" }}>
            Descargar
        </Button> 
    );
}

export default DownloadJSONButton;
