export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'

// Импорты компонентов напарника

// import AboutUs from '@/app/(frontend)/components/AboutUs';
// import Gallery from '@/app/(frontend)/components/gallery/Gallery';
// import PaymentDelivery from '@/app/(frontend)/components/paymentDelivery/PaymentDelivery';

import Slider from './components/Slider'
import AboutUs from './components/AboutUs'
import Gallery from './components/gallery/Gallery'
import PaymentDelivery from './components/paymentDelivery/PaymentDelivery'
import ProductsList from './components/ProductsList'

// const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3030' // Ваш Payload CMS

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

// ИСХОДНЫЕ URL-ы
const initialImages = [
  '/gallery/0.jpg',
  '/gallery/5.jpg',
  '/gallery/8.jpg',
  '/gallery/11.jpg',
  '/gallery/18.jpg',
  '/gallery/24.jpg',
  '/gallery/14.jpg',
]

const galleryData = initialImages.map((src, index) => ({
  id: index + 1,
  src: src,
  alt: `Наш продукт - фото ${index + 1}`, // Замените на реальное описание
}))

export default async function HomePage() {
  // 1. Загрузка товаров из Payload CMS
  let products: any[] = []
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Объект опций, включая 'cache: "no-store"', который вызывает ошибку типизации.
    const findOptions = {
      collection: 'products',
      limit: 6,
      sort: '-createdAt',
      depth: 2,
      where: {
        showOnHomepage: {
          equals: true,
        },
      },
      // Это свойство функционально работает в Next.js, но не типизировано в Payload
      cache: 'no-store',
      next: {
        revalidate: 0,
      },
    }

    const productData = await payload.find(findOptions as any)
    products = productData.docs
  } catch (error) {
    console.error('Ошибка при получении товаров из Payload:', error)
    // Если ошибка, products останется пустым массивом, что будет обработано в ProductsList
  }

  // 2. Рендеринг всех секций, передавая загруженные товары в ProductsList
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Слайдер */}
      <Slider></Slider>

      {/* 2. КАТАЛОГ ТОВАРОВ: передаем массив реальных данных */}
      <section id="products-section" className="py-16 bg-white">
        <ProductsList></ProductsList>
      </section>

      {/* 3. О нас */}
      <section id="about-section" className="py-16 bg-gray-50">
        <AboutUs></AboutUs>
      </section>

      {/* 4. Галерея */}

      <Gallery images={galleryData} />

      {/* 5. Доставка и Оплата (предположительно, этот компонент есть) */}
      <section id="delivery-payment-section" className="py-16 bg-white">
        <PaymentDelivery></PaymentDelivery>
      </section>
    </div>
  )
}

// Старый вариант до попыток выключить кэширование

// import Link from 'next/link'
// import Image from 'next/image'
// import { getPayload } from 'payload'
// import config from '@/payload.config'

// // Импорты компонентов напарника

// // import AboutUs from '@/app/(frontend)/components/AboutUs';
// // import Gallery from '@/app/(frontend)/components/gallery/Gallery';
// // import PaymentDelivery from '@/app/(frontend)/components/paymentDelivery/PaymentDelivery';

// import Slider from './components/Slider'
// import AboutUs from './components/AboutUs'
// import Gallery from './components/gallery/Gallery'
// import PaymentDelivery from './components/paymentDelivery/PaymentDelivery'
// import ProductsList from './components/ProductsList'

// // const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3030' // Ваш Payload CMS

// const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

// // ИСХОДНЫЕ URL-ы
// const initialImages = [
//   '/gallery/0.jpg',
//   '/gallery/5.jpg',
//   '/gallery/8.jpg',
//   '/gallery/11.jpg',
//   '/gallery/18.jpg',
//   '/gallery/24.jpg',
//   '/gallery/14.jpg',
// ]

// const galleryData = initialImages.map((src, index) => ({
//   id: index + 1,
//   src: src,
//   alt: `Наш продукт - фото ${index + 1}`, // Замените на реальное описание
// }))

// export default async function HomePage() {
//   // 1. Загрузка товаров из Payload CMS
//   let products: any[] = []
//   try {
//     const payloadConfig = await config
//     const payload = await getPayload({ config: payloadConfig })

//     const productData = await payload.find({
//       collection: 'products',
//       limit: 6,
//       sort: '-createdAt',
//       depth: 2,
//       where: {
//         showOnHomepage: {
//           // Ваш оригинальный фильтр
//           equals: true,
//         },
//       },

//     })

//     products = productData.docs
//   } catch (error) {
//     console.error('Ошибка при получении товаров из Payload:', error)
//     // Если ошибка, products останется пустым массивом, что будет обработано в ProductsList
//   }

//   // 2. Рендеринг всех секций, передавая загруженные товары в ProductsList
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* 1. Слайдер */}
//       <Slider></Slider>

//       {/* 2. КАТАЛОГ ТОВАРОВ: передаем массив реальных данных */}
//       <section id="products-section" className="py-16 bg-white">
//         <ProductsList></ProductsList>
//       </section>

//       {/* 3. О нас */}
//       <section id="about-section" className="py-16 bg-gray-50">
//         <AboutUs></AboutUs>
//       </section>

//       {/* 4. Галерея */}

//       <Gallery images={galleryData} />

//       {/* 5. Доставка и Оплата (предположительно, этот компонент есть) */}
//       <section id="delivery-payment-section" className="py-16 bg-white">
//         <PaymentDelivery></PaymentDelivery>
//       </section>
//     </div>
//   )
// }
