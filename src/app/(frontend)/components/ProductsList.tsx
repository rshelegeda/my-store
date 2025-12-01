// ProductsList.tsx - ТЕПЕРЬ получает данные из пропсов!
import { montserratAlternates } from '@/app/(frontend)/fonts'
import ProductBlock from './ProductBlock'
import { Product } from '@/payload-types'
import styles from './ProductsList.module.css'

// ДОБАВИТЬ интерфейс для пропсов
interface ProductsListProps {
  products: Product[] // ← Данные приходят из родителя (page.tsx)
}

/**
 * Компонент для отображения списка товаров.
 * Теперь получает данные через пропсы, а не загружает сам.
 */
export default function ProductsList({ products }: ProductsListProps) {
  // УДАЛЕНА загрузка данных! Все данные уже пришли из page.tsx

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-700">На жаль, товари наразі відсутні.</h2>
        <p className="text-gray-500 mt-2">Спробуйте оновити сторінку або завітати пізніше.</p>
      </div>
    )
  }

  return (
    <div className={styles.productsContainer}>
      <div className={styles.pageTitle}>
        <h1 className={styles.subtitle}>НАТУРАЛЬНИЙ ЯБЛУЧНИЙ ОЦЕТ КУПИТИ ОНЛАЙН</h1>
      </div>

      {/* ВАЖНО: ДОБАВИТЬ SEO-ТЕКСТ перед товарами! */}
      {/* <div className="seo-text-container mb-12 mt-8 px-4">
        <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Де купити натуральний яблучний оцет в Україні?
          </h2>
          <p className="text-gray-700 mb-3 text-lg">
            <strong>Шукаєте справді якісний натуральний яблучний оцет?</strong>
            Наша крафтова оцетарня пропонує унікальний продукт, виготовлений вручну з яблук власного
            саду. Без консервантів, без цукру, без штучних добавок.
          </p>
          <p className="text-gray-700 mb-3">
            Наш оцет проходить повний цикл природного бродіння у дубових бочках, що забезпечує
            насичений смак та збереження всіх корисних речовин.
          </p>
          <p className="text-gray-700">
            Замовляйте онлайн з доставкою по всій Україні.{' '}
            <strong>Найкраща ціна прямо від виробника!</strong>
          </p>
        </div>
      </div> */}

      <div className={styles.productsGrid}>
        {products.map((product) => {
          const firstImage = product.images?.[0]?.image

          // Используем URL, сгенерированный Payload
          const imageUrl =
            typeof firstImage === 'object' && firstImage?.url ? firstImage.url : '/logo-new.png'

          const leavesUrl =
            typeof product.leaves === 'object' && product.leaves?.url
              ? product.leaves.url
              : '/apple-front-opti.png'

          const safeSlug = product.slug ?? product.id.toString()
          const safeSubtitle = product.subtitle ?? ''
          const safeBlockColor = product.blockColor ?? '#f8a616'

          return (
            <ProductBlock
              key={safeSlug}
              id={product.id as string}
              title={product.title}
              subtitle={safeSubtitle}
              image={imageUrl}
              leaves={leavesUrl}
              price={product.price}
              blockColor={safeBlockColor}
              slug={safeSlug}
            />
          )
        })}
      </div>

      {/* ВАЖНО: ДОБАВИТЬ SEO-ТЕКСТ после товаров! */}
      {/* <div className="seo-text-footer mt-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Чому варто купити яблучний оцет саме у нас?
          </h3>
          <ul className="text-gray-700 text-left inline-block">
            <li className="mb-2">✅ Натуральний склад без хімічних добавок</li>
            <li className="mb-2">✅ Ручне виробництво з любов'ю до якості</li>
            <li className="mb-2">✅ Доступна ціна від виробника</li>
            <li className="mb-2">✅ Швидка доставка по всій Україні</li>
            <li>✅ Гарантія якості та натуральності продукту</li>
          </ul>
          <p className="mt-6 text-gray-800 font-semibold">
            Замовляйте натуральний яблучний оцет прямо зараз та отримайте знижку на перше
            замовлення!
          </p>
        </div>
      </div> */}
    </div>
  )
}
