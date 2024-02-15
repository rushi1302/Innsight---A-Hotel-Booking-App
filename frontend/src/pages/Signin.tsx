import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../apiClient";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { User, addUser, userSelector } from "../store/userSlice";

export type signinFormData = {
  email: string;
  password: string;
};

function Signin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<signinFormData>();

  const navigate = useNavigate();

  const selectedUser = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  console.log(selectedUser);

  const mutation = useMutation(apiClient.login, {
    onSuccess: async (data: any) => {
      console.log("user loggedin Successfully");
      console.log(data);
      const user = {
        firstName: data.firstname,
        lastName: data.lastname,
        id: data._id,
        email: data.email,
      };
      dispatch(addUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    },
    onError: (errors: Error) => {
      throw new Error(errors.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data), reset();
  });

  return (
    <form className="flex flex-col gap-7 m-6" onSubmit={onSubmit}>
      <h2 className="text-center text-lime-500 text-3xl py-2 uppercase font-mono ">
        Login Your Account
      </h2>
      <label className="flex flex-col gap-2 text-sm border-gray-300   flex-1 md:text-xl uppercase text-start">
        Email
        <input
          type="email"
          className="border-2 border-gray-300  rounded-md p-3 text-xl text-black w-full font-normal"
          {...register("email", { required: "This feild is required" })}
        />
        {errors.email && (
          <span className="text-red-500 ">{errors.email.message}</span>
        )}
      </label>
      <label className="flex flex-col gap-2 text-sm border-gray-400   flex-1 md:text-xl uppercase text-start">
        Password
        <input
          type="password"
          className="border-2 border-gray-300  rounded-md p-3 text-xl text-black w-full font-normal"
          {...register("password", {
            required: "This feild is required",
            minLength: {
              value: 6,
              message: "Password must be more than 5 character",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 ">{errors.password.message}</span>
        )}
      </label>
      <span className="flex justify-center items-center ">
        <button
          type="submit"
          className="flex items-center justify-center p-4 md:p-4 uppercase bg-lime-300 text-black rounded-md text-xl">
          Login
        </button>
      </span>
    </form>
  );
}

export default Signin;
