import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import { db } from "../../lib/firebase";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer
} from "recharts";

export const Dashboard = () => {
  const [totalScripts, setTotalScripts] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalSearches, setTotalSearches] = useState(0);
  const [dailyData, setDailyData] = useState([]);

  const [maintenance, setMaintenance] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      const snap = await getDocs(collection(db, "scripts"));

      let views = 0, clicks = 0, searches = 0;
      let createdMap = {};

      snap.forEach((doc) => {
        const d = doc.data();
        views += d.views || 0;
        clicks += d.clicks || 0;
        searches += d.searches || 0;

        if (d.createdAt?.seconds) {
          const date = new Date(d.createdAt.seconds * 1000);
          const day = date.toISOString().split("T")[0];
          createdMap[day] = (createdMap[day] || 0) + 1;
        }
      });

      const formatted = Object.keys(createdMap)
        .sort()
        .slice(-7)
        .map((day) => ({
          day,
          uploads: createdMap[day]
        }));

      setDailyData(formatted);
      setTotalScripts(snap.size);
      setTotalViews(views);
      setTotalClicks(clicks);
      setTotalSearches(searches);
    };

    fetchStats();
  }, []);

  // MAINTENANCE REALTIME
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "config", "maintenance"), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setMaintenance(Boolean(data.enabled));
        setMessage(data.message || "");
      }
    });
    return () => unsub();
  }, []);

  const pieData = [
    { name: "Views", value: totalViews },
    { name: "Clicks", value: totalClicks },
    { name: "Searches", value: totalSearches }
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#eab308"];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-white rounded-xl shadow"><h2>Total Scripts</h2><p className="text-3xl font-bold">{totalScripts}</p></div>
        <div className="p-6 bg-white rounded-xl shadow"><h2>Total Views</h2><p className="text-3xl font-bold">{totalViews}</p></div>
        <div className="p-6 bg-white rounded-xl shadow"><h2>Total Clicks</h2><p className="text-3xl font-bold">{totalClicks}</p></div>
        <div className="p-6 bg-white rounded-xl shadow"><h2>Total Searches</h2><p className="text-3xl font-bold">{totalSearches}</p></div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Engagement Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip /><Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Scripts Uploaded (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <XAxis dataKey="day" /><YAxis allowDecimals={false} /><Tooltip />
              <Bar dataKey="uploads" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Maintenance Control */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Maintenance Mode</h2>

        <label className="block mb-2">Custom Message:</label>
        <input
          className="w-full px-3 py-2 border rounded-lg mb-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            await updateDoc(doc(db, "config", "maintenance"), {
              enabled: !maintenance,
              message
            });
            setSaving(false);
          }}
          className={`px-5 py-2 rounded-lg text-white ${
            saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}>
          {saving ? "Saving..." : maintenance ? "Turn OFF Maintenance" : "Turn ON Maintenance"}
        </button>
      </div>
    </div>
  );
};
