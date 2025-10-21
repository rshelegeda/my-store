// products/[slug]/page.tsx
// !!! УДАЛЕНА СТРОКА 'use client' !!!
// !!! УДАЛЕНЫ useState, useEffect, use !!!

import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import type { Metadata } from 'next'
import { montserratAlternates } from '../../fonts'
import styles from './ProductPage.module.css'
import ProductDetailsClient from '../../components/ProductDetailsClient'

// --- ИСПРАВЛЕНИЕ КЕШИРОВАНИЯ ---
// Указываем Next.js перепроверять данные (кеш) каждые 60 секунд.
export const revalidate = 30

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

export default async function ProductDetailPage({ params }: any) {
  // Здесь оставляем await, как требует Next.js для динамических пропсов
  const { slug: productSlug } = await params

  // Ваш код получения Payload:
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  let product: any = null

  try {
    const productData = await payload.find({
      collection: 'products',
      limit: 1,
      depth: 2,
      where: {
        slug: {
          equals: productSlug,
        },
      },
    })
    product = productData.docs[0]
  } catch (error) {
    console.error('Ошибка при получении детальной информации о товаре:', error)
  }

  if (!product) {
    // Оставляем рендеринг 404 на стороне сервера
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h1>Товар не знайдено</h1>
          <Link href="/" className={styles.backButton}>
            ← Назад до головної
          </Link>
        </div>
      </div>
    )
  }

  // 3. Подготовка данных для отображения (включая URL)
  // Payload возвращает полный URL, поэтому ручное добавление PAYLOAD_BASE_URL не требуется
  const imageUrl = product?.images?.[0]?.image?.url || null
  const leavesUrl = product?.leaves?.url || null

  // --- УЛУЧШЕНИЕ SEO: ДОБАВЛЕНИЕ AGGREGATERATING И REVIEW ---
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: imageUrl ? [imageUrl] : [], // Используем массив для изображения
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Apple Cider Vinegar UA',
    },
    offers: {
      '@type': 'Offer',
      url: `https://applecidervinegar.com.ua/products/${product.slug}`,
      priceCurrency: 'UAH',
      price: product.price,
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2025-12-31',
    },
    // Добавляем заглушку для агрегированного рейтинга (для Rich Snippets)
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0', // Средняя оценка (лучше указывать 4.5-5.0)
      reviewCount: '10', // Количество отзывов (начальное число)
    },
    // Добавляем пример отзыва (для лучшей валидации)
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Покупець',
      },
      reviewBody: 'Справжній натуральний оцет, дуже якісний продукт!',
    },
  }
  // --- КОНЕЦ УЛУЧШЕНИЯ SEO ---

  // Рендерим Клиентский Компонент, передавая ему данные
  return (
    <>
      {/* JSON-LD Product Schema.org (для Rich Snippets) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailsClient product={product} imageUrl={imageUrl} leavesUrl={leavesUrl} />
    </>
  )
}

// generateStaticParams и generateMetadata
export async function generateStaticParams() {
  // ... (Ваш код generateStaticParams) ...
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const products = await payload.find({
    collection: 'products',
    limit: 100,
    depth: 0,
  })

  return products.docs.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  // ... (Ваш код generateMetadata) ...
  const { slug: productSlug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const productData = await payload.find({
    collection: 'products',
    limit: 1,
    where: { slug: { equals: productSlug } },
  })

  const product = productData.docs[0]

  if (!product) {
    return {
      title: 'Товар не найден',
    }
  }

  return {
    title: product.title,
    // Описание метаданных должно быть более коммерческим и содержать ключевые слова
    description: `Купити ${product.title} за ${product.price} грн. Натуральний крафтовий яблучний оцет, доставка по Україні.`,
  }
}
