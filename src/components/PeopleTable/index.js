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
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Pagination from "@material-ui/lab/Pagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import DeleteIcon from "@material-ui/icons/Delete";
import BlockIcon from "@material-ui/icons/Block";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import CancelIcon from "@material-ui/icons/Cancel";
import PageviewRoundedIcon from "@material-ui/icons/PageviewRounded";

import Button from "components/Button";
import NoData from "components/NoData";
import Loader from "components/Loader";

import getDateTime from "utils/getDateTime";

import useStyles from "./style";

const PeopleTable = ({
  tableHeader,
  tableBody,
  tableBodyLoading,
  paginationSize,
  currentPage,
  handlePaginationChange,
  actions,
  addButton,
  selectedActions,
  noMultiSelect,
  noDataText,
  sortable,
  initialOrder,
  pageSize
}) => {
  const classes = useStyles();

  const [selectedRow, setSelectedRow] = useState([]);
  const [orderBy, setOrderBy] = useState(initialOrder && initialOrder.orderBy);
  const [order, setOrder] = useState(initialOrder && initialOrder.order);

  useEffect(() => {
    setSelectedRow([]);
  }, [tableBody]);

  const itemsCount = tableBody.length;
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
    if (type === "Disable") {
      return <BlockIcon />;
    }
    if (type === "Cancel") {
      return <CancelIcon />;
    }
    if (type === "View") {
      return <PageviewRoundedIcon />;
    }
  };

  const getAction = (actionItem, rowItem) => {
    const { type, handleClick, check } = actionItem;

    if (rowItem[check]) {
      return null;
    }

    return (
      <Tooltip title={type} key={type}>
        <IconButton
          aria-label={type}
          onClick={() => handleClick(rowItem)}
          className={classes.tableIcon}
        >
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

  const getChipContent = (disabled, label) => {
    let updatedLabel = label;
    if (!label) {
      updatedLabel = disabled ? "Inactive" : "Active";
    }
    return (
      <Chip
        variant="outlined"
        label={updatedLabel}
        classes={{ outlined: classes.chipOutline }}
        className={disabled ? "disabled" : ""}
      />
    );
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      setSelectedRow(tableBody || []);
      return;
    }
    setSelectedRow([]);
  };

  const isRowSelected = id => (selectedRow || []).some(row => row._id === id);

  const getColumnCount = () => {
    let count = tableHeader.length;
    if (actions) {
      count += 1;
    }
    if (!noMultiSelect) {
      count += 1;
    }
    return count;
  };

  const columnCount = useMemo(() => getColumnCount(), []);

  const createSortHandler = property => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getSortedBody = () => {
    if (!sortable) {
      return tableBody || [];
    }

    let updatedTableBody = JSON.parse(JSON.stringify(tableBody));
    updatedTableBody = (updatedTableBody || []).sort((a, b) => {
      let val;
      if (a[orderBy] > b[orderBy]) {
        val = 1;
      } else {
        val = -1;
      }

      if (order === "asc") {
        return val;
      }
      return -val;
    });
    if (!currentPage) {
      return updatedTableBody;
    }
    return updatedTableBody.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  };

  const getBodyColClass = (colType, colVal) => {
    if (colType && colType === "Number") {
      if (colVal > 0) {
        return "success";
      }
      return "error";
    }
    return "";
  };

  return (
    <div>
      {addButton && (
        <Toolbar
          className={`${classes.tableToolbar} ${
            selectedRowCount && "highlight"
          }`}
        >
          {!!selectedRowCount && (
            <>
              <Typography
                className={classes.tableTitle}
                variant="h6"
                id="tableTitle"
                component="div"
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
      )}
      <TableContainer className={classes.tableContainer}>
        <Table
          className={classes.table}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {!noMultiSelect && (
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
              )}
              {(tableHeader || []).map(headCell => (
                <TableCell
                  key={headCell.label}
                  align={headCell.align || "left"}
                  sortDirection={orderBy === headCell.key ? order : false}
                  classes={{ head: classes.tableHead }}
                >
                  {headCell.sortable ? (
                    <TableSortLabel
                      active={orderBy === headCell.key}
                      direction={orderBy === headCell.key ? order : "asc"}
                      onClick={() => createSortHandler(headCell.key)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
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
                  {!tableBodyLoading && <NoData text={noDataText} />}
                </TableCell>
              </TableRow>
            )}
            {getSortedBody().map(row => {
              const isSelected = isRowSelected(row._id);
              const rowId = row._id;
              return (
                <TableRow
                  key={rowId}
                  hover
                  selected={isSelected}
                  classes={{ selected: classes.selectedRow }}
                >
                  {!noMultiSelect && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        inputProps={{ "aria-labelledby": row._id }}
                        color="primary"
                        onChange={event => handleRowBoxClick(event, row)}
                      />
                    </TableCell>
                  )}
                  {(tableHeader || []).map(col => {
                    if (col.type === "Bool") {
                      return (
                        <TableCell key={col.key} align={col.align}>
                          {getChipContent(row[col.key], row[col.status])}
                        </TableCell>
                      );
                    }
                    const keyArray = col.key.split(".");
                    let colValue = row;
                    (keyArray || []).forEach(keyItem => {
                      colValue = colValue[keyItem];
                    });
                    if (col.type === "Date") {
                      colValue = getDateTime(colValue, "onlyDate");
                    }
                    return (
                      <TableCell
                        classes={{ body: classes.tableBody }}
                        key={col.key}
                        align={col.align}
                        className={getBodyColClass(col.type, colValue)}
                      >
                        {colValue || "N/A"}
                      </TableCell>
                    );
                  })}
                  {actions && (
                    <TableCell align="right">
                      {(actions || []).map(action => getAction(action, row))}
                    </TableCell>
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
    </div>
  );
};

PeopleTable.propTypes = {
  tableHeader: PropTypes.instanceOf(Array),
  tableBody: PropTypes.instanceOf(Array),
  tableBodyLoading: PropTypes.bool,
  paginationSize: PropTypes.number,
  currentPage: PropTypes.number,
  handlePaginationChange: PropTypes.func,
  actions: PropTypes.instanceOf(Array),
  noDataText: PropTypes.string,
  addButton: PropTypes.object,
  selectedActions: PropTypes.instanceOf(Array),
  noMultiSelect: PropTypes.bool,
  sortable: PropTypes.bool,
  initialOrder: PropTypes.object,
  pageSize: PropTypes.number
};

export default compose(withRouter)(PeopleTable);
