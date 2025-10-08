// next.config.mjs
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Для Хостинга
      // {
      //   protocol: 'http',
      //   hostname: '207.154.243.12', // Используем публичный IP
      //   port: '', // ОЧЕНЬ ВАЖНО: Убираем порт, т.к. Nginx работает на порту 80
      //   pathname: '/**',
      // },

      //Для локального запуска
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port: '3030', // Указываем правильный порт Payload
      //   pathname: '/**', // !!! ИЗМЕНЕНИЕ: Разрешаем любой путь на этом хосте/порте !!!
      // },
      { protocol: 'https', hostname: 'applecidervinegar.com.ua' },
      { protocol: 'https', hostname: 'www.applecidervinegar.com.ua' },
      // !!! ВАЖНО: Добавьте IP-адрес, но только для HTTPS (если он еще нужен)
      { protocol: 'https', hostname: '207.154.243.12' },
      // Если вы не можете найти, почему он использует HTTP, добавьте его временно для отладки,
      // НО В идеале нужно использовать HTTPS:
      { protocol: 'http', hostname: '207.154.243.12' },
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
