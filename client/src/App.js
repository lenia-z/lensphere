import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import GalleryPage from "./pages/Gallery/Gallery";

function App() {
  return (
    <div data-theme="black">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={ <GalleryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
