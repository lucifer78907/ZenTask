import { redirect } from "react-router";

export const action = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/login");
};
