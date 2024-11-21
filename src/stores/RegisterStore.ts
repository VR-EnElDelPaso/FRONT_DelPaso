
import { create } from 'zustand';
import { UserType } from '@/types/user';

interface formInputs {
  name: string,
  account_number: string,
  email: string
}

type State = {
  hasUcolAccount: boolean,
  formInputs: formInputs,
  setHasUcolAccount: (hasUcolAccount: boolean) => void,
  setFormInputs: (formInputs: formInputs) => void,
  getUserType: () => UserType;
}

export const useRegisterStore = create<State>((set, get) => ({
  hasUcolAccount: false,
  formInputs: {
    name: '',
    account_number: '',
    email: '',
  },
  setHasUcolAccount: (hasUcolAccount) => set({ hasUcolAccount }),
  setFormInputs: (formInputs) => set({ formInputs }),
  getUserType: () => {
    const { hasUcolAccount, formInputs } = get();
    if (hasUcolAccount == false) return UserType.VISITOR;
    return formInputs.account_number.length === 4
      ? UserType.WORKER
      : UserType.STUDENT;
  }
}))