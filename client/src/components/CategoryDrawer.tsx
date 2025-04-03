import { useEffect, useState } from "react";
import Drawer from "./common/Drawer";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "./common/Button";
import Input from "./common/Input";
import CategoryApi from "../api/category.api";
import { BsTrash } from "react-icons/bs";

interface CategoryDrawerProps {
  isOpen: boolean;
  close:() => void
}

const CategoryDrawer = ({ isOpen,close }: CategoryDrawerProps) => {
  const { getAllCategories, createCategory, deleteCategory } =
    new CategoryApi();
  const defaultValue = {
    category_name: "",
  };
  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
    // @ts-ignore
  } = useForm(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
  }
  }, []);

  const fetchCategories = async () => {
    try {
      const response: any = await getAllCategories();
      if (response.success) {
        setCategories(response?.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      // @ts-ignore
      toast.error(error?.message);
    }
  };

  const handleCreateCategory = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await createCategory(data);
      if (response.success) {
        toast.success("Category Created Successfully");
        await fetchCategories();
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
  const handleDeleteCategory = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await deleteCategory(id);
      if (response.success) {
        toast.success("Category Deleted Successfully");
        await fetchCategories();
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
    close()
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
      ]}
      isOpen={isOpen}
      onClose={() => {
        handleCloseDrawer();
      }}
      scroll={false}
      sectionLoading={isLoading}
      title={"Manage Categories"}
    >
      <div>
        <Input
          isLoading={isLoading}
          disabled={isLoading}
          type="category_name"
          {...register("category_name", {
            required: "Category Name Is Required",
          })}
          className=""
          label={"Category Name"}
          error={errors?.category_name?.message}
        />
        <Button
          className="border-black text-black p-2 hover:bg-white hover:text-black"
          title="Save"
          rounded
          onClick={() => {
            handleSubmit(handleCreateCategory)();
          }}
        />
      </div>
      <div className="flex flex-col gap-3 mt-10">
        {categories.map((category: any) => {
          return (
            <div
              key={category?.id}
              className="flex gap-3 items-center justify-between w-[300px] border-2 rounded-lg p-1"
            >
              <p className="">{category?.category_name}</p>
              <Button
                className="!h-10 !w-10 !px-0 !rounded-full hover:!text-red-500 hover:!border-red-500"
                icon={<BsTrash />}
                rounded
                onClick={() => {
                  handleDeleteCategory(category?.id);
                }}
              />
            </div>
          );
        })}
      </div>
    </Drawer>
  );
};

export default CategoryDrawer;
