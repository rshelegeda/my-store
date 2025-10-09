'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from './Header.module.css'

interface IconProps {
  color?: string
}

const CartIcon: React.FC<IconProps> = ({ color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.cartIcon}
  >
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
)

interface BurgerIconProps {
  isOpen: boolean
  color?: string
}

const BurgerIcon: React.FC<BurgerIconProps> = ({ isOpen, color = '#006e41' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.burgerSvg}
  >
    <line
      x1="3"
      y1="6"
      x2="21"
      y2="6"
      style={{
        transformOrigin: 'center',
        transform: isOpen ? 'rotate(45deg) translate(0, 6px)' : 'none',
        transition: 'transform 0.3s ease',
      }}
    />
    <line
      x1="3"
      y1="12"
      x2="21"
      y2="12"
      style={{
        opacity: isOpen ? 0 : 1,
        transition: 'opacity 0.2s ease',
      }}
    />
    <line
      x1="3"
      y1="18"
      x2="21"
      y2="18"
      style={{
        transformOrigin: 'center',
        transform: isOpen ? 'rotate(-45deg) translate(0, -6px)' : 'none',
        transition: 'transform 0.3s ease',
      }}
    />
  </svg>
)

interface CartItem {
  id: number
  title: string
  price: string
  image: string
  quantity: number
}

const getCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  const savedCart = localStorage.getItem('cart')
  return savedCart ? JSON.parse(savedCart) : []
}

const saveCartItems = (items: CartItem[]) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('cart', JSON.stringify(items))
}

// -----------------------------------------------------------
// НОВЫЙ ХУК ДЛЯ ПЛАВНОЙ ПРОКРУТКИ
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

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Инициализируем хук прокрутки
  const handleScrollClick = useSmoothScroll()

  // ИЗМЕНЕНИЕ: Заменили пути на якорные ссылки (ID секций)
  // ЕСЛИ ЭТО ОДНОСТРАНИЧНЫЙ САЙТ!
  const navLinks = [
    { title: 'Про нас', href: '#about-section' }, // Допустим, ID секции "Про нас"
    { title: 'Наша продукція', href: '#products-section' }, // Допустим, ID секции "Наша продукція"
    { title: 'Доставка та оплата', href: '#delivery-payment-section' }, // Допустим, ID секции "Доставка та оплата"
    { title: 'Контакти', href: '#contact-section' }, // Допустим, ID секции "Контакти"
  ]

  useEffect(() => {
    // 1. Инициализация (первоначальная загрузка)
    const initialCart = getCartItems()
    setCartItems(initialCart)

    // 2. Слушатели событий
    const handleStorageChange = () => {
      setCartItems(getCartItems())
    }

    const handleCartUpdate = () => {
      setCartItems(getCartItems())
    }

    const handleCartCleared = () => {
      setCartItems([])
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('cartUpdated', handleCartUpdate)
    window.addEventListener('cartCleared', handleCartCleared)

    return () => {
      // Очистка слушателей
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('cartUpdated', handleCartUpdate)
      window.removeEventListener('cartCleared', handleCartCleared)
    }
  }, []) // Пустой массив зависимостей

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      }

      if (currentScrollY !== lastScrollY) {
        setIsMenuOpen(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev)
    setIsMenuOpen(false)
  }

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    saveCartItems(updatedCart)
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    setCartItems(updatedCart)
    saveCartItems(updatedCart)
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  // Вставьте это вместо существующей getTotalPrice
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      // Безопасное преобразование строки в число, если она строка,
      // или использование значения, если оно уже число (хотя TypeScript этого не ожидает)
      const price = Number(item.price) || 0

      return total + price * item.quantity
    }, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <header className={`${styles.header} ${!isVisible ? styles.headerHidden : ''}`}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoLink} onClick={() => setIsMenuOpen(false)}>
          <Image
            src="/logo.png"
            alt="Логотип компанії"
            width={60}
            height={60}
            className={styles.logoImage}
            priority
          />
          <span className={styles.companyName}>Крафтова майстерня</span>
        </Link>

        <div className={styles.rightSection}>
          <nav className={styles.navigation}>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.title} className={styles.navItem}>
                  {/* ИЗМЕНЕНИЕ: Добавляем обработчик onClick для плавной прокрутки */}
                  <Link
                    href={link.href}
                    className={styles.navLink}
                    onClick={(e) => {
                      handleScrollClick(e, link.href)
                      setIsMenuOpen(false)
                    }}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.cartContainer}>
            <button className={styles.ctaButton} onClick={toggleCart}>
              <CartIcon />
              <span className={styles.ctaText}>Кошик</span>
              {getTotalItems() > 0 && <span className={styles.cartBadge}>{getTotalItems()}</span>}
            </button>

            {isCartOpen && (
              <div className={styles.cartDropdown}>
                <div className={styles.cartHeader}>
                  <h3>Кошик</h3>
                  <button className={styles.closeCart} onClick={() => setIsCartOpen(false)}>
                    ×
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <div className={styles.emptyCart}>
                    <p>Кошик порожній</p>
                  </div>
                ) : (
                  <>
                    <div className={styles.cartItems}>
                      {cartItems.map((item) => (
                        <div key={item.id} className={styles.cartItem}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={50}
                            height={50}
                            className={styles.cartItemImage}
                          />
                          <div className={styles.cartItemInfo}>
                            <h4>{item.title}</h4>
                            <p>{item.price} грн.</p>
                            <div className={styles.quantityControls}>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className={styles.quantityBtn}
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className={styles.quantityBtn}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className={styles.removeBtn}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className={styles.cartFooter}>
                      <div className={styles.totalPrice}>Загалом: {getTotalPrice()} грн</div>
                      <Link
                        href="/checkout"
                        className={styles.checkoutBtn}
                        onClick={() => setIsCartOpen(false)}
                      >
                        Оформити замовлення
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            className={styles.burgerButton}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            <BurgerIcon isOpen={isMenuOpen} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className={styles.mobileNavigation} id="mobile-navigation">
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.title} className={styles.mobileNavItem}>
                <Link
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={(e) => {
                    handleScrollClick(e, link.href)
                    setIsMenuOpen(false)
                  }}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
