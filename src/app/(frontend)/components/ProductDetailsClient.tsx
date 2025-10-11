'use client'

import { useState, useEffect } from 'react'
import React from 'react' // Импортируем React для <React.Fragment> и <br />
import Image from 'next/image'
import Link from 'next/link' // Оставляем Link, чтобы избежать ошибки сборки
import { montserratAlternates } from '@/app/(frontend)/fonts'
import styles from './../products/[slug]/ProductPage.module.css'

// ВАЖНО: Перенесите сюда все типы, которые нужны CC
interface CartItem {
  id: string
  title: string
  price: string
  image: string
  quantity: number
}

// Задайте тип для пропсов, которые получит клиентский компонент
interface Props {
  product: any
  imageUrl: string | null
  leavesUrl: string | null
}

/**
 * Функция для форматирования заголовка:
 * 1. Вставляет <br /> перед " З ".
 * 2. Вставляет <br /> перед открывающей скобкой "(".
 * @param text Исходный заголовок из CMS.
 * @returns Отформатированный React-элемент.
 */
const formatTitle = (text: string) => {
  // 1. Сначала обрабатываем перенос перед " З "
  const partsZ = text.split(' З ')

  // 2. Создаем финальный массив элементов, обрабатывая каждую часть
  const finalElements: React.ReactNode[] = []

  partsZ.forEach((part, partIndex) => {
    // 3. Внутри каждой части ищем скобки для дополнительного переноса
    const partsParentheses = part.split(/(\s?\([^)]+\))$/)

    partsParentheses.forEach((p, pIndex) => {
      if (p) {
        // Если элемент начинается со скобки, вставляем перед ним перенос
        if (
          p.trim().startsWith('(') &&
          finalElements.length > 0 &&
          !(finalElements[finalElements.length - 1] as string)?.endsWith('\n')
        ) {
          // Добавляем перенос строки, если это не первый элемент и его там еще нет
          finalElements.push(<br key={`br-p-${partIndex}-${pIndex}`} />)
        }
        finalElements.push(p)
      }
    })

    // Добавляем <br /> и "З " только если это не последний элемент в разделении по " З "
    if (partIndex < partsZ.length - 1) {
      finalElements.push(<br key={`br-z-${partIndex}`} />)
      finalElements.push('З ')
    }
  })

  // Оборачиваем все элементы в React.Fragment
  return finalElements.map((el, index) => (
    <React.Fragment key={`title-part-${index}`}>{el}</React.Fragment>
  ))
}

