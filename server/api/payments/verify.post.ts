import { defineEventHandler, readBody, createError } from "h3";
import crypto from "crypto";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log("Received verification request:", body);
    console.log("Request body keys:", Object.keys(body));

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Validate required fields
    if (!razorpay_order_id) {
      console.error("Missing razorpay_order_id");
      throw createError({
        statusCode: 400,
        message: "Missing razorpay_order_id",
      });
    }

    if (!razorpay_payment_id) {
      console.error("Missing razorpay_payment_id");
      throw createError({
        statusCode: 400,
        message: "Missing razorpay_payment_id",
      });
    }

    if (!razorpay_signature) {
      console.error("Missing razorpay_signature");
      throw createError({
        statusCode: 400,
        message: "Missing razorpay_signature",
      });
    }

  // Use environment variable for secret key
  const secret = process.env.RAZORPAY_KEY_SECRET || "gQPic8eVQkicsJ7fRu1DvW3m";
    
    // Generate expected signature
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    console.log("Generated signature:", generated_signature);
    console.log("Received signature:", razorpay_signature);

    const isValid = generated_signature === razorpay_signature;

    if (isValid) {
      return {
        success: true,
        verified: true,
        message: "Payment verified successfully",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      };
    } else {
      throw createError({
        statusCode: 400,
        message: "Invalid payment signature",
      });
    }
  } catch (error: any) {
    console.error("Verification error:", error);
    
    // If it's already a createError, throw it
    if (error.statusCode) {
      throw error;
    }
    
    // Otherwise, create a new error
    throw createError({
      statusCode: 500,
      message: error.message || "Payment verification failed",
    });
  }
});
