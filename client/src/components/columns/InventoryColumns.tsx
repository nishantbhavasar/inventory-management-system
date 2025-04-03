import { useMemo } from "react";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import Button from "../common/Button";

interface InventoryColumnsProps {
  setInventoryModelOpen: React.Dispatch<React.SetStateAction<number | boolean>>;
  handleDeleteInventory: (id: number) => Promise<void>;
  refereshTable: () => void
}

const InventoryColumns = ({
  setInventoryModelOpen,
  handleDeleteInventory,
  refereshTable,
}: InventoryColumnsProps) => {
  const columns = useMemo(() => {
    return [
      {
        id: "Action",
        header: "Action",
        accessorKey: "id",
        enableSorting: false,
        enableColumnFilter: false,
        enablePinning: false,
        size: 215,
        cell: ({ row }: any) => {
          return (
            <div className="flex gap-2">
              <Button
                className="!h-10 !w-10 !px-0 !rounded-full hover:!text-primary hover:!border-primary"
                icon={<BsTrash />}
                rounded
                onClick={() => {
                  handleDeleteInventory(row?.original?.id);
                }}
              />
              <Button
                className="!h-10 !w-10 !px-0 !rounded-full hover:!text-primary hover:!border-primary"
                icon={<FiEdit />}
                rounded
                onClick={() => {
                  setInventoryModelOpen(row?.original?.id);
                }}
              />
            </div>
          );
        },
      },
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
        enableSorting: false,
        enableColumnFilter: false,
        enablePinning: false,
        size: 215,
      },
      {
        id: "description",
        header: "Description",
        accessorKey: "description",
        enableSorting: false,
        enableColumnFilter: false,
        enablePinning: false,
        size: 215,
        cell: ({ row }: any) => {
          return (
            <div
              title={row?.original?.description}
              className="w-[215px] truncate p-1"
            >
              {row?.original?.description}
            </div>
          );
        },
      },
      {
        id: "price",
        header: "Price",
        accessorKey: "price",
        enableSorting: false,
        enableColumnFilter: false,
        enablePinning: false,
        size: 215,
      },
      {
        id: "quantity",
        header: "Quantity",
        accessorKey: "quantity",
        enableSorting: false,
        enableColumnFilter: false,
        enablePinning: false,
        size: 215,
      },
      {
        id: "createdAt",
        header: "Created At",
        accessorKey: "createdAt",
        enableSorting: false,
        enableColumnFilter: false,
        enablePinning: false,
        size: 215,
        cell: ({ row }: any) => {
          return row?.original?.createdAt;
        },
      },
    ];
  }, []);
  return { columns };
};

export default InventoryColumns;
