import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import BasicTable from "./BasicTable";
import { postEPK } from "./Requests";

const PreviewTable = (props) => {
    const { dataJson , category ,typePlantilla , typeDocument  } = props;

    // go to previous section
    const prevSection = () => {
        props.setSection(2);
    };
    // la data se envia al backend y se vuelve a la seccion inicial
    const finishSection = async () => {
        let response;
        // si la categoria es EPK se envia  el tipo de documento
        if (category === "EPK") {
            response = await postEPK({ [category]:{[typePlantilla]:dataJson} , typeDocument });
        }else{
            response = await postEPK({ [category]:{[typePlantilla]:dataJson} });
        }

        console.log(response);
        if (response?.status === 200) {
            props.setSnackbar({
                open: true,
                message: "Se ha importado correctamente toda la data",
            });
            props.setCategory("");
            props.setSection(1);
        } else {
            props.setSnackbar({
                open: true,
                message: "Error al importar la data",
                severity: "error",
            });
        }
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
            <Stack spacing={2} direction="column"> 
                {/* componente que muestra la data en una tabla */}
                <BasicTable Data={props.dataJson} /> 
            </Stack>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {/* botones para navegar entre secciones*/}
                <Button
                    variant="outlined"
                    sx={{ marginRight: "1rem" }}
                    onClick={prevSection}
                >
                    Atras
                </Button>
                <Button
                    sx={{ marginLeft: "1rem" }}
                    variant="contained"
                    onClick={finishSection}
                >
                    Finalizar
                </Button>
            </Box>           
        </div>
    );
};

export default PreviewTable;
