// Slider.tsx

'use client'

import React from 'react'
import Image from 'next/image'

import styles from './Slider.module.css'

import { FaInstagram, FaFacebookF, FaTelegramPlane, FaTiktok, FaYoutube } from 'react-icons/fa'

// const BACKGROUND_VIDEO_PATH = '/homepage_video.mp4'
// const POSTER_IMAGE_PATH = '/grandpa_with_ocet.jpg'

interface SliderProps {
  dynamicPosterPath: string
}

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

// Компонент принимает dynamicPosterPath
// Компонент принимает dynamicPosterPath
const Slider: React.FC<SliderProps> = ({ dynamicPosterPath }) => {
  return (
    <div className={styles.videoWrapper}>
      <div className={styles.videoSection}>
        <Image // 👈 Шаг 2: Заменяем <img> на <Image>
          className={styles.mainVideo}
          src={dynamicPosterPath}
          alt="Натуральний яблучний оцет купити"
          width={873}
          height={1015}
          fetchPriority="high" // 👈 Шаг 3: Добавляем атрибут priority
        />

        <div className={styles.contentOverlay}>
          {/* Блок с основным текстом */}
          <div className={styles.textBackground}>
            <h1 className={styles.mainText}>НАТУРАЛЬНИЙ ЯБЛУЧНИЙ ОЦЕТ</h1>

            <h2 className={styles.mainText}>ТА ІНША КОРИСНА ПРОДУКЦІЯ</h2>
          </div>

          {/* НОВЫЙ БЛОК: Социальные сети внизу оверлея */}
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
                {/* Используем компонент SVG-иконки */}
                <social.icon className={styles.socialIcon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider
