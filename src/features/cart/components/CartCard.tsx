import { useNavigate } from "react-router-dom";

import { CartListItem } from "./CartList";
import { useCartStore } from "../../../stores/useCartStore";
import { dateFormatter } from "../../../utils/dateFormatter";

interface Props {
  cartItem: CartListItem;
  onCheckboxChange: (name: string, isChecked: boolean) => void;
}

export const CartCard = ({ cartItem, onCheckboxChange }: Props) => {
  const navigate = useNavigate();
  const { removeCartItem } = useCartStore();

  const handleDelete = () => {
    removeCartItem(cartItem.id);
  };

  const handleMoreInfo = () => {
    navigate(`/tours/${cartItem.id}`);
  };

  return (
    <>
      <div className="p-2 flex gap-4">
        <input
          title="Seleccionar"
          type="checkbox"
          checked={cartItem.isSelected}
          onChange={(e) => onCheckboxChange(cartItem.id, e.target.checked)}
          className="flex-shrink-0"
        />
        <div className="w-24 sm:w-1/4 flex-shrink-0">
          <img
            alt="tour image"
            className="rounded-[15px] object-cover w-full h-24 sm:h-auto"
            src={cartItem.image_url}
          />
        </div>
        <div className="min-w-0 flex-1 flex flex-col min-h-[12rem]">
          {/* Desktop price */}
          <div className="min-[490px]:block max-[490px]:hidden">
            <div className="relative">
              <div className="pr-20">
                <h1 className="text-2xl font-kaiseiDecol mb-2 break-words">
                  {cartItem.name}
                </h1>
              </div>
              <div className="absolute top-0 right-0 font-bold text-xl">
                ${cartItem.price}
              </div>
            </div>
          </div>

          {/* Mobile title and price */}
          <div className="min-[490px]:hidden">
            <h1 className="text-xl font-kaiseiDecol mb-2 pr-12 max-[400px]:pr-8 break-words">
              {cartItem.name}
            </h1>
            <div className="absolute top-2 right-0 font-bold text-lg">
              ${cartItem.price}
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="text-sm text-green-500 font-medium">
                Disponible
              </div>

              <button onClick={handleMoreInfo} className="text-left">
                <h2 className="text-sm text-neutral-600 font-inter font-medium hover:drop-shadow-lg hover:text-neutral-800">
                  Más información
                </h2>
              </button>

              <h3 className="text-sm text-neutral-600 font-inter font-medium">
                {dateFormatter(cartItem.created_at)}
              </h3>
            </div>

            <div className="flex flex-col gap-2">
              {/* Mobile view */}
              <div className="min-[490px]:hidden">
                <div className="text-sm text-neutral-600 mt-8">
                  Cuota de
                  <br />
                  recuperación
                </div>
                <div className="font-bold text-lg">${cartItem.price}</div>
              </div>

              {/* Desktop Eliminar */}
              <div className="max-[490px]:hidden flex justify-end">
                <button
                  onClick={handleDelete}
                  className="text-sm text-neutral-500 font-inter font-medium hover:drop-shadow-lg hover:text-neutral-700"
                >
                  Eliminar
                </button>
              </div>

              {/* Mobile Eliminar */}
              <div className="min-[490px]:hidden flex justify-end">
                <button
                  onClick={handleDelete}
                  className="text-sm text-neutral-500 font-inter font-medium hover:drop-shadow-lg hover:text-neutral-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-0.5 bg-neutral-200 border-0 rounded my-2"></hr>
    </>
  );
};
