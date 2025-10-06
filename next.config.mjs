// next.config.mjs
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '207.154.243.12', // Используем публичный IP
        port: '', // ОЧЕНЬ ВАЖНО: Убираем порт, т.к. Nginx работает на порту 80
        pathname: '/**',
      },
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port: '3030', // Указываем правильный порт Payload
      //   pathname: '/**', // !!! ИЗМЕНЕНИЕ: Разрешаем любой путь на этом хосте/порте !!!
      // },
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
