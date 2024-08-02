import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./components/Auth";
import AppLayout from "./components/app-layout";

import Todos from "./components/Todos";
import Error from "./components/error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Todos />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
  // {
  //   path: "/",
  //   element: <Todos />,
  //   errorElement: <Error />,
  // },
  // {
  //   path: "/auth",
  //   element: <Auth />,
  // },
]);

const App = () => {
  return (
    // <>
    //   <Headers />
    //   {authToken ? (
    //     <div id="app">
    //       {/* <NoteForm />
    //       <Notes />
    //       <MoveUpButton /> */}
    //       <p>hi</p>
    //     </div>
    //   ) : (
    //     <Auth />
    //   )}
    // </>
    <RouterProvider router={router} />
  );
};

export default App;
