'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Checkout.module.css'
import CopyButton from '../components/paymentDelivery/CopyButton'
import { DeliveryIcon, PaymentIcon } from '../components/paymentDelivery/PaymentDelivery'

interface CartItem {
  id: number
  title: string
  price: string
  image: string
  quantity: number
}

interface OrderForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  address: string
  comment: string
  paymentMethod: 'cash' | 'card'
  deliveryMethod: 'nova_poshta' | ''
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [formData, setFormData] = useState<OrderForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    comment: '',
    paymentMethod: 'cash',
    deliveryMethod: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  const checkFormValidity = (data: OrderForm) => {
    // Проверка заполнения всех полей
    const requiredFields: (keyof OrderForm)[] = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'city',
      'address',
    ]
    // Проверяем, что все обязательные поля не пустые строки
    const allRequiredFieldsFilled = requiredFields.every(
      (field) => data[field] && data[field].trim() !== '',
    )

    // Дополнительная проверка: корзина не должна быть пустой
    const cartIsNotEmpty = cartItems.length > 0

    return allRequiredFieldsFilled && cartIsNotEmpty
  }

  useEffect(() => {
    setIsFormValid(checkFormValidity(formData))
  }, [formData, cartItems]) // Зависимости: formData и cartItems

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    const updatedCart = cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
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

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault() // Предотвращаем стандартную отправку формы

    if (!isFormValid) {
      alert("Будь ласка, заповніть усі обов'язкові поля та перевірте кошик.")
      return // Останавливаем выполнение, если форма невалидна
    }

    setIsSubmitting(true)

    // 1. Собрать все данные (корзина, форма клиента)
    const orderPayload = {
      name: `${formData.firstName} ${formData.lastName}`, // Объединяем имя и фамилию
      phone: formData.phone,
      address: `${formData.city}, ${formData.address}`, // Объединяем город и отделение
      email: formData.email,
      delivery: formData.deliveryMethod,
      payment: formData.paymentMethod,
      comment: formData.comment,
      items: cartItems.map((item) => ({
        title: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: getTotalPrice(),
    }

    try {
      const response = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      })

      if (response.ok) {
        // Успешная отправка в Telegram

        // Очистка корзины
        localStorage.removeItem('cart')
        setCartItems([])

        // Уведомляем другие компоненты
        window.dispatchEvent(new CustomEvent('cartUpdated'))
        window.dispatchEvent(new CustomEvent('cartCleared'))

        setIsSubmitted(true) // Показываем страницу успеха
      } else {
        const errorData = await response.json()
        console.error('Server error:', errorData)
        alert('❌ Помилка при оформленні замовлення. Спробуйте ще раз.')
      }
    } catch (error) {
      console.error('Fetch error:', error)
      alert("❌ Помилка з'єднання з сервером.")
    } finally {
      setIsSubmitting(false)
    }
  }
  const iban = 'UA933052990000026001026105561'
  if (isSubmitted) {
    return (
      <div className={styles.container}>
        <div className={styles.successPage}>
          <h1 className={styles.successTitle}>Замовлення успішно оформлено!</h1>

          <div className={styles.successMessage}>
            <p className={styles.mainMessage}>
              Дякуємо за ваше замовлення! Ми отримали ваш запит і обробимо його найближчим часом.
            </p>

            <div className={styles.textContent}>
              {/* ЕДИНАЯ КАРТОЧКА: ДОСТАВКА И ОПЛАТА */}
              <div className={styles.combinedCard}>
                {/* БЛОК ДОСТАВКИ */}
                <div className={styles.sectionHeader}>
                  <DeliveryIcon /> {/* Изменено: Используем иконку доставки */}
                  <h3 className={styles.sectionTitle}>Доставка</h3>
                </div>
                <p className={styles.deliveryText}>
                  Доставка здійснюється <strong>Новою поштою</strong> у будь-яке місто України.
                </p>
                <p className={styles.deliveryText}>
                  Всі замовлення відправляємо упродовж <strong>2-х днів</strong>, щоб якомога швидше
                  порадувати вас.
                </p>
                <div className={styles.separator}></div> {/* Разделитель */}
                {/* БЛОК ОПЛАТЫ */}
                <div className={styles.sectionHeader}>
                  <PaymentIcon />
                  <h3 className={styles.sectionTitle}>Оплата</h3>
                </div>
                <p className={styles.paymentText}>Оплата тільки на рахунок IBAN:</p>
                <div className={styles.ibanContainer}>
                  <div className={styles.ibanBox}>
                    <span className={styles.ibanText}>{iban}</span>
                    <CopyButton iban={iban} />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.nextSteps}>
              <h3>Що далі?</h3>
              <ul>
                <li>Наш менеджер зв&apos;яжеться з вами найближчим часом</li>
                <li>Ми підтвердимо наявність товарів та деталі доставки</li>
                <li>Товари будуть відправлені найближчим часом</li>
              </ul>
            </div>

            <div className={styles.contactInfo}>
              <h3>Контакти для зв&apos;язку</h3>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <span>+380 (99) 905-85-30</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <span>applecidervinegar@ukr.net</span>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <Link href="/" className={styles.primaryButton}>
              Повернутися на головну
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#666"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <h1>Кошик порожній</h1>
          <p>Додайте товари до кошика, щоб оформити замовлення.</p>
          <Link href="/" className={styles.backToProducts}>
            Повернутися на головну
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Назад до головної
        </Link>
        <h1>Оформлення замовлення</h1>
      </div>

      <div className={styles.checkoutContent}>
        <div className={styles.orderSummary}>
          <h2>Ваше замовлення</h2>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={60}
                  height={60}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <h3>{item.title}</h3>
                  <p>{item.price}</p>
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
                <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className={styles.totalPrice}>Загалом: {getTotalPrice()} грн</div>
        </div>

        <form className={styles.orderForm} onSubmit={handleCheckout}>
          <h2>Контактна інформація</h2>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">Ім&apos;я *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Прізвище *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Телефон *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <h2>Доставка</h2>

          <div className={styles.formGroup}>
            <label htmlFor="deliveryMethod">Спосіб доставки</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="deliveryMethod"
                  // ЗМІНА 3: Уніфікуємо value
                  value="nova_poshta"
                  checked={formData.deliveryMethod === 'nova_poshta'}
                  onChange={handleInputChange}
                />
                Нова пошта
              </label>
              {/* Додайте інші варіанти доставки тут, якщо потрібно */}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city">Місто *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address">Номер відділення *</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <h2>Оплата</h2>

          <div className={styles.formGroup}>
            <label>Спосіб оплати</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                />
                Оплата за реквізитами банку
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="comment">Коментар до замовлення</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? 'Оформляємо...' : 'Підтвердити замовлення'}
          </button>
        </form>
      </div>
    </div>
  )
}
