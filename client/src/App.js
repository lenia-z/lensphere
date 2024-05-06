import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import GalleryPage from "./pages/Gallery/Gallery";
import EventsPage from "./pages/Events/Events";
import AuthPage from "./pages/Auth/AuthPage";
import DashboardPage from "./pages/Dashboard/Dashboard";
import GalleryDashboard from "./components/GalleryDashboard/GalleryDashboard";
import EventsDashboard from "./components/EventsDashboard/EventsDashboard";

function App() {

  return (
    <AuthProvider>
      <div data-theme="black">
        <SessionChecker />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route index element={<Navigate replace to="gallery" />} />
              <Route path="gallery" element={<GalleryDashboard />} />
              <Route path="events" element={<EventsDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;

const SessionChecker = () => {
  const { checkSession } = useAuth();

  useEffect(() => {
    const intervalId = setInterval(checkSession, 1000 * 60);
    return () => clearInterval(intervalId);
  }, [checkSession]);

  return null;
};