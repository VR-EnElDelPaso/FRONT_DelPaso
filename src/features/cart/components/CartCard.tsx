import { useNavigate } from "react-router-dom";

import { CartListItem } from "./CartList";
import { useCartStore } from "../../../stores/useCartStore";

interface Props {
  cartItem: CartListItem;
  onCheckboxChange: (name: string, isChecked: boolean) => void;
}

export const CartCard = ({
  cartItem,
  onCheckboxChange,
}: Props) => {
  const navigate = useNavigate();
  const { removeCartItem } = useCartStore();

  const handleDelete = () => {
    removeCartItem(cartItem.id);
  }

  const handleMoreInfo = () => {
    navigate(`/tour/${cartItem.id}`);
  }

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
          <img alt="tour image" className="rounded-md object-cover" src={cartItem.image_url} />
        </div>
        <div className="relative h-auto w-full flex flex-col justify-around">
          <div>
            <h1 className="text-2xl font-kaiseiDecol">{cartItem.name}</h1>
          </div>
          <div>
            <button onClick={handleMoreInfo}>
              <h2 className="text-sm text-gray-600 font-inter font-medium hover:drop-shadow-lg hover:text-gray-800">
                Más información
              </h2>
            </button>
          </div>
          <h3 className="text-sm text-gray-600 font-inter font-medium">{new Date(cartItem.created_at).toLocaleDateString()}</h3>
          <div className="absolute top-0 right-0 font-bold text-xl">
            ${cartItem.price}
          </div>
          <div className="absolute bottom-0 right-0">
            <button onClick={handleDelete}>
              <h2 className="text-sm text-red-500 font-inter font-medium hover:drop-shadow-lg hover:text-red-700">
                Eliminar
              </h2>
            </button>
          </div>
        </div>
      </div>
      <hr className="w-full h-0.5 bg-gray-200 border-0 rounded my-2"></hr>
    </>
  )
}