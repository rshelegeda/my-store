import Image from "next/image";
import styles from "./PaymentDelivery.module.css";
import CopyButton from "@/app/(frontend)/components/paymentDelivery/CopyButton";

const DeliveryIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
);

const PaymentIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
    </svg>
);

const TruckIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 7H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h1v-2h-1v-4l3-4zM6 17c-.83 0-1.5-.67-1.5-1.5S5.17 14 6 14s1.5.67 1.5 1.5S6.83 17 6 17zm13.5-7l-1.96 2.5H18V10h1.5zM18 17c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
);


export default function PaymentDelivery() {
    const iban = "UA933052990000026001026105561";

    return (
        <section className={styles.about}>
            <div className={styles.rightSection}>
                <Image
                    src="/about-us-2.jpg"
                    alt="Наш маєток"
                    fill
                    sizes="50vw"
                    className={styles.image}
                    priority
                />
                <div className={styles.imageOverlay}></div>
            </div>

            <div className={styles.leftSection}>
                <div className={styles.textContent}>
                    <div className={styles.header}>
                        <div className={styles.iconWrapper}>
                            <DeliveryIcon />
                        </div>
                        <h2 className={styles.title}>Доставка та Оплата</h2>
                        <div className={styles.titleUnderline}></div>
                    </div>

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
                            Всі замовлення відправляємо упродовж <strong>2-х днів</strong>, щоб якомога швидше порадувати вас.
                        </p>

                        <div className={styles.separator}></div> {/* Разделитель */}

                        {/* БЛОК ОПЛАТЫ */}
                        <div className={styles.sectionHeader}>
                            <PaymentIcon />
                            <h3 className={styles.sectionTitle}>Оплата</h3>
                        </div>
                        <p className={styles.paymentText}>
                            Оплата тільки на рахунок IBAN:
                        </p>
                        <div className={styles.ibanContainer}>
                            <div className={styles.ibanBox}>
                                <span className={styles.ibanText}>{iban}</span>
                                <CopyButton iban={iban} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
