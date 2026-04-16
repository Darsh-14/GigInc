import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { MapPin, Navigation, Shield, AlertTriangle, Wifi, WifiOff, RefreshCw, Crosshair } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { getDistanceFromLatLonInKm } from "../../services/mockApi";
import { useTranslation } from "react-i18next";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: markerIcon2x, iconUrl: markerIcon, shadowUrl: markerShadow });

const riskZones = [
  { lat: 19.076, lng: 72.877, risk: "high", area: "Dharavi, Mumbai", reason: "Heavy flooding, poor drainage" },
  { lat: 19.033, lng: 73.03, risk: "medium", area: "Navi Mumbai", reason: "Moderate rainfall risk" },
  { lat: 19.121, lng: 72.858, risk: "low", area: "Andheri, Mumbai", reason: "Good infrastructure" },
];

const riskConfig = {
  high: { color: "#ef4444", fillColor: "#fca5a5", label: "highRisk", radius: 18000 },
  medium: { color: "#f59e0b", fillColor: "#fde68a", label: "mediumRisk", radius: 15000 },
  low: { color: "#22c55e", fillColor: "#bbf7d0", label: "lowRisk", radius: 12000 },
};

function getNearestZone(lat: number, lng: number) {
  let nearest = riskZones[0];
  let minDist = Infinity;
  for (const zone of riskZones) {
    const d = getDistanceFromLatLonInKm(lat, lng, zone.lat, zone.lng);
    if (d < minDist) {
      minDist = d;
      nearest = zone;
    }
  }
  return { zone: nearest, distanceKm: Math.round(minDist) };
}

