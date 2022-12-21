import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell , { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";

export default function BasicTable(Data) {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
      }));
    return (
        <TableContainer component={Paper} style={{marginTop :"2rem"}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {Data.Data[0] &&
                            Object.keys(Data.Data[0]).map(key => (
                                <StyledTableCell key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</StyledTableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Data.Data[0] &&
                        Data.Data.map((row,index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0,
                                    },
                                }}
                            >
                                {Object.keys(row).map(key => (
                                    <TableCell key={key}>{row[key]}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
