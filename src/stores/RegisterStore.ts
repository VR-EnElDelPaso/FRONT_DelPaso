import { create } from "zustand";
import { UserType } from "@/types/user";

interface formInputs {
  name: string;
  first_lastname: string;
  second_lastname: string;
  account_number: string;
  email: string;
}

type State = {
  hasUcolAccount: boolean;
  formInputs: formInputs;
  setHasUcolAccount: (hasUcolAccount: boolean) => void;
  setFormInputs: (formInputs: formInputs) => void;
  getUserType: () => UserType;
  getDisplayName: () => string;
};

export const useRegisterStore = create<State>((set, get) => ({
  hasUcolAccount: false,
  formInputs: {
    name: "",
    first_lastname: "",
    second_lastname: "",
    account_number: "",
    email: "",
  },
  setHasUcolAccount: (hasUcolAccount) => set({ hasUcolAccount }),
  setFormInputs: (formInputs) => set({ formInputs }),
  getUserType: () => {
    const { hasUcolAccount, formInputs } = get();
    if (!hasUcolAccount) return UserType.VISITOR;
    return formInputs.account_number.length === 4
      ? UserType.WORKER
      : UserType.STUDENT;
  },
  getDisplayName: () => {
    const { formInputs } = get();
    const { name } = formInputs;

    const nameParts = name.trim().split(" ");

    if (nameParts.length === 1) return nameParts[0];

    const displayName = `${nameParts[0]}${nameParts[1].charAt(0)}`;

    return displayName;
  },
}));
