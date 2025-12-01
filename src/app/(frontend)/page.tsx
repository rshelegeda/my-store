// my-store\src\app\(frontend)\page.tsx

export const dynamic = 'force-static' // ← ИЗМЕНИТЬ НА ЭТО!
export const revalidate = 360 // 1 час

import { getPayload } from 'payload'
import config from '@/payload.config'
import { getPageContent } from '@/utils/payload-api'
import { Metadata } from 'next'

import SliderWrapper from './components/SliderWrapper'
import AboutUs from './components/AboutUs'
import Gallery from './components/gallery/Gallery'
import PaymentDelivery from './components/paymentDelivery/PaymentDelivery'
import ProductsList from './components/ProductsList'
import Information from './components/Information'
import type { Media, GalleryImage, Product } from '../../payload-types'

export const metadata: Metadata = {
  title: 'Натуральний яблучний оцет — купити крафтовий оцет ручної роботи',
  description:
    'Крафтовий яблучний оцет ручного виробництва з натуральних яблук. Без консервантів. Купити оцет з доставкою по Україні.',
  alternates: {
    canonical: 'https://applecidervinegar.com.ua/',
  },
  openGraph: {
    title: 'Apple Cider Vinegar UA — натуральний яблучний оцет ручної роботи',
    description: '100% натуральний крафтовий яблучний оцет. Купити онлайн з доставкою по Україні.',
    url: 'https://applecidervinegar.com.ua/',
    siteName: 'Apple Cider Vinegar UA',
    images: [
      {
        url: 'https://applecidervinegar.com.ua/grandpa_with_ocet.jpg', // ✅ Твоя картинка
        width: 1200,
        height: 630,
        alt: 'Натуральний яблучний оцет ручної роботи',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apple Cider Vinegar UA',
    description: 'Натуральний яблучний оцет ручної роботи. Купити онлайн з доставкою.',
    images: ['https://applecidervinegar.com.ua/grandpa_with_ocet.jpg'], // ✅ Исправлено
  },
}

// Функция для получения ВСЕХ данных на этапе сборки
async function getHomePageData() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 1. УПРОЩЕННЫЙ запрос товаров
  const productsData = await payload.find({
    collection: 'products',
    limit: 50,
    sort: 'sortOrder',
    depth: 1,
    // УБРАТЬ where условие, которое вызывает ошибку
  })

  // 2. Фильтровать на клиенте если нужно
  const allProducts = productsData.docs as Product[]

  // Если нужно показать только определенные товары
  const featuredProducts = allProducts.filter((product) => product.showOnHomepage === true)

  // 3. Контент страниц
  const pageContent = (await getPageContent()) as any

  // 4. Галерея
  const galleryResult = await payload.find({
    collection: 'gallery-images',
    sort: '-createdAt',
    limit: 20,
    depth: 1,
  })

  return {
    products: featuredProducts, // или allProducts если хотим все
    pageContent,
    galleryData: galleryResult.docs as (GalleryImage & { image: Media })[],
  }
}

export default async function HomePage() {
  // Получаем ВСЕ данные ОДИН раз при сборке
  const { products, pageContent, galleryData } = await getHomePageData()

  return (
    <div className="flex flex-col min-h-screen">
      <SliderWrapper />

      {/* ProductsList получает ВСЕ товары! */}
      <section id="products-section" className="py-16 bg-white">
        <ProductsList products={products} /> {/* ← ПЕРЕДАЕМ ПРОПС! */}
      </section>

      <section id="about-section" className="py-16 bg-gray-50">
        <AboutUs /> {/* ← ПЕРЕДАЕМ ТЕКСТ! */}
      </section>

      <Gallery images={galleryData} />
      <Information />

      <section id="delivery-payment-section" className="py-16 bg-white">
        <PaymentDelivery />
      </section>
    </div>
  )
}

// export const dynamic = 'force-dynamic'  10 11 25
// export const revalidate = 60 // 1 минута

// import { getPayload } from 'payload'
// import config from '@/payload.config'

// import { getPageContent } from '@/utils/payload-api'
// import { Metadata } from 'next'

// import SliderWrapper from './components/SliderWrapper'
// import AboutUs from './components/AboutUs'
// import Gallery from './components/gallery/Gallery'
// import PaymentDelivery from './components/paymentDelivery/PaymentDelivery'
// import ProductsList from './components/ProductsList'
// // import VideoGallery from './components/gallery/VideoGallery'
// import type { Media, GalleryImage } from '../../payload-types'
// import Information from './components/Information'

// // const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3030' // Ваш Payload CMS

// const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

// export const metadata: Metadata = {
//   title: 'Натуральний яблучний оцет — купити крафтовий оцет ручної роботи',
//   description:
//     'Крафтовий яблучний оцет ручного виробництва з натуральних яблук. Без консервантів. Купити оцет з доставкою по Україні.',
//   alternates: {
//     canonical: 'https://applecidervinegar.com.ua/',
//   },
//   openGraph: {
//     title: 'Apple Cider Vinegar UA — натуральний яблучний оцет ручної роботи',
//     description: '100% натуральний крафтовий яблучний оцет. Купити онлайн з доставкою по Україні.',
//     url: 'https://applecidervinegar.com.ua/',
//     siteName: 'Apple Cider Vinegar UA',
//     images: [
//       {
//         url: 'https://applecidervinegar.com.ua/grandpa_with_ocet.jpg', // ✅ Твоя картинка
//         width: 1200,
//         height: 630,
//         alt: 'Натуральний яблучний оцет ручної роботи',
//       },
//     ],
//     locale: 'uk_UA',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Apple Cider Vinegar UA',
//     description: 'Натуральний яблучний оцет ручної роботи. Купити онлайн з доставкою.',
//     images: ['https://applecidervinegar.com.ua/grandpa_with_ocet.jpg'], // ✅ Исправлено
//   },
// }

// export default async function HomePage() {
//   // 1. Загрузка товаров из Payload CMS
//   let products: any[] = []
//   try {
//     const payloadConfig = await config
//     const payload = await getPayload({ config: payloadConfig })

//     const findOptions = {
//       collection: 'products',
//       limit: 6,
//       sort: '-createdAt',
//       depth: 2,
//       where: {
//         showOnHomepage: {
//           equals: true,
//         },
//       },

//       cache: 'force-cache',
//       next: { revalidate: 3600 },
//     }

//     const productData = await payload.find(findOptions as any)
//     products = productData.docs
//   } catch (error) {
//     console.error('Ошибка при получении товаров из Payload:', error)
//   }

//   // 2. Загрузка контента страниц (GLOBAL CONTENT)
//   // Вызов функции для получения всех данных из глобальной переменной

//   let pageContent: any = {}
//   try {
//     pageContent = await getPageContent()
//   } catch (error) {
//     console.error('Ошибка при получении глобального контента:', error)
//   }

//   const phone = pageContent.contactPhone

//   // 3. Загрузка изображений галереи из Payload CMS
//   let galleryData: (GalleryImage & { image: Media })[] = []
//   try {
//     const payloadConfig = await config
//     const payload = await getPayload({ config: payloadConfig })

//     const findOptions = {
//       // <--- Определяем опции
//       collection: 'gallery-images',
//       sort: '-createdAt',
//       limit: 50,
//       depth: 1,

//       cache: 'force-cache',
//       next: { revalidate: 3600 },
//     }

//     const galleryResult = await payload.find(findOptions as any)

//     // Типизация на выходе остается строгой
//     galleryData = galleryResult.docs as (GalleryImage & { image: Media })[]
//   } catch (error) {
//     console.error('Ошибка при получении галереи из Payload:', error)
//   }

//   // 3. Рендеринг всех секций, передавая загруженные товары в ProductsList
//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* 1. Слайдер */}
//       {/* <Slider></Slider> */}
//       <SliderWrapper />

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
//       <Information></Information>

//       {/* 5. Доставка и Оплата (предположительно, этот компонент есть) */}
//       <section id="delivery-payment-section" className="py-16 bg-white">
//         <PaymentDelivery></PaymentDelivery>
//       </section>

//       {/* <VideoGallery videos={videos} /> */}
//     </div>
//   )
// }
