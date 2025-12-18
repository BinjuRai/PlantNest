import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={{ width: "220px", background: "#111", color: "#fff" }}>
      <h3 style={{ padding: "1rem" }}>Admin</h3>

      <nav>
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/categories">Categories</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
