import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { jwtDecode } from "jwt-decode";


import EmployeeNavigation from './components/EmployeeDashboard/EmployeeNavigation';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './components/Navigation/Navigation';
import Department from './components/ManagerDepartement/Department';
import Employee from './components/ManagerEmployee/Employee';
import AddEmployee from './components/ManagerEmployee/AddEmployee';
import ViewAttendance from './components/ManagerAttendance/ViewAttendance';
import LeaveList from './components/ManagerLeaveList/LeaveList';
import MarkAttendance from './components/ManagerAttendance/Markattendance';
import Leave from './components/EmployeeApplyLeave/Leave';
import MyLeave from './components/EmployeeApplyLeave/MyLeave';
import MyAttendance from './components/EmployeeAttendance/MyAttendance';
import DashboardE from './components/EmployeeDashboard/DashboardE';
import Dashboard from './components/Manager Dashboard/Dashboard';
import { Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from "./Pages/Login";


function App() {
    const Navigate = useNavigate();
  const dispatch = useDispatch();
    const { user, role } = useSelector((state) => state.userReducer);
    const [userLogged, setUserLogged] = useState("");
    const isLoggedIn = () => {
        return localStorage.getItem("token") ? true : false;
    };
    useEffect(() => {
        if (isLoggedIn()) {
            setUserLogged(jwtDecode(localStorage.getItem("token")).user.role);
        }
    }, [isLoggedIn()]);
  return (
    <div>
    <Routes>
        <Route exact path="/">
            {isLoggedIn() == false ? (
                <Navigate to="/login"/>
            ) : userLogged && userLogged == "admin" ? (
                <Navigate to="dashboardA" />
            ) : userLogged == "Employee" ? (
                <Navigate to="dashboardE" />
            ) : null}
        </Route>
        <Route path="/login">
            {userLogged && userLogged == "admin" ? (
                <Navigate to="dashboardA" />
            ) : userLogged == "Employee" ? (
                <Navigate to="dashboardE" />
            ) : (
                <Login/>
            )}
        </Route>
        <Route path="/adminDepartment">
            {userLogged && userLogged == "admin" ? (
                <>
                    <Navigation/>
                    <Department/>
                </>
            ) : (
                <Navigate to="/" />
            )}
        </Route>
        <Route path="/adminEmployee">
            {userLogged && userLogged == "admin" ? (
                <>
                    <Navigation/>
                    <Employee/>
                </>
            ) : (
                <Navigate to="/" />
            )}
        </Route>
        <Route path="/adminAddEmployee">
            {userLogged && userLogged == "admin" ? (
                <>
                    <Navigation/>
                    <AddEmployee/>
                </>
            ) : (
                <Navigate to="/" />
            )}
        </Route>
        <Route path="/adminViewAttendance">
            {userLogged && userLogged == "admin" ? (
                <>
                    <Navigation />
                    <ViewAttendance/>
                </>
            ) : (
                <Navigate to="/" />
            )}
        </Route>
        <Route path="/AdminLeaveList">
            {userLogged && userLogged == "admin" ? (
                <>
                    <Navigation />
                    <LeaveList/>
                </>
            ) : (
                <Navigate to="/" />
            )}
        </Route>
        <Route path="/AdminMarkAttendance">
            {userLogged && userLogged == "admin" ? (
                <>
                    <Navigation />
                    <MarkAttendance />
                </>
            ) : (
                <Navigate to="/" />
            )}
        </Route>
        <Route path="/EmployeeApplyLeave">
            {userLogged && userLogged == "Employee" ? (
                <>
                    <EmployeeNavigation/>
                    <Leave/>
                </>
            ) : (
                <Navigate to="/" />
            )}
        </Route>
        <Route path="/EmployeemyLeave">
            {userLogged && userLogged == "Employee" ? (
                <>
                    <EmployeeNavigation />
                    <MyLeave/>
                </>
            ) : (
                <Navigate to="/" />
            )}
        </Route>

        <Route path="/EmployeeMyAttendance">
            {userLogged && userLogged == "Employee" ? (
                <>
                    <EmployeeNavigation />
                    <MyAttendance/>
                </>
            ) : (
                <Navigate to="/" />
            )}
        </Route>
        {isLoggedIn() ? (
            <Route exact path="/dashboardE">
                {userLogged && userLogged == "Employee" ? (
                    <>
                        <EmployeeNavigation />
                        <DashboardE/>
                    </>
                ) : (
                    <Navigate to="/" />
                )}
            </Route>
        ) : (
            <Navigate to="/login" />
        )}
        {isLoggedIn() ? (
            <Route exact path="/dashboardA">
                {userLogged && userLogged == "admin" ? (
                    <>
                        <Navigation />
                        <Dashboard/>
                    </>
                ) : (
                    <Navigate to="/" />
                )}
            </Route>
        ) : (
            <Navigate to="/login" />
        )}
    </Routes>
</div>
  );
}

export default App;
