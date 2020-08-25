import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Pagination from "@material-ui/lab/Pagination";

import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from "@material-ui/icons/EditRounded";

import NoData from "components/NoData";
import Loader from "components/Loader";

import useStyles from "./style";

const PeopleTable = ({
  tableHeader,
  tableBody,
  tableBodyLoading,
  pageSize,
  searchCount,
  currentPage,
  handlePaginationChange,
  actions,
  history
}) => {
  const classes = useStyles();

  const StyledTableCell = withStyles(theme => ({
    head: {},
    body: {
      fontSize: "0.95rem"
    }
  }))(TableCell);

  const [selectedRow, setSelectedRow] = useState([]);

  useEffect(() => {
    setSelectedRow([]);
  }, [tableBody]);

  const itemsCount = tableBody.length;
  const paginationSize = Math.ceil(searchCount / pageSize);
  const selectedRowCount = selectedRow.length;

  const handleRowBoxClick = (event, id) => {
    const selectedIndex = selectedRow.indexOf(id);
    const newSelected = JSON.parse(JSON.stringify(selectedRow));
    if (selectedIndex === -1) {
      newSelected.push(id);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedRow(newSelected);
  };

  const getAction = (actionItem, userId) => {
    const { type, pushUrl } = actionItem;
    if (type === "Edit") {
      return (
        <Tooltip title="Edit" key={userId}>
          <IconButton
            aria-label="edit"
            onClick={() => {
              history.push(`${pushUrl}/${userId}`);
            }}
          >
            <EditRoundedIcon />
          </IconButton>
        </Tooltip>
      );
    }
    return null;
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = (tableBody || []).map(item => item._id);
      setSelectedRow(newSelected);
      return;
    }
    setSelectedRow([]);
  };

  const isRowSelected = id => selectedRow.indexOf(id) !== -1;

  return (
    <>
      <Toolbar
        className={`${classes.tableToolbar} ${selectedRowCount && "highlight"}`}
      >
        <Typography
          className={classes.tableTitle}
          variant="h6"
          id="tableTitle"
          component="div"
          color="textSecondary"
        >
          {selectedRowCount ? `${selectedRowCount} selected` : "User Table"}
        </Typography>

        {!!selectedRowCount && (
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              onClick={() => console.log(selectedRow, "row")}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <TableContainer className={classes.tableContainer}>
        <Table
          className={classes.table}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedRowCount > 0 && selectedRowCount < itemsCount
                  }
                  checked={
                    selectedRowCount > 0 && selectedRowCount === itemsCount
                  }
                  onChange={handleSelectAllClick}
                  inputProps={{ "aria-label": "select all users" }}
                  color="primary"
                />
              </TableCell>
              {(tableHeader || []).map(headCell => (
                <TableCell
                  key={headCell.label}
                  align={headCell.align || "left"}
                  classes={{ head: classes.tableHead }}
                >
                  {headCell.label}
                </TableCell>
              ))}
              {actions && (
                <TableCell classes={{ head: classes.tableHead }}>
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!(tableBody || []).length && (
              <TableRow>
                <TableCell colSpan={4}>
                  {tableBodyLoading && (
                    <Loader wrapperClass={classes.loadingWrapper} />
                  )}
                  {!tableBodyLoading && (
                    <NoData text="Sorry, there is no matching user." />
                  )}
                </TableCell>
              </TableRow>
            )}
            {!!(tableBody || []).length &&
              (tableBody || []).map(row => {
                const isSelected = isRowSelected(row._id);
                const userId = row._id;
                return (
                  <TableRow
                    key={userId}
                    hover
                    selected={isSelected}
                    classes={{ selected: classes.selectedRow }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        inputProps={{ "aria-labelledby": row._id }}
                        color="primary"
                        onChange={event => handleRowBoxClick(event, row._id)}
                      />
                    </TableCell>
                    {(tableHeader || []).map(col => (
                      <StyledTableCell key={col.key}>
                        {row[col.key]}
                      </StyledTableCell>
                    ))}
                    {actions && (
                      <StyledTableCell>
                        {(actions || []).map(action =>
                          getAction(action, userId)
                        )}
                      </StyledTableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
          {paginationSize > 1 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>
                  <div className={classes.paginationWrapper}>
                    <Pagination
                      page={currentPage}
                      onChange={handlePaginationChange}
                      count={paginationSize}
                      showFirstButton
                      showLastButton
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

PeopleTable.propTypes = {
  tableHeader: PropTypes.instanceOf(Array),
  tableBody: PropTypes.instanceOf(Array),
  tableBodyLoading: PropTypes.bool,
  pageSize: PropTypes.number,
  searchCount: PropTypes.number,
  currentPage: PropTypes.number,
  handlePaginationChange: PropTypes.func,
  actions: PropTypes.instanceOf(Array),
  history: PropTypes.object
};

export default compose(withRouter)(PeopleTable);
