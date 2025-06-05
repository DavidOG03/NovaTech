import { useState } from "react";
import "./App.css";
import Header from "./semantics/header";
import Sidebar from "./semantics/sidebar";
import Dashboard from "./semantics/dashboard";


function App() {
  return (
    <>
      <Header/>
      <div className="dashboard-layout grid grid-cols-[270px_1fr] w-full h-full px-[30px] gap-[20px] relative">
        <Sidebar/>
        <main className="h-screen overflow-hidden">
          <Dashboard/>
        </main>
      </div>
      <footer></footer>
    </>
  );
}

export default App;
