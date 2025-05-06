import { useAuth } from "@/hooks/useAuth";
import { RxAvatar } from "react-icons/rx";

export const UserAvatar = () => {
  const { user } = useAuth();
  return (
    <button className="flex items-center justify-center align-middle space-x-2 bg-white border border-gray-300 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm transition duration-300 shadow-sm">
      <RxAvatar className="text-xl text-primary" />
      <h4>{user?.display_name}</h4>
    </button>
  );
};
