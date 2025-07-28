import { useEffect } from 'react';
import { useShopStore } from '../store/ShopStore';

const StoreInitializer = () => {
    const { initializeStore } = useShopStore();

    useEffect(() => {
        initializeStore();
    }, [initializeStore]);

    return null;
};

export default StoreInitializer;