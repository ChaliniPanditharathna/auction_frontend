import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Arts from "./components/arts";

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Arts />} />
      </Routes>
    </BrowserRouter>

  );
}
