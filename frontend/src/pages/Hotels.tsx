import React from "react";
import { useAppSelector } from "../store/hook";
import { userSelector } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
function Hotels() {
  const state = useAppSelector(userSelector);
  const isAuthenticate = state.isAuthenticated;
  const navigate = useNavigate();

  return (
    <div>
      <p>This is hotels page</p>
    </div>
  );
}

export default Hotels;
