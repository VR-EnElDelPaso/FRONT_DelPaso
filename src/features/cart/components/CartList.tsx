import { CartCard, CartItem } from "./CartCard";

interface Props {
  cartItems: CartItem[];
  selectedItems: { [key: string]: boolean };
  onCheckboxChange: (id: string, isChecked: boolean) => void;
}

export const CartList = ({
  cartItems,
  selectedItems,
  onCheckboxChange,
}: Props) => {
  return (
    <>
      {cartItems.map((cartItem) => (
        <CartCard
          key={cartItem.id}
          cartItem={cartItem}
          selectState={selectedItems[cartItem.id] || false}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </>
  )
}