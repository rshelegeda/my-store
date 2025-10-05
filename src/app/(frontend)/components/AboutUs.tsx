import Image from "next/image";
import styles from "./AboutUs.module.css";

export default function AboutUs() {
    return (
        <section className={styles.about}>
            <div className={styles.leftSection}>
                <div className={styles.textContent}>
                    <h2 className={styles.title}>Про нас</h2>
                    <p className={styles.subtitle}>
                        Дорогі друзі! Вітаю Вас на цьому ресурсі, який презентує продукцію
                        нашої родини, створену у сімейному маєтку на Київщині.
                    </p>
                    <div className={styles.description}>
                        <p>
                            Наш маєток виник майже 20 років тому на землях колишнього яблучного
                            саду. Тут і досі ростуть старі сорти яблунь — Донешта, Антоновка та
                            Білий налив.
                        </p>
                        <p>
                            Наша найбільша гордість — <strong>домашній яблучний оцет</strong>,
                            виготовлений лише з власного врожаю яблук і чистої колодязної води.
                        </p>
                        <p>
                            Також ми готуємо <strong>соснове варення</strong> та
                            <strong> корисні трав'яні чаї</strong> з ягід і лікарських трав.
                        </p>
                    </div>
                    <p className={styles.signature}>Ваша Дар'я 🌿</p>
                </div>
            </div>

            <div className={styles.rightSection}>
                <Image
                    src="/about-us-2.jpg"
                    alt="Наш маєток"
                    fill
                    className={styles.image}
                />
            </div>
        </section>
    );
}
