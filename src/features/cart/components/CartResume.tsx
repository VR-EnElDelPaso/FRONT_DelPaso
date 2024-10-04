import { useEffect, useMemo } from "react";
import { CartListItem } from "./CartList";

interface Props {
  cartItems: CartListItem[];
  onPay: () => void;
}

export const CartResume = ({
  cartItems = [],
  onPay,
}: Props) => {

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (item.isSelected) {
        return acc + Number(item.price);
      }
      return acc;
    }, 0).toFixed(2);
  }, [cartItems]);

  useEffect(() => {
    console.log(total);
  }, [total]);

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-kaiseiDecol">Resumen de compra</h1>
      </div>
      <hr className="w-full h-0.5 bg-gray-200 border-0 rounded my-4"></hr>
      <div className="p-2 flex flex-col gap-2">
        <div className="flex">
          <h2 className=" font-inter">{`
            Subtotal (${cartItems.length} productos)
          `}</h2>
          <h2 className="ml-auto font-bold">${total}</h2>
        </div>
        <hr className="w-full h-0.5 bg-gray-200 border-0 rounded my-4"></hr>
        <div className="flex">
          <h2 className=" font-inter">Total</h2>
          <h2 className="ml-auto font-bold">${total}</h2>
        </div>
        <div className="flex">
          <button
            className="mx-auto px-6 bg-primary text-white p-2 rounded-xl hover:bg-primaryHover transition-colors duration-300"
            onClick={onPay}
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  )
}
