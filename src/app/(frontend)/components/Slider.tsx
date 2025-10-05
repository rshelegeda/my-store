"use client";

import React from 'react';
import styles from './Slider.module.css';

const Slider: React.FC = () => {
    return (
        <div className={styles.sliderWrapper}>
            <div className={styles.sliderContainer}>
                <section className={styles.slidesSection}>
                    <div className={styles.slide}>
                        <div className={styles.slideContentArea}>
                            <figure className={styles.slideFigure}>
                                <div
                                    className={styles.slideImageDiv}
                                    style={{
                                        backgroundImage: 'url(/about-us-2.jpg)',
                                        height: '100%'
                                    }}
                                ></div>
                            </figure>

                            <header className={styles.slideHeader}>
                                <div className={styles.titleWrapper}>
                                    <h2 className={styles.slideTitle}>
                                        <span className={styles.titleLine}>
                                            <span className={styles.titleLineSpan}>
                                                Смак традицій
                                            </span>
                                        </span>
                                        <span className={styles.titleLine}>
                                            <span className={styles.titleLineSpan}>
                                                Яблучний Оцет
                                            </span>
                                        </span>
                                    </h2>
                                </div>
                            </header>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Slider;
