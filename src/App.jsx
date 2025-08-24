// src/App.jsx
import { NavLink, useRoutes, Navigate } from "react-router";
import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import "./App.css";

export default function App() {
  const element = useRoutes([
    { path: "/", element: <Navigate to="/all" replace /> },
    { path: "/all", element: <ShowCreators /> },
    { path: "/add", element: <AddCreator /> },
    { path: "/edit/:id", element: <EditCreator /> },
    { path: "*", element: <div>Not Found</div> },          
  ]);

  return (
    <>
      <nav>
        <NavLink to="/all" end>All Creators</NavLink>
        <NavLink to="/add" end>Add Creator</NavLink>
      </nav>

      <h1>Creator Showcase</h1>
      {element}
    </>
  );
}
