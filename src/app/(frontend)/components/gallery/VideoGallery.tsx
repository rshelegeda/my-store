'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './VideoGallery.module.css'

interface VideoItem {
  id: number
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  duration: string
}

interface VideoGalleryProps {
  videos: VideoItem[]
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // ВИДАЛЕНО: useEffect для автозапуску всіх відео при завантаженні

  const openVideo = (video: VideoItem) => {
    setSelectedVideo(video)
    setIsModalOpen(true)

    // Призупиняємо всі фонові відео, коли відкривається модальне вікно
    videoRefs.current.forEach((videoElement) => {
      if (videoElement) {
        videoElement.pause()
      }
    })
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedVideo(null)

    // Не відновлюємо відтворення тут, оскільки воно запускається лише по hover
    // Якщо курсор миші все ще знаходиться над карткою, відео відновиться самостійно
  }

  const handleVideoClick = (video: VideoItem, index: number) => {
    // Зупиняємо відтворення відео-прев'ю перед відкриттям модального вікна
    const videoElement = videoRefs.current[index]
    if (videoElement) {
      videoElement.pause()
    }
    openVideo(video)
  }

  const handleMouseEnter = (index: number) => {
    const videoElement = videoRefs.current[index]
    if (videoElement) {
      videoElement.play().catch(() => {})
    }
  }

  const handleMouseLeave = (index: number) => {
    const videoElement = videoRefs.current[index]
    if (videoElement) {
      videoElement.pause()
      // Скидаємо відео на початок для наступного наведення
      videoElement.currentTime = 0
    }
  }

  const setVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
    videoRefs.current[index] = el
  }

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.galleryHeader}>
        <h2 className={styles.galleryTitle}>Відео галерея</h2>
        {/* <p className={styles.gallerySubtitle}>
                  Подивіться, як ми створюємо наші унікальні продукти
              </p> */}
      </div>

      <div className={styles.videoGrid}>
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={styles.videoCard}
            onMouseEnter={() => handleMouseEnter(index)} // <--- НОВА ЛОГІКА
            onMouseLeave={() => handleMouseLeave(index)} // <--- НОВА ЛОГІКА
          >
            <div className={styles.videoContainer} onClick={() => handleVideoClick(video, index)}>
              <video
                ref={setVideoRef(index)}
                className={styles.videoElement}
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={video.videoUrl} type="video/mp4" />
                Ваш браузер не підтримує відео.
              </video>
              <div className={styles.videoOverlay}>
                <div className={styles.playButton}>
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <polygon
                      points="5,3 19,12 5,21"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></polygon>
                  </svg>
                </div>
                <div className={styles.soundIcon}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"></polygon>
                    <line x1="15" y1="9" x2="21" y2="15"></line>
                    <line x1="21" y1="9" x2="15" y2="15"></line>
                  </svg>
                </div>
              </div>
            </div>
            <div className={styles.videoInfo}>
              <h3 className={styles.videoTitle}>{video.title}</h3>
              <p className={styles.videoDescription}>{video.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedVideo && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <div className={styles.fullVideoContainer}>
              <video className={styles.fullVideo} controls autoPlay muted={false} loop playsInline>
                <source src={selectedVideo.videoUrl} type="video/mp4" />
                Ваш браузер не підтримує відео.
              </video>
            </div>
            <div className={styles.videoDetails}>
              <h3>{selectedVideo.title}</h3>
              <p>{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
