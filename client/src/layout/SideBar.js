import React, { useState } from "react";
import './Sidebar.css'
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarFooter,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Badge } from "@mui/material";
import { Link } from "react-router-dom";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TableViewIcon from '@mui/icons-material/TableView';
const SideBar = () => {
  const [isCollapsed, setisCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <Sidebar
        collapsed={isCollapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        backgroundColor="#0D0D34"
        breakPoint="md"
        className="sticky-sidebar"
        // backgroundColor="green"
      >
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" , }}
        >
          <div style={{ flex: 1, marginBottom: "32px" }}>
            <Menu iconShape="square">
              {/* LOGO */}
              <MenuItem
                onClick={() => setisCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                  margin: "10px 0 20px 0",
                }}
              >
                {!isCollapsed && (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    ml="15px"
                  >
                    <IconButton onClick={() => setisCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>
              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="white"
                    >
                    <img
                      alt="profile-user"
                      width="100px"
                      height="100px"
                      src={`/assets/user.gif`}
                      style={{ cursor: "pointer", borderRadius: "70%" }}
                      />
                  </Box>
                </Box>
              )}

              
              <Link to="/admin/index" className="menu-bars sidebar-link">
                <MenuItem icon={<HomeOutlinedIcon />}>Dashboard</MenuItem>
              </Link>

              <SubMenu icon={<MapOutlinedIcon />} label="Data">
                <Link to={"/admin/gunpla"} className="menu-bars sidebar-links">
                  <MenuItem icon={<TableViewIcon />}>
                    {" "}
                    Gunpla 
                  </MenuItem>
                </Link>
                <Link to={"/admin/technique"} className="menu-bars sidebar-links">
                  <MenuItem icon={<TableViewIcon />}>
                    {" "}
                    Technique
                  </MenuItem>
                </Link>
              </SubMenu>

              <SubMenu label="Manage" icon={<PeopleOutlinedIcon />}>
                <Link to={"/admin/manageuser"} className="menu-bars sidebar-links">
                  <MenuItem>User</MenuItem>
                </Link>
              </SubMenu>
            </Menu>

            <div
              style={{
                padding: "0 24px",
                marginBottom: "8px",
                marginTop: "32px",
              }}
            >
          
            </div>
          </div>
        </div>
      </Sidebar>
      <main>
        <div style={{ padding: "16px 2px ", color: "#44596e" }}>
          <div style={{ marginBottom: "16px" }}>
            {broken && (
              <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default SideBar;
