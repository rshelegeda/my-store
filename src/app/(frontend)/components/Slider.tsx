'use client'

import React from 'react'
import styles from './Slider.module.css'

const BACKGROUND_VIDEO_PATH = '/homepage_video.mp4'
const POSTER_IMAGE_PATH = '/about-us-2.jpg'

const Slider: React.FC = () => {
  return (
    <div className={styles.videoWrapper}>
      <div className={styles.videoSection}>
        <video
          className={styles.mainVideo}
          autoPlay
          loop
          muted
          playsInline
          poster={POSTER_IMAGE_PATH}
        >
          <source src={BACKGROUND_VIDEO_PATH} type="video/mp4" />
          Ваш браузер не поддерживает видео в формате MP4.
        </video>

        <div className={styles.contentOverlay}>
          <div className={styles.textBackground}>
            <h1 className={styles.mainText}>
              НАТУРАЛЬНИЙ ЯБЛУЧНИЙ ОЦЕТ
              <br />
              ТА ІНША КОРИСНА ПРОДУКЦІЯ
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider
