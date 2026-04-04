import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Cloud, Wind, TrendingDown, CalendarDays } from "lucide-react";

const historyData = [
  {
    id: "CLM-2026-0317",
    date: "17 Mar 2026",
    event: "Heavy Rain",
    icon: Cloud,
    description: "Work hours lost due to heavy rainfall",
    payout: "₹360",
    status: "Completed",
    hoursLost: "3h",
  },
  {
    id: "CLM-2026-0315",
    date: "15 Mar 2026",
    event: "Poor AQI",
    icon: Wind,
    description: "Air quality index at hazardous levels",
    payout: "₹200",
    status: "Completed",
    hoursLost: "2h",
  },
  {
    id: "CLM-2026-0312",
    date: "12 Mar 2026",
    event: "Rain",
    icon: Cloud,
    description: "Moderate rainfall affecting deliveries",
    payout: "₹300",
    status: "Completed",
    hoursLost: "2.5h",
  },
  {
    id: "CLM-2026-0310",
    date: "10 Mar 2026",
    event: "Low Demand",
    icon: TrendingDown,
    description: "Significantly reduced order volume",
    payout: "₹250",
    status: "Completed",
    hoursLost: "4h",
  },
  {
    id: "CLM-2026-0308",
    date: "8 Mar 2026",
    event: "Heavy Rain",
    icon: Cloud,
    description: "Severe rainfall disruption",
    payout: "₹400",
    status: "Completed",
    hoursLost: "3.5h",
  },
  {
    id: "CLM-2026-0305",
    date: "5 Mar 2026",
    event: "AQI Warning",
    icon: Wind,
    description: "Very poor air quality conditions",
    payout: "₹180",
    status: "Completed",
    hoursLost: "1.5h",
  },
];

export function HistoryPage() {
  const totalPayout = historyData.reduce((sum, claim) => sum + parseInt(claim.payout.replace("₹", "")), 0);
  const totalHours = historyData.reduce((sum, claim) => sum + parseFloat(claim.hoursLost), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Claims History</h1>
        <p className="text-gray-600">Track all your past claims and earnings protection</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Claims
            </CardTitle>
            <CalendarDays className="w-5 h-5 text-brand-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{historyData.length}</div>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Payouts
            </CardTitle>
            <TrendingDown className="w-5 h-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₹{totalPayout.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Income protected</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Hours Protected
            </CardTitle>
            <Cloud className="w-5 h-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{totalHours}h</div>
            <p className="text-sm text-gray-500 mt-1">Work hours compensated</p>
          </CardContent>
        </Card>
      </div>

      {/* Claims Table */}
      <Card>
        <CardHeader>
          <CardTitle>Claim Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-center">Hours Lost</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Payout</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData.map((claim) => {
                  const Icon = claim.icon;
                  return (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-brand-500" />
                          <span>{claim.event}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{claim.description}</TableCell>
                      <TableCell className="text-center">{claim.hoursLost}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-green-600">
                          {claim.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-green-600">
                        {claim.payout}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Breakdown - March 2026</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Cloud className="w-5 h-5 text-brand-500" />
                <div>
                  <p className="font-medium text-gray-900">Rain-related Claims</p>
                  <p className="text-sm text-gray-600">3 claims</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">₹1,060</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Wind className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">AQI-related Claims</p>
                  <p className="text-sm text-gray-600">2 claims</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">₹380</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">Low Demand Claims</p>
                  <p className="text-sm text-gray-600">1 claim</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">₹250</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-100 rounded-lg border-2 border-green-300 mt-4">
              <div>
                <p className="font-semibold text-green-900">March 2026 Total</p>
                <p className="text-sm text-gray-700">6 claims processed</p>
              </div>
              <span className="text-2xl font-bold text-green-700">₹{totalPayout.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="border-brand-200 bg-brand-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <TrendingDown className="w-6 h-6 text-brand-500 mt-0.5" />
            <div>
              <p className="font-semibold text-brand-900 mb-1">Insights</p>
              <p className="text-sm text-gray-700">
                Your claims are mostly weather-related. Consider checking AI risk predictions daily 
                to plan your work hours better. Your average claim processing time is under 5 minutes 
                with Premium plan.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
