'use client' // КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ: Это делает компонент клиентским, позволяя использовать хуки и onClick

import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'
// Добавлен FaTiktok, удален FaTelegramPlane, FaFacebookF, FaInstagram
import { FaInstagram, FaFacebookF, FaTelegramPlane, FaTiktok, FaYoutube } from 'react-icons/fa'

// 1. Создаем интерфейс для ожидаемых пропсов (только phone и email)
interface FooterProps {
  phone: string
  email: string
}

// -----------------------------------------------------------
// ХУК ДЛЯ ПЛАВНОЙ ПРОКРУТКИ
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

export default function Footer({ phone, email }: FooterProps) {
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

  // ДОБАВЛЕНА ССЫЛКА НА TIKTOK
  const socialLinks = [
    { icon: FaInstagram, href: 'https://www.instagram.com/domashniy_yabluchnyy_otset/' },
    { icon: FaFacebookF, href: 'https://www.facebook.com/profile.php?id=100063654803541' },
    { icon: FaTelegramPlane, href: 'https://t.me/applecidervinegarukraine' },
    {
      icon: FaTiktok,
      href: 'https://www.tiktok.com/@organic_apple_vinegar?is_from_webapp=1&sender_device=pc',
    },
    {
      icon: FaYoutube,
      href: 'https://www.youtube.com/@%D0%9D%D0%B0%D1%82%D1%83%D1%80%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%B9%D0%AF%D0%B1%D0%BB%D1%83%D1%87%D0%BD%D0%B8%D0%B9%D0%BE%D1%86%D0%B5%D1%82',
    }, // ЗАМЕНИТЕ НА ВАШ АДРЕС TIKTOK
  ]

  return (
    // Обязательно добавляем ID для секции "Контакти"
    <footer className={styles.footer} id="contact-section">
      <div className={styles.footerContent}>
        <div className={styles.brandInfo}>
          <Link href="/" className={styles.logoWrapper}>
            <Image
              src="/logo-new.png"
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
                {/* ИСПОЛЬЗУЕМ handleScrollClick для плавной прокрутки */}
                <Link
                  href={link.href}
                  className={styles.navItem}
                  onClick={(e) => handleScrollClick(e, link.href)}
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
            Email: {/* ИСПОЛЬЗУЕМ ПРОПС email ИЗ PAYLOAD CMS */}
            <a href={`mailto:${email}`} className={styles.contactLink}>
              {email}
            </a>
          </p>
          <p>
            Телефон: {/* ИСПОЛЬЗУЕМ ПРОПС phone ИЗ PAYLOAD CMS */}
            <a href={`tel:${phone.replace(/[()-\s]/g, '')}`} className={styles.contactLink}>
              {phone}
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

      {/* СЕКЦИЯ СЧЕТЧИКА УДАЛЕНА */}

      <div className={styles.copyright}>Counter: 0</div>
      <div className={styles.copyright}>
        &copy; {currentYear} Apple Cider Vinegar. Усі права захищені.
      </div>
    </footer>
  )
}
