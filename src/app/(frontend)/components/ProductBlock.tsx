// ProductBlock.tsx

import Image from 'next/image'
import Link from 'next/link'
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
  return (
    <Link href={`/products/${slug}`} className={styles.blockLink}>
      <div className={styles.block}>
        <Image src={leaves} alt="Листва" width={260} height={260} className={styles.leaves} />

        <Image src={image} alt={title} width={180} height={360} className={styles.bottle} />

        <div className={styles.infoBox} style={{ backgroundColor: blockColor }}>
          <h2>{title}</h2>
          <p>{price} грн.</p>
        </div>
      </div>
    </Link>
  )
}
