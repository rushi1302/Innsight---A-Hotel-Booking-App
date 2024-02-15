import { RegisterFormData } from "./pages/Register";
import { signinFormData } from "./pages/Signin";
export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`/api/v1/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
};

export const login = async (formData: signinFormData) => {
  const response = await fetch("/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data.data;
};
