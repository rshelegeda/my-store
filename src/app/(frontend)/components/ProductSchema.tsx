// ProductSchema.tsx - УЛУЧШЕННАЯ версия

interface ProductSchemaProps {
  productData?: {
    name: string
    description?: string
    image?: string
    price?: string | number
    priceCurrency?: string
    availability?: string
    sku?: string
    slug?: string
    rating?: number
    reviewCount?: number
  }
}

const ProductSchema = ({ productData }: ProductSchemaProps) => {
  // Если нет данных продукта - не рендерим ничего
  if (!productData) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productData.name,
    description: productData.description || `Натуральний яблучний оцет ${productData.name}`,
    image: productData.image || 'https://applecidervinegar.com.ua/logo-new.png',
    sku: productData.sku || productData.slug,
    offers: {
      '@type': 'Offer',
      url: `https://applecidervinegar.com.ua/products/${productData.slug}`,
      priceCurrency: productData.priceCurrency || 'UAH',
      price: productData.price,
      availability: productData.availability || 'https://schema.org/InStock',
      priceValidUntil: '2025-12-31',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'UAH',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'UA',
        },
      },
    },
    brand: {
      '@type': 'Brand',
      name: 'Крафтова оцетарня',
    },
    ...(productData.rating && productData.reviewCount
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: productData.rating.toString(),
            reviewCount: productData.reviewCount.toString(),
          },
        }
      : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}

export default ProductSchema
