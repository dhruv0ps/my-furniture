import React from "react";
import { Sidebar } from "flowbite-react";
// import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { FaUsers, FaBoxOpen, } from "react-icons/fa";
import { HiChartBar } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
// import { twMerge } from "tailwind-merge";
import "./NavsideBar.css";

type NavSideBarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// const sidebarTheme = {
//   root: {
//     base: "h-full",
//     collapsed: {
//       on: "w-16",
//       off: "w-64",
//     },
//     inner:
//       "h-full overflow-y-auto overflow-x-hidden bg-gray-100  px-3 py-4 dark:bg-gray-800",
//   },
//   collapse: {
//     button:
//       "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
//     icon: {
//       base: "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
//       open: {
//         off: "",
//         on: "text-gray-900",
//       },
//     },
//     label: {
//       base: "ml-3 flex-1 whitespace-nowrap text-left",
//       icon: {
//         base: "h-6 w-6 transition delay-0 ease-in-out",
//         open: {
//           on: "rotate-180",
//           off: "",
//         },
//       },
//     },
//     list: "space-y-2 py-2",
//   },
//   item: {
//     base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
//     active: "bg-gray-100 dark:bg-gray-700",
//     collapsed: {
//       insideCollapse: "group w-full pl-8 transition duration-75",
//       noIcon: "font-bold",
//     },
//     content: {
//       base: "flex-1 whitespace-nowrap px-3",
//     },
//     icon: {
//       base: "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
//       active: "text-gray-700 dark:text-gray-100",
//     },
//   },
// };

// const renderChevronIcon = (theme: any, open: boolean) => {
//   const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
//   const iconClass = twMerge(
//     theme?.collapse?.label?.icon?.open?.[open ? "on" : "off"] || "text-gray-500"
//   );

//   return <IconComponent aria-hidden className={iconClass} />;
// };

const NavSideBar: React.FC<NavSideBarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const location = useLocation();

  // Handler to close the sidebar
  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Sidebar
    aria-label="Sidebar"
    className={`nav-sidebar ${isSidebarOpen ? "" : "hidden"} h-full overflow-hidden`}
  >
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        {/* Routes Section */}
        <Sidebar.Item
          as={Link}
          to="/routetable"
          className={
            location.pathname === "/routetable"
              ? "sidebar-item-active"
              : "sidebar-item"
          }
          onClick={handleSidebarClose}
        >
          <div className="flex"><FaBoxOpen className="w-5 h-5 mr-2 mt-0.5" />
          Routes</div>
          
        </Sidebar.Item>

        {/* Orders Section */}
        {/* <Sidebar.Item
          as={Link}
          to="/orders"
          className={
            location.pathname === "/orders"
              ? "sidebar-item-active"
              : "sidebar-item"
          }
          onClick={handleSidebarClose}
        >
          <div className="flex">   <FaShoppingCart className="w-5 h-5 mr-2 mt-0.5" />
          Orders</div>
       
        </Sidebar.Item> */}

        {/* Expense Section */}
        <Sidebar.Item
          as={Link}
          to="/expense/add"
          className={
            location.pathname === "/expense/add"
              ? "sidebar-item-active"
              : "sidebar-item"
          }
          onClick={handleSidebarClose}
        ><div className="flex">  
          <FaUsers className="w-5 h-5 mr-2 mt-0.5" />
          Expense</div>
        </Sidebar.Item>

        {/* Attendance Section */}
        <Sidebar.Item
          as={Link}
          to="/timesheet"
          className={
            location.pathname === "/timesheet"
              ? "sidebar-item-active"
              : "sidebar-item"
          }
          onClick={handleSidebarClose}
        ><div className="flex">
          <HiChartBar className="w-5 h-5 mr-2 mt-0.5" />
          Attendance</div>
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  );
};

export default NavSideBar;
