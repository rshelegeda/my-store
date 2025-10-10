import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './ProductBlock.module.css'

interface ProductBlockProps {
  id: string
  title: string
  subtitle: string
  slug: string // <-- ДОБАВЛЕН ПРОПС SLUG ДЛЯ УСТРАНЕНИЯ ОШИБКИ
  price: number
  image: string // Полный URL основного изображения
  leaves: string // Полный URL фонового элемента (листья/узор)
  blockColor: string // HEX-код для фона информационного блока
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
    // Используем регулярное выражение для разделения по скобке "(" и захвата текста в ней
    // Например: 'ОЦЕТ (з прянощами)' -> ['ОЦЕТ ', '(з прянощами)']
    const partsParentheses = part.split(/(\s?\([^)]+\))$/)

    partsParentheses.forEach((p, pIndex) => {
      if (p) {
        // Если элемент начинается со скобки, вставляем перед ним перенос
        if (p.trim().startsWith('(')) {
          finalElements.push(<br />)
        }
        finalElements.push(p)
      }
    })

    // Добавляем <br /> и "З " только если это не последний элемент в разделении по " З "
    if (partIndex < partsZ.length - 1) {
      finalElements.push(<br />)
      finalElements.push('З ')
    }
  })

  // Оборачиваем все элементы в React.Fragment
  return finalElements.map((el, index) => (
    <React.Fragment key={`title-part-${index}`}>{el}</React.Fragment>
  ))
}

export default function ProductBlock({
  id,
  title,
  subtitle,
  image,
  leaves,
  price,
  blockColor,
  slug,
}: ProductBlockProps) {
  // Применяем форматирование к заголовку
  const formattedTitle = formatTitle(title)

  return (
    <Link href={`/products/${slug}`} className={styles.blockLink}>
      <div className={styles.block}>
        <Image src={leaves} alt="Листва" width={260} height={260} className={styles.leaves} />

        <Image src={image} alt={title} width={180} height={360} className={styles.bottle} />

        <div className={styles.infoBox} style={{ backgroundColor: blockColor }}>
          {/* Используем отформатированный заголовок */}
          <h2>{formattedTitle}</h2>
          <p style={{ fontSize: 24 }}>{price} грн.</p>
        </div>
      </div>
    </Link>
  )
}
