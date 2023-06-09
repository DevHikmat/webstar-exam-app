import { Link } from "react-router-dom";

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
    url: "",
  },
  // {
  //   key: "2",
  //   icon: <i className="fa-solid fa-layer-group"></i>,
  //   label: (
  //     <Link to="history" style={{ textDecoration: "none" }}>
  //       Imtihonlar tarixi
  //     </Link>
  //   ),
  //   url: "/history",
  // },
  {
    key: "2",
    icon: <i className="fa-solid fa-user"></i>,
    label: (
      <Link to="profile" style={{ textDecoration: "none" }}>
        Accaunt
      </Link>
    ),
    url: "/profile",
  },
];

export const adminItems = [
  {
    key: "1",
    icon: <i className="fa-solid fa-server"></i>,
    label: (
      <Link to="" style={{ textDecoration: "none" }}>
        Kategoriya
      </Link>
    ),
    url: "",
  },
  {
    key: "2",
    icon: <i className="fa-solid fa-book"></i>,
    label: (
      <Link to="quiz" style={{ textDecoration: "none" }}>
        Imtihonlar
      </Link>
    ),
    url: "/quiz",
  },
  {
    key: "3",
    icon: <i className="fa-solid fa-layer-group"></i>,
    label: (
      <Link to="groups" style={{ textDecoration: "none" }}>
        Guruhlar
      </Link>
    ),
    url: "/groups",
  },
  {
    key: "4",
    icon: <i className="fa-solid fa-user-group"></i>,
    label: (
      <Link to="users" style={{ textDecoration: "none" }}>
        O'quvchilar
      </Link>
    ),
    url: "/users",
  },
];
