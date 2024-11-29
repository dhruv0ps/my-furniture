import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Timesheet from './features/attendence/Markattendence';
import TimesheetView from './features/attendence/ViewAttendence';
import Home from './layout/Home';
import RouteForm from './features/Route/Routeform';
import RouteTable from './features/Route/RouteTable';
import RouteDetails from './features/Route/RouteDetails';
import CustomStopsHeader from './features/Route/Gasstop';
import OrderList from './features/Orders/OrderList';
import OrderDetails from './features/Orders/OrderDetails';
import ExpenseList from './features/Expense/Expense';
import AddExpense from './features/Expense/Addexpense';
import ExpenseCategories from './features/Expense/ExpenseCategories';
import ExpenseReport from './features/Expense/ExpenseReport';
import OrderDetailsPage from './features/Route/OrderItem';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    
    children: [
      {
        path: 'timesheet',
        element: <Timesheet />,
      },
      {
        path: 'timesheet-view',
        element: <TimesheetView />,
      },
      {
        path: 'route-form',
        element: <RouteForm />,
      },
      {
        path: 'routetable',
        element: <RouteTable />,
      },
      {
        path: 'routedetails/:id',
        element: <RouteDetails />,
      },
      {
        path: 'gasstop',
        element: <CustomStopsHeader />,
      },
      {
        path : "orders",
        element : <OrderList/>
      },
      {
        path : "orders/:id",
        element :<OrderDetails/>
      },
      {
         path : "routes/orderitem",
         element : <OrderDetailsPage/>
      },
     
      {
        path: "expense",
        element : <ExpenseList/>
      },
      {
        path: "expense/add",
        element : <AddExpense/>
      },{
        path: "expense/category",
        element : <ExpenseCategories/>
      },{
        path : "expense/report",
        element : <ExpenseReport/>
      },
    ],
  },
  {
    path: '*',
    element: <h2>Page Not Found</h2>,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;

