// products/[slug]/page.tsx
// !!! УДАЛЕНА СТРОКА 'use client' !!!
// !!! УДАЛЕНЫ useState, useEffect, use !!!

import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import type { Metadata } from 'next'
import { sofiaSans } from '../../fonts'
import styles from './ProductPage.module.css'
import ProductDetailsClient from '../../components/ProductDetailsClient'

const PAYLOAD_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

// const PAYLOAD_BASE_URL = 'http://localhost:3030'

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
  const relativeUrl = product?.images?.[0]?.image?.url
  const imageUrl = relativeUrl ? `${PAYLOAD_BASE_URL}${relativeUrl}` : null

  const leavesRelativeUrl = product?.leaves?.url
  const leavesUrl = leavesRelativeUrl ? `${PAYLOAD_BASE_URL}${leavesRelativeUrl}` : null

  // Рендерим Клиентский Компонент, передавая ему данные
  return <ProductDetailsClient product={product} imageUrl={imageUrl} leavesUrl={leavesUrl} />
}

// generateStaticParams и generateMetadata
export async function generateStaticParams() {
  // ... (Ваш код generateStaticParams) ...
  const payloadConfig = await config
  const payload = await await getPayload({ config: payloadConfig })

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
  const payload = await await getPayload({ config: payloadConfig })

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
    description: `Купить ${product.title} за ${product.price} грн.`,
  }
}
