import { useEffect } from "react";
import useAuthStore from "../stores/AuthStore";

export const useAuth = () => {
  const authState = useAuthStore();

  useEffect(() => {
    authState.verifyToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return authState;
};