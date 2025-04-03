import { useRef, useState } from "react";
import Table from "../components/common/Table";
import toast from "react-hot-toast";
import InventoryApi from "../api/inventory.api";
import InventoryColumns from "../components/columns/InventoryColumns";
import Input from "../components/common/Input";
import { RiSearch2Line } from "react-icons/ri";
import { CgOptions } from "react-icons/cg";
import CreateOrEditInventory from "../components/CreateOrEditInventory";
import Button from "../components/common/Button";
import CategoryDrawer from "../components/CategoryDrawer";

const Inventories = () => {
  const tableRef = useRef<any>(null);
  const { getAllInventories, deleteInventory } = new InventoryApi();
  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [filter, setFilter] = useState<any>({});
  const [searchquery, setSearchquery] = useState(null);
  const [inventoryModelOpen, setInventoryModelOpen] = useState<
    boolean | number
  >(false);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);

  const fetchInventories = async (filter: any, search: string) => {
    setIsLoading(true);
    try {
      const response: any = await getAllInventories({
        limit: filter?.pageSize,
        page: filter?.currentPage,
        search: search,
      });
      if(response.success){
        setInventories(response?.data?.rows ?? []);
        setInventoryCount(response?.data?.count ?? 0);
      }else{
        console.log(response)
        throw new Error(response.message);
      }
    } catch (error) {
      // @ts-ignore
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteInventory = async (id: number) => {
    try {
      const response = await deleteInventory(id);
      if (response.success) {
        toast.success("Inventory Deleted Successfully");
        refereshTable();
      } else {
        throw new Error(response?.message);
      }
    } catch (error) {
      toast.error("Inventory Not Deleted");
    }
  };

  const refereshTable = () => {
    if (tableRef?.current?.refreshTable) {
      tableRef?.current?.refreshTable();
    } else {
      fetchInventories(filter, searchquery!);
    }
  };

  return (
    <div>
      <div className="h-20 flex justify-between items-center">
        <h1 className="text-3xl">Inventories</h1>
      </div>

      <div className="p-4 flex flex-col gap-4 border-2 rounded-3xl">
        <div className="flex justify-between items-center border-b-[1px] pb-4">
          <div className="flex justify-center items-center gap-3">
            <Button
              className="p-2 hover:bg-primary hover:text-white"
              title="Create Inventory"
              rounded
              onClick={() => {
                setInventoryModelOpen(true);
              }}
            />
            <Button
              className="p-2 hover:bg-primary hover:text-white"
              title="Category"
              rounded
              onClick={() => {
                setCategoryDrawerOpen(true);
              }}
            />
          </div>
          <Input
            label={"Search"}
            parentClassName={"!flex-row !items-center gap-2 !w-96"}
            placeholder={"Search Inventory By Name"}
            inputClassName={"font-normal"}
            childClassName={
              "w-96 bg-white border-[1px] !border-gray-300 !rounded-full px-1 flex items-center"
            }
            onChange={(e: any) => {
              setSearchquery(e?.target?.value?.trim());
            }}
            required={false}
            firstIcon={<RiSearch2Line />}
            fisrtIconClassName={"font-bold text-xl text-gray-300"}
            lastIconClassName={"font-bold text-xl text-gray-300"}
            lastIcon={<CgOptions />}
          />
        </div>
        <Table
          className={""}
          column={
            InventoryColumns({
              setInventoryModelOpen,
              handleDeleteInventory,
              refereshTable,
            }).columns
          }
          data={inventories ?? []}
          isLoading={isLoading}
          searchquery={searchquery}
          fetchTableData={fetchInventories}
          tableHeaderClassName="p-4 !min-w-[255px] !max-w-[255px]"
          tableCellClassName="p-4 !min-w-[255px] !max-w-[255px]"
          setFilter={setFilter}
          dataCount={inventoryCount}
        />
      </div>
      <CreateOrEditInventory
        close={() => {
          setInventoryModelOpen(false);
        }}
        idEdit={typeof inventoryModelOpen === "number"}
        inventory_id={inventoryModelOpen as number}
        isOpen={Boolean(inventoryModelOpen)}
        refereshTable={refereshTable}
      />
      <CategoryDrawer
        close={() => {
          setCategoryDrawerOpen(false);
        }}
        isOpen={categoryDrawerOpen}
      />
    </div>
  );
};

export default Inventories;
