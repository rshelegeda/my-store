import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'
import { FaInstagram, FaFacebookF, FaTelegramPlane } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { title: 'Про нас', href: '/about' },
    { title: 'Контакти', href: '/contact' },
    { title: 'Наша продукція', href: '/products' },
    { title: 'Доставка та оплата', href: '/delivery-payment' },
    { title: 'Публічна оферта', href: '/oferta' },
  ]

  const socialLinks = [
    { icon: FaInstagram, href: 'ВАША_ССЫЛКА_НА_INSTAGRAM' },
    { icon: FaFacebookF, href: 'ВАША_ССЫЛКА_НА_FACEBOOK' },
    { icon: FaTelegramPlane, href: 'ВАША_ССЫЛКА_НА_TELEGRAM' },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandInfo}>
          <Link href="/" className={styles.logoWrapper}>
            <Image
              src="/logo.png"
              alt="Логотип компанії"
              width={100}
              height={100}
              className={styles.logoImage}
              priority
            />
          </Link>
          <p className={styles.tagline}>Натуральні продукти з любов&apos;ю до природи.</p>
        </div>

        <nav className={styles.footerNav}>
          <h3 className={styles.navTitle}>Навігація</h3>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link href={link.href} className={styles.navItem}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contactInfo}>
          <h3 className={styles.navTitle}>Зв&apos;яжіться з нами</h3>
          <p>
            Email:{' '}
            <a href="mailto:info@example.com" className={styles.contactLink}>
              info@example.com
            </a>
          </p>
          <p>
            Телефон:{' '}
            <a href="tel:+380XXXXXXXXX" className={styles.contactLink}>
              +380 (XX) XXX XX XX
            </a>
          </p>

          <div className={styles.socials}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIconLink}
              >
                <social.icon className={styles.socialIcon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
