// ProductSchema.tsx - УЛУЧШЕННАЯ версия с полными данными для Google Merchant Center

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
    mpn: productData.sku || productData.slug, // Добавляем mpn
    offers: {
      '@type': 'Offer',
      url: `https://applecidervinegar.com.ua/products/${productData.slug}`,
      priceCurrency: productData.priceCurrency || 'UAH',
      price: productData.price,
      availability: productData.availability || 'https://schema.org/InStock',
      priceValidUntil: '2025-12-31',
      itemCondition: 'https://schema.org/NewCondition', // Добавляем условие товара

      // ДОБАВЛЯЕМ политику возврата
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'UA',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14, // Укажите реальное количество дней
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
        returnPolicyCountry: 'UA',
      },

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
        // ДОБАВЛЯЕМ сроки доставки
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
          businessDays: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'https://schema.org/Monday',
              'https://schema.org/Tuesday',
              'https://schema.org/Wednesday',
              'https://schema.org/Thursday',
              'https://schema.org/Friday',
            ],
          },
        },
      },
      seller: {
        '@type': 'Organization',
        name: 'Крафтова оцетарня',
        url: 'https://applecidervinegar.com.ua',
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
