import { CartListItem } from "./CartList";

interface Props {
  cartItem: CartListItem;
  onCheckboxChange: (name: string, isChecked: boolean) => void;
}

export const CartCard = ({
  cartItem,
  onCheckboxChange,
}: Props) => {

  return (
    <>
      <div className="p-2 flex gap-4">
        <input
          type="checkbox"
          checked={cartItem.isSelected}
          onChange={(e) => onCheckboxChange(cartItem.id, e.target.checked)}
        />
        <div className="w-1/4">
          <img className="rounded-md object-cover" src={cartItem.image_url} />
        </div>
        <div className="relative h-auto w-full flex flex-col justify-around">
          <div>
            <h1 className="text-2xl font-kaiseiDecol">{cartItem.name}</h1>
            <h2 className="text-green-600">
              {/* {cartItem.available ? "Disponible" : "No disponible"} */}
            </h2>
          </div>
          <div>
            <button>
              <h2
                className="text-sm text-gray-600 font-inter font-medium hover:drop-shadow-lg hover:text-gray-800"
              >
                Más información
              </h2>
            </button>
          </div>
          <h3 className="text-sm text-gray-600 font-inter font-medium">{new Date(cartItem.created_at).toLocaleDateString()}</h3>
          <div className="absolute top-0 right-0 font-bold text-xl">
            {/* ${cartItem.price} */}
          </div>
          <div className="absolute bottom-0 right-0">
            <button>
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