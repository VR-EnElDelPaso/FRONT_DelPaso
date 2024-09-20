import { Tour } from '../../../shared/types/Tour';

export interface CartItem extends Tour {
  available: boolean;
}