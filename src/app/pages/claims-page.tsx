import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CheckCircle, Cloud, Clock, TrendingUp, Wallet } from "lucide-react";

export function ClaimsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Claims & Payouts</h1>
        <p className="text-gray-600">Automatic claim processing and payout details</p>
      </div>

      {/* Active Claim */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              Claim Approved
            </CardTitle>
            <Badge className="bg-green-600 text-white text-lg px-4 py-2">Completed ✓</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Disruption Type</p>
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-600" />
                <p className="font-semibold text-gray-900">Heavy Rain 🌧</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Work Hours Lost</p>
              <p className="text-2xl font-bold text-gray-900">3 hours</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 mb-1">Estimated Loss</p>
              <p className="text-2xl font-bold text-orange-600">₹360</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg border-2 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">AI Verified Claim</p>
                <p className="text-3xl font-bold text-green-600">₹360</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div className="flex items-center gap-2 text-green-700 mb-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Credited to Wallet</span>
            </div>
            <p className="text-sm text-gray-600">
              Your claim was automatically verified by our AI system and the payout has been processed instantly.
            </p>
          </div>

          <div className="flex gap-3">
            <Button className="flex-1 bg-green-600 hover:bg-green-700">
              <Wallet className="w-4 h-4 mr-2" />
              View Wallet
            </Button>
            <Button variant="outline" className="flex-1">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Claim Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Claim Processing Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="w-0.5 h-full bg-green-600"></div>
              </div>
              <div className="flex-1 pb-6">
                <p className="font-semibold text-gray-900">Payout Credited</p>
                <p className="text-sm text-gray-600">₹360 added to your wallet</p>
                <p className="text-xs text-gray-500 mt-1">Today at 2:45 PM</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="w-0.5 h-full bg-green-600"></div>
              </div>
              <div className="flex-1 pb-6">
                <p className="font-semibold text-gray-900">Claim Verified</p>
                <p className="text-sm text-gray-600">AI verification completed successfully</p>
                <p className="text-xs text-gray-500 mt-1">Today at 2:43 PM</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="w-0.5 h-full bg-green-600"></div>
              </div>
              <div className="flex-1 pb-6">
                <p className="font-semibold text-gray-900">Claim Submitted</p>
                <p className="text-sm text-gray-600">Automatically triggered by AI</p>
                <p className="text-xs text-gray-500 mt-1">Today at 2:40 PM</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Disruption Detected</p>
                <p className="text-sm text-gray-600">Heavy rain and low delivery demand identified</p>
                <p className="text-xs text-gray-500 mt-1">Today at 11:30 AM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Claim Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              This Week's Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Claims</span>
              <span className="text-xl font-bold text-gray-900">2</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Approved Claims</span>
              <span className="text-xl font-bold text-green-600">2</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="text-gray-700 font-medium">Total Payout</span>
              <span className="text-2xl font-bold text-green-600">₹560</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              Processing Speed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Average Processing Time</p>
              <p className="text-5xl font-bold text-purple-600 mb-2">3 min</p>
              <Badge className="bg-purple-600">⚡ Instant Processing</Badge>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Your Premium plan includes automatic AI verification for instant payouts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 mb-1">How Automatic Claims Work</p>
              <p className="text-sm text-gray-700">
                Our AI continuously monitors weather, air quality, and delivery demand in your area. 
                When disruption is detected and verified, claims are automatically triggered and processed. 
                With Premium plan, payouts are instant - no forms, no waiting.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
