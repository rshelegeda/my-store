import Image from "next/image";
import styles from "./Gallery.module.css";
import {sofiaSans} from "@/app/(frontend)/fonts";
interface GalleryProps {
    images: { id: number, src: string, alt: string }[];
}

export default function Gallery({ images }: GalleryProps) {
    return (
        <section className={styles.gallerySection}>
            <div className="pageTitle">
                <p className="subtitle">Наша галерея</p>
                <h1 className={sofiaSans.className}>
                    Від саду до столу
                </h1>
            </div>

            <div className={styles.galleryGridContainer}>
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className={`${styles.imageWrapper} ${
                            (index === 0 || index === 2) ? styles.tallImage : ''
                        }`}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            className={styles.img}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
