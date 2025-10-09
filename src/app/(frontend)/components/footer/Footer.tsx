'use client' // КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: Это делает компонент клиентским, позволяя использовать хуки и onClick

import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'
import { FaInstagram, FaFacebookF, FaTelegramPlane } from 'react-icons/fa'

// 1. Создаем интерфейс для ожидаемых пропсов
interface FooterProps {
  phone: string
  email: string
}

// -----------------------------------------------------------
// НОВЫЙ ХУК ДЛЯ ПЛАВНОЙ ПРОКРУТКИ
// Этот хук отвечает за перехват клика и плавный скролл к ID
// -----------------------------------------------------------
const useSmoothScroll = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Проверяем, является ли ссылка якорной (начинается с #)
    if (href.startsWith('#')) {
      e.preventDefault() // Отменяем стандартное поведение Link

      const targetId = href.substring(1) // Получаем ID без символа #
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Используем scrollIntoView для плавной прокрутки
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start', // Прокручиваем так, чтобы элемент был вверху экрана
        })
      }
    }
  }
  return handleClick
}
// -----------------------------------------------------------

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Инициализируем хук прокрутки
  const handleScrollClick = useSmoothScroll()

  // ЯКОРНЫЕ ССЫЛКИ, которые соответствуют ID на главной странице (page.tsx)
  const navLinks = [
    { title: 'Про нас', href: '#about-section' },
    { title: 'Наша продукція', href: '#products-section' },
    { title: 'Доставка та оплата', href: '#delivery-payment-section' },
    { title: 'Контакти', href: '#contact-section' },
  ]

  const socialLinks = [
    { icon: FaInstagram, href: 'https://www.instagram.com/domashniy_yabluchnyy_otset/' },
    { icon: FaFacebookF, href: 'https://www.facebook.com/profile.php?id=100063654803541' },
    { icon: FaTelegramPlane, href: 'https://t.me/applecidervinegarukraine' },
  ]

  return (
    // Обязательно добавляем ID для секции "Контакти"
    <footer className={styles.footer} id="contact-section">
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
                {/* ИЗМЕНЕНИЕ: Используем handleScrollClick для плавной прокрутки */}
                <Link
                  href={link.href}
                  className={styles.navItem}
                  onClick={(e) => handleScrollClick(e, link.href)} // УДАЛЕНА setIsMenuOpen(false)
                >
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
            <a href="mailto:applecidervinegar@ukr.net" className={styles.contactLink}>
              applecidervinegar@ukr.net
            </a>
          </p>
          <p>
            Телефон:{' '}
            <a href="tel:+380999058530" className={styles.contactLink}>
              +380 (99) 905-85-30
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

      <div className={styles.copyright}>
        &copy; {currentYear} Apple Cider Vinegar. Усі права захищені.
      </div>
    </footer>
  )
}
