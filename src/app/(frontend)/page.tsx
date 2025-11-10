// my-store\src\app\(frontend)\page.tsx

// export const dynamic = 'force-dynamic'  10 11 25
export const revalidate = 60 // 1 минута

import { getPayload } from 'payload'
import config from '@/payload.config'

import { getPageContent } from '@/utils/payload-api'

// import AboutUs from '@/app/(frontend)/components/AboutUs';
// import Gallery from '@/app/(frontend)/components/gallery/Gallery';
// import PaymentDelivery from '@/app/(frontend)/components/paymentDelivery/PaymentDelivery';

// import Slider from './components/Slider'

import SliderWrapper from './components/SliderWrapper'
import AboutUs from './components/AboutUs'
import Gallery from './components/gallery/Gallery'
import PaymentDelivery from './components/paymentDelivery/PaymentDelivery'
import ProductsList from './components/ProductsList'
// import VideoGallery from './components/gallery/VideoGallery'
import type { Media, GalleryImage } from '../../payload-types'
import Information from './components/Information'

// const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3030' // Ваш Payload CMS

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default async function HomePage() {
  // 1. Загрузка товаров из Payload CMS
  let products: any[] = []
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

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

      cache: 'force-cache',
      next: { revalidate: 3600 },
    }

    const productData = await payload.find(findOptions as any)
    products = productData.docs
  } catch (error) {
    console.error('Ошибка при получении товаров из Payload:', error)
  }

  // 2. Загрузка контента страниц (GLOBAL CONTENT)
  // Вызов функции для получения всех данных из глобальной переменной

  let pageContent: any = {}
  try {
    pageContent = await getPageContent()
  } catch (error) {
    console.error('Ошибка при получении глобального контента:', error)
  }

  const phone = pageContent.contactPhone

  // 3. Загрузка изображений галереи из Payload CMS
  let galleryData: (GalleryImage & { image: Media })[] = []
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const findOptions = {
      // <--- Определяем опции
      collection: 'gallery-images',
      sort: '-createdAt',
      limit: 50,
      depth: 1,

      cache: 'force-cache',
      next: { revalidate: 3600 },
    }

    const galleryResult = await payload.find(findOptions as any)

    // Типизация на выходе остается строгой
    galleryData = galleryResult.docs as (GalleryImage & { image: Media })[]
  } catch (error) {
    console.error('Ошибка при получении галереи из Payload:', error)
  }

  // 3. Рендеринг всех секций, передавая загруженные товары в ProductsList
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Слайдер */}
      {/* <Slider></Slider> */}
      <SliderWrapper />

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
      <Information></Information>

      {/* 5. Доставка и Оплата (предположительно, этот компонент есть) */}
      <section id="delivery-payment-section" className="py-16 bg-white">
        <PaymentDelivery></PaymentDelivery>
      </section>

      {/* <VideoGallery videos={videos} /> */}
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
