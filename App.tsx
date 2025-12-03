import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from './lib/firebase';

import ScrollToTop from './components/ScrollToTop';
import { Layout } from './components/Layout';
import { AdminSidebar } from './components/AdminSidebar';

import { Home } from './pages/Home';
import { ScriptList } from './pages/ScriptList';
import { ScriptDetail } from './pages/ScriptDetail';
import { AdminLogin } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';
import { ManageScripts } from './pages/admin/ManageScripts';
import { ScriptEditor } from './pages/admin/ScriptEditor';
import { Disclaimer } from './pages/Disclaimer';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Maintenance } from "./pages/Maintenance";


// ADMIN ROUTE PROTECTOR
const ProtectedAdminRoute = () => {
  const [authStatus, setAuthStatus] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return setAuthStatus("unauthorized");
      const token = await user.getIdTokenResult(true);
      setAuthStatus(token.claims.admin === true ? "authorized" : "unauthorized");
    });

    return () => unsub();
  }, []);

  if (authStatus === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return authStatus === "authorized" ? (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 md:ml-64 p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/admin/login" replace />
  );
};


// WRAPPER — hanya untuk public routes
const PublicRoutes = ({ maintenance, message }: any) => {
  if (maintenance) {
    return <Maintenance message={message} />;
  }
  return <Outlet />;
};


function App() {
  const [maintenance, setMaintenance] = useState(false);
  const [message, setMessage] = useState("");

  // realtime maintenance listener
  useEffect(() => {
    return onSnapshot(doc(db, "config", "maintenance"), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setMaintenance(Boolean(data.enabled));
        setMessage(data.message || "");
      }
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* WRAPPER UNTUK PUBLIC ROUTES */}
        <Route element={<PublicRoutes maintenance={maintenance} message={message} />}>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/scripts" element={<Layout><ScriptList /></Layout>} />
          <Route path="/script/:id" element={<Layout><ScriptDetail /></Layout>} />
          <Route path="/disclaimer" element={<Layout><Disclaimer /></Layout>} />
          <Route path="/terms" element={<Layout><Terms /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        </Route>

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<Layout><AdminLogin /></Layout>} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scripts" element={<ManageScripts />} />
          <Route path="upload" element={<ScriptEditor />} />
          <Route path="edit/:id" element={<ScriptEditor />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
