import React from "react";
import { useNavigate } from "react-router-dom";

const Headers = () => {
  const navigate = useNavigate();

  let authToken = localStorage.getItem("user");
  console.log(!authToken);
  return (
    <nav>
      <span className="app-title">MyTodo app</span>
      {authToken !== null && (
        <button
          id="logout-btn"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/auth");
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Headers;
