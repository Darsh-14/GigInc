import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { AlertTriangle, Cloud, Wind, TrendingDown, MapPin, Navigation } from "lucide-react";
import { fetchLiveWeather, fetchWeatherByCoords } from "../../services/weatherApi";
import { useTranslation } from "react-i18next";

export function RiskInsightsPage() {
  const { t } = useTranslation("risk");
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("your area");
  const [weatherData, setWeatherData] = useState({ temp: 32, desc: "Scanning...", severity: 75 });
  const [isLiveGps, setIsLiveGps] = useState(false);

  useEffect(() => {
    const fetchRiskData = async () => {
      const savedGps = localStorage.getItem("insuregig_gps_coords");
      const parsedGps = savedGps ? JSON.parse(savedGps) : null;
      const hasFreshTrackedGps = parsedGps && (Date.now() - parsedGps.ts < 5 * 60 * 1000);

      if (hasFreshTrackedGps) {
        const data = await fetchWeatherByCoords(parsedGps.lat, parsedGps.lon);
        if (data.success) {
          setLocationName(data.name || "your area");
          setWeatherData({ temp: data.temp, desc: data.description, severity: data.severity });
          setIsLiveGps(true);
          setLoading(false);
          return;
        }
      }

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const data = await fetchWeatherByCoords(latitude, longitude);
            if (data.success) {
              localStorage.setItem("insuregig_gps_coords", JSON.stringify({ lat: latitude, lon: longitude, ts: Date.now() }));
              setLocationName(data.name || "your area");
              setWeatherData({ temp: data.temp, desc: data.description, severity: data.severity });
              setIsLiveGps(true);
              setLoading(false);
            } else {
              fallbackToProfile();
            }
          },
          () => fallbackToProfile(),
          { timeout: 5000 },
        );
      } else {
        fallbackToProfile();
      }
    };

    const fallbackToProfile = async () => {
      const savedUser = localStorage.getItem("user");
      const city = savedUser ? JSON.parse(savedUser).location : "Mumbai";
      setLocationName(city);
      const data = await fetchLiveWeather(city);
      if (data.success) {
        setWeatherData({ temp: data.temp, desc: data.description, severity: data.severity });
      }
      setLoading(false);
    };

    fetchRiskData();
  }, []);

  const demandRisk = 18;
  const aqiRisk = 40;
  const riskScore = loading
    ? 55
    : Math.round(Math.min(100, Math.max(5, weatherData.severity * 0.65 + aqiRisk * 0.2 + demandRisk * 0.15)));

  let riskLevelLabel = t("riskLow");
  let bgGradient = "from-green-50 to-emerald-50";
  let borderColor = "border-green-200";
  let iconBg = "bg-green-500";
  let textColor = "text-green-600";

  if (riskScore > 60) {
    riskLevelLabel = t("riskHigh");
    bgGradient = "from-orange-50 to-red-50";
    borderColor = "border-orange-200";
    iconBg = "bg-orange-500";
    textColor = "text-orange-600";
  } else if (riskScore > 30) {
    riskLevelLabel = t("riskMedium");
    bgGradient = "from-yellow-50 to-amber-50";
    borderColor = "border-yellow-200";
    iconBg = "bg-yellow-500";
    textColor = "text-yellow-600";
  }

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          {t("title")}
          {isLiveGps && (
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 text-xs px-2 py-0.5">
              <Navigation className="w-3 h-3 mr-1" /> {t("liveGpsActive")}
            </Badge>
          )}
        </h1>
        <p className="text-gray-600 capitalize">{t("subtitle", { location: locationName })}</p>
      </div>

      <Card className={`${borderColor} bg-gradient-to-br ${bgGradient} transition-colors duration-500`}>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-16 h-16 rounded-full ${iconBg} flex items-center justify-center transition-colors duration-500`}>
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-700 font-medium">{t("currentRiskLevel")}</p>
                <h2 className={`text-4xl font-bold ${textColor} transition-colors duration-500`}>{riskLevelLabel}</h2>
              </div>
            </div>
            {riskScore > 60 ? (
              <Badge className="bg-red-600 text-white text-lg px-4 py-2 animate-pulse">{t("alertActive")}</Badge>
            ) : (
              <Badge className="bg-green-600 text-white text-lg px-4 py-2">{t("safeConditions")}</Badge>
            )}
          </div>
          <Progress value={riskScore} className="h-3 shadow-inner" />
          <p className="text-sm text-gray-700 mt-2 font-medium">
            {t("aggregatedRisk", { score: riskScore })} - {riskScore > 60 ? t("multipleFactors") : t("standardBaseline")}
          </p>
        </CardContent>
      </Card>

      <Card className="border-brand-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">{t("aiPrediction")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-4 rounded-lg border ${riskScore > 60 ? "bg-orange-50 border-orange-200" : "bg-brand-50 border-brand-200"}`}>
            <p className={`text-lg font-semibold mb-2 ${riskScore > 60 ? "text-orange-900" : "text-brand-900"}`}>
              {t("chanceOfDisruption", { score: riskScore })}
            </p>
            <p className="text-gray-700">
              {riskScore > 60
                ? t("highRiskPrediction", { location: locationName, conditions: weatherData.desc.toLowerCase() })
                : t("lowRiskPrediction", { location: locationName, conditions: weatherData.desc.toLowerCase() })}
            </p>
          </div>
          <div className="text-sm text-gray-500 flex items-center justify-between">
            <p>{t("updatedJustNow")} - {isLiveGps ? t("sourceLiveGps") : t("sourceProfile")}</p>
            {isLiveGps && <p className="text-brand-500 font-medium text-xs">{t("latLonSynced")}</p>}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Cloud className={`w-5 h-5 ${weatherData.severity > 50 ? "text-brand-500" : "text-gray-500"}`} />
                {t("liveWeather")}
              </CardTitle>
              {weatherData.severity > 60 ? <Badge className="bg-red-600">{t("severe")}</Badge> : weatherData.severity > 30 ? <Badge className="bg-yellow-500">{t("moderate")}</Badge> : <Badge className="bg-green-600">{t("normal")}</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-bold text-gray-900">{loading ? "..." : `${weatherData.temp}°C`}</p>
                <p className="text-sm text-gray-600 font-medium capitalize mt-1">{loading ? t("scanning") : weatherData.desc}</p>
              </div>
              <Progress value={weatherData.severity} className="h-2" />
              <p className="text-xs text-gray-500 h-8">{weatherData.severity > 50 ? t("adverseConditions") : t("clearConditions")}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm opacity-90">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <Wind className="w-5 h-5 text-gray-400" /> {t("aqiLevel")}
              </CardTitle>
              <Badge variant="outline" className="text-gray-500 border-gray-200">{t("moderate")}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-bold text-gray-700">124</p>
                <p className="text-sm text-gray-500">{t("unhealthySensitive")}</p>
              </div>
              <Progress value={40} className="h-2" />
              <p className="text-xs text-gray-500 h-8">{t("aqiNote")}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm opacity-90">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-700">
                <TrendingDown className="w-5 h-5 text-gray-400" /> {t("liveDemand")}
              </CardTitle>
              <Badge variant="outline" className="text-gray-500 border-gray-200">{t("stable")}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-3xl font-bold text-gray-700">82%</p>
                <p className="text-sm text-gray-500">{t("capacityRemaining")}</p>
              </div>
              <Progress value={82} className="h-2" />
              <p className="text-xs text-gray-500 h-8">{t("demandNote")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" />
              {t("liveRiskMap")}: <span className="capitalize border-b border-dashed border-gray-400 pb-0.5">{locationName}</span>
            </div>
            {isLiveGps && <span className="text-xs font-normal text-brand-500 flex items-center"><Navigation className="w-3 h-3 mr-1" /> {t("gpsSynced")}</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-green-100 via-yellow-100 to-red-100 h-64 rounded-lg flex items-center justify-center border relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at center, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
            <div className="text-center relative bg-white/80 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-white">
              <MapPin className={`w-12 h-12 mx-auto mb-2 ${riskScore > 60 ? "text-red-600 animate-bounce" : "text-green-600"}`} />
              <p className="font-bold text-gray-900 text-lg">{riskScore > 60 ? t("highRiskZone") : t("safeOpsZone")}</p>
              <p className="text-sm text-gray-600 font-medium">{t("monitoringRadius", { location: locationName })}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
