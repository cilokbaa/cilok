import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
  ResponsiveContainer,
} from "recharts";

export const Dashboard: React.FC = () => {
  const [totalScripts, setTotalScripts] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalSearches, setTotalSearches] = useState(0);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const scriptsRef = collection(db, "scripts");
      const snapshot = await getDocs(scriptsRef);

      let views = 0;
      let clicks = 0;
      let searches = 0;
      let createdMap: any = {};

      snapshot.forEach((doc) => {
        const data: any = doc.data();
        views += data.views || 0;
        clicks += data.clicks || 0;
        searches += data.searches || 0;

        // hitung jumlah upload per hari (buat bar chart)
        if (data.createdAt?.seconds) {
          const date = new Date(data.createdAt.seconds * 1000);
          const day = date.toISOString().split("T")[0]; // YYYY-MM-DD

          if (!createdMap[day]) createdMap[day] = 0;
          createdMap[day] += 1;
        }
      });

      // convert map → array buat chart
      const formatted = Object.keys(createdMap)
        .sort()
        .slice(-7) // ambil 7 hari terakhir
        .map((day) => ({
          day,
          uploads: createdMap[day],
        }));

      setTotalScripts(snapshot.size);
      setTotalViews(views);
      setTotalClicks(clicks);
      setTotalSearches(searches);
      setDailyData(formatted);
    };

    fetchStats();
  }, []);

  const pieData = [
    { name: "Views", value: totalViews },
    { name: "Clicks", value: totalClicks },
    { name: "Searches", value: totalSearches },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#eab308"];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-gray-600">Total Scripts</h2>
          <p className="text-3xl font-bold">{totalScripts}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-gray-600">Total Views</h2>
          <p className="text-3xl font-bold">{totalViews}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-gray-600">Total Clicks</h2>
          <p className="text-3xl font-bold">{totalClicks}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-gray-600">Total Searches</h2>
          <p className="text-3xl font-bold">{totalSearches}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Engagement Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((_entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Scripts Uploaded (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyData}>
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="uploads" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
