interface CartCardProps {
  cartItem: {
    name: string;
    disponible: boolean;
    price: number;
    image_url: string;
    date: Date;
  }
}

export const CartCard = ({ cartItem }: CartCardProps) => {
  return (
    <>
      <div className="p-2 flex gap-4">
        <div className="w-1/4">
          <img className="rounded-md object-cover" src={cartItem.image_url} />
        </div>
        <div className="relative h-auto w-full flex flex-col justify-around">
          <div>
            <h1 className="text-2xl font-kaiseiDecol">{cartItem.name}</h1>
            <h2 className="text-green-600">
              {cartItem.disponible ? "Disponible" : "No disponible"}
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
          <h3 className="text-sm text-gray-600 font-inter font-medium">{cartItem.date.toDateString()}</h3>
          <div className="absolute top-0 right-0 font-bold text-xl">
            ${cartItem.price}
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
