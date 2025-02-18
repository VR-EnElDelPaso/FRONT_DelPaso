import { useNavigate } from "react-router-dom";

import { CartListItem } from "./CartList";
import { useCartStore } from "../../../stores/useCartStore";

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
        />
        <div className="w-1/4">
          <img
            alt="tour image"
            className="rounded-md object-cover"
            src={cartItem.image_url}
          />
        </div>
        <div className="relative h-auto w-full flex flex-col justify-around">
          {/* Desktop view (>490px) */}
          <div className="min-[490px]:block max-[490px]:hidden">
            <div className="pr-20">
              <h1 className="text-2xl font-kaiseiDecol">{cartItem.name}</h1>
            </div>
            <div className="absolute top-0 right-0 font-bold text-xl">
              ${cartItem.price}
            </div>
          </div>

          {/* Mobile view (<490px) */}
          <div className="min-[490px]:hidden">
            <h1 className="text-2xl font-kaiseiDecol mb-2">{cartItem.name}</h1>
          </div>

          <div>
            <button onClick={handleMoreInfo}>
              <h2 className="text-sm text-gray-600 font-inter font-medium hover:drop-shadow-lg hover:text-gray-800">
                Más información
              </h2>
            </button>
          </div>

          <h3 className="text-sm text-gray-600 font-inter font-medium">
            {new Date(cartItem.created_at).toLocaleDateString()}
          </h3>

          {/* Footer Section */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
            {/* Mobile Price with Label */}
            <div className="min-[490px]:hidden flex items-center justify-end gap-2">
              <span className="text-sm text-gray-600">
                Cuota de recuperación
              </span>
              <span className="font-bold text-xl">${cartItem.price}</span>
            </div>

            <button onClick={handleDelete} className="self-end">
              <h2 className="text-sm text-red-500 font-inter font-medium hover:drop-shadow-lg hover:text-red-700">
                Eliminar
              </h2>
            </button>
          </div>
        </div>
      </div>
      <hr className="w-full h-0.5 bg-gray-200 border-0 rounded my-2"></hr>
    </>
  );
};
