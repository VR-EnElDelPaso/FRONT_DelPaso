import { useState } from 'react';
import { CartList } from "../features/cart/components/CartList";
import { CartData } from "../features/cart/data/CartData";
import { CartResume } from '../features/cart/components/CartResume';
import { CartSuggestions } from '../features/cart/components/CartSuggestions';

export default function CartPage() {
    const [selectedItems, setSelectedItems] = useState<{ [key: string]: boolean }>({});

    const handleCheckboxChange = (id: string, isChecked: boolean) => {
        setSelectedItems(prev => ({ ...prev, [id]: isChecked }));
    };

    const selectAllItems = () => {
        setSelectedItems(Object.fromEntries(CartData.map(item => [item.id, true])));
    }

    const deselectAllItems = () => {
        setSelectedItems(Object.fromEntries(CartData.map(item => [item.id, false])));
    }

    const showSelectedItems = () => {
        console.log(Object.keys(selectedItems).filter(key => selectedItems[key]));
    }

    const handlePay = () => {
        console.log("Pagar");
    }

    return (
        <div className="grid place-items-center py-10 px-5">
            <div className="flex p-2 gap-2 w-full bg-gray-100 rounded-md">
                <div className="bg-white p-2 w-2/3">
                    <div>
                        <h1 className="text-5xl font-kaiseiDecol">Carrito</h1>
                        <div className="flex mt-6 gap-2 text-blue-600">
                            <button onClick={selectAllItems} className="hover:drop-shadow-lg hover:text-blue-800">Seleccionar todos</button>
                            <button onClick={deselectAllItems} className="hover:drop-shadow-lg hover:text-blue-800">Borrar selección</button>
                            <button onClick={showSelectedItems} className="hover:drop-shadow-lg hover:text-blue-800">Mostrar seleccionados</button>
                        </div>
                        <hr className="w-full h-0.5 bg-gray-200 border-0 rounded my-2"></hr>
                    </div>
                    <div className="flex flex-col gap-2">
                        <CartList
                            cartItems={CartData}
                            selectedItems={selectedItems}
                            onCheckboxChange={handleCheckboxChange}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                    <div className="bg-white p-2" >
                        <CartResume
                            products={CartData.filter(item => selectedItems[item.id])}
                            onPay={handlePay}
                        />
                    </div>
                    <div className="bg-white p-2">
                        <CartSuggestions />
                    </div>
                </div>
            </div>
        </div>
    );
}