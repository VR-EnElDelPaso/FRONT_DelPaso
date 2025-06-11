export interface Accreditation {
  id: string;
  user: {
    id: string;
    name: string;
    first_lastname: string;
    second_lastname: string;
    account_number: number;
  };
  tour: {
    id: string;
    name: string;
    accreditation_hours: number;
  }
  expires_at: string;
}