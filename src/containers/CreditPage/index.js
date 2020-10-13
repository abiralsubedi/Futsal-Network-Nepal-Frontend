import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { format } from "date-fns";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import Button from "components/Button";
import NoData from "components/NoData";
import Loader from "components/Loader";
import DatePicker from "components/DatePicker";
import AddCreditModal from "components/AddCreditModal";

import { toggleAddCreditModal } from "containers/LoginPage/actions";
import { getCreditHistory, clearCreditHistory } from "./actions";
import useStyles from "./style";

const CreditPage = ({
  globalData,
  creditPageData,
  fetchCreditHistory,
  onToggleCreditModal,
  onClearCreditHistory
}) => {
  const classes = useStyles();

  const {
    profile: { credit }
  } = globalData;

  const { creditHistoryLoading, creditHistory } = creditPageData;

  const [orderBy, setOrderBy] = useState("transactionDate");
  const [order, setOrder] = useState("desc");
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 3))
  );
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    onClearCreditHistory();
  }, []);

  useEffect(() => {
    handleHistorySearch();
  }, [credit]);

  const getFirstLastHourDate = (requiredDate, type) => {
    let updatedDate = new Date(requiredDate);
    if (type === "last") {
      updatedDate.setDate(updatedDate.getDate() + 1);
    }
    return new Date(format(new Date(updatedDate), "yyyy/MM/dd")).toISOString();
  };

  const handleHistorySearch = () => {
    fetchCreditHistory({
      startDate: getFirstLastHourDate(startDate),
      endDate: getFirstLastHourDate(endDate, "last")
    });
  };

  const StyledTableCell = withStyles(theme => ({
    head: {},
    body: {
      fontSize: "0.95rem"
    }
  }))(TableCell);

  const StyledTableRow = withStyles(theme => ({
    root: {}
  }))(TableRow);

  const tableHeader = [
    { label: "Date", id: "transactionDate" },
    { label: "Remarks" },
    { label: "Credit", align: "right" }
  ];

  const createSortHandler = property => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableHistorySort = () => {
    const newCreditHistory = JSON.parse(JSON.stringify(creditHistory));
    return (newCreditHistory || []).sort((a, b) => {
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
  };
  return (
    <div className={classes.creditPageContent}>
      <AddCreditModal />
      <Grid container spacing={3} alignItems="center">
        <Grid item md={4} lg={3}>
          <Typography className={classes.balance}>
            Balance: <span>{credit}</span> USD
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            onClick={() => onToggleCreditModal(true)}
            buttonRootClass={classes.creditButtonRoot}
            buttonText="Add Credit"
          />
        </Grid>
      </Grid>

      <Typography className={classes.tableTitle} color="textSecondary">
        Credit History
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <div className={classes.dateRange}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              autoOk
              disableFuture
              maxDate={new Date(endDate)}
            />
            <Typography className={classes.dateDivider}>to</Typography>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              autoOk
              disableFuture
              minDate={new Date(startDate)}
            />
          </div>
        </Grid>
        <Grid item xs={6} md={4}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            fullWidth
            disabled={creditHistoryLoading}
            onClick={handleHistorySearch}
            buttonRootClass={classes.creditButtonRoot}
            buttonText="Search"
          />
        </Grid>
      </Grid>
      <TableContainer className={classes.tableContainer}>
        <Table
          className={classes.table}
          aria-label="customized table"
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {(tableHeader || []).map(headCell => (
                <TableCell
                  key={headCell.label}
                  align={headCell.align || "left"}
                  sortDirection={orderBy === headCell.id ? order : false}
                  classes={{ head: classes.tableHead }}
                >
                  {headCell.id ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={() => createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!creditHistory.length && (
              <TableRow>
                <TableCell colSpan={3}>
                  {creditHistoryLoading && (
                    <Loader wrapperClass={classes.loadingWrapper} />
                  )}
                  {!creditHistoryLoading && (
                    <NoData text="You do not have any financial transaction during the period." />
                  )}
                </TableCell>
              </TableRow>
            )}
            {!!creditHistory.length &&
              stableHistorySort().map(row => (
                <StyledTableRow key={row.transactionDate} hover>
                  <StyledTableCell>
                    {format(new Date(row.transactionDate), "MMM d, yyyy")}
                  </StyledTableCell>
                  <StyledTableCell>{row.remark}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography
                      className={`${classes.creditCell}
                        ${row.amount > 0 ? "creditAmount" : "debitAmount"}
                      `}
                    >
                      {row.amount}
                    </Typography>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

CreditPage.propTypes = {
  globalData: PropTypes.object,
  creditPageData: PropTypes.object,
  onToggleCreditModal: PropTypes.func,
  fetchCreditHistory: PropTypes.func,
  onClearCreditHistory: PropTypes.func
};

const mapStateToProps = state => ({
  globalData: state.LoginReducer,
  creditPageData: state.CreditPageReducer
});

const mapDispatchToProps = dispatch => ({
  onToggleCreditModal: data => dispatch(toggleAddCreditModal(data)),
  fetchCreditHistory: data => dispatch(getCreditHistory(data)),
  onClearCreditHistory: () => dispatch(clearCreditHistory())
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CreditPage);
