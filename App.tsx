import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from "firebase/firestore";
import { auth } from './lib/firebase';
import { db } from './lib/firebase';

// Pages + Components
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
import ScrollToTop from './components/ScrollToTop';
import { Maintenance } from "./pages/Maintenance";

// 🔒 Protected admin route
const ProtectedAdminRoute = () => {
  const [authStatus, setAuthStatus] = useState<'loading' | 'authorized' | 'unauthorized'>('loading');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return setAuthStatus("unauthorized");

      const token = await user.getIdTokenResult(true);

      if (token.claims.admin === true) {
        setAuthStatus("authorized");
      } else {
        await auth.signOut();
        setAuthStatus("unauthorized");
      }
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

function App() {
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [maintenanceMsg, setMaintenanceMsg] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "config", "maintenance"), (snap) => {
      if (snap.exists()) {
        setIsMaintenance(snap.data().enabled);
        setMaintenanceMsg(snap.data().message || "");
      }
    });

    return () => unsub();
  }, []);

  const isAdmin = window.location.hash.startsWith("#/admin");

  // Jika maintenance ON → arahkan semua ke page maintenance, kecuali admin
  if (isMaintenance && !isAdmin) {
    return <Maintenance message={maintenanceMsg} />;
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* Public */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/scripts" element={<Layout><ScriptList /></Layout>} />
        <Route path="/script/:id" element={<Layout><ScriptDetail /></Layout>} />
        <Route path="/disclaimer" element={<Layout><Disclaimer /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Layout><AdminLogin /></Layout>} />

        {/* Admin Panel */}
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scripts" element={<ManageScripts />} />
          <Route path="upload" element={<ScriptEditor />} />
          <Route path="edit/:id" element={<ScriptEditor />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;        }
      } catch (err) {
        console.error('Error checking admin claim:', err);
        setAuthStatus('unauthorized');
      }
    });

    return () => unsubscribe();
  }, []);

  if (authStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-accent-500 rounded-full animate-spin" />
      </div>
    );
  }

  return authStatus === 'authorized' ? (
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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/scripts" element={<Layout><ScriptList /></Layout>} />
        <Route path="/script/:id" element={<Layout><ScriptDetail /></Layout>} />
        <Route path="/disclaimer" element={<Layout><Disclaimer /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<Layout><AdminLogin /></Layout>} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedAdminRoute />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scripts" element={<ManageScripts />} />
          <Route path="upload" element={<ScriptEditor />} />
          <Route path="edit/:id" element={<ScriptEditor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
