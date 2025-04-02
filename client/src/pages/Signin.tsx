import { Link, useNavigate } from "react-router";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useForm } from "react-hook-form";
import AuthApi from "../api/auth.api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { login } from "../store/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { getIsLogin } from "../store/selector/authSelector";

const Signin = () => {
  const { login: loginapi } = new AuthApi();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();

  const isLogin = useSelector(getIsLogin);
  useEffect(() => {
    if (isLogin) {
      navigator("/inventories", { replace: true });
    }
  }, [isLogin]);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response: any = await loginapi(data);
      if (response.success) {
        console.log(response);
        dispatch(
          login({
            id: response.data?.user?.id,
            name: response.data?.user?.name,
            email: response.data?.user?.email,
            access_token: response.data?.access_token,
          })
        );
        navigator("/inventories", { replace: true });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error((error as any).message ?? "Something Went Wrong");
    } finally {
      setIsLoading(false);
    }
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col gap-4">
      <div className="border-2 w-[400px] h-[280px] p-3 flex flex-col gap-3 rounded-2xl">
        <Input
          isLoading={isLoading}
          disabled={isLoading}
          type="email"
          {...register("email", {
            required: "Email Is Required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email is not valid",
            },
          })}
          className=""
          label={"Email"}
          error={errors?.email?.message}
        />
        <Input
          isLoading={isLoading}
          disabled={isLoading}
          type="password"
          {...register("password", { required: "Password is Required" })}
          label={"Password"}
          error={errors?.password?.message}
        />
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          className="cursor-pointer mt-1"
          type={"button"}
          title="Submit"
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
        />
      </div>
      <Link to={"/signup"}>SignUp</Link>
    </div>
  );
};

export default Signin;