export function LiveMapPage() {
  const { t } = useTranslation("livemap");
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInst = useRef<L.Map | null>(null);
  const riderMark = useRef<L.Marker | null>(null);
  const accuracyCircle = useRef<L.Circle | null>(null);
  const watchId = useRef<number | null>(null);
  const hasFlown = useRef(false);

  const [coords, setCoords] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [status, setStatus] = useState<"idle" | "tracking" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [nearestZone, setNearest] = useState<{ zone: typeof riskZones[0]; distanceKm: number } | null>(null);
  const [pingCount, setPingCount] = useState(0);

  useEffect(() => {
    if (!mapRef.current || mapInst.current) return;
    const map = L.map(mapRef.current, { center: [20.5937, 78.9629], zoom: 5, scrollWheelZoom: true, zoomControl: true });
    mapInst.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    riskZones.forEach((zone) => {
      const cfg = riskConfig[zone.risk as keyof typeof riskConfig];
      L.circle([zone.lat, zone.lng], {
        color: cfg.color,
        fillColor: cfg.fillColor,
        fillOpacity: 0.35,
        weight: 1.5,
        radius: cfg.radius,
      })
        .addTo(map)
        .bindPopup(`<b>${zone.area}</b><br/>${zone.reason}`);
    });

    return () => {
      map.remove();
      mapInst.current = null;
    };
  }, []);

  const stopTracking = () => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
    setStatus("idle");
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setErrorMsg(t("locationFailed"));
      setStatus("error");
      return;
    }

    setStatus("tracking");
    setErrorMsg("");
    hasFlown.current = false;

    const riderIcon = L.divIcon({
      className: "",
      html: `<div style="width:18px;height:18px;border-radius:50%;background:#009AFD;border:3px solid white;"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude: lat, longitude: lng, accuracy } = pos.coords;
        setCoords({ lat, lng, accuracy });
        setPingCount((c) => c + 1);
        setNearest(getNearestZone(lat, lng));
        localStorage.setItem("insuregig_gps_coords", JSON.stringify({ lat, lon: lng, accuracy, ts: Date.now() }));

        const map = mapInst.current;
        if (!map) return;

        if (riderMark.current) {
          riderMark.current.setLatLng([lat, lng]);
        } else {
          riderMark.current = L.marker([lat, lng], { icon: riderIcon, zIndexOffset: 1000 })
            .addTo(map)
            .bindPopup(`<b>${t("yourLiveLocation")}</b><br/>${t("accuracyMeters", { meters: Math.round(accuracy) })}`);
        }

        if (accuracyCircle.current) {
          accuracyCircle.current.setLatLng([lat, lng]).setRadius(accuracy);
        } else {
          accuracyCircle.current = L.circle([lat, lng], {
            radius: accuracy,
            color: "#009AFD",
            fillColor: "#93c5fd",
            fillOpacity: 0.2,
            weight: 1,
          }).addTo(map);
        }

        if (!hasFlown.current) {
          map.flyTo([lat, lng], 14, { duration: 1.5 });
          hasFlown.current = true;
        }
      },
      (err) => {
        setStatus("error");
        setErrorMsg(
          err.code === 1 ? t("permissionDenied") : err.code === 2 ? t("positionUnavailable") : t("timeout"),
        );
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 },
    );
  };

  const recenter = () => {
    if (coords && mapInst.current) {
      mapInst.current.flyTo([coords.lat, coords.lng], 15, { duration: 1 });
    }
  };

  useEffect(() => () => stopTracking(), []);

  const nearRisk = nearestZone?.zone.risk as keyof typeof riskConfig | undefined;
  const riskBadgeColor = nearRisk === "high" ? "bg-red-100 text-red-700 border-red-200" : nearRisk === "medium" ? "bg-amber-100 text-amber-700 border-amber-200" : "bg-green-100 text-green-700 border-green-200";

  return (
    <div className="p-6 space-y-5 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Navigation className="w-7 h-7 text-brand-500" /> {t("title")}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">{t("subtitle")}</p>
        </div>
        <div className="flex gap-2">
          {status === "tracking" && (
            <Button variant="outline" onClick={recenter} className="border-brand-200 text-brand-700 hover:bg-brand-50">
              <Crosshair className="w-4 h-4 mr-1" /> {t("recenter")}
            </Button>
          )}
          {status !== "tracking" ? (
            <Button onClick={startTracking} className="bg-brand-500 hover:bg-brand-600 shadow-md">
              <MapPin className="w-4 h-4 mr-2" /> {t("startTracking")}
            </Button>
          ) : (
            <Button onClick={stopTracking} variant="destructive" className="shadow-md">
              <WifiOff className="w-4 h-4 mr-2" /> {t("stopTracking")}
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Badge className={`px-3 py-1.5 text-sm font-medium ${status === "tracking" ? "bg-green-100 text-green-700 border border-green-200" : status === "error" ? "bg-red-100 text-red-700 border border-red-200" : "bg-gray-100 text-gray-600 border border-gray-200"}`}>
          {status === "tracking" ? <><Wifi className="w-3.5 h-3.5 mr-1 inline" /> {t("gpsPings", { count: pingCount })}</> : status === "error" ? <><AlertTriangle className="w-3.5 h-3.5 mr-1 inline" /> {t("error")}</> : t("trackingOff")}
        </Badge>
        {coords && (
          <>
            <Badge className="bg-brand-50 text-brand-700 border border-brand-200 px-3 py-1.5 text-sm font-mono">{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</Badge>
            <Badge className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 text-sm">±{Math.round(coords.accuracy)}m {t("accuracy")}</Badge>
          </>
        )}
        {nearestZone && nearRisk && (
          <Badge className={`px-3 py-1.5 text-sm border ${riskBadgeColor}`}>
            <Shield className="w-3.5 h-3.5 mr-1 inline" />
            {t(riskConfig[nearRisk].label)} - {t("zoneAway", { distance: nearestZone.distanceKm, area: nearestZone.zone.area })}
          </Badge>
        )}
      </div>

      {status === "error" && errorMsg && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">{t("locationFailed")}</p>
            <p className="mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      <Card className="overflow-hidden border-gray-200 shadow-md">
        <CardHeader className="pb-3 pt-4 px-5 bg-white border-b">
          <CardTitle className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-500" /> {t("liveMap")}
            {status === "tracking" && <RefreshCw className="w-3.5 h-3.5 ml-1 text-brand-400 animate-spin" />}
            <span className="ml-auto text-xs font-normal text-gray-400">{t("mapLegendHint")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div ref={mapRef} style={{ height: "480px", width: "100%" }} />
        </CardContent>
      </Card>

      {status === "idle" && (
        <div className="text-center py-8 text-gray-500">
          <Navigation className="w-12 h-12 mx-auto mb-3 text-brand-200" />
          <p className="font-medium text-gray-700">{t("startTrackingPrompt")}</p>
          <p className="text-sm mt-1">{t("browserPermission")}</p>
        </div>
      )}

      <Card className="border-gray-100">
        <CardContent className="pt-4 pb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-3">{t("riskZoneLegend")}</p>
          <div className="flex flex-wrap gap-4">
            {Object.entries(riskConfig).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2" style={{ backgroundColor: cfg.fillColor, borderColor: cfg.color }} />
                <span className="text-sm text-gray-700 font-medium">{t(cfg.label)}</span>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-brand-500 border-2 border-white shadow" />
              <span className="text-sm text-gray-700 font-medium">{t("yourLocation")}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">{t("legendNote")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
