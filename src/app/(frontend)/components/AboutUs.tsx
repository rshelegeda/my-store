import Image from 'next/image'
import styles from './AboutUs.module.css'

export default function AboutUs() {
  return (
    <section className={styles.about}>
      <div className={styles.leftSection}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Про нас</h2>

          <div className={styles.description}>
            <p>
              Друзі, вітаю Вас на цьому інтернет-ресурсі, який презентує продукцію, вироблену моєю
              родиною у нашому сімейному маєтку!
            </p>

            <p>
              Наш маєток розташований на території невеличкого екопоселення на Київщині, у чарівному
              місці, яке наша родина створила понад 20 років тому. На землях колишнього яблучного
              саду, де і до сьогодні збереглися славетні яблуні сортів{' '}
              <strong>Донешта, Антонівка та Білий налив</strong>, ми власноруч створили справжній
              лісосад. І сьогодні це – затишний, чарівний оазис з унікальним мікрокліматом і
              неперевершеним ароматом.
            </p>

            <p>
              Справжня гордість нашої родини – <strong>ДОМАШНІЙ ЯБЛУЧНИЙ ОЦЕТ</strong> –
              виготовляється виключно з врожаю наших яблунь, яким понад 60 років! Технологія
              народження нашого <strong>НАТУРАЛЬНОГО ЯБЛУЧНОГО ОЦТУ</strong> стала справжнім
              надбанням нашої родини!
            </p>

            <p>
              Чудовий сосновий ліс, що оберігає наші яблуні, дарує нам Сосновий пилок і шишки, з
              яких ми варимо для Вас цілющий Сосновий сироп. А завдяки численним ягодам і
              лікувальним травам, створюються насправді корисні та цілющі Трав’яні чаї!
            </p>

            <p>
              Моя родина дуже любить наш маєток, наші рослини і їхні плоди. Саме тому уся наша
              продукція створена з <strong>Любов’ю!</strong>
            </p>
          </div>
          <p className={styles.signature}>Ваша Дар&apos;я Авдєєва 🌿</p>
        </div>

        {/* --- Додано блок для сертифікатів --- */}
        <div className={styles.certificates}>
          <div className={styles.certificateWrapper}>
            <Image
              src="/certificate1.jpg" // Замініть на шлях до першого сертифіката
              alt="Сертифікат 1"
              width={140} // Встановлюємо невелику ширину
              height={190} // Встановлюємо невелику висоту
              className={styles.certificateImage}
            />
          </div>
          <div className={styles.certificateWrapper}>
            <Image
              src="/certificate2.jpg" // Замініть на шлях до другого сертифіката
              alt="Сертифікат 2"
              width={140} // Встановлюємо невелику ширину
              height={190} // Встановлюємо невелику висоту
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
