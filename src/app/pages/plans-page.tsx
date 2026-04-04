import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Check, Star, Shield, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { PayNowButton } from "../components/ui/PayNowButton";

export function PlansPage() {
  const [selectedPlan, setSelectedPlan] = useState<"normal" | "premium">("premium");
  const [purchasedPlan, setPurchasedPlan] = useState<"normal" | "premium" | null>(null);

  const handleSelectPlan = (plan: "normal" | "premium") => {
    if (purchasedPlan) return;
    setSelectedPlan(plan);
    toast.success(`${plan === "normal" ? "Normal" : "Premium"} plan selected!`);
  };

  return (
    <div className="p-6 space-y-6 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          y: [0, -40, 0],
          x: [0, -20, 0],
          scale: [1.2, 1, 1.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Insurance Plans</h1>
        <p className="text-gray-600">Choose the plan that best protects your income</p>
      </motion.div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
      >
        <Card className="border-brand-200 bg-gradient-to-br from-brand-50 to-white relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-brand-400/10 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <CardContent className="pt-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Shield className="w-10 h-10 text-brand-500" />
                </motion.div>
                <div>
                  <p className="text-sm text-brand-900 font-medium">Current Plan</p>
                  <p className="text-2xl font-bold text-brand-900 flex items-center gap-2">
                    {selectedPlan === "normal" ? "Normal Plan" : "Premium Plan"}
                    {selectedPlan === "premium" && (
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                      </motion.div>
                    )}
                  </p>
                </div>
              </div>
              <Badge className={purchasedPlan ? "bg-green-600 px-3 py-1 shadow-md shadow-green-200" : "bg-brand-500 shadow-md shadow-brand-200"}>
                {purchasedPlan ? "✅ Active Policy (Locked)" : "Pending Payment"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 gap-6 relative z-10">
        {/* Normal Plan */}
        <motion.div
          initial={{ opacity: 0, x: -50, rotateY: -20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ y: -15, rotateY: 5, scale: 1.03 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Card className={`relative overflow-hidden h-full ${selectedPlan === "normal" ? "border-brand-500 border-2" : ""}`}>
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-brand-400/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <CardHeader className="relative z-10">
              <motion.div
                className="flex items-center gap-2 mb-2"
                whileHover={{ x: 10 }}
              >
                <Shield className="w-6 h-6 text-brand-500" />
                <CardTitle className="text-2xl">Normal Plan</CardTitle>
              </motion.div>
              <CardDescription>Basic protection for delivery workers</CardDescription>
              <motion.div
                className="mt-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
              >
                <span className="text-4xl font-bold text-gray-900">₹25</span>
                <span className="text-gray-600">/week</span>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-3">
                {[
                  "Coverage up to ₹1,000/week",
                  "Basic weather protection",
                  "Rain coverage",
                  "AI risk alerts",
                  "Standard claim processing (24 hours)"
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div whileHover={purchasedPlan ? {} : { scale: 1.05 }} whileTap={purchasedPlan ? {} : { scale: 0.95 }}>
                {purchasedPlan === "normal" ? (
                  <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-xl font-semibold">
                    ✅ Policy Active
                  </div>
                ) : purchasedPlan ? (
                  <Button disabled className="w-full bg-gray-200 text-gray-500 shadow-none border-0">Plan Unavailable</Button>
                ) : (
                  <div onClick={() => handleSelectPlan("normal")}>
                    <PayNowButton
                      premiumAmount={25}
                      planName="Normal"
                      period="week"
                      onSuccess={() => {
                        setPurchasedPlan("normal");
                        setSelectedPlan("normal");
                      }}
                    />
                  </div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Premium Plan */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: 20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ y: -15, rotateY: -5, scale: 1.03 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Card className={`relative overflow-hidden h-full ${selectedPlan === "premium" ? "border-brand-500 border-2" : ""} bg-gradient-to-br from-white to-brand-50`}>
            {/* Animated Badge */}
            <motion.div
              className="absolute top-4 right-4 z-20"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Recommended
              </Badge>
            </motion.div>

            {/* Animated Background */}
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl"
              animate={{
                scale: [1.3, 1, 1.3],
                opacity: [0.5, 0.3, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              className="absolute bottom-0 left-0 w-32 h-32 bg-brand-400/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <CardHeader className="relative z-10">
              <motion.div
                className="flex items-center gap-2 mb-2"
                whileHover={{ x: 10 }}
              >
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <CardTitle className="text-2xl flex items-center gap-2">
                  Premium Plan
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                </CardTitle>
              </motion.div>
              <CardDescription>Maximum protection with instant payouts</CardDescription>
              <motion.div
                className="mt-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.6 }}
              >
                <span className="text-4xl font-bold text-gray-900">₹50</span>
                <span className="text-gray-600">/week</span>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="space-y-3">
                {[
                  { text: "Coverage up to ₹3,000/week", bold: true },
                  { text: "Full weather protection", bold: false },
                  { text: "All disruptions covered", bold: false },
                  { text: "Instant automatic payouts", bold: true },
                  { text: "Priority AI monitoring", bold: false },
                  { text: "AQI & pollution coverage", bold: false },
                  { text: "24/7 support", bold: false }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ type: "spring" }}
                    >
                      <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    </motion.div>
                    <span className={`text-gray-700 ${feature.bold ? "font-medium" : ""}`}>
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>
              <motion.div whileHover={purchasedPlan ? {} : { scale: 1.05 }} whileTap={purchasedPlan ? {} : { scale: 0.95 }}>
                {purchasedPlan === "premium" ? (
                  <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 px-6 py-3 rounded-xl font-semibold">
                    ✅ Policy Active
                  </div>
                ) : purchasedPlan ? (
                  <Button disabled className="w-full bg-gray-200 text-gray-500 shadow-none border-0">Plan Unavailable</Button>
                ) : (
                  <div onClick={() => handleSelectPlan("premium")}>
                    <PayNowButton
                      premiumAmount={50}
                      planName="Premium"
                      period="week"
                      onSuccess={() => {
                        setPurchasedPlan("premium");
                        setSelectedPlan("premium");
                      }}
                    />
                  </div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Plan Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Card className="relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-500"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Plan Comparison
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-5 h-5 text-yellow-500" />
              </motion.div>
            </CardTitle>
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
                  {[
                    { feature: "Weekly Cost", normal: "₹25", premium: "₹50", type: "text" },
                    { feature: "Maximum Coverage", normal: "₹1,000", premium: "₹3,000", type: "text" },
                    { feature: "Claim Processing Time", normal: "24 hours", premium: "Instant", type: "highlight" },
                    { feature: "Rain Coverage", normal: "check", premium: "check", type: "check" },
                    { feature: "AQI/Pollution Coverage", normal: "—", premium: "check", type: "check" },
                    { feature: "All Disruptions", normal: "—", premium: "check", type: "check" }
                  ].map((row, index) => (
                    <motion.tr
                      key={row.feature}
                      className="border-b"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                    >
                      <td className="py-3 px-4 text-gray-700">{row.feature}</td>
                      <td className="py-3 px-4 text-center">
                        {row.type === "check" ? (
                          row.normal === "check" ? (
                            <Check className="w-5 h-5 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-gray-400">{row.normal}</span>
                          )
                        ) : (
                          <span>{row.normal}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.type === "check" ? (
                          row.premium === "check" ? (
                            <motion.div
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ type: "spring" }}
                            >
                              <Check className="w-5 h-5 text-green-600 mx-auto" />
                            </motion.div>
                          ) : (
                            <span className="text-gray-400">{row.premium}</span>
                          )
                        ) : row.type === "highlight" ? (
                          <span className="font-semibold text-green-600">{row.premium}</span>
                        ) : (
                          <span className="font-semibold">{row.premium}</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
