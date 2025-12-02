import Image from 'next/image'
import styles from './AboutUs.module.css'
import { montserratAlternates } from '../fonts'

export default function AboutUs() {
  return (
    <section className={`${styles.about} ${montserratAlternates.className}`}>
      <div className={styles.leftSection}>
        <div className={styles.textContent}>
          <h2 className={`${styles.title} ${montserratAlternates.className}`}>Про нас</h2>

          <div className={styles.description}>
            <p className={montserratAlternates.className}>
              Друзі, вітаю Вас на цьому інтернет-ресурсі, який презентує продукцію, вироблену моєю
              родиною у нашому сімейному маєтку!
            </p>

            <p className={montserratAlternates.className}>
              Наш маєток розташований на території невеличкого екопоселення на Київщині, у чарівному
              місці, яке наша родина створила понад 20 років тому. На землях колишнього яблучного
              саду, де і до сьогодні збереглися славетні яблуні сортів{' '}
              <strong className={montserratAlternates.className}>
                Донешта, Антонівка та Білий налив
              </strong>
              , ми власноруч створили справжній лісосад. І сьогодні це – затишний, чарівний оазис з
              унікальним мікрокліматом і неперевершеним ароматом.
            </p>

            <p className={montserratAlternates.className}>
              Справжня гордість нашої родини –{' '}
              <strong className={montserratAlternates.className}>ДОМАШНІЙ ЯБЛУЧНИЙ ОЦЕТ</strong> –
              виготовляється виключно з врожаю наших яблунь, яким понад 60 років! Технологія
              народження нашого{' '}
              <strong className={montserratAlternates.className}>
                НАТУРАЛЬНОГО ЯБЛУЧНОГО ОЦТУ
              </strong>{' '}
              стала справжнім надбанням нашої родини!
            </p>

            <p className={montserratAlternates.className}>
              Чудовий сосновий ліс, що оберігає наші яблуні, дарує нам Сосновий пилок і шишки, з
              яких ми варимо для Вас цілющий Сосновий сироп. А завдяки численним ягодам і
              лікувальним травам, створюються насправді корисні та цілющі Трав&apos;яні чаї!
            </p>

            <p className={montserratAlternates.className}>
              <strong className={montserratAlternates.className}>
                Купити натуральний яблучний оцет, сосновий пилок, чай із листя яблуні
              </strong>{' '}
              та інші корисні продукти ви можете на цьому сайті.
            </p>

            <p className={montserratAlternates.className}>
              Моя родина дуже любить наш маєток, наші рослини і їхні плоди. Саме тому уся наша
              продукція створена з{' '}
              <strong className={montserratAlternates.className}>Любов&apos;ю!</strong>
            </p>
          </div>

          <p className={`${styles.signature} ${montserratAlternates.className}`}>
            Ваша Дар&apos;я Авдєєва 🌿
          </p>
        </div>

        {/* --- Додано блок для сертифікатів --- */}
        <div className={styles.certificates}>
          <div className={styles.certificateWrapper}>
            <Image
              src="/certificate1.jpg"
              alt="Сертифікат 1"
              width={140}
              height={190}
              className={styles.certificateImage}
            />
          </div>
          <div className={styles.certificateWrapper}>
            <Image
              src="/certificate2.jpg"
              alt="Сертифікат 2"
              width={140}
              height={190}
              className={styles.certificateImage}
            />
          </div>
        </div>
        {/* ------------------------------------- */}
      </div>

      <div className={styles.rightSection}>
        <Image src="/4651048.jpg" alt="Наш маєток" fill className={styles.image} />
      </div>
    </section>
  )
}
