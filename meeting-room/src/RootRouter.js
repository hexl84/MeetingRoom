import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, { rootLoader } from "./routes/root";
import Team, { teamLoader } from "./routes/team";
import UsersTable from "./Users";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     loader: rootLoader,
//     children: [
//       {
//         path: "users",
//         element: <UsersTable />,
//         loader: teamLoader,
//       },
//       {
//         path: "rooms",
//         element: <Team />,
//         loader: teamLoader,
//       },
//       {
//         path: "booking",
//         element: <Team />,
//         loader: teamLoader,
//       },
//       {
//         path: "book-history",
//         element: <Team />,
//         loader: teamLoader,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );
