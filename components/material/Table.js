import React from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {},
  bulkOperations: {
    position: "relative"
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: "absolute",
    width: "100%",
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  progress: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
}));

const TableList = ({
  title,
  tableHead,
  tableData,
  onOpen,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { loading } = useSelector(state => state.tasks);

  const renderListItem = () => {
    if (tableData.length) {
      return tableData.map((prop, key) => {
        return (
          <TableRow hover key={key}>
            {prop.map((p, i) => {
              return (
                <TableCell key={i} align="center">
                  {p}
                </TableCell>
              );
            })}
          </TableRow>
        );
      });
    }
    return (
      <TableRow>
        <TableCell align="center" colSpan={tableHead.length + 1}>
          No record could be listed
        </TableCell>
      </TableRow>
    );
  };
  const renderBody = () => {
    if (loading) {
      return (
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan={tableHead.length + 1}>
              <LinearProgress className={classes.progress} />
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }
    return <TableBody>{renderListItem()}</TableBody>;
  };

  const renderTable = () => {
    return (
      <PerfectScrollbar>
        <Box>
          <Table>
            {tableHead.length && (
              <TableHead>
                <TableRow>
                  {tableHead.map((prop, key) => {
                    return (
                      <TableCell align="center" key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
            )}
            {renderBody()}
          </Table>
        </Box>
      </PerfectScrollbar>
    );
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        title={title}
        action={
          <Button
            color="secondary"
            size="large"
            variant="contained"
            onClick={onOpen}>
            Add Task
          </Button>
        }
      />
      <Divider />

      {renderTable()}
    </Card>
  );
};

TableList.defaultProps = {
  title: "",
  tableHead: [],
  tableData: [],
  onOpen: () => {
    // do something
  }
};

TableList.propTypes = {
  title: PropTypes.string,
  tableHead: PropTypes.arrayOf(PropTypes.any),
  tableData: PropTypes.array,
  onOpen: PropTypes.func,
  className: PropTypes.string
};

export default React.memo(TableList);
