import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Course } from "@/types/Course";
import { useAuthStore } from "./auth";

export const useEnrolledCourseStore = defineStore("enrolledCourses", () => {
  const enrolledCourses = ref<Course[]>([]);
  const auth = useAuthStore();

  const loadUserEnrolledCourses = () => {
    if (typeof window !== "undefined" && auth.user?.id) {
      const saved = localStorage.getItem(`enrolledCourses_${auth.user.id}`);
      if (saved) enrolledCourses.value = JSON.parse(saved);
    }
  };

  const saveUserEnrolledCourses = () => {
    if (typeof window !== "undefined" && auth.user?.id) {
      localStorage.setItem(
        `enrolledCourses_${auth.user.id}`,
        JSON.stringify(enrolledCourses.value)
      );
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      if (auth.user?.id) {
        const data = await $fetch<Course[]>(
          `/api/enrolledCourses?userId=${auth.user.id}`
        );
        enrolledCourses.value = data;
      }
    } catch (err) {
      console.error("Failed to fetch enrolled courses:", err);
    }
  };

  watch(enrolledCourses, () => saveUserEnrolledCourses(), { deep: true });

  watch(
    () => auth.user?.id,
    (newUserId, oldUserId) => {
      if (newUserId !== oldUserId) {
        if (newUserId) {
          loadUserEnrolledCourses();
          fetchEnrolledCourses();
        } else {
          enrolledCourses.value = [];
        }
      }
    },
    { immediate: true }
  );

  const enrollCourse = async (course: Course) => {
    try {
      if (!auth.isAuthenticated || !auth.user?.id) {
        throw new Error("User must be logged in to enroll in a course");
      }
      if (!isEnrolled(course.id)) {
        enrolledCourses.value.push(course);
        await $fetch(`/api/enrolledCourses?userId=${auth.user.id}`, {
          method: "POST",
          body: course,
        });
      }
    } catch (err) {
      console.error("Failed to enroll course:", err);
      throw err;
    }
  };

  const removeCourse = async (courseId: string) => {
    try {
      if (!auth.isAuthenticated || !auth.user?.id) {
        throw new Error("User must be logged in to remove a course");
      }
      enrolledCourses.value = enrolledCourses.value.filter(
        (c) => c.id !== courseId
      );
      await $fetch(`/api/enrolledCourses/${courseId}?userId=${auth.user.id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Failed to remove course:", err);
      throw err;
    }
  };

  const updateCourse = async (courseId: string, updates: Partial<Course>) => {
    try {
      if (!auth.isAuthenticated || !auth.user?.id) {
        throw new Error("User must be logged in to update a course");
      }

      const courseIndex = enrolledCourses.value.findIndex(
        (c) => c.id === courseId
      );
      if (courseIndex !== -1) {
        //@ts-ignore
        enrolledCourses.value[courseIndex] = {
          ...enrolledCourses.value[courseIndex],
          ...updates,
        };
      }

      await $fetch(`/api/enrolledCourses/${courseId}?userId=${auth.user.id}`, {
        method: "PUT",
        body: updates,
      });
    } catch (err) {
      console.error("Failed to update course:", err);
      throw err;
    }
  };

  const isEnrolled = (courseId: string) =>
    enrolledCourses.value.some((c) => c.id === courseId);

  return {
    enrolledCourses,
    fetchEnrolledCourses,
    enrollCourse,
    removeCourse,
    updateCourse,
    isEnrolled,
  };
});
