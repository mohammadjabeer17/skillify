import { defineEventHandler, readBody, createError } from "h3";

// Create Razorpay instance lazily
let razorpayInstance: any = null;

async function getRazorpay() {
  if (!razorpayInstance) {
    try {
      // Use the provided keys directly
  const key_id = "rzp_test_RU4nb5RxwSpjZv";
  const key_secret = "gQPic8eVQkicsJ7fRu1DvW3m";
      
  console.log("Initializing Razorpay with key_id:", key_id);
      
      const Razorpay = (await import("razorpay")).default;
      razorpayInstance = new Razorpay({
        key_id: key_id,
        key_secret: key_secret,
      });
      
  console.log("Razorpay instance created successfully");
    } catch (error) {
      console.error("Failed to initialize Razorpay:", error);
      throw error;
    }
  }
  return razorpayInstance;
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { amount, currency = "INR" } = body;

    // Validate amount
    if (!amount || amount <= 0) {
      throw createError({
        statusCode: 400,
        message: "Invalid amount",
      });
    }

    console.log("Create order request:", { amount, currency });

    const options = {
      amount: Math.round(amount * 100), // Convert to paise and ensure integer
      currency,
      receipt: `order_${Date.now()}`,
      payment_capture: 1, // Auto capture payment
    };

    console.log("Razorpay order options:", options);

    // Get Razorpay instance and create order
    const razorpay = await getRazorpay();
    const order = await razorpay.orders.create(options);

    console.log("Created Razorpay order:", order);

    return {
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    };
  } catch (error: any) {
    console.error("Order creation error:", error);
    console.error("Error stack:", error.stack);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Could not create order",
    });
  }
});
