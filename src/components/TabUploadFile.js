import React from "react";
import { Alert, AlertTitle, Box, Button, Grid, Snackbar, Stack } from "@mui/material";
import DownloadJSONButton from "./DownloadJson";
import { Close } from "@mui/icons-material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export default function TabUploadFile(props) {
    const [file, setFile] = React.useState(null);

    // si hay un archivo subido, pasa a la siguiente seccion
    const nextSection = () => {
        if (file) {
            if (file.type === "text/csv") {
                props.setSection(3); // <-- pasa a la seccion 3
            } else {
                props.setSnackbar({ open: true, message: "El archivo debe ser de tipo CSV", severity: "error" });
            }
        } else {
            props.setSnackbar({ open: true, message: "Debe subir un archivo", severity: "error" });
        }
    };
    // regresa a la seccion anterior
    const prevSection = () => {
        props.setCategory("");
        props.setSection(1);
    };

    // funcion para cargar el archivo
    const handleFile = e => {
        e.preventDefault();
        setFile(e.target.files[0]);
        convertToJsonObject(e.target.files[0]);
    };
    // funcion para convertir el archivo csv a json
    const convertToJsonObject = file => {
        const reader = new FileReader();
        reader.onload = event => {
            const csvData = event.target.result;
            const jsonData = [];
            const lines = csvData.split("\n");
            const headers = lines[0].split(",");

            for (let i = 1; i < lines.length; i++) {
                const obj = {};
                const currentline = lines[i].split(",");

                for (let j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }

                jsonData.push(obj);
            }
            props.setDataJson(jsonData); // <-- setea al estado el contenido convertido
        };
        reader.readAsText(file);
    };

    // funcion para eliminar el archivo subido
    const handleDeleteFile = () => {
        setFile(null);
        props.setDataJson([]);
    };
    // funcion para recibir el archivo arrastrado (drag and drop)
    const onDrop = e => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
        if (e.dataTransfer.files[0].type === "text/csv") {
            convertToJsonObject(e.dataTransfer.files[0]);
        }
    };
    // funcion para evitar que el archivo se abra en el navegador
    const onDragOver = e => {
        e.preventDefault();
    };

    return (
        <div>
            <p>
                Categoria:
                <strong
                    style={{
                        backgroundColor: "#E7E7BA", //
                        borderRadius: "5px",
                        padding: "15px",
                        marginLeft: "1.5rem",
                    }}
                >
                    {props.category}
                </strong>
            </p>
            <p>Carga el archivo que contiene la data:</p>
            {file ? ( // <-- si hay un archivo subido, muestra el nombre y el boton de eliminar
                <Grid // <-- seccion para mostrar el archivo subido
                    container
                    style={{
                        marginTop: "2rem",
                        backgroundColor: "#f5f5f5",
                        padding: "1.4rem",
                        borderRadius: "5px",
                    }}
                >
                    <Grid item lg={9}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <UploadFileIcon // <-- icono de archivo subido
                                color="primary"
                                fontSize="large"
                                style={{
                                    backgroundColor: "#D0EEFF",
                                    padding: "0.6rem",
                                    borderRadius: "50%",
                                    marginRight: "1rem",
                                }}
                            />
                            <div>
                                {file.name}
                                <br />
                                {file.size + "kb "} - Completado
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={1}></Grid>
                    <Grid
                        item
                        lg={1}
                        sx={{
                            display: "flex",
                            justifyContent: "end",
                        }}
                    >
                        <Button onClick={handleDeleteFile}>
                            <Close />
                        </Button>
                    </Grid>
                    <Grid
                        item
                        lg={1}
                        style={{
                            display: "flex",
                            justifyContent: "end",
                        }}
                    >
                        <CheckCircleRoundedIcon
                            color="success"
                            fontSize="large"
                        />
                    </Grid>
                </Grid>
            ) : (
                // <-- si no hay archivo subido, muestra el boton para subir
                <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{
                        border: "1px dashed",
                        height: "10rem",
                        color: "gray",
                    }}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    <Stack alignItems="center" alignContent="center">
                        <UploadFileIcon color="primary" fontSize="large" />
                        <strong>
                            Click para subir o arrastra y suelta aqui
                        </strong>
                        <p>XLS o CSV(max. 10MB)</p>
                    </Stack>

                    <input
                        hidden
                        accept=".csv"
                        type="file"
                        onChange={handleFile}
                    />
                </Button>
            )}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                }}
            >
                <Button // <-- boton para regresar a la seccion anterior
                    variant="outlined"
                    sx={{ marginRight: "1rem" }}
                    onClick={prevSection}
                >
                    Atras
                </Button>
                <Button // <-- boton para pasar a la siguiente seccion
                    sx={{ marginLeft: "1rem" }}
                    variant="contained"
                    onClick={nextSection}
                >
                    Continuar
                </Button>
            </Box>

            <Box sx={{ marginTop: "10em" }}>
                {/* <-- alerta con boton para descargar plantilla*/}
                <Alert severity="info">
                    <AlertTitle>
                        <strong>Plantilla</strong>
                    </AlertTitle>
                    <p>
                        Puedes utilizar tambien nuestra plantilla para organizar
                        toda la data.
                    </p>
                    <DownloadJSONButton // <-- componente para descargar plantilla
                        fileName="ArchivoJson.json" // <-- nombre del archivo
                        jsonContent={props.dataJson}
                    />
                </Alert>
            </Box>
        </div>
    );
}
