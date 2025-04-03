import { useEffect, useState } from "react";
import Drawer from "./common/Drawer";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "./common/Button";
import InventoryApi from "../api/inventory.api";
import Input from "./common/Input";
import Select from "./common/Select";
import CategoryApi from "../api/category.api";

interface CreateOrEditInventoryProps {
  isOpen: boolean;
  idEdit: boolean;
  inventory_id: number;
  close: Function;
  refereshTable: () => void;
}

const CreateOrEditInventory = ({
  isOpen,
  idEdit,
  inventory_id,
  close,
  refereshTable,
}: CreateOrEditInventoryProps) => {
  const { createInventory, updateInventory, getInventory } = new InventoryApi();
  const { getAllCategories } = new CategoryApi();
  const defaultValue = {
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    categories: [],
  };
  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
    getValues,
    setValue,
    // @ts-ignore
  } = useForm(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
    if (typeof inventory_id === "number") {
      fetchInventoryDetails(inventory_id);
    }
  }, [inventory_id]);

  const fetchInventoryDetails = async (inventory_id: number) => {
    setIsLoading(true);
    try {
      const response = await getInventory(inventory_id);
      if (response.success) {
        const inventory: any = response?.data;
        reset({
          name: inventory?.name,
          quantity: inventory?.quantity,
          description: inventory?.description,
          categories: inventory?.categories?.map?.((item: any) => ({
            label: item?.category_name,
            value: item?.id,
          })),
          price: inventory?.price,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      // @ts-ignore
      toast.error(error?.message);
      handleCloseDrawer();
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response: any = await getAllCategories();
      if (response.success) {
        setCategories(
          response?.data?.map?.((category: any) => ({
            label: category?.category_name,
            value: category?.id,
          }))
        );
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      // @ts-ignore
      toast.error(error?.message);
    }
  };

  const editInventoryDetails = async (data: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      formData.append("description", data.description);
      formData.append(
        "categories",
        data.categories?.map((category: any) => category?.value)?.join(",")
      );
      // Array.from(data?.medias)?.forEach?.((image: any) => {
      //   formData.append("images", image);
      // });
      const response = await updateInventory(inventory_id, formData);
      if (response.success) {
        toast.success("Inventory Updated Successfully");
        refereshTable();
        handleCloseDrawer();
      } else {
        throw new Error(response.message);
      }
      handleCloseDrawer();
    } catch (error) {
      // @ts-ignore
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewInventory = async (data: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      formData.append("description", data.description);
      formData.append(
        "categories",
        data.categories?.map((category: any) => category?.value)?.join(",")
      );
      // console.log({medias:Array.from(data?.medias)})
      // Array.from(data?.medias)?.forEach?.((image: any) => {
      //   formData.append("images", image);
      // });
      const response = await createInventory(formData);
      if (response.success) {
        toast.success("Inventory Created Successfully");
        refereshTable();
        handleCloseDrawer();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      // @ts-ignore
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDrawer = () => {
    reset(defaultValue);
    close();
  };

  return (
    <Drawer
      className=""
      headitems={[
        <Button
          className="border-white text-white p-2 hover:bg-white hover:text-black"
          title="Cancel"
          rounded
          onClick={() => {
            handleCloseDrawer();
          }}
        />,
        <Button
          className="border-white text-white p-2 hover:bg-white hover:text-black"
          title="Save"
          rounded
          onClick={() => {
            if (idEdit) {
              handleSubmit(editInventoryDetails)();
            } else {
              handleSubmit(createNewInventory)();
            }
          }}
        />,
      ]}
      isOpen={isOpen}
      onClose={() => {
        handleCloseDrawer();
      }}
      scroll={false}
      sectionLoading={isLoading}
      title={idEdit ? "Edit Inventory" : "Create Inventory"}
    >
      <Input
        isLoading={isLoading}
        disabled={isLoading}
        type="text"
        defaultValue={getValues("name")}
        {...register("name", {
          required: "name Is Required",
        })}
        className=""
        label={"Inventory Name"}
        error={errors?.name?.message}
      />
      <Input
        isLoading={isLoading}
        disabled={isLoading}
        type="number"
        defaultValue={getValues("price")}
        {...register("price", {
          required: "price Is Required",
        })}
        className=""
        label={"Price"}
        error={errors?.price?.message}
      />
      <Input
        isLoading={isLoading}
        disabled={isLoading}
        type="quantity"
        defaultValue={getValues("quantity")}
        {...register("quantity", {
          required: "quantity Is Required",
        })}
        className=""
        label={"Quantity"}
        error={errors?.quantity?.message}
      />
      <Input
        isLoading={isLoading}
        disabled={isLoading}
        type="description"
        defaultValue={getValues("description")}
        {...register("description", {
          required: "description Is Required",
        })}
        className=""
        label={"Description"}
        error={errors?.description?.message}
      />
      {/* <Input
        isLoading={isLoading}
        disabled={isLoading}
        type="file"
        multiple
        {...register("medias")}
        className=""
        label={"Inventory Images"}
        error={errors?.medias?.message}
      /> */}
      <Select
        required={false}
        options={categories}
        isSearchable={true}
        defaultValue={getValues("categories")}
        isDisabled={isLoading}
        name={"categories"}
        label={"Categories"}
        isClearable={false}
        isMulti={true}
        onChange={(e: any) => {
          setValue("categories", e);
        }}
        register={register("categories")}
        className={"w-full"}
        error={errors?.state?.message}
        placeholder={"Select Categories"}
        menuHeight={"150px"}
      />
    </Drawer>
  );
};

export default CreateOrEditInventory;
