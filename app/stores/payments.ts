import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Course } from "@/types/Course"; // ✅ correct path
import { useEnrolledCourseStore } from "@/stores/enrolledCourses"; // ✅ correct path

export interface Payment {
  id: string;
  courseId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

export const usePaymentStore = defineStore("payment", () => {
  const payments = ref<Payment[]>([]);
  const currentPayment = ref<Payment | null>(null);

  // --------------------------
  // Load payments from localStorage
  // --------------------------
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("payments");
    if (saved) payments.value = JSON.parse(saved);

    watch(
      payments,
      (val) => localStorage.setItem("payments", JSON.stringify(val)),
      { deep: true }
    );
  }

  // --------------------------
  // Payment actions
  // --------------------------
  const startPayment = (course: Course) => {
    const payment: Payment = {
      id: crypto.randomUUID(),
      courseId: course.id,
      amount: course.price,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    currentPayment.value = payment;
    payments.value.push(payment);
    return payment;
  };

  const completePayment = async (course: Course) => {
    if (!currentPayment.value) return;

    currentPayment.value.status = "completed";

    const enrolledStore = useEnrolledCourseStore();
    await enrolledStore.enrollCourse(course); // ✅ persists to enrolledCourses.json

    currentPayment.value = null;
  };

  const failPayment = () => {
    if (!currentPayment.value) return;
    currentPayment.value.status = "failed";
    currentPayment.value = null;
  };

  return {
    payments,
    currentPayment,
    startPayment,
    completePayment,
    failPayment,
  };
});
