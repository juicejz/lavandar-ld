import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ClientsPage from "./pages/ClientsPage";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <nav className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-indigo-400">
              Client DB
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link
              to="/"
              className="hover:text-indigo-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/clients"
              className="hover:text-indigo-400 transition-colors"
            >
              Clients
            </Link>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto px-6 py-6">
          <Routes>
            <Route
              path="/"
              element={
                <h2 className="text-xl font-semibold">
                  Welcome to the Client Database!
                </h2>
              }
            />
            <Route path="/clients" element={<ClientsPage />} />            
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
