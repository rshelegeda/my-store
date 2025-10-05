import Link from 'next/link';
import Image from 'next/image';
import { getPayload } from 'payload';
import config from '@/payload.config';

// Импорты компонентов напарника

// import AboutUs from '@/app/(frontend)/components/AboutUs'; 
// import Gallery from '@/app/(frontend)/components/gallery/Gallery'; 
// import PaymentDelivery from '@/app/(frontend)/components/paymentDelivery/PaymentDelivery'; 

import Slider from './components/Slider';
import AboutUs from './components/AboutUs';
import Gallery from './components/gallery/Gallery';
import PaymentDelivery from './components/paymentDelivery/PaymentDelivery';
import ProductsList from './components/ProductsList';


const PAYLOAD_BASE_URL = 'http://localhost:3030'; // Ваш Payload CMS

// ИСХОДНЫЕ URL-ы
const initialImages = [
    "/gallery/0.jpg",
    "/gallery/5.jpg",
    "/gallery/8.jpg",
    "/gallery/11.jpg",
    "/gallery/18.jpg",
    "/gallery/24.jpg",
    "/gallery/14.jpg",
];

const galleryData = initialImages.map((src, index) => ({
    id: index + 1,
    src: src,
    alt: `Наш продукт - фото ${index + 1}`, // Замените на реальное описание
}));



export default async function HomePage() {
    
    // 1. Загрузка товаров из Payload CMS
    let products: any[] = [];
    try {
        const payloadConfig = await config;
        const payload = await getPayload({ config: payloadConfig });
        
        const productData = await payload.find({
            collection: 'products',
            limit: 6, 
            sort: '-createdAt', 
            depth: 2, 
            where: {
                showOnHomepage: { // Ваш оригинальный фильтр
                    equals: true,
                },
            },
        });
        
        products = productData.docs; 

    } catch (error) {
        console.error("Ошибка при получении товаров из Payload:", error);
        // Если ошибка, products останется пустым массивом, что будет обработано в ProductsList
    }

    // 2. Рендеринг всех секций, передавая загруженные товары в ProductsList
    return (
        <div className="flex flex-col min-h-screen">
            
            {/* 1. Слайдер */}
           <Slider></Slider>

            {/* 2. КАТАЛОГ ТОВАРОВ: передаем массив реальных данных */}
           <ProductsList></ProductsList>

            {/* 3. О нас */}
            <AboutUs></AboutUs>

            {/* 4. Галерея */}
            
            <Gallery images={galleryData} />
            
            {/* 5. Доставка и Оплата (предположительно, этот компонент есть) */}
            <PaymentDelivery></PaymentDelivery>
            
        </div>
    );
}
