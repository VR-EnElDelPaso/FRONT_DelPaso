import { CartCard } from "../features/cart/components/CartCard";
import { CartData } from "../features/cart/data/CartData";

export default function CartPage() {
    return (
        <div className="grid place-items-center py-10 px-5">
            <div className="flex p-2 gap-2 w-full bg-gray-100 rounded-md">
                <div className="bg-white p-2 w-2/3">
                    <div >
                        <h1 className="text-5xl font-kaiseiDecol">Carrito</h1>
                        <div className="flex mt-6 gap-2 text-blue-600">
                            <button className="hover:drop-shadow-lg hover:text-blue-800">Seleccionar todos</button>
                            <button className="hover:drop-shadow-lg hover:text-blue-800">Borrar selección</button>
                        </div>
                        <hr className="w-full h-0.5 bg-gray-200 border-0 rounded my-2"></hr>
                    </div>
                    <div  className="flex flex-col gap-2">
                        {CartData.map((item) => (
                            <CartCard cartItem={item} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                    <div className="bg-white p-2" >
                    </div>
                    <div className="bg-white p-2">
                        4
                    </div>
                </div>
            </div>
        </div>
    );
}