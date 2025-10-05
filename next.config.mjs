// next.config.mjs
import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url' // Импортируем для работы с URL файла

// 1. Получаем путь к текущему файлу (next.config.mjs)
const __filename = fileURLToPath(import.meta.url)

// 2. Определяем директорию этого файла (аналог __dirname)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [
      // Теперь __dirname работает корректно
      path.join(__dirname, 'src', 'scss'),
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3030', // Указываем правильный порт Payload
        pathname: '/**', // !!! ИЗМЕНЕНИЕ: Разрешаем любой путь на этом хосте/порте !!!
      },
      {
        // 2. Домен Vercel (для продакшна)
        protocol: 'https', // Используем HTTPS для Vercel
        hostname: 'my-store-bice-xi.vercel.app', // Ваш публичный домен
        // Порт не нужен, т.к. используется стандартный HTTPS (443)
        pathname: '/**',
      },
    ],
  },

  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
