import React from "react";
import { Sidebar } from "flowbite-react";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { FaUsers, FaBoxOpen, FaShoppingCart } from "react-icons/fa"; // Added FaShoppingCart for Orders
import { HiChartBar } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import "./NavsideBar.css";

type NavSideBarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const sidebarTheme = {
  root: {
    base: "h-full",
    collapsed: {
      on: "w-16",
      off: "w-64",
    },
    inner:
      "h-full overflow-y-auto overflow-x-hidden bg-gray-100  px-3 py-4 dark:bg-gray-800",
  },
  collapse: {
    button:
      "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    icon: {
      base: "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      open: {
        off: "",
        on: "text-gray-900",
      },
    },
    label: {
      base: "ml-3 flex-1 whitespace-nowrap text-left",
      icon: {
        base: "h-6 w-6 transition delay-0 ease-in-out",
        open: {
          on: "rotate-180",
          off: "",
        },
      },
    },
    list: "space-y-2 py-2",
  },
  item: {
    base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    active: "bg-gray-100 dark:bg-gray-700",
    collapsed: {
      insideCollapse: "group w-full pl-8 transition duration-75",
      noIcon: "font-bold",
    },
    content: {
      base: "flex-1 whitespace-nowrap px-3",
    },
    icon: {
      base: "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
      active: "text-gray-700 dark:text-gray-100",
    },
  },
};

const renderChevronIcon = (theme: any, open: boolean) => {
  const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
  const iconClass = twMerge(
    theme?.collapse?.label?.icon?.open?.[open ? "on" : "off"] || "text-gray-500"
  );

  return <IconComponent aria-hidden className={iconClass} />;
};

const NavSideBar: React.FC<NavSideBarProps> = ({ isSidebarOpen }) => {
  const location = useLocation();

  return (
    <Sidebar
      theme={sidebarTheme}
      aria-label="Sidebar"
      className={`nav-sidebar ${isSidebarOpen ? "" : "hidden"}  h-full overflow-hidden`}
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* Delivery Section */}
          <Sidebar.Collapse
            icon={HiChartBar}
            label="Delivery"
            renderChevronIcon={(theme, open) => renderChevronIcon(theme, open)}
            aria-expanded={isSidebarOpen}
          >
            <Sidebar.Item
              as={Link}
              to="/"
              className={
                location.pathname === "/" ? "sidebar-item-active" : "sidebar-item"
              }
            >
              Delivery Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/timesheet"
              className={
                location.pathname === "/timesheet"
                  ? "sidebar-item-active"
                  : "sidebar-item"
              }
            >
              Mark Login/Logout
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/timesheet-view"
              className={
                location.pathname === "/timesheet-view"
                  ? "sidebar-item-active"
                  : "sidebar-item"
              }
            >
              View Login/Logout
            </Sidebar.Item>
          </Sidebar.Collapse>

          {/* Routes Section */}
          <Sidebar.Collapse
            icon={FaBoxOpen}
            label="Routes"
            renderChevronIcon={(theme, open) => renderChevronIcon(theme, open)}
            aria-expanded={isSidebarOpen}
          >
            <Sidebar.Item
              as={Link}
              to="/route-form"
              className={
                location.pathname === "/route-form"
                  ? "sidebar-item-active"
                  : "sidebar-item"
              }
            >
              Add Route
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/routetable"
              className={
                location.pathname === "/routetable"
                  ? "sidebar-item-active"
                  : "sidebar-item"
              }
            >
              View Routes
            </Sidebar.Item>
          </Sidebar.Collapse>

          {/* Orders Section */}
          <Sidebar.Collapse
            icon={FaShoppingCart}
            label="Orders"
            renderChevronIcon={(theme, open) => renderChevronIcon(theme, open)}
            aria-expanded={isSidebarOpen}
          >
            <Sidebar.Item
              as={Link}
              to="/orders"
              className={
                location.pathname === "/orders"
                  ? "sidebar-item-active"
                  : "sidebar-item"
              }
            >
              View Orders
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/orders/create"
              className={
                location.pathname === "/orders/create"
                  ? "sidebar-item-active"
                  : "sidebar-item"
              }
            >
              Create Order
            </Sidebar.Item>
          </Sidebar.Collapse>

          {/* Users Section */}
          <Sidebar.Collapse
            icon={FaUsers}
            label="Expense"
            renderChevronIcon={(theme, open) => renderChevronIcon(theme, open)}
            aria-expanded={isSidebarOpen}
          >
            <Sidebar.Item
              as={Link}
              to="/expense"
              className={
                location.pathname === "/expense"
                  ? "sidebar-item-active"
                  : "sidebar-item"
              }
            >
              Expense List
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/expense/add"
              className={
                location.pathname === "/expense/add"
                  ? "sidebar-item-active"
                  : "sidebar-item"
              }
            >
              Add Expense
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/expense/category"
              className={
                location.pathname === "/expense/category"
                  ? "sidebar-item-active"
                  : "sidebar-item"
              }
            >
              Expense Category
            </Sidebar.Item>
            <Sidebar.Item
              as={Link}
              to="/expense/report"
              className={
                location.pathname === "/expense/report"
                  ? "sidebar-item-active"
                  : "sidebar-item"
              }
            >
              Expense Report
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default NavSideBar;
