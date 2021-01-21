import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FilterListIcon from "@material-ui/icons/FilterList";
import { CheckboxList } from "./CheckboxList";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchField from "./SearchField";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead({ columns, order, orderBy, onRequestSort }) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => {
          if (column.state) {
            return (
              <TableCell
                key={column.id}
                sortDirection={orderBy === column.id ? order : false}
                align={column.align}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={createSortHandler(column.id)}
                >
                  {column.name}
                </TableSortLabel>
              </TableCell>
            );
          } else {
            return <div />;
          }
        })}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = ({
  tableName,
  columns,
  handleChange,
  handleSearch,
  children
}) => {
  return (
    <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6" id="tableTitle" component="div">
        {tableName}
      </Typography>
      {children}
      <SearchField handleInput={handleSearch} />
      <CheckboxList
        items={columns}
        handleChange={handleChange}
        renderButton={() => <FilterListIcon />}
      />
    </Toolbar>
  );
};

export default function EnhancedTable({
  defaultColumns,
  data,
  tableName,
  onRowClick,
  isLoading,
  children
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [columns, setColumns] = React.useState(defaultColumns);
  const [filteredData, setFilteredData] = React.useState();

  const handleRequestSort = (event, property) => {
    console.log("Sort request: ", property);
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  function handleSearch(value) {
    var newData;

    if (value === "") {
      newData = data;
    } else {
      newData = data.filter((item) => {
        return JSON.stringify(item).includes(value);
      });
    }

    setFilteredData(newData);
  }

  return (
    <>
        <EnhancedTableToolbar
          handleSearch={handleSearch}
          tableName={tableName}
          columns={columns}
          handleChange={(newColumms) => setColumns(newColumms)}>
              {children}
        </EnhancedTableToolbar>
        <TableContainer>
          <Table size="small">
            <EnhancedTableHead
              columns={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {isLoading || filteredData === undefined ? (
                <div style={{ height: 50 }}>
                  {" "}
                  <CircularProgress />
                </div>
              ) : (
                stableSort(filteredData, getComparator(order, orderBy)).map(
                  (row, index) => {
                    {
                    //   console.log("row: ", row);
                    }
                    return (
                      <TableRow
                        hover
                        style={{ cursor: "pointer" }}
                        onClick={() => onRowClick(row)}
                      >
                        {columns.map((column, cIndex) => {
                          if (column.state) {
                            return (
                              <TableCell align={column.align}>
                                {<RenderField data={row} column={column} />}
                              </TableCell>
                            );
                          } else {
                            return <div />;
                          }
                        })}
                      </TableRow>
                    );
                  }
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
    </>
  );
}

function RenderField({ data, column }) 
{
    var result = RenderFieldInternal({data, column});

    return result !== undefined ? result : "Missing";
}

function RenderFieldInternal({ data, column})
{
    if (column.render) {
      return column.render(data);
    } else {
      if (typeof column.field === "function") {
        return column.field(data);
      } else {
        return data[column.field];
      }
    }
}
