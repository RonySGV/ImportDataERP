import { Autocomplete, Box, Button, TextField } from "@mui/material";

const TabSelectCategory = ( props ) => {
    // estado provisto por el componente padre
    const { category, setCategory } = props;
    // go to next section
    const nextSection = () => {
        if (category === "") {
            props.setSnackbar({
                open: true,
                message: "Selecciona una categoria",
                severity: "error",
            });
        }else{
            props.setSection(2); 
        }
    };
    return (
        <div>
            <p>Para iniciar la importacion elige una categoria:</p>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Autocomplete // combobox para elegir la categoria
                    id="combo-box-demo"
                    sx={{ width: 250 }}
                    options={[
                        { title: "ART" },
                        { title: "CLT" },
                        { title: "PRV" },
                        { title: "EPK" },
                    ]}
                    getOptionLabel={option => option.title}                   
                    isOptionEqualToValue={(option, value) =>
                        option.title === value.title
                    }
                    onChange={(event, newValue) => {
                        setCategory(newValue.title);
                    }}
                    renderInput={params => (
                        <TextField {...params} label="Categoria" />
                    )}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                }}
            >
                <Button variant="contained" onClick={nextSection}>
                    Continuar
                </Button>
            </Box>
            
        </div>
    );
};

export default TabSelectCategory;
