import {
  Column,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { LuArrowDown, LuArrowUp, LuArrowUpDown } from "react-icons/lu";
import { RiPushpin2Fill } from "react-icons/ri";

const getCommonPinningStyles = (column: Column<any>, isCell: boolean) => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
      ? "4px 0 4px -4px gray inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    ...(isPinned ? { zIndex: 1 } : {}),
    backgroundColor: isPinned && isCell ? "white" : isPinned ? "#8ac4ff" : "",
  };
};

const Table = ({
  column,
  data,
  dataCount,
  tableHeaderClassName,
  tableCellClassName,
  className,
  isLoading,
  fetchTableData,
  searchquery,
  setFilter,
  hidePagination = false,
  tableRef,
}: any) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [colulmnSorting, setColulmnSorting] = useState([]);
  const [pageSize, setPageSize] = useState(hidePagination ? dataCount : 10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(null);
  const table = useReactTable({
    columns: column,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    ...(hidePagination
      ? {}
      : { getPaginationRowModel: getPaginationRowModel() }),
    // @ts-ignore
    onColumnFiltersChange: setColumnFilters,
    // @ts-ignore
    onSortingChange: setColulmnSorting,
    state: {
      sorting: colulmnSorting,
      columnFilters: columnFilters,
    },
    columnResizeDirection: "ltr",
    columnResizeMode: "onChange",
  });

  useEffect(() => {
    if (tableRef?.current) {
      tableRef.current.setCurrentPage = setCurrentPage;
      tableRef.current.refreshTable = refreshTable;
    }
  }, [tableRef?.current]);

  useEffect(() => {
    if (isLoading) return;
    const filter = {
      sorting: colulmnSorting,
      columnFilters: columnFilters,
      pageSize,
      currentPage,
    };
    setFilter && setFilter(filter);
    fetchTableData && fetchTableData(filter, search);
  }, [colulmnSorting, columnFilters, currentPage, pageSize]);

  useEffect(() => {
    if (search != null && search !== undefined) {
      const filter = {
        sorting: colulmnSorting,
        columnFilters: columnFilters,
        pageSize,
        currentPage: 1,
      };
      fetchTableData && fetchTableData(filter, search);
      setCurrentPage(1);
    }
  }, [search]);

  // Debounce search
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setSearch(searchquery?.trim());
    }, 500);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchquery?.trim()]);

  const refreshTable = () => {
    const filter = {
      sorting: colulmnSorting,
      columnFilters,
      pageSize,
      currentPage,
    };
    fetchTableData && fetchTableData(filter, search);
  };

  return (
    <>
      <div
        className={`max-w-full overflow-auto custom-table max-h-full custom-scroll-bar ${className}`}
        id="table"
        ref={tableRef}
      >
        <table className="min-w-full">
          <div className="max-h-[calc(100vh-280px)] min-h-[calc(100vh-280px)] h-[calc(100vh-280px)] relative">
            <thead className="sticky top-0 bg-secondary z-[2] min-w-full">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        style={{
                          ...(getCommonPinningStyles(
                            header.column,
                            false
                          ) as any),
                          ...(header.getSize()
                            ? {
                                minWidth: header.getSize(),
                                maxWidth: header.getSize(),
                              }
                            : {}),
                        }}
                        className={`py-3 text-gray-700 font-Roboto text-base font-bold ${tableHeaderClassName}`}
                        key={header.id}
                        onDoubleClick={() => {
                          if (
                            header.column?.getIsPinned() === false &&
                            header.column?.getCanPin()
                          ) {
                            header?.column?.pin?.("left");
                          } else {
                            header?.column?.pin(false);
                          }
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex gap-1 items-center">
                            <div
                              {...{
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                              className={`${
                                header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : ""
                              } !flex gap-1 items-center `}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: <LuArrowUp />,
                                desc: <LuArrowDown />,
                              }[Number(header.column.getIsSorted())] ??
                                (header.column.getCanSort() && (
                                  <LuArrowUpDown />
                                ))}
                            </div>
                            <div>
                              <div className="flex items-center">
                                {header.column?.getCanPin() ? (
                                  <RiPushpin2Fill
                                    className={`hover:text-primary cursor-pointer ${
                                      header.column?.getIsPinned() === false
                                        ? "text-primary"
                                        : "text-primary"
                                    }`}
                                    onClick={() => {
                                      if (
                                        header.column?.getIsPinned() === false
                                      ) {
                                        header?.column?.pin?.("left");
                                      } else {
                                        header?.column?.pin?.(false);
                                      }
                                    }}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            {table?.getRowModel?.()?.rows?.length === 0 &&
              isLoading === false && <div className="h-full w-full flex justify-center items-center">No Data Available</div>}
            <tbody>
              {isLoading ? (
                <div>Loading ...</div>
              ) : (
                table?.getRowModel?.()?.rows?.map?.((row, index, array) => (
                  <tr
                    className={`hover:bg-[#8ac4ff11] transition delay-75 ease-in-out ${
                      array?.length - 1 !== index
                        ? "border-b-[1px] border-gray-300"
                        : ""
                    }`}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        style={
                          {
                            ...getCommonPinningStyles(cell.column, true),
                          } as any
                        }
                        className={`py-2 font-Roboto text-gray-500 font-semibold text-sm ${tableCellClassName}`}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </div>
        </table>
      </div>
      <div className="flex gap-3 items-center">
        {!hidePagination && (
          //   TODO ? Add pagination
          <>Pagination</>
        )}
        {!!dataCount && <span className="mt-[15px]">Total : {dataCount}</span>}
      </div>
    </>
  );
};

export default Table;
