import { useState } from "react";
import { toast } from "sonner";
import { useRazorpay } from "../../hooks/useRazorpay";

interface Props {
    premiumAmount: number;  // in ₹
    delivererName?: string;
    period?: string;
    planName?: string;
    onSuccess?: (paymentId: string) => void;
}

export function PayNowButton({ premiumAmount, delivererName = "Gig Worker", period = "week", planName = "Premium", onSuccess }: Props) {
    const { openPayment } = useRazorpay();
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);
        await openPayment({
            amount: premiumAmount,
            name: delivererName,
            description: `InsureGig ${planName} Plan — ₹${premiumAmount}/${period}`,
            onSuccess: (paymentId) => {
                setLoading(false);
                toast.success(`Payment successful! ID: ${paymentId}`);
                if (onSuccess) onSuccess(paymentId);
            },
            onFailure: (err) => {
                setLoading(false);
                toast.error("Payment failed or cancelled.");
            },
        });
    };

    return (
        <button
            onClick={handlePay}
            disabled={loading}
            className="flex w-full justify-center items-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md"
        >
            {loading ? (
                <span className="animate-spin">⏳</span>
            ) : (
                <span>🛡️</span>
            )}
            {loading ? "Opening Gateway..." : `Pay ₹${premiumAmount} / ${period}`}
        </button>
    );
}
