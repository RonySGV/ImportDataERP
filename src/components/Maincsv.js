import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Stack,
    TextField,
} from "@mui/material";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import BasicTable from "./CreateTable";
import DownloadJSONButton from "./DownloadJson";

const Maincsv = () => {
    const [dataJson, setDataJson] = React.useState([]);
    
    const handleClickSave = () => {
        dataJson.length > 0 ? 
        alert("Datos guardados") : alert("No hay datos para guardar");
    };
    const handleClickCargar = (file) => {
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
            setDataJson(jsonData);
        };
        reader.readAsText(file);
    };

    const handleFile = e => {
        handleClickCargar(e.target.files[0]);
    };

    return (
        <div style={{ marginTop: "1rem" }}>
            <Container maxWidth="lg">
                <Card>
                    <CardContent>
                        <h1
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            CSV
                        </h1>
                        <Stack spacing={2} direction="row">
                            <Button
                                style={{ paddingRight: "1.5rem" , paddingLeft: "1.5rem" }}
                                size="small"
                                variant="contained"
                                component="label"
                                startIcon={<AttachFileIcon />}
                            >
                                Cargar
                                <input hidden accept=".csv" type="file" onChange={handleFile} />
                            </Button>
                            <Autocomplete
                                id="combo-box-demo"
                                fullWidth
                                options={[
                                    { title: "ART" },
                                    { title: "CLT" },
                                    { title: "PRV" },
                                ]}
                                getOptionLabel={option => option.title}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="Tipo"
                                        variant="outlined"
                                    />
                                )}
                            />
                            
                            <DownloadJSONButton fileName="ArchivoJson.json" jsonContent={dataJson} />
                        </Stack>
                        <BasicTable Data={dataJson}/>
                        <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <Button
                                style={{ marginTop: "15rem" }}
                                color="secondary"
                                variant="contained"
                                endIcon={<SaveIcon />}
                                onClick={handleClickSave}
                            >
                                Guardar
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default Maincsv;
