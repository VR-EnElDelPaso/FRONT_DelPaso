import { useCallback, useEffect, useMemo, useState } from 'react';
import { CartList } from "../features/cart/components/CartList";
import { CartResume } from '../features/cart/components/CartResume';
import { CartSuggestions } from '../features/cart/components/CartSuggestions';
import { useCartStore } from '../stores/useCartStore';
import { getTours } from '../services/Tour';
import { Tour } from '../shared/types/Tour';

export default function CartPage() {
    const [fetchedTours, setFetchedTours] = useState<Tour[]>([]);
    const {
        cartItems,
        addCartItem,
        setCartItem,
    } = useCartStore();

    const toursIds = useMemo(
        () => cartItems.map(item => item.id),
        [cartItems]);

    const cartListData = useMemo(
        () => fetchedTours.map(tour => ({
            ...tour,
            isSelected: cartItems.some(item => item.id === tour.id && item.isSelected),
        })),
        [fetchedTours, cartItems]);


    const fetchTours = useCallback(async () => {
        const response = await getTours(toursIds);
        if (!response.ok) return;
        setFetchedTours(response.data);
    }, [toursIds]);

    useEffect(() => {
        fetchTours();
    }, [fetchTours]);


    const handleCheckboxChange = (id: string, isChecked: boolean) => {
        console.log(id, isChecked);
        const item = cartItems.find(item => item.id === id);
        if (!item) return;
        setCartItem({ ...item, isSelected: isChecked });
    };

    const selectAllItems = () => {
        cartItems.forEach(item => {
            setCartItem({ ...item, isSelected: true });
        });
    };

    const deselectAllItems = () => {
        cartItems.forEach(item => {
            setCartItem({ ...item, isSelected: false });
        });
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
                            {/* <button onClick={showSelectedItems} className="hover:drop-shadow-lg hover:text-blue-800">Mostrar seleccionados</button> */}
                        </div>
                        <hr className="w-full h-0.5 bg-gray-200 border-0 rounded my-2"></hr>
                    </div>
                    <div className="flex flex-col gap-2">
                        <CartList
                            cartItems={cartListData}
                            onCheckboxChange={handleCheckboxChange}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/3 sticky top-0">
                    <div className="bg-white p-2" >
                        <CartResume
                            cartItems={cartListData}
                            onPay={() => { addCartItem({ id: 'c76f633b-7ebd-4815-a54f-0295ec7b7a5b', isSelected: false, quantity: 1 }) }}
                        />
                    </div>
                    <div className="bg-white p-2">
                        <CartSuggestions cartListData={cartListData} quantity={1} />
                    </div>
                </div>
            </div>
        </div>
    );
}