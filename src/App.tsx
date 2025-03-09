import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import Login from "./pages/Login";
import { JSX } from "react";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthProvider";
import NewTicket from "./pages/NewTicket";
import MyTickets from "./pages/MyTickets";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Tickets from "./pages/Tickets";
import "./App.css";



const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider >
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/new-ticket" element={<ProtectedRoute><NewTicket /></ProtectedRoute>} />
          <Route path="/my-tickets" element={<ProtectedRoute><MyTickets /></ProtectedRoute>} />
          <Route path="/employee-dashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
