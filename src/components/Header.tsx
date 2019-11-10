import React from "react";
import "../ToDoContainer/ToDoContainer.scss";

export interface HeaderProps {}

const Header: React.SFC<HeaderProps> = () => {
  return <div className="edge-header container"> Todo Application</div>;
};

export default Header;
