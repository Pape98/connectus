import React from "react";

import Topbar from "./topbar";
import Sidebar from "./sidebar";
import Tabs from "./tabs";

const Navigation = ({ children }) => {
  return <>{children}</>;
};

Navigation.Topbar = Topbar;
Navigation.Sidebar = Sidebar;
Navigation.Tabs = Tabs;

export default Navigation;