export default function ProductDetailsClient({ product, imageUrl, leavesUrl }: Props) {
  console.log(product)

  const [isAdded, setIsAdded] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const getCartItems = (): CartItem[] => {
    if (typeof window === 'undefined') return []
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  }

  // --- Форматирование заголовка здесь ---
  const formattedTitle = formatTitle(product.title)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  // Слушаем изменения
  useEffect(() => {
    const handleStorageChange = () => {
      setCartItems(getCartItems())
    }
    const handleCartUpdate = () => {
      setCartItems(getCartItems())
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('cartUpdated', handleCartUpdate)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('cartUpdated', handleCartUpdate)
      }
    }
    return () => {}
  }, [])

  const addToCart = () => {
    const cartItem: Omit<CartItem, 'quantity'> = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: imageUrl || '', // Используем готовый URL
    }

    const updatedCart = (() => {
      const existingItem = cartItems.find((item) => item.id === product.id)
      if (existingItem) {
        return cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...cartItems, { ...cartItem, quantity: 1 }]
      }
    })()

    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))

    window.dispatchEvent(new CustomEvent('cartUpdated'))

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  // ВЕСЬ JSX Рендеринг переносится сюда
  return (
    <div className={styles.container}>
      {/* ГИБРИДНОЕ ИСПРАВЛЕНИЕ: Используем Link для прохождения сборки, 
        но onClick принудительно вызывает полную перезагрузку (чтобы обойти ошибку RSC payload).
      */}
      <Link
        href="/"
        className={styles.backButton}
        onClick={(e) => {
          // Отменяем стандартное поведение Link (soft navigation)
          e.preventDefault()
          // Принудительно вызываем полную навигацию (hard navigation)
          window.location.href = '/'
        }}
      >
        ← Назад до головної
      </Link>

      <div className={styles.productContainer}>
        <div className={styles.imageSection}>
          <div className={styles.productBlock}>
            <Image
              // Используем leavesUrl, который был сформирован SC
              src={leavesUrl || '/placeholder-leaves.png'}
              alt="Листва"
              width={260}
              height={260}
              className={styles.leaves}
            />

            <Image
              // Используем imageUrl, который был сформирован SC
              src={imageUrl || '/placeholder-bottle.png'}
              alt={product.title}
              width={180}
              height={360}
              className={styles.bottle}
            />
            {/* ... */}
            <div className={styles.infoBox} style={{ backgroundColor: product.blockColor }}>
              <h2>{formattedTitle}</h2>
              <p>{product.price} грн.</p>
            </div>
          </div>
        </div>
        <div className={styles.infoSection}>
          {/* ... (остальная часть JSX) ... */}
          <h1 className={`${styles.title} ${montserratAlternates.className}`}>{product.title}</h1>
          {/* <p className={styles.subtitle}>{product.subtitle}</p> */}

          <div className={styles.price}>{product.price} грн.</div>

          <div className={styles.description}>
            <h3>Опис</h3>
            <p>{product.description}</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className={`${styles.buyButton} ${isAdded ? styles.added : ''}`}
              onClick={addToCart}
              disabled={isAdded}
            >
              {isAdded ? 'Додано!' : 'Додати до кошика'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// 'use client'

// import { useState, useEffect } from 'react'
// import React from 'react' // Импортируем React для <React.Fragment> и <br />
// import Image from 'next/image'
// import Link from 'next/link'
// import { montserratAlternates } from '@/app/(frontend)/fonts'
// import styles from './../products/[slug]/ProductPage.module.css'

// // ВАЖНО: Перенесите сюда все типы, которые нужны CC
// interface CartItem {
//   id: string
//   title: string
//   price: string
//   image: string
//   quantity: number
// }

// // Задайте тип для пропсов, которые получит клиентский компонент
// interface Props {
//   product: any
//   imageUrl: string | null
//   leavesUrl: string | null
// }

// /**
//  * Функция для форматирования заголовка:
//  * 1. Вставляет <br /> перед " З ".
//  * 2. Вставляет <br /> перед открывающей скобкой "(".
//  * @param text Исходный заголовок из CMS.
//  * @returns Отформатированный React-элемент.
//  */
// const formatTitle = (text: string) => {
//   // 1. Сначала обрабатываем перенос перед " З "
//   const partsZ = text.split(' З ')

//   // 2. Создаем финальный массив элементов, обрабатывая каждую часть
//   const finalElements: React.ReactNode[] = []

//   partsZ.forEach((part, partIndex) => {
//     // 3. Внутри каждой части ищем скобки для дополнительного переноса
//     // Используем регулярное выражение для разделения по скобке "(" и захвата текста в ней
//     // Например: 'ОЦЕТ (з прянощами)' -> ['ОЦЕТ ', '(з прянощами)']
//     const partsParentheses = part.split(/(\s?\([^)]+\))$/)

//     partsParentheses.forEach((p, pIndex) => {
//       if (p) {
//         // Если элемент начинается со скобки, вставляем перед ним перенос
//         if (p.trim().startsWith('(')) {
//           finalElements.push(<br />)
//         }
//         finalElements.push(p)
//       }
//     })

//     // Добавляем <br /> и "З " только если это не последний элемент в разделении по " З "
//     if (partIndex < partsZ.length - 1) {
//       finalElements.push(<br />)
//       finalElements.push('З ')
//     }
//   })

//   // Оборачиваем все элементы в React.Fragment
//   return finalElements.map((el, index) => (
//     <React.Fragment key={`title-part-${index}`}>{el}</React.Fragment>
//   ))
// }

// export default function ProductDetailsClient({ product, imageUrl, leavesUrl }: Props) {
//   const [isAdded, setIsAdded] = useState(false)
//   const [cartItems, setCartItems] = useState<CartItem[]>([])

//   // Вся логика, требующая 'use client' (localStorage, useState, useEffect, onClick)

//   const getCartItems = (): CartItem[] => {
//     if (typeof window === 'undefined') return []
//     const savedCart = localStorage.getItem('cart')
//     return savedCart ? JSON.parse(savedCart) : []
//   }

//   // --- Форматирование заголовка здесь ---
//   const formattedTitle = formatTitle(product.title)

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart')
//     if (savedCart) {
//       // ОБЯЗАТЕЛЬНО: Проверьте, что product.id является string, если вы используете сгенерированные типы Payload
//       setCartItems(JSON.parse(savedCart))
//     }
//   }, [])

//   // Слушаем изменения
//   useEffect(() => {
//     // ... ваш код для handleStorageChange и handleCartUpdate ...
//     const handleStorageChange = () => {
//       setCartItems(getCartItems())
//     }
//     const handleCartUpdate = () => {
//       setCartItems(getCartItems())
//     }

//     window.addEventListener('storage', handleStorageChange)
//     window.addEventListener('cartUpdated', handleCartUpdate)

//     return () => {
//       window.removeEventListener('storage', handleStorageChange)
//       window.removeEventListener('cartUpdated', handleCartUpdate)
//     }
//   }, [])

//   const addToCart = () => {
//     // ВНИМАНИЕ: product.id, скорее всего, string, а не number в Payload. Убедитесь, что CartItem.id - string.
//     const cartItem: Omit<CartItem, 'quantity'> = {
//       id: product.id,
//       title: product.title,
//       price: product.price,
//       image: imageUrl || '', // Используем готовый URL
//     }

//     const updatedCart = (() => {
//       const existingItem = cartItems.find((item) => item.id === product.id)
//       if (existingItem) {
//         return cartItems.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
//         )
//       } else {
//         return [...cartItems, { ...cartItem, quantity: 1 }]
//       }
//     })()

//     setCartItems(updatedCart)
//     localStorage.setItem('cart', JSON.stringify(updatedCart))

//     window.dispatchEvent(new CustomEvent('cartUpdated'))

//     setIsAdded(true)
//     setTimeout(() => setIsAdded(false), 2000)
//   }

//   // ВЕСЬ JSX Рендеринг переносится сюда
//   return (
//     <div className={styles.container}>
//       {/* ... (ваш JSX) ... */}
//       <Link href="/" className={styles.backButton}>
//         ← Назад до головної
//       </Link>

//       <div className={styles.productContainer}>
//         <div className={styles.imageSection}>
//           <div className={styles.productBlock}>
//             <Image
//               // Используем leavesUrl, который был сформирован SC
//               src={leavesUrl || '/placeholder-leaves.png'}
//               alt="Листва"
//               width={260}
//               height={260}
//               className={styles.leaves}
//             />

//             <Image
//               // Используем imageUrl, который был сформирован SC
//               src={imageUrl || '/placeholder-bottle.png'}
//               alt={product.title}
//               width={180}
//               height={360}
//               className={styles.bottle}
//             />
//             {/* ... */}
//             <div className={styles.infoBox} style={{ backgroundColor: product.blockColor }}>
//               <h2>{formattedTitle}</h2>
//               <p>{product.price} грн.</p>
//             </div>
//           </div>
//         </div>
//         <div className={styles.infoSection}>
//           {/* ... (остальная часть JSX) ... */}
//           <h1 className={`${styles.title} ${montserratAlternates.className}`}>{product.title}</h1>
//           {/* <p className={styles.subtitle}>{product.subtitle}</p> */}

//           <div className={styles.price}>{product.price} грн.</div>

//           <div className={styles.description}>
//             <h3>Опис</h3>
//             <p>{product.description}</p>
//           </div>

//           <div style={{ display: 'flex', justifyContent: 'center' }}>
//             <button
//               className={`${styles.buyButton} ${isAdded ? styles.added : ''}`}
//               onClick={addToCart}
//               disabled={isAdded}
//             >
//               {isAdded ? 'Додано!' : 'Додати до кошика'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
