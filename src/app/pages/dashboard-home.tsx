import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Shield, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const earningsData = [
  { day: "Mon", actual: 1200, protected: 1500 },
  { day: "Tue", actual: 1400, protected: 1500 },
  { day: "Wed", actual: 800, protected: 1500 },
  { day: "Thu", actual: 1300, protected: 1500 },
  { day: "Fri", actual: 1100, protected: 1500 },
  { day: "Sat", actual: 1600, protected: 1500 },
  { day: "Sun", actual: 1450, protected: 1500 },
];

export function DashboardHome() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your weekly overview.</p>
      </div>

      {/* Top Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Weekly Earnings Protected
            </CardTitle>
            <Shield className="w-5 h-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">₹1,500</div>
            <p className="text-sm text-gray-500 mt-1">Premium Plan Active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Active Coverage
            </CardTitle>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₹3,000</div>
            <p className="text-sm text-gray-500 mt-1">Max payout available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Risk Level
            </CardTitle>
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">Medium</div>
            <p className="text-sm text-gray-500 mt-1">Rain predicted tomorrow</p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings vs Protected Income</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Actual Earnings"
              />
              <Line
                type="monotone"
                dataKey="protected"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Protected Income"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alerts Section */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <CardTitle className="text-orange-900">Active Alerts</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Heavy Rain Alert</p>
              <p className="text-sm text-gray-600">Expected 40mm rainfall tomorrow. Coverage is active.</p>
            </div>
            <Badge variant="outline" className="text-green-700 border-green-300">Active</Badge>
          </div>
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">AQI Warning</p>
              <p className="text-sm text-gray-600">Poor air quality (AQI 280) detected in your area.</p>
            </div>
            <Badge variant="outline" className="text-yellow-700 border-yellow-300">Monitoring</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Claim Approved</p>
                <p className="text-sm text-gray-600">₹360 credited to your wallet</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
              <span className="text-green-600 font-semibold">+₹360</span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Claim Triggered</p>
                <p className="text-sm text-gray-600">Heavy rain disruption detected</p>
                <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Premium Plan Activated</p>
                <p className="text-sm text-gray-600">Coverage: ₹3,000/week</p>
                <p className="text-xs text-gray-500 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
