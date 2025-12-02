'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

import { FaInstagram, FaFacebookF, FaTelegramPlane, FaTiktok, FaYoutube } from 'react-icons/fa'
import { montserratAlternates } from '../../fonts'

interface FooterProps {
  phone: string
  email: string
  counter: number
}

const useSmoothScroll = () => {
  montserratAlternates
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }
  }
  return handleClick
}

export default function Footer({ phone, email, counter }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const handleScrollClick = useSmoothScroll()

  const navLinks = [
    { title: 'Про нас', href: '#about-section' },
    { title: 'Наша продукція', href: '#products-section' },
    { title: 'Доставка та оплата', href: '#delivery-payment-section' },
    { title: 'Контакти', href: '#contact-section' },
    { title: 'Оферта', href: '/publ_of.pdf' },
  ]

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
    },
  ]

  return (
    <footer className={`${styles.footer} ${montserratAlternates.className}`} id="contact-section">
      <div className={styles.footerContent}>
        <div className={styles.brandInfo}>
          <Link href="/" className={styles.logoWrapper}>
            <Image
              src="/logo-new.png"
              alt="Логотип компанії"
              width={100}
              height={100}
              className={styles.logoImage}
            />
          </Link>
          <p className={`${styles.tagline} ${montserratAlternates.className}`}>
            Натуральні продукти з любов&apos;ю до природи.
          </p>
        </div>

        <nav className={styles.footerNav}>
          <h3 className={`${styles.navTitle} ${montserratAlternates.className}`}>Навігація</h3>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  className={`${styles.navItem} ${montserratAlternates.className}`}
                  onClick={(e) => handleScrollClick(e, link.href)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contactInfo}>
          <h3 className={`${styles.navTitle} ${montserratAlternates.className}`}>
            Зв&apos;яжіться з нами
          </h3>
          <p className={montserratAlternates.className}>
            Email:{' '}
            <a
              href={`mailto:${email}`}
              className={`${styles.contactLink} ${montserratAlternates.className}`}
            >
              {email}
            </a>
          </p>
          <p className={montserratAlternates.className}>
            Телефон:{' '}
            <a
              href={`tel:${phone.replace(/[()-\s]/g, '')}`}
              className={`${styles.contactLink} ${montserratAlternates.className}`}
            >
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
                aria-label={`Посилання на ${social.href}`}
              >
                <social.icon className={styles.socialIcon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={`${styles.copyright} ${montserratAlternates.className}`}>
        Counter: {counter}
      </div>
      <div className={`${styles.copyright} ${montserratAlternates.className}`}>
        &copy; {currentYear} Apple Cider Vinegar. Усі права захищені.
      </div>

      <div className={`${styles.languages} ${montserratAlternates.className}`}>
        UA: На цьому сайті Ви можете{' '}
        <strong className={montserratAlternates.className}>
          купити натуральний крафтовий яблучний оцет
        </strong>
        , вироблений в Україні.
      </div>

      <div className={`${styles.languages} ${montserratAlternates.className}`}>
        EN: Natural live apple cider vinegar. Made in Ukraine.
      </div>

      <div className={`${styles.languages} ${montserratAlternates.className}`}>
        RU: На этом сайте Вы можете{' '}
        <strong className={montserratAlternates.className}>
          купить натуральный живой яблочный уксус
        </strong>
        , произведенный в Украине.{' '}
        <strong className={montserratAlternates.className}>
          Продажа натурального живого украинского яблочного уксуса.
        </strong>
      </div>
    </footer>
  )
}
