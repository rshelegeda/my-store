const WebSiteSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Apple Cider Vinegar UA',
          url: 'https://applecidervinegar.com.ua/',
          description:
            'Натуральний яблучний оцет ручного виробництва. Купити натуральний яблучний крафтовий оцет з доставкою по Україні.',
          // potentialAction: {
          //   '@type': 'SearchAction',
          //   // Убедитесь, что этот URL соответствует структуре вашего поиска
          //   target: 'https://applecidervinegar.com.ua/?s={search_term_string}',
          //   'query-input': 'required name=search_term_string',
          // },
          publisher: {
            '@type': 'Organization',
            name: 'Apple Cider Vinegar UA',
            logo: 'https://applecidervinegar.com.ua/logo-new.png',
          },
        }),
      }}
    />
  )
}

export default WebSiteSchema
