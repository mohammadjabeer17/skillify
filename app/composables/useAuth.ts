import type { User } from "firebase/auth";
import { useAuthStore } from "~/stores/auth";
import { useNuxtApp } from "#app";
import { computed } from "vue";

export const useAuth = () => {
  const { $auth } = useNuxtApp();
  const authStore = useAuthStore();
  const user = computed(() => {
    if ($auth && $auth.user && $auth.user.value) {
      return $auth.user.value as User | null;
    }
    return null;
  });
  const isAuthenticated = computed(() => !!user.value);

  const signInWithGoogle = async () => {
    const { user, error } = await $auth.signInWithGoogle();
    if (user) {
      await authStore.setUser({
        id: user.uid,
        email: user.email ?? "",
        // @ts-expect-error: provider is a custom property for our store
        provider: "google",
      });
      return { success: true };
    }
    return { success: false, error };
  };

  const signOut = async () => {
    const { error } = await $auth.signOut();
    if (!error) {
      authStore.clearUser();
      return { success: true };
    }
    return { success: false, error };
  };

  return {
    user,
    isAuthenticated,
    signInWithGoogle,
    signOut,
  };
};
