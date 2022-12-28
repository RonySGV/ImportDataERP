import React from "react";
import {
    Alert,
    AlertTitle,
    Autocomplete,
    Box,
    Button,
    Grid,
    Stack,
    TextField,
} from "@mui/material";
import DownloadJSONButton from "./DownloadJson";
import { Close } from "@mui/icons-material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {ConvertImportToJson} from "./ConvertImportToJson";

export default function TabUploadFile(props) {
    const [file, setFile] = React.useState(null);

    // si hay un archivo subido, pasa a la siguiente seccion
    const nextSection = () => {
        if (file) {
            if (
                file.type === "text/csv" ||
                file.type ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ) {
                if (props.typePlantilla === "") {
                    props.setSnackbar({
                        open: true,
                        message: "Debe seleccionar un tipo de plantilla",
                        severity: "error",
                    });
                } else {
                    if (props.category === "EPK" && props.typeDocument === "") {
                        props.setSnackbar({
                            open: true,
                            message: "Debe ingresar un tipo de documento",
                            severity: "error",
                        });
                    } else {
                        props.setSection(3); // <-- pasa a la seccion 3
                    }
                }
            } else {
                console.log(file.type);
                props.setSnackbar({
                    open: true,
                    message: "El archivo debe ser de tipo CSV",
                    severity: "error",
                });
            }
        } else {
            props.setSnackbar({
                open: true,
                message: "Debe subir un archivo",
                severity: "error",
            });
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
        ConvertImportToJson(
            e.target.files[0],
            props.setDataJson,
            props.setSnackbar
        ); // <-- convierte el archivo y xlsx csv a json
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
        ConvertImportToJson(
            e.dataTransfer.files[0],
            props.setDataJson,
            props.setSnackbar
        ); // <-- convierte el archivo csv y xlsx a json
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

            <Stack direction="row" justifyContent="flex-start" spacing={2}>
                {/* combox para el tipo de plantilla */}
                <Autocomplete
                    id="combo-box-demo"
                    options={[
                        { title: "WMS" },
                        { title: "SAK" },
                        { title: "BigCommerce" },
                    ]}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            props.setTypePlantilla(newValue.title);
                        }
                    }}
                    getOptionLabel={option => option.title}
                    isOptionEqualToValue={(option, value) =>
                        option.title === value.title
                    }
                    style={{ width: 300, marginBottom: "1rem" }}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label="Plantilla"
                            variant="outlined"
                        />
                    )}
                />

                {/* seccion para subir el archivo */}
                {props.category === "EPK" && (
                    <TextField
                        id="outlined-basic"
                        label="Tipo de documento"
                        variant="outlined"
                        onChange={e => props.setTypeDocument(e.target.value)}
                    />
                )}
            </Stack>

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
                        accept=".csv , .xls, .xlsx"
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
