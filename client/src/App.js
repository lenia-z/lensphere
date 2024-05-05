import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import GalleryPage from "./pages/Gallery/Gallery";
import EventsPage from "./pages/Events/Events";

function App() {
  return (
    <div data-theme="black">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
