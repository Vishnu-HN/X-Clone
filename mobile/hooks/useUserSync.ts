import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useApiClient, userApi } from "../utils/api";

/**
 * Hook: Automatically syncs the signed-in Clerk user with your backend database.
 * - Runs once when the user signs in.
 * - Skips re-syncing if user data already exists.
 */
export const useUserSync = () => {
  const { isSignedIn } = useAuth();
  const api = useApiClient();

  // Create a mutation to sync the user with backend
  const { data, mutate, isPending, isError, error } = useMutation({
    mutationKey: ["userSync"],
    mutationFn: () => userApi.syncUser(api),
    onSuccess: (response) => {
      console.log("✅ User synced successfully:", response.data.user);
    },
    onError: (error) => {
      console.error("❌ User sync failed:", error);
    },
  });

  // Automatically trigger sync when user signs in
  useEffect(() => {
    if (isSignedIn && !data && !isPending) {
      // Small delay ensures Clerk token is ready
      const timer = setTimeout(() => {
        mutate();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isSignedIn, data, isPending, mutate]);

  // Optionally return status flags for UI use (e.g., showing loader)
  return { isPending, isError, error };
};
