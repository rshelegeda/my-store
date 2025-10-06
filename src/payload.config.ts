// payload.config.ts

// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Проверка в начале файла, чтобы гарантировать наличие переменных
if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET is missing!')
}
if (!process.env.DATABASE_URI) {
  throw new Error('DATABASE_URI is missing!')
}

export default buildConfig({
  admin: {
    user: Users.slug,

    importMap: {
      baseDir: path.resolve(dirname),
    },

    labels: {
      collections: 'Розділи', // <-- Новое название для "Collections"
    },
  } as any,

  collections: [Users, Media, Products],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],

  //Добавил это для ДИДЖИТАЛ ОКЕАН

  serverURL: process.env.PAYLOAD_BASE_URL, // http://207.154.243.12
  // ...
  // Убедитесь, что эта секция выглядит так:
  // <-- ДОБАВЛЕНО УТВЕРЖДЕНИЕ ТИПА
  cors: [
    process.env.PAYLOAD_BASE_URL, // Разрешает публичный адрес
    'http://localhost:3030', // Разрешает внутренний адрес
    'http://127.0.0.1:3030', // Локальный адрес для Nginx
  ].filter(Boolean) as string[],
})
