import React from "react";
import { toast } from "react-toastify";
import { Button } from "antd";

const Logout = () => {
  const refresh = () => {
    window.location.reload();
  };
  const logout = () => {
    console.log("a");
    localStorage.removeItem("token");
    console.log("b");
    toast.success("Logout successfully!");
    refresh();
  };
  return (
    <div className="logout">
      <br />
      <br />
      <br />
      <h1>Click to log out!</h1>
      <Button size="large" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
