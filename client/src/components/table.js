import { memo } from "react";
import {
  Box,
  Paper,
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { createUseStyles } from "react-jss";
import EmptyData from "./emptyData";
import Pagination from "./pagination";

const useStyles = createUseStyles({
  root: {
    zIndex: 0,
    overflow: "auto",
    borderRadius: "4px",
  },

  body: {
    padding: "16px",
  },

  title: {
    fontSize: "1.25rem",
    fontWeight: 500,
    marginBottom: "16px",
  },

  tableContainer: {
    width: "100%",
    overflowX: "auto",
  },

  table: {
    minWidth: "100%",
    borderCollapse: "collapse",
  },

  headCell: {
    fontWeight: "600 !important",
    backgroundColor: "#f8f9fa !important",
    whiteSpace: "nowrap",
  },

  bodyCell: {
    whiteSpace: "nowrap",
  },

  hoverRow: {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
});

const Table = ({
  title,
  labels,
  data,
  limit,
  page,
  setPage,
  className,
  setLimit,
  totalData,
}) => {
  const classes = useStyles();

  return (
    <Paper className={`${classes.root} ${className || ""}`} elevation={1}>
      <Box className={classes.body}>
        <Typography className={classes.title}>{title}</Typography>

        <Box className={classes.tableContainer}>
          <TableContainer>
            <MUITable className={classes.table}>
              <EmptyData data={data}>
                <TableHead>
                  <TableRow>
                    {labels.map((item, index) => (
                      <TableCell key={index} className={classes.headCell}>
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data?.map((item, index) => (
                    <TableRow
                      key={index}
                      className={`${classes.hoverRow} ${item.bgClass ? item.bgClass : ""}`}
                    >
                      {item.fields.map((field, fdx) => (
                        <TableCell key={fdx} className={classes.bodyCell}>
                          {field}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </EmptyData>
            </MUITable>
          </TableContainer>
        </Box>

        {page === undefined || data?.length === 0 ? null : (
          <Pagination
            page={page}
            data={data}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
            totalData={totalData}
          />
        )}
      </Box>
    </Paper>
  );
};

export default memo(Table);