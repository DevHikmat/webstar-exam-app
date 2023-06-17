import { Link, useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    // Once logout is successful, navigate to a different route
    navigate("/another-page"); // Replace '/another-page' with the desired route
  };

  return handleLogout;
};

export default useLogout;

// ASIDE MENU ITEMS SETTINGS
export const items = [
  {
    key: "1",
    icon: <i className="fa-solid fa-book"></i>,
    label: (
      <Link to="" style={{ textDecoration: "none" }}>
        Imtihonlar
      </Link>
    ),
  },
  {
    key: "2",
    icon: <i className="fa-solid fa-layer-group"></i>,
    label: (
      <Link to="history" style={{ textDecoration: "none" }}>
        Imtihonlar tarixi
      </Link>
    ),
  },
  {
    key: "3",
    icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
    label: <div className="logout-box">Profildan chiqish</div>,
  },
];

export const adminItems = [
  {
    key: "1",
    icon: <i className="fa-solid fa-book"></i>,
    label: (
      <Link to="" style={{ textDecoration: "none" }}>
        Imtihonlar
      </Link>
    ),
    url: "",
  },
  {
    key: "2",
    icon: <i className="fa-solid fa-layer-group"></i>,
    label: (
      <Link to="groups" style={{ textDecoration: "none" }}>
        Guruhlar
      </Link>
    ),
    url: "/groups",
  },
  {
    key: "3",
    icon: <i className="fa-solid fa-user-group"></i>,
    label: (
      <Link to="users" style={{ textDecoration: "none" }}>
        O'quvchilar
      </Link>
    ),
    url: "/users",
  },
];
