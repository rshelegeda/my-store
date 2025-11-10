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
