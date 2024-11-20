
import { create } from 'zustand';

enum UserType {
  ADMIN = 'ADMIN',
  VISITOR = 'VISITOR',
  STUDENT = 'STUDENT',
  WORKER = 'WORKER',
}

interface formInputs {
  fullName: string,
  accountNumber: string,
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
    fullName: '',
    accountNumber: '',
    email: '',
  },
  setHasUcolAccount: (hasUcolAccount) => set({ hasUcolAccount }),
  setFormInputs: (formInputs) => set({ formInputs }),
  getUserType: () => {
    const { hasUcolAccount, formInputs } = get();
    if (!hasUcolAccount) return UserType.VISITOR;
    return formInputs.accountNumber.length === 4
      ? UserType.WORKER
      : UserType.STUDENT;
  }
}))