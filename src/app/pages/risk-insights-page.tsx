import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { AlertTriangle, Cloud, Wind, TrendingDown, MapPin } from "lucide-react";

export function RiskInsightsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Risk Insights</h1>
        <p className="text-gray-600">Real-time AI predictions for your delivery area</p>
      </div>

      {/* Overall Risk Level */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium">Current Risk Level</p>
                <h2 className="text-4xl font-bold text-orange-600">HIGH 🔴</h2>
              </div>
            </div>
            <Badge className="bg-orange-600 text-white text-lg px-4 py-2">Alert Active</Badge>
          </div>
          <Progress value={75} className="h-3" />
          <p className="text-sm text-gray-700 mt-2">75% risk level - Multiple disruption factors detected</p>
        </CardContent>
      </Card>

      {/* AI Prediction */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            AI Prediction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-lg font-semibold text-orange-900 mb-2">
              80% chance of disruption today
            </p>
            <p className="text-gray-700">
              Our AI model predicts significant delivery disruptions due to heavy rainfall and poor air quality. 
              We recommend limiting outdoor hours. Your coverage is active.
            </p>
          </div>
          <div className="text-sm text-gray-600">
            <p>Updated: 10 minutes ago • Next update: In 20 minutes</p>
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Rainfall */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-600" />
                Rainfall
              </CardTitle>
              <Badge className="bg-red-600">Critical</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-bold text-gray-900">70mm</p>
                <p className="text-sm text-gray-600">Expected in next 6 hours</p>
              </div>
              <Progress value={90} className="h-2" />
              <p className="text-sm text-gray-700">
                Heavy rainfall warning. High probability of delivery disruption.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Air Quality Index */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-purple-600" />
                AQI Level
              </CardTitle>
              <Badge className="bg-red-600">Severe</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-bold text-gray-900">320</p>
                <p className="text-sm text-gray-600">Very Poor Air Quality</p>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-sm text-gray-700">
                Hazardous air quality. Outdoor activity not recommended.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Demand */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-orange-600" />
                Demand
              </CardTitle>
              <Badge className="bg-orange-600">Low</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-bold text-gray-900">-35%</p>
                <p className="text-sm text-gray-600">Below average demand</p>
              </div>
              <Progress value={35} className="h-2" />
              <p className="text-sm text-gray-700">
                Reduced order volume due to weather conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-900">Heavy Rainfall Alert</p>
                <p className="text-sm text-gray-700 mt-1">
                  Monsoon depression expected to bring 70mm rainfall in next 6 hours. 
                  Roads may be waterlogged, affecting delivery times.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="text-red-700 border-red-300">Weather</Badge>
                  <span className="text-xs text-gray-600">Risk Weight: 40%</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Wind className="w-5 h-5 text-purple-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-purple-900">Severe Air Pollution</p>
                <p className="text-sm text-gray-700 mt-1">
                  AQI level at 320 (Very Poor). Health risks for outdoor workers. 
                  Visibility reduced, traffic congestion likely.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="text-purple-700 border-purple-300">Air Quality</Badge>
                  <span className="text-xs text-gray-600">Risk Weight: 30%</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
              <TrendingDown className="w-5 h-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-orange-900">Low Delivery Demand</p>
                <p className="text-sm text-gray-700 mt-1">
                  Order volume down 35% due to adverse conditions. Earning potential significantly reduced.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Badge variant="outline" className="text-orange-700 border-orange-300">Demand</Badge>
                  <span className="text-xs text-gray-600">Risk Weight: 30%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Heatmap Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Risk Zones in Your Area
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 h-64 rounded-lg flex items-center justify-center border">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-red-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">High Risk Zone</p>
              <p className="text-sm text-gray-600">Central & North areas affected</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-700">Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-700">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-700">High Risk</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
