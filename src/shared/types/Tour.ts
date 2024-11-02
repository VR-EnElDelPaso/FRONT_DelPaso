//   id                 String               @id @default(uuid())
//   name               String
//   description        String
//   price              Decimal              @db.Decimal(10, 2)
//   url                String
//   image_url          String
//   created_at         DateTime             @default(now())
//   updated_at         DateTime             @updatedAt
//   user_tour_purchase user_tour_purchase[]

export interface Tour {
  id: string;
  name: string;
  description: string;
  price: number;
  url: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}