import { defineNuxtPlugin } from "#app";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  // Load Razorpay SDK
  if (process.client) {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
    };
    document.body.appendChild(script);
  }

  return {
    provide: {
      razorpay: {
        createPayment: async (options: {
          amount: number;
          currency: string;
          orderId: string;
          courseId: string;
          courseName: string;
          email?: string;
          name?: string;
        }) => {
          return new Promise((resolve, reject) => {
            if (!window.Razorpay) {
              reject(new Error("Razorpay SDK not loaded"));
              return;
            }

            const rzp = new window.Razorpay({
              key: "rzp_test_RU4nb5RxwSpjZv", // Your Razorpay Key ID
              amount: options.amount,
              currency: options.currency,
              order_id: options.orderId,
              name: "Skillify",
              description: `Payment for ${options.courseName}`,
              handler: function (response: any) {
                resolve({
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                });
              },
              prefill: {
                email: options.email || "",
                name: options.name || "",
              },
              theme: {
                color: "#2f76e8",
              },
              modal: {
                ondismiss: function () {
                  reject(new Error("Payment cancelled"));
                },
              },
            });

            rzp.on('payment.failed', function (response: any) {
              reject(new Error(response.error.description || "Payment failed"));
            });

            rzp.open();
          });
        },
      },
    },
  };
});
