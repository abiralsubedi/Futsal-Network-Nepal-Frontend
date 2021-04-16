import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import PropTypes, { number } from "prop-types";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Button from "components/Button";
import TableDateFilter from "components/TableDateFilter";
import AddCreditModal from "components/AddCreditModal";
import PeopleTable from "components/PeopleTable";

import getFirstHourDate from "utils/getFirstHourDate";

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
  const pageSize = 8;

  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 14))
  );
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    return () => onClearCreditHistory();
  }, []);

  useEffect(() => {
    handleHistorySearch();
  }, [credit]);

  const handleHistorySearch = () => {
    fetchCreditHistory({
      startDate: getFirstHourDate(startDate),
      endDate: getFirstHourDate(endDate, 1)
    });
  };

  const tableHeader = [
    { label: "Date", key: "transactionDate", type: "Date", sortable: true },
    { label: "Remarks", key: "remark" },
    {
      label: "Credit",
      align: "right",
      key: "amount",
      sortable: true,
      type: "Number"
    }
  ];

  const creditTableMemo = useMemo(() => {
    return (
      <PeopleTable
        noDataText="Sorry, There has been no transaction for the period."
        tableHeader={tableHeader}
        tableBody={creditHistory}
        tableBodyLoading={creditHistoryLoading}
        noMultiSelect
        sortable
        initialOrder={{ orderBy: "transactionDate", order: "desc" }}
        currentPage={currentPage}
        pageSize={pageSize}
        paginationSize={Math.ceil(creditHistory.length / pageSize)}
        handlePaginationChange={(e, page) => setCurrentPage(page)}
      />
    );
  }, [creditHistoryLoading, currentPage]);

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
            data-cy="add-credit-button"
          />
        </Grid>
      </Grid>
      <TableDateFilter
        contentLoading={creditHistoryLoading}
        dateField={[
          {
            label: "Start Date",
            value: startDate,
            handleChange: data => setStartDate(data),
            maxDate: new Date(endDate)
          },
          {
            label: "End Date",
            value: endDate,
            handleChange: data => setEndDate(data),
            disableFuture: true,
            minDate: new Date(startDate)
          }
        ]}
        handleSearch={handleHistorySearch}
      />

      <Typography className={classes.tableTitle}>Credit History</Typography>
      {creditTableMemo}
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
