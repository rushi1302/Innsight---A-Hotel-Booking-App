import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../apiClient";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>();
  // console.log(register);
  // console.log(handleSubmit);
  //   const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      console.log("Registration Successful");
    },
    onError: (errors: Error) => {
      throw new Error(errors.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutation.mutate(data);
    reset();
  });


  return (
    <form className="flex flex-col gap-7 m-6" onSubmit={onSubmit}>
      <h2 className="text-center text-lime-500 text-3xl py-2 uppercase font-mono ">
        Create Your Account
      </h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="flex flex-col gap-2 text-sm text-black  flex-1 md:text-xl uppercase text-start">
          First Name
          <input
            type="text"
            className=" border-2 border-gray-300 rounded-md p-3 text-xl text-black w-full font-normal"
            {...register("firstName", { required: "This feild is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500 ">{errors.firstName.message}</span>
          )}
        </label>
        <label className="flex flex-col gap-2 text-sm border-gray-400   flex-1 md:text-xl uppercase text-start">
          Last Name
          <input
            type="text"
            className="border-2 border-gray-300  rounded-md p-3 text-xl text-black w-full font-normal"
            {...register("lastName", { required: "This feild is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500 ">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className="flex flex-col gap-2 text-sm text-black  flex-1 md:text-xl uppercase text-start">
        Confirm Password
        <input
          type="password"
          className="border-2 border-gray-300  rounded-md p-3 text-xl text-black w-full font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This feild is required";
              } else if (watch("password") !== val) {
                return "Password do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 ">
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <span className="flex justify-between items-center ">
        <p className="text-lime-500">
          Already Created <Link to={"/login"}>login</Link>
        </p>
        <button
          type="submit"
          className="flex items-center justify-center p-2 md:p-3 uppercase bg-lime-300 text-black rounded-md text-sm">
          Create
        </button>
      </span>
    </form>
  );
}

export default Register;
