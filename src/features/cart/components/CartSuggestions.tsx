import { Tour } from "../../../shared/types/Tour";
import { CartData } from "../data/CartData";

interface Props {
  selectedToursIds: string[];
}

export const CartSuggestions = ({
  selectedToursIds,
}: Props) => {
  selectedToursIds

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-kaiseiDecol">Podría Interesarte</h1>
      </div>
      <hr className="w-full h-0.5 bg-gray-200 border-0 rounded my-4"></hr>
      <div className="flex flex-col gap-3">
        <div className="p-2 flex flex-col gap-2">
          <TourCard tour={CartData[0]} />
        </div>
        <div className="flex">
          <button
            className="mx-auto px-6 border border-primary text-primary p-2 rounded-xl hover:bg-primaryHover hover:text-white transition-colors duration-300"
            onClick={() => { }}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

const TourCard = ({ tour }: { tour: Tour }) => {
  return (
    <div className="flex gap-2">
      <img src={tour.image_url} alt={tour.name} className="w-20 h-20 object-cover rounded-md" />
      <div>
        <h2 className="font-kaiseiDecol">{tour.name}</h2>
        <p className="font-inter text-xs">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, quaerat quia, eum
        </p>
        <div className="flex justify-end">
          <h2 className="font-bold">${tour.price.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  )
}
