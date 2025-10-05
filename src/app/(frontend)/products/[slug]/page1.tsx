import Image from "next/image";
import Link from "next/link";
import { sofiaSans } from "@/app/fonts";
import styles from "./ProductPage.module.css";

interface ProductPageProps {
    params: {
        id: string;
    };
}

const products = [
    {
        id: 0,
        title: "Імбирний оцет",
        subtitle: "Ginger Vinegar",
        image: "/vinegar_with_ginger.png",
        leaves: "/apple-front-opti.png",
        description: "Натуральний яблучний оцет з додаванням свіжого імбиру. Цей унікальний продукт поєднує в собі користь яблук та цілющі властивості імбиру. Ідеально підходить для салатів, маринатів та як додаток до різних страв.",
        price: "150 грн",
        blockColor: "#f8a616"
    },
    {
        id: 1,
        title: "Яблучний оцет",
        subtitle: "Apple Vinegar",
        image: "/vinegar_with_ginger.png",
        leaves: "/apple-front-opti.png",
        description: "Класичний яблучний оцет, виготовлений з найкращих сортів яблук. Багатий на пектин, вітаміни та мінерали. Сприяє покращенню травлення та зміцненню імунітету.",
        price: "120 грн",
        blockColor: "#4CAF50"
    },
    {
        id: 2,
        title: "Медовий оцет",
        subtitle: "Honey Vinegar",
        image: "/vinegar_with_ginger.png",
        leaves: "/apple-front-opti.png",
        description: "Ніжний оцет з додаванням натурального меду. Має солодкуватий смак та аромат. Ідеально підходить для заправки салатів та приготування соусів.",
        price: "180 грн",
        blockColor: "#FF9800"
    },
    {
        id: 3,
        title: "Часниковий оцет",
        subtitle: "Garlic Vinegar",
        image: "/vinegar_with_ginger.png",
        leaves: "/apple-front-opti.png",
        description: "Пікантний оцет з додаванням свіжого часнику. Має характерний аромат та смак. Відмінно підходить для маринатів та приготування гострих соусів.",
        price: "160 грн",
        blockColor: "#9C27B0"
    },
    {
        id: 4,
        title: "Трав'яний оцет",
        subtitle: "Herbal Vinegar",
        image: "/vinegar_with_ginger.png",
        leaves: "/apple-front-opti.png",
        description: "Оцет з додаванням різних лікарських трав. Багатий на корисні речовини та має унікальний аромат. Сприяє покращенню загального стану організму.",
        price: "140 грн",
        blockColor: "#2196F3"
    }
];

export default function ProductPage({ params }: ProductPageProps) {
    const productId = parseInt(params.id);
    const product = products[productId];

    if (!product) {
        return (
            <div className={styles.container}>
                <div className={styles.notFound}>
                    <h1>Товар не знайдено</h1>
                    <Link href="/" className={styles.backButton}>
                        ← Назад до головної
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.backButton}>
                ← Назад до головної
            </Link>

            <div className={styles.productContainer}>
                <div className={styles.imageSection}>
                    <div className={styles.productBlock}>
                        <Image
                            src={product.leaves}
                            alt="Листва"
                            width={260}
                            height={260}
                            className={styles.leaves}
                        />

                        <Image
                            src={product.image}
                            alt={product.title}
                            width={180}
                            height={360}
                            className={styles.bottle}
                        />

                        <div
                            className={styles.infoBox}
                            style={{ backgroundColor: product.blockColor }}
                        >
                            <h2>{product.title}</h2>
                            <p>{product.price}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <h1 className={`${styles.title} ${sofiaSans.className}`}>
                        {product.title}
                    </h1>
                    <p className={styles.subtitle}>{product.subtitle}</p>

                    <div className={styles.price}>{product.price}</div>

                    <div className={styles.description}>
                        <h3>Опис</h3>
                        <p>{product.description}</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className={styles.buyButton}>
                            Додати до кошика
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
