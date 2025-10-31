// Этот компонент должен быть клиентским, так как он использует или содержит клиентский компонент ImageCarousel
'use client'

import Image from 'next/image'
import styles from './Gallery.module.css'
import { montserratAlternates } from '@/app/(frontend)/fonts'

// Импортируем компонент Карусели
import ImageCarousel from './ImageCarousel'

// 1. ИМПОРТ ТИПОВ
import type { GalleryImage, Media } from '../../../../payload-types' // Проверьте путь!

// 2. ОБНОВЛЕННЫЙ ИНТЕРФЕЙС PROP-ов
interface GalleryProps {
  // Используйте тип, который вы получаете из page.tsx
  images: (GalleryImage & { image: Media })[]
}

// 3. ОБНОВЛЕНИЕ КОМПОНЕНТА ДЛЯ ИСПОЛЬЗОВАНИЯ СЕТКИ И КАРУСЕЛИ
export default function Gallery({ images }: GalleryProps) {
  return (
    <section className={styles.gallerySection}>
      {' '}
      <div className="pageTitle">
        <h2 className={montserratAlternates.className}>Наша галерея</h2>{' '}
      </div>
      <div className={styles.carouselBlock}>
        <ImageCarousel images={images} />
      </div>
    </section>
  )
}

// // Gallery.tsx

// import Image from 'next/image'
// import styles from './Gallery.module.css'
// import { montserratAlternates } from '@/app/(frontend)/fonts'

// // 1. ИМПОРТ ТИПОВ
// import type { GalleryImage, Media } from '../../../../payload-types' // Проверьте путь!

// // 2. ОБНОВЛЕННЫЙ ИНТЕРФЕЙС PROP-ов
// // Теперь images - это массив GalleryImage, в котором поле 'image' (с depth: 1)
// // гарантированно содержит полный объект Media.
// interface GalleryProps {
//   // Используйте тип, который вы получаете из page.tsx
//   images: (GalleryImage & { image: Media })[]
// }

// // 3. ОБНОВЛЕНИЕ КОМПОНЕНТА ДЛЯ ИСПОЛЬЗОВАНИЯ НОВОЙ СТРУКТУРЫ
// export default function Gallery({ images }: GalleryProps) {
//   return (
//     <section className={styles.gallerySection}>
//       <div className="pageTitle">
//         <h1 className={montserratAlternates.className}>Наша галерея</h1>
//       </div>

//       <div className={styles.galleryGridContainer}>
//         {images.map((item, index) => {
//           // Проверяем, что 'image' существует и имеет URL
//           if (!item.image || typeof item.image === 'string' || !item.image.url) {
//             return null // Пропускаем элемент с некорректными данными
//           }

//           // Используем ID (string) из Payload, а не index+1
//           const key = item.id || index

//           return (
//             <div
//               key={key}
//               className={`${styles.imageWrapper} ${
//                 // Используем новое поле isTall из коллекции GalleryImages
//                 item.isTall ? styles.tallImage : ''
//               }`}
//             >
//               <Image
//                 // **ИЗМЕНЕНИЕ**: src теперь item.image.url
//                 src={item.image.url}
//                 // **ИЗМЕНЕНИЕ**: alt берется из altText или из alt объекта Media
//                 alt={item.altText || item.image.alt || `Галерея фото ${key}`}
//                 fill
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 style={{ objectFit: 'cover' }}
//                 className={styles.img}
//               />
//             </div>
//           )
//         })}
//       </div>
//     </section>
//   )
// }
