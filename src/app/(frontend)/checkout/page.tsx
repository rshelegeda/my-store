'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Checkout.module.css'
import CopyButton from '../components/paymentDelivery/CopyButton'
import { DeliveryIcon, PaymentIcon } from '../components/paymentDelivery/PaymentDelivery'
import { montserratAlternates } from '../fonts'

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
    const requiredFields: (keyof OrderForm)[] = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'city',
      'address',
    ]
    const allRequiredFieldsFilled = requiredFields.every(
      (field) => data[field] && data[field].trim() !== '',
    )
    const cartIsNotEmpty = cartItems.length > 0

    return allRequiredFieldsFilled && cartIsNotEmpty
  }

  useEffect(() => {
    setIsFormValid(checkFormValidity(formData))
  }, [formData, cartItems])

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

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0
      return total + price * item.quantity
    }, 0)
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) {
      alert("Будь ласка, заповніть усі обов'язкові поля та перевірте кошик.")
      return
    }

    setIsSubmitting(true)

    const orderPayload = {
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      address: `${formData.city}, ${formData.address}`,
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
        localStorage.removeItem('cart')
        setCartItems([])
        window.dispatchEvent(new CustomEvent('cartUpdated'))
        window.dispatchEvent(new CustomEvent('cartCleared'))
        setIsSubmitted(true)
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
      <div className={`${styles.container} ${montserratAlternates.className}`}>
        {' '}
        {/* ← Добавлено */}
        <div className={styles.successPage}>
          <h1 className={`${styles.successTitle} ${montserratAlternates.className}`}>
            Замовлення успішно оформлено!
          </h1>

          <div className={styles.successMessage}>
            <p className={`${styles.mainMessage} ${montserratAlternates.className}`}>
              Дякуємо за ваше замовлення! Ми отримали ваш запит і обробимо його найближчим часом.
            </p>

            <div className={styles.textContent}>
              <div className={`${styles.combinedCard} ${montserratAlternates.className}`}>
                {/* БЛОК ДОСТАВКИ */}
                <div className={styles.sectionHeader}>
                  <DeliveryIcon />
                  <h3 className={`${styles.sectionTitle} ${montserratAlternates.className}`}>
                    Доставка
                  </h3>
                </div>
                <p className={`${styles.deliveryText} ${montserratAlternates.className}`}>
                  Доставка здійснюється <strong>Новою поштою</strong> у будь-яке місто України.
                </p>
                <p className={`${styles.deliveryText} ${montserratAlternates.className}`}>
                  Всі замовлення відправляємо упродовж <strong>2-х днів</strong>, щоб якомога швидше
                  порадувати вас.
                </p>
                <div className={styles.separator}></div>
                {/* БЛОК ОПЛАТЫ */}
                <div className={styles.sectionHeader}>
                  <PaymentIcon />
                  <h3 className={`${styles.sectionTitle} ${montserratAlternates.className}`}>
                    Оплата
                  </h3>
                </div>
                <p className={`${styles.paymentText} ${montserratAlternates.className}`}>
                  Оплата тільки на рахунок IBAN:
                </p>
                <div className={styles.ibanContainer}>
                  <div className={styles.ibanBox}>
                    <span className={`${styles.ibanText} ${montserratAlternates.className}`}>
                      {iban}
                    </span>
                    <CopyButton iban={iban} />
                  </div>
                </div>
              </div>
            </div>

            <div className={`${styles.nextSteps} ${montserratAlternates.className}`}>
              <h3 className={montserratAlternates.className}>Що далі?</h3>
              <ul>
                <li className={montserratAlternates.className}>
                  Наш менеджер зв&apos;яжеться з вами найближчим часом
                </li>
                <li className={montserratAlternates.className}>
                  Ми підтвердимо наявність товарів та деталі доставки
                </li>
                <li className={montserratAlternates.className}>
                  Товари будуть відправлені найближчим часом
                </li>
              </ul>
            </div>

            <div className={`${styles.contactInfo} ${montserratAlternates.className}`}>
              <h3 className={montserratAlternates.className}>Контакти для зв&apos;язку</h3>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>📞</span>
                <span className={montserratAlternates.className}>+380 (99) 905-85-30</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactIcon}>✉️</span>
                <span className={montserratAlternates.className}>applecidervinegar@ukr.net</span>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <Link href="/" className={`${styles.primaryButton} ${montserratAlternates.className}`}>
              Повернутися на головну
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className={`${styles.container} ${montserratAlternates.className}`}>
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
          <h1 className={montserratAlternates.className}>Кошик порожній</h1>
          <p className={montserratAlternates.className}>
            Додайте товари до кошика, щоб оформити замовлення.
          </p>
          <Link href="/" className={`${styles.backToProducts} ${montserratAlternates.className}`}>
            Повернутися на головну
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.container} ${montserratAlternates.className}`}>
      <div className={styles.header}>
        <Link href="/" className={`${styles.backButton} ${montserratAlternates.className}`}>
          ← Назад до головної
        </Link>
        <h1 className={montserratAlternates.className}>Оформлення замовлення</h1>
      </div>

      <div className={styles.checkoutContent}>
        <div className={`${styles.orderSummary} ${montserratAlternates.className}`}>
          <h2 className={montserratAlternates.className}>Ваше замовлення</h2>
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
                  <h3 className={montserratAlternates.className}>{item.title}</h3>
                  <p className={montserratAlternates.className}>{item.price}</p>
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={`${styles.quantityBtn} ${montserratAlternates.className}`}
                    >
                      -
                    </button>
                    <span className={montserratAlternates.className}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={`${styles.quantityBtn} ${montserratAlternates.className}`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className={`${styles.removeBtn} ${montserratAlternates.className}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className={`${styles.totalPrice} ${montserratAlternates.className}`}>
            Загалом: {getTotalPrice()} грн
          </div>
        </div>

        <form
          className={`${styles.orderForm} ${montserratAlternates.className}`}
          onSubmit={handleCheckout}
        >
          <h2 className={montserratAlternates.className}>Контактна інформація</h2>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={montserratAlternates.className}>
                Ім&apos;я *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className={montserratAlternates.className}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={montserratAlternates.className}>
                Прізвище *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className={montserratAlternates.className}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={montserratAlternates.className}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={montserratAlternates.className}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={montserratAlternates.className}>
              Телефон *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className={montserratAlternates.className}
            />
          </div>

          <h2 className={montserratAlternates.className}>Доставка</h2>

          <div className={styles.formGroup}>
            <label className={montserratAlternates.className}>Спосіб доставки</label>
            <div className={styles.radioGroup}>
              <label className={`${styles.radioLabel} ${montserratAlternates.className}`}>
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="nova_poshta"
                  checked={formData.deliveryMethod === 'nova_poshta'}
                  onChange={handleInputChange}
                />
                Нова пошта
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city" className={montserratAlternates.className}>
              Місто *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className={montserratAlternates.className}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="address" className={montserratAlternates.className}>
              Номер відділення *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className={montserratAlternates.className}
            />
          </div>

          <h2 className={montserratAlternates.className}>Оплата</h2>

          <div className={styles.formGroup}>
            <label className={montserratAlternates.className}>Спосіб оплати</label>
            <div className={styles.radioGroup}>
              <label className={`${styles.radioLabel} ${montserratAlternates.className}`}>
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
            <label htmlFor="comment" className={montserratAlternates.className}>
              Коментар до замовлення
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows={3}
              className={montserratAlternates.className}
            />
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} ${montserratAlternates.className}`}
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? 'Оформляємо...' : 'Підтвердити замовлення'}
          </button>
        </form>
      </div>
    </div>
  )
}
