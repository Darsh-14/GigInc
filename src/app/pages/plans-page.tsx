import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Check, Star } from "lucide-react";
import { toast } from "sonner";

export function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<"normal" | "premium">("premium");

  const handleSelectPlan = (plan: "normal" | "premium") => {
    setSelectedPlan(plan);
    toast.success(`${plan === "normal" ? "Normal" : "Premium"} plan selected!`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Insurance Plans</h1>
        <p className="text-gray-600">Choose the plan that best protects your income</p>
      </div>

      {/* Current Plan */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-900 font-medium">Current Plan</p>
              <p className="text-2xl font-bold text-blue-900">Premium Plan ⭐</p>
            </div>
            <Badge className="bg-green-600">Active</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Normal Plan */}
        <Card className={`relative ${selectedPlan === "normal" ? "border-blue-500 border-2" : ""}`}>
          <CardHeader>
            <CardTitle className="text-2xl">Normal Plan</CardTitle>
            <CardDescription>Basic protection for delivery workers</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold text-gray-900">₹25</span>
              <span className="text-gray-600">/week</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Coverage up to ₹1,000/week</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Basic weather protection</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Rain coverage</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">AI risk alerts</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Standard claim processing (24 hours)</span>
              </div>
            </div>
            <Button
              className="w-full"
              variant={selectedPlan === "normal" ? "default" : "outline"}
              onClick={() => handleSelectPlan("normal")}
            >
              {selectedPlan === "normal" ? "Current Plan" : "Select Plan"}
            </Button>
          </CardContent>
        </Card>

        {/* Premium Plan */}
        <Card className={`relative ${selectedPlan === "premium" ? "border-blue-500 border-2" : ""}`}>
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Recommended
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              Premium Plan
              <Star className="w-6 h-6 text-yellow-500" />
            </CardTitle>
            <CardDescription>Maximum protection with instant payouts</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold text-gray-900">₹50</span>
              <span className="text-gray-600">/week</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700 font-medium">Coverage up to ₹3,000/week</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Full weather protection</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">All disruptions covered</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700 font-medium">Instant automatic payouts</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">Priority AI monitoring</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">AQI & pollution coverage</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-gray-700">24/7 support</span>
              </div>
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => handleSelectPlan("premium")}
            >
              {selectedPlan === "premium" ? "Current Plan" : "Upgrade to Premium"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Plan Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Feature</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Normal</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-700">Weekly Cost</td>
                  <td className="py-3 px-4 text-center">₹25</td>
                  <td className="py-3 px-4 text-center font-semibold">₹50</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-700">Maximum Coverage</td>
                  <td className="py-3 px-4 text-center">₹1,000</td>
                  <td className="py-3 px-4 text-center font-semibold">₹3,000</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-700">Claim Processing Time</td>
                  <td className="py-3 px-4 text-center">24 hours</td>
                  <td className="py-3 px-4 text-center font-semibold text-green-600">Instant</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-700">Rain Coverage</td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-700">AQI/Pollution Coverage</td>
                  <td className="py-3 px-4 text-center text-gray-400">—</td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">All Disruptions</td>
                  <td className="py-3 px-4 text-center text-gray-400">—</td>
                  <td className="py-3 px-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
