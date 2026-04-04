import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import logoGig from "../../../assets/LogoGig.jpeg";
import { mockApi } from "../../services/mockApi";
import { loadPremiumModel, isPremiumModelReady } from "../../services/mlEngine";
import { PayNowButton } from "../components/ui/PayNowButton";

export function AuthPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    platform: "",
    location: "",
    vehicle: "bike",
    dailyIncome: 500,
    persona: "hustler",
  });
  const [calculatedPremium, setCalculatedPremium] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [modelSource, setModelSource] = useState<"ml" | "actuarial" | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    if (!isPremiumModelReady()) {
      await loadPremiumModel();
    }

    const wasModelReady = isPremiumModelReady();

    const premium = await mockApi.calculatePremium({
      dailyIncome: formData.dailyIncome,
      vehicle: formData.vehicle,
      zone: formData.location,
      persona: formData.persona,
    });

    setModelSource(wasModelReady ? "ml" : "actuarial");
    setCalculatedPremium(premium);
    setLoading(false);
  };

  const confirmAndProceed = (paymentId: string) => {
    localStorage.setItem("user", JSON.stringify({
      ...formData,
      premiumPaid: calculatedPremium,
      premiumStatus: "paid",
      paymentId,
    }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md my-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src={logoGig} alt="InsureGig" className="h-28 md:h-32 w-auto object-contain" />
        </div>

        {calculatedPremium === null ? (
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Create your account to protect your delivery income with an affordable weekly premium.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+91XXXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyIncome">Average Daily Income (₹)</Label>
                  <Input
                    id="dailyIncome"
                    type="number"
                    value={formData.dailyIncome}
                    onChange={(e) => setFormData({ ...formData, dailyIncome: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Primary Vehicle</Label>
                  <Select value={formData.vehicle} onValueChange={(value) => setFormData({ ...formData, vehicle: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motorcycle">Motorbike</SelectItem>
                      <SelectItem value="scooter">Scooter</SelectItem>
                      <SelectItem value="electric_scooter">Electric Scooter</SelectItem>
                      <SelectItem value="cycle">Bicycle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="platform">Delivery Platform</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) => setFormData({ ...formData, platform: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="swiggy">Swiggy</SelectItem>
                      <SelectItem value="zomato">Zomato</SelectItem>
                      <SelectItem value="amazon">Amazon</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Primary Delivery Zone (City)</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Mumbai, Bangalore"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Worker Activity Persona</Label>
                  <Select
                    value={formData.persona}
                    onValueChange={(value) => setFormData({ ...formData, persona: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select persona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hustler">The Hustler (Peak/Traffic)</SelectItem>
                      <SelectItem value="night_owl">The Night Owl (Late/AQI)</SelectItem>
                      <SelectItem value="fair_weather">The Fair-Weather Rider</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full bg-brand-500 hover:bg-brand-600" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Calculating Weekly Premium...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Calculate Weekly Premium
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-center text-green-800">Your Weekly Premium</CardTitle>
              <CardDescription className="text-center text-green-600">
                {modelSource === "ml"
                  ? "Predicted by neural network trained on real delivery records"
                  : "Calculated using actuarial fallback: trigger probability x income loss x exposure days"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {modelSource && (
                <div
                  className={`text-xs text-center px-3 py-1 rounded-full font-medium ${
                    modelSource === "ml" ? "bg-brand-100 text-brand-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {modelSource === "ml" ? "ML Model (Real Data)" : "Actuarial Fallback"}
                </div>
              )}

              <div className="bg-white p-6 rounded-lg text-center shadow-sm border border-green-100">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Weekly Premium</span>
                <div className="text-5xl font-extrabold text-green-600 mt-2">₹{calculatedPremium}</div>
                <p className="text-sm text-gray-500 mt-1">Approx. ₹{Math.round(calculatedPremium! * 4)}/month</p>
              </div>

              <div className="space-y-3">
                <PayNowButton
                  premiumAmount={calculatedPremium!}
                  delivererName={formData.name || "Gig Worker"}
                  planName="Weekly Protection"
                  period="week"
                  onSuccess={confirmAndProceed}
                />
                <p className="text-xs text-center text-gray-500">
                  Complete this demo payment to unlock the dashboard, claims, and policy pages.
                </p>
              </div>
              <Button
                onClick={() => setCalculatedPremium(null)}
                variant="outline"
                className="w-full border-green-200 text-green-700 hover:bg-green-100 bg-white"
              >
                Recalculate
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
