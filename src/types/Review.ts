export interface Review {
  id: string;
  score: number;
  comment: string;
  user: {
    name: string;
    display_name: string;
  };
  tour_id: string;
  created_at: string;
}
