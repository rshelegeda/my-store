import { Sofia_Sans } from 'next/font/google'
import { Montserrat_Alternates } from 'next/font/google'

export const sofiaSans = Sofia_Sans({
  weight: '900',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

export const montserratAlternates = Montserrat_Alternates({
  weight: ['500','600', '700', '900'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})
