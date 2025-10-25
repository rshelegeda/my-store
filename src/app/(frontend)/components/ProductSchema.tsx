const ProductSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          // Имя продукта должно быть чистым и точным
          name: 'Натуральний крафтовий яблучний оцет',
          // Ссылка на основное изображение продукта
          image: 'https://applecidervinegar.com.ua/4651048.jpg',
          // Описание, включающее русские ключевые фразы для SEO-охвата
          description:
            '100% органічний натуральний яблучний оцет, виготовлений традиційним методом. Это натуральный крафтовый яблочный уксус, продукт высокого качества от украинского производителя.',
          brand: {
            '@type': 'Brand',
            name: 'Apple Cider Vinegar UA',
          },
          // Блок предложения (Offer) с ценой и доступностью
          offers: {
            '@type': 'Offer',
            priceCurrency: 'UAH',
            price: '230',
            availability: 'https://schema.org/InStock',
            url: 'https://applecidervinegar.com.ua/',
            priceValidUntil: '2025-12-31', // ✅ Добавь это
            hasMerchantReturnPolicy: {
              '@type': 'MerchantReturnPolicy',
              applicableCountry: 'UA',
              returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
              merchantReturnDays: 14,
            },
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: {
                '@type': 'MonetaryAmount',
                value: '0.00',
                currency: 'UAH',
              },
              shippingDestination: {
                '@type': 'DefinedRegion',
                addressCountry: 'UA',
              },
            },
          },
          // Здесь можно добавить блок рейтинга, если есть отзывы:
          // aggregateRating: {
          //   "@type": "AggregateRating",
          //   "ratingValue": "5.0",
          //   "reviewCount": "25"
          // }
        }),
      }}
    />
  )
}

export default ProductSchema
