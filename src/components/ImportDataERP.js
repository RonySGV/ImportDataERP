import { Alert, Card, CardContent, Container, Snackbar } from "@mui/material";
import React, { useState } from "react";
import TabSelectCategory from "./TabSelectCategory";
import TabPreviewTable from "./TabPreviewTable";
import TabUploadFile from "./TabUploadFile";
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";

const ImportDataERP = () => {
    // Estado para guardar la data del archivo subido y convertida a json
    const [dataJson, setDataJson] = React.useState([]);

    // Estado para controlar la seccion a mostrar
    const [section, setSection] = React.useState(1); 

    // Snackbar state para contrilar todos los states de la snackbar
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    // Estado para guardar la categoria de la data a importar
    const [category, setCategory] = useState("")

    return (
        <div>
            <Container maxWidth="100vw" style={{ fontSize: "1.2em" }}>
                <Card
                    sx={{ marginTop: "1em" }} // <-- Card que contiene el titulo
                >
                    <CardContent
                        style={{ paddingLeft: "4%", paddingRight: "4%" }}
                    >
                        <h1 style={{ color: "#007BFF" }}>
                            <DriveFolderUploadRoundedIcon
                                color="primary"
                                fontSize="large"
                            />
                            Importar Data ERP
                        </h1>
                        <p>
                            Importar data ERP para difertentes procesos de
                            gestion de tu centro de distribución.
                        </p>
                    </CardContent>
                </Card>
                <Card sx={{ minHeight: "78vh" }}>
                    <CardContent // <-- Card que contiene el contenido de la pagina
                        style={{ paddingLeft: "4%", paddingRight: "4%" }}
                    >
                        {/* Renderiza el componente segun el estado de la variable section -->*/}
                        {section === 1 && (
                            // Seccion para seleccionar la categoria de la data a importar
                            <TabSelectCategory 
                            setSection={setSection} 
                            setSnackbar={setSnackbar}
                            setCategory={setCategory}
                            category={category} 
                            />
                        )}
                        {section === 2 && (
                            // Seccion para subir el archivo de la data a importar y mostrar la data en una tabla
                            <TabUploadFile
                                setDataJson={setDataJson}
                                dataJson={dataJson}
                                setSection={setSection}
                                setSnackbar={setSnackbar}
                                setCategory={setCategory}
                                category={category}
                            />
                        )}
                        {section === 3 && (
                            // Seccion para mostrar la data en una tabla y subirla a la base de datos
                            <TabPreviewTable
                                dataJson={dataJson}
                                setSection={setSection}
                                setSnackbar={setSnackbar}
                                setCategory={setCategory}
                                category={category}
                            />
                        )}
                        {/* snackbar para mostrar mensajes */}
                        <Snackbar
                            open={snackbar.open}
                            autoHideDuration={4000}
                            onClose={() => setSnackbar({ open: false })}
                        >
                            <Alert severity={snackbar.severity}> 
                                {snackbar.message}
                            </Alert>
                        </Snackbar>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default ImportDataERP;
