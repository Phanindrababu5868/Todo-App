import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="todo-container">
      <h1>Something went wrong</h1>
      <p>{error.data || error.message}</p>

      <button style={{ maxWidth: "max-content" }}>
        <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
          Go Back
        </Link>
      </button>
    </div>
  );
};

export default Error;
