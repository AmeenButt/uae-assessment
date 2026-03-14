import { Box, Button, MenuItem, Pagination as PaginationMUI, Select, Typography } from "@mui/material";
import { createUseStyles } from "react-jss";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
const useStyles = createUseStyles({
    topContainer: {
        display: ({ setLimit }) => (setLimit ? "flex" : "block"),
        justifyContent: ({ setLimit }) => (setLimit ? "space-between" : "initial"),
        alignItems: ({ setLimit }) => (setLimit ? "center" : "initial"),
        color: ({ setLimit }) => (setLimit ? "#68798D" : "inherit"),
        padding: ({ setLimit }) => (setLimit ? "25px 0" : "0"),
        gap: ({ setLimit }) => (setLimit ? "15px" : "0"),
        flexWrap: "wrap",
    },

    pageSizeWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    pageSizeLabel: {
        whiteSpace: "nowrap",
    },

    select: {
        marginLeft: "10px",
        minWidth: "90px",
        height: "40px",
    },

    simplePagination: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "12px",
        marginTop: "8px",
    },

    pageText: {
        minWidth: "20px",
        textAlign: "center",
    },

    muiPaginationWrapper: {
        display: "flex",
        justifyContent: "center",
    },
});

const Pagination = ({ data, page, limit, setPage, setLimit, totalData }) => {
    const classes = useStyles({ setLimit });

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    return (
        <>
            <Box className={classes.topContainer}>
                {setLimit && (
                    <Box className={classes.pageSizeWrapper}>
                        <Typography className={classes.pageSizeLabel}>Page size:</Typography>
                        <Select
                            value={limit}
                            onChange={handleLimitChange}
                            size="small"
                            className={classes.select}
                        >
                            <MenuItem value={"2"}>2</MenuItem>
                            <MenuItem value={"5"}>10</MenuItem>
                            <MenuItem value={"10"}>10</MenuItem>
                            <MenuItem value={"20"}>20</MenuItem>
                            <MenuItem value={"50"}>50</MenuItem>
                        </Select>
                    </Box>
                )}
            {totalData && (
                <Box className={classes.muiPaginationWrapper}>
                    <PaginationMUI
                        count={Math.ceil(totalData / limit)}
                        page={page}
                        onChange={handleChange}
                        color="primary"
                        shape="rounded"
                        size="large"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
            </Box>

        </>
    );
};

export default Pagination;