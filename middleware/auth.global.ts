// @ts-expect-error: Nuxt 3 aliases work at runtime
import { useAuthStore } from "../app/stores/auth";
// @ts-expect-error: Nuxt 3 aliases work at runtime
import { defineNuxtRouteMiddleware, navigateTo } from "#app";
import type { RouteLocationNormalized } from "vue-router";

export default defineNuxtRouteMiddleware(
  async (to: RouteLocationNormalized) => {
    if (typeof window === "undefined") return;

    const auth = useAuthStore();
    await auth.initAuth();

    const requiresAuth = !!to.meta?.requiresAuth;
    const requiresAdmin = !!to.meta?.requiresAdmin;

    if (requiresAuth && !auth.isAuthenticated) {
      return navigateTo("/login");
    }

    if (requiresAdmin) {
      if (!auth.isAuthenticated) {
        return navigateTo("/login");
      }
      if (!auth.isAdmin) {
        return navigateTo("/unauthorized");
      }
    }
  }
);
