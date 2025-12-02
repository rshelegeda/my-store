import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './ProductBlock.module.css'
import { montserratAlternates } from '../fonts'

interface ProductBlockProps {
  id: string
  title: string
  subtitle: string
  slug: string
  price: number
  image: string
  leaves: string
  blockColor: string
}

const formatTitle = (text: string) => {
  const partsZ = text.split(' З ')
  const finalElements: React.ReactNode[] = []

  partsZ.forEach((part, partIndex) => {
    const partsParentheses = part.split(/(\s?\([^)]+\))$/)

    partsParentheses.forEach((p, pIndex) => {
      if (p) {
        if (p.trim().startsWith('(')) {
          finalElements.push(<br key={`br-${partIndex}-${pIndex}`} />)
        }
        finalElements.push(p)
      }
    })

    if (partIndex < partsZ.length - 1) {
      finalElements.push(<br key={`br-z-${partIndex}`} />)
      finalElements.push('З ')
    }
  })

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
  const formattedTitle = formatTitle(title)

  return (
    <Link href={`/products/${slug}`} className={styles.blockLink}>
      <div className={`${styles.block} ${montserratAlternates.className}`}>
        {/* Сначала основная бутылка */}
        <Image src={image} alt={title} width={180} height={360} className={styles.bottle} />

        {/* Листва декоративная, alt пустой */}
        <Image
          src={leaves}
          alt=""
          aria-hidden="true"
          width={260}
          height={260}
          className={styles.leaves}
        />

        <div
          className={`${styles.infoBox} ${montserratAlternates.className}`}
          style={{ backgroundColor: blockColor }}
        >
          <h2>{formattedTitle}</h2>
          <p className={montserratAlternates.className} style={{ fontSize: 24 }}>
            {price} грн.
          </p>

          {/* Если есть кнопка "Додати в кошик" */}
          {/* <button className={`${styles.addToCartBtn} ${montserratAlternates.className}`}>
            Додати в кошик
          </button> */}
        </div>
      </div>
    </Link>
  )
}
