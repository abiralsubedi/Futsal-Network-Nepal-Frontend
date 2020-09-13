import React, { useState, useEffect, useMemo } from "react";
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

import Button from "components/Button";
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
  type,
  addButton,
  selectedActions
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

  const handleRowBoxClick = (event, rowData) => {
    const selectedIndex = selectedRow.findIndex(row => row._id === rowData._id);
    const newSelected = JSON.parse(JSON.stringify(selectedRow));
    if (selectedIndex === -1) {
      newSelected.push(rowData);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedRow(newSelected);
  };

  const getActionIcon = type => {
    if (type === "Edit") {
      return <EditRoundedIcon />;
    }
    if (type === "Delete") {
      return <DeleteIcon />;
    }
  };

  const getAction = (actionItem, rowItem) => {
    const { type, handleClick } = actionItem;

    return (
      <Tooltip title={type} key={rowItem._id}>
        <IconButton aria-label={type} onClick={() => handleClick(rowItem)}>
          {getActionIcon(type)}
        </IconButton>
      </Tooltip>
    );
  };

  const getSelectedAction = () =>
    (selectedActions || []).map(({ type, handleClick }) => (
      <Tooltip title={type} key={type}>
        <IconButton aria-label={type} onClick={() => handleClick(selectedRow)}>
          {getActionIcon(type)}
        </IconButton>
      </Tooltip>
    ));

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      setSelectedRow(tableBody || []);
      return;
    }
    setSelectedRow([]);
  };

  const isRowSelected = id => (selectedRow || []).some(row => row._id === id);

  const getColumnCount = () => {
    let count = tableHeader.length + 1;
    if (actions) {
      count += 1;
    }
    return count;
  };

  const columnCount = useMemo(() => getColumnCount(), []);

  return (
    <>
      <Toolbar
        className={`${classes.tableToolbar} ${selectedRowCount && "highlight"}`}
      >
        {!!selectedRowCount && (
          <>
            <Typography
              className={classes.tableTitle}
              variant="h6"
              id="tableTitle"
              component="div"
              color="textSecondary"
            >
              {selectedRowCount} selected
            </Typography>
            {getSelectedAction()}
          </>
        )}
        {!selectedRowCount && (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            buttonRootClass={classes.peopleAddButton}
            buttonText={addButton.label}
            onClick={addButton.handleClick}
          />
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
                <TableCell classes={{ head: classes.tableHead }} align="right">
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!(tableBody || []).length && (
              <TableRow>
                <TableCell colSpan={columnCount}>
                  {tableBodyLoading && (
                    <Loader wrapperClass={classes.loadingWrapper} />
                  )}
                  {!tableBodyLoading && (
                    <NoData text={`Sorry, there is no matching ${type}.`} />
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
                        onChange={event => handleRowBoxClick(event, row)}
                      />
                    </TableCell>
                    {(tableHeader || []).map(col => {
                      const [first, second] = col.key.split(".");
                      let colValue = row[first];
                      if (second) {
                        colValue = row[first][second];
                      }
                      return (
                        <StyledTableCell key={col.key} align={col.align}>
                          {colValue}
                        </StyledTableCell>
                      );
                    })}
                    {actions && (
                      <StyledTableCell align="right">
                        {(actions || []).map(action => getAction(action, row))}
                      </StyledTableCell>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
          {paginationSize > 1 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={columnCount}>
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
  type: PropTypes.string,
  addButton: PropTypes.object,
  selectedActions: PropTypes.instanceOf(Array)
};

export default compose(withRouter)(PeopleTable);
