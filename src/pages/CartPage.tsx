import { useCallback, useEffect, useMemo, useState } from 'react';

import { useCartStore } from '../stores/useCartStore';
import { getTours } from '../services/Tour';
import { Tour } from '../shared/types/Tour';
import { CartSuggestions } from '../features/cart/components/CartSuggestions';
import { CartList } from "../features/cart/components/CartList";
import { CartResume } from '../features/cart/components/CartResume';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
    const navigate = useNavigate();
    const [fetchedTours, setFetchedTours] = useState<Tour[]>([]);

    const {
        cartItems,
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
        const item = cartItems.find(item => item.id === id);
        if (!item) return;
        setCartItem({ ...item, isSelected: isChecked });
    };

    const selectAllItems = () => {
        cartItems.forEach(item => {
            setCartItem({ ...item, isSelected: true });
        });
    };

    const unselectAllItems = () => {
        cartItems.forEach(item => {
            setCartItem({ ...item, isSelected: false });
        });
    }

    const handlePay = () => {
        const selectedItems = cartItems.filter(item => item.isSelected).map(item => item.id);
        
        if (selectedItems.length === 0) {
            alert('No hay tours seleccionados');
            return;
        }
        navigate('/checkout', { state: { tourIds: selectedItems } });
    }

    return (
        <div className="grid place-items-center py-10 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] p-2 gap-2 w-full bg-gray-100 rounded-md">
                <div className="bg-white p-2 ">
                    <div className='pl-10'>
                        <h1 className="text-5xl font-kaiseiDecol">Carrito</h1>
                        <div className="flex mt-6 gap-2 text-blue-600">
                            <button type='button' onClick={selectAllItems} className="hover:drop-shadow-lg hover:text-blue-800">Seleccionar todos</button>
                            <button type='button' onClick={unselectAllItems} className="hover:drop-shadow-lg hover:text-blue-800">Borrar selección</button>
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
                <div className="flex flex-col gap-2 sticky top-0">
                    <div className="bg-white p-2">
                        <CartSuggestions cartListData={cartListData} quantity={1} />
                    </div>
                    <div className="bg-white p-2" >
                        <CartResume
                            cartItems={cartListData}
                            onPay={handlePay}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}