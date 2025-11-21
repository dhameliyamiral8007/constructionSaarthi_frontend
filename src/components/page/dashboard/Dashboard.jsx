import { useState } from "react";
import { TrendingUp, Users, MoreHorizontal, Eye } from "lucide-react";
import SubscriptionTreds from "./SubscriptionTreds";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-5">
        <StatCard title="Total App Users" value="2,267" change="+12.5%" trend="up" />
        <StatCard title="Monthly Revenue" value="₹2.67L" change="+8.1%" trend="up" />
        <StatCard title="Total Subscriptions" value="1,294" change="-2.3%" trend="down" />
        <StatCard title="Active Plans" value="1,080" change="+4.3%" trend="up" />
        <StatCard title="Trial Users" value="102" change="+4.3%" trend="up" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Subscriptions Trends</h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <TrendingUp size={48} className="mx-auto mb-2 opacity-50" />
              <p>Revenue chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">User Acquisition</h3>
            <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Users size={48} className="mx-auto mb-2 opacity-50" />
              <p>User acquisition chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionTreds />

      {/* Recent Projects Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Projects</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <TableRow projectName="Website Redesign" status="active" team={["JD", "SA", "MJ"]} progress={75} />
              <TableRow projectName="Mobile App Development" status="completed" team={["TS", "RJ"]} progress={100} />
              <TableRow projectName="API Integration" status="pending" team={["AB", "CD", "EF"]} progress={30} />
              <TableRow projectName="Dashboard UI" status="active" team={["GH", "IJ"]} progress={90} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Stat Card
const StatCard = ({ title, value, change, trend }) => (
  <div className="bg-white p-5 rounded-xl shadow-md">
    <p className="text-lg font-medium text-gray-800">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
    <div className={`mt-2 px-2 py-1 text-sm rounded-full ${trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
      {change} This month
    </div>
  </div>
);

// Table Row
const TableRow = ({ projectName, status, team, progress }) => {
  const statusClasses = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800"
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">{projectName}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>
      <td className="px-6 py-4 flex -space-x-2">
        {team.map((t, i) => (
          <div key={i} className="w-8 h-8 bg-blue-500 rounded-full text-white flex items-center justify-center border-2 border-white">{t}</div>
        ))}
      </td>
      <td className="px-6 py-4">
        <div className="w-24 bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="text-sm text-gray-600 ml-2">{progress}%</span>
      </td>
      <td className="px-6 py-4">
        <button className="text-blue-600 mr-3"><Eye size={16} /></button>
        <button className="text-gray-600"><MoreHorizontal size={16} /></button>
      </td>
    </tr>
  );
};

export default Dashboard;
