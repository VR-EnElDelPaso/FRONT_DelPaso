import { CartCard } from "./CartCard";
import { Tour } from "../../../shared/types/Tour";

export interface CartListItem extends Tour {
  isSelected: boolean;
}

interface Props {
  cartItems: CartListItem[];
  onCheckboxChange: (id: string, isChecked: boolean) => void;
}

export const CartList = ({
  cartItems,
  onCheckboxChange,
}: Props) => {
  return (
    <>
      {cartItems.map((cartItem) => (
        <CartCard
          key={cartItem.id}
          cartItem={cartItem}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </>
  )
}