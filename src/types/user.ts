export default interface User {
  id: string;
  account_number: number;
  name: string;
  display_name: string;
  email: string;
  type: UserType;
  created_at: string;
  updated_at: string;
  iat: number;
  exp: number;
}

enum UserType {
  ADMIN = 'ADMIN',
  VISITOR = 'VISITOR',
  UDC_STUDENT = 'UDC_STUDENT',
  UDC_EMPLOYEE = 'UDC_EMPLOYEE',
}

