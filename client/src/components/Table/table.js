import React, { useState } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import "./table.css";

export default function Table({ columns, data }) {
    const [filterInput, setFilterInput] = useState("");
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows,
        prepareRow,
        page,
        setFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data
        },
        useFilters,
        useSortBy,
        usePagination,
    );

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("show.name", value);
        setFilterInput(value);
    };

    // Render the UI for your table
    return (
        <>
            <div className="search-container">
                <form>
                    <div className="input-group input-group-mb-3">
                        <input className="input-group tab-search"
                            value={filterInput}
                            onChange={handleFilterChange}
                            placeholder={"Search"}
                        />
                    </div>
                </form>
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={
                                        column.isSorted
                                            ? column.isSortedDesc
                                                ? "sort-desc"
                                                : "sort-asc"
                                            : ""
                                    }
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <div className="container containerpagination">
                    <div className="row">
                        <div className="col-sm">
                            <button className="pagebtn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                {"<<"}
                            </button>{" "}
                            <button className="pagebtn bg-light" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                {"Prev"}
                            </button>{" "}
                            <button className="pagebtn" onClick={() => nextPage()} disabled={!canNextPage}>
                                {"Next"}
                            </button>{" "}
                            <button
                                className="pagebtn" onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}>
                                {">>"}
                            </button>{" "}
                        </div>

                        <div className="col-sm">
                            <span style={{ marginRight: "10px" }}>
                                Page{" "}
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                </strong>{" "}
                            </span>
                            |
                            <span style={{ marginLeft: "10px" }}>
                                Go to page {" "}
                                <input
                                    type="number"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                        gotoPage(page);
                                    }}
                                    style={{ width: "50px", padding: "0", textAlign: "center" }} />
                            </span>{" "}
                        </div>

                        <div className="col-sm">
                            <select className="page-select"
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}