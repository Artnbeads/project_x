import React from "react";
import { useTable } from "react-table";
import { FaMoneyBillWave, FaMobileAlt, FaUniversity } from "react-icons/fa";
import PropTypes from 'prop-types';

const ClientTable = ({ clients, vehicles }) => {
  const data = React.useMemo(
    () =>
      clients.map((client) => ({
        ...client,
        amountOwed: client.cost - (client.paymentDate ? client.cost : 0),
      })),
    [clients]
  );

  const columns = React.useMemo(
    () => [
      { Header: "Client Name", accessor: "clientName" },
      { Header: "Goods Ordered", accessor: "goods" },
      { 
        Header: "Cost", 
        accessor: "cost",
        Cell: ({ value }) => `Ksh ${value.toFixed(2)}`
      },
      { Header: "Order Date", accessor: "orderDate" },
      { Header: "Payment Date", accessor: "paymentDate" },
      { Header: "Delivery Date", accessor: "deliveryDate" },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: ({ value }) => {
          if (value === "mpesa") return <FaMobileAlt />;
          if (value === "bank") return <FaUniversity />;
          return <FaMoneyBillWave />;
        },
      },
      { Header: "Vehicle Used", accessor: "vehicleUsed" },
      { 
        Header: "Amount Paid", 
        accessor: "amountPaid",
        Cell: ({ value }) => `Ksh ${value.toFixed(2)}`
      },
      { 
        Header: "Amount Owed", 
        accessor: "amountOwed",
        Cell: ({ value }) => `Ksh ${value.toFixed(2)}`
      },
    ],
    []
  );

  // Prepare data with amountPaid field
  const tableData = React.useMemo(() => {
    return data.map(item => ({
      ...item,
      amountPaid: item.paymentDate ? item.cost : 0
    }));
  }, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  return (
    <div className="table-responsive">
      <table {...getTableProps()} className="table table-striped">
        <thead className="thead-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

ClientTable.propTypes = {
  clients: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
};

export default ClientTable;