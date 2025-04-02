import { Link } from "react-router";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="flex justify-center items-center h-screen w-screen flex-col gap-4">
      <div className="border-2 w-[400px] h-[280px] p-3 flex flex-col gap-3 rounded-2xl">
        <Input
          {...register("email", {
            required: "Email Is Required",
            pattern:
              {value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:"Email is not valid"}
          })}
          className=""
          label={"Email"}
          error={errors?.email?.message}
        />
        <Input
          {...register("password",{required:'Password is Required'})}
          label={"Password"}
          error={errors?.password?.message}
        />
        <Button
          className="cursor-pointer mt-1"
          type={"button"}
          title="Submit"
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
        />
      </div>
      <Link to={'/signin'}>SignIn</Link>
    </div>
  );
};

export default SignUp;
