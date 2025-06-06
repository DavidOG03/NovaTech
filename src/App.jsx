// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./semantics/header";
import Sidebar from "./semantics/sidebar";
import Dashboard from "./semantics/dashboard";
import Order from "./order";
import "./App.css";
import Cart from "./cart";

function App() {
  return (
    <Router>
      <Header />
      <div className="dashboard-layout grid grid-cols-[270px_1fr] w-full h-[100vh] px-[30px] gap-[20px] relative pb-[3rem]">
        <Sidebar />

        {/* Only this part scrolls and changes routes */}
        <main className="h-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/order" element={<Order />} />
          </Routes>
        </main>
      </div>
      <footer></footer>
    </Router>
  );
}

export default App;
