import Image from 'next/image'
import styles from './Information.module.css'
import { montserratAlternates } from '../fonts'

export default function Information() {
  return (
    <section className={`${styles.about} ${montserratAlternates.className}`}>
      <div className={styles.leftSection}>
        <div className={styles.textContent}>
          <h2 className={`${styles.title} ${montserratAlternates.className}`}>
            Корисна інформація про
          </h2>

          <h2 className={`${styles.title} ${montserratAlternates.className}`}>
            Натуральний яблучний оцет
          </h2>

          <div className={`${styles.description} ${montserratAlternates.className}`}>
            <h3 className={montserratAlternates.className}>Натуральний яблучний оцет</h3>
            <p className={montserratAlternates.className}>
              <strong className={montserratAlternates.className}>«Живий» яблучний оцет</strong> – це
              натуральний, нефільтрований та непастеризований продукт природного бродіння, який
              містить корисні бактерії та ферменти. Його отримують шляхом подвійного бродіння
              яблучного соку, що дає можливість зберегти більше корисних речовин, ніж фільтрований.
              Такий оцет має каламутний бурштиновий колір (темніше або світліше) і може містити осад
              або плівку, які є природними та корисними. Саме такий{' '}
              <strong className={montserratAlternates.className}>
                натуральний яблучний крафтовий оцет
              </strong>{' '}
              Ви можете <strong className={montserratAlternates.className}>купити</strong> в нашій
              оцетарні.
            </p>

            <h2 className={`${styles.description} ${montserratAlternates.className}`}>
              Результати досліджень натурального яблучного оцту
            </h2>

            <p className={montserratAlternates.className}>
              Дослідження <strong className={montserratAlternates.className}>яблучного оцту</strong>{' '}
              показують, що він може сприяти контролю рівня цукру в крові, зниженню ваги та
              покращенню травлення за рахунок оцтової кислоти, яка пригнічує апетит та покращує
              засвоєння поживних речовин. Також існують дані про позитивний вплив на серцево-судинну
              систему та антибактеріальні властивості, але деякі результати вимагають додаткового
              підтвердження масштабними дослідженнями.
            </p>

            <h3 className={`${styles.description} ${montserratAlternates.className}`}>
              Користні властивості натурального яблучного оцту
            </h3>

            <p className={montserratAlternates.className}>
              Контроль ваги. Деякі дослідження показують, що{' '}
              <strong className={montserratAlternates.className}>яблучний оцет</strong> може
              знижувати апетит та сприяти втраті жиру, але ефект може бути незначним у
              довгостроковій перспективі без зміни дієти. Покращення травлення. Оцтова кислота
              стимулює вироблення шлункового соку та сприяє розщепленню жирів та білків, що може
              зменшити здуття та тяжкість після їжі. Здоров&apos;я серця. Дослідження на тваринах
              показують, що оцтова кислота може знижувати рівень тригліцеридів та загального
              холестерину, а також позитивно впливати на серцево-судинну систему.
            </p>

            <p className={montserratAlternates.className}>
              Антиоксидантні властивості. Завдяки вмісту антиоксидантів{' '}
              <strong className={montserratAlternates.className}>яблучний оцет</strong> допомагає
              боротися з вільними радикалами і може знижувати пошкодження клітин печінки.
            </p>

            <h3 className={`${styles.description} ${montserratAlternates.className}`}>
              Деякі застереження
            </h3>

            <p className={montserratAlternates.className}>
              Не зважаючи на усі вищенаведені властивості{' '}
              <strong className={montserratAlternates.className}>яблучного оцту</strong>, зауважимо,
              що деякі позитивні ефекти вимагають наукового підтвердження на великих вибірках людей,
              оскільки більшість досліджень проводилася на тваринах чи на дуже маленьких групах
              добровольців.
            </p>

            <p className={montserratAlternates.className}>
              Потенційні ризики. Вживання{' '}
              <strong className={montserratAlternates.className}>яблучного оцту</strong> може
              спричинити побічні ефекти, такі як подразнення стравоходу або ерозія зубної емалі.
              Також не рекомендується приймати його при виразці, грижі та гастропарезі, оскільки він
              уповільнює спорожнення шлунку. Перед вживанням оцет обов&apos;язково слід розбавляти
              водою.
            </p>

            <p className={montserratAlternates.className}>
              Важливо пам&apos;ятати, що{' '}
              <strong className={montserratAlternates.className}>Яблучний оцет</strong> не є ліками!{' '}
              <strong className={montserratAlternates.className}>Яблучний оцет</strong> не слід
              використовувати, як заміну на традиційні ліки для лікування серйозних захворювань.
              Завжди консультуйтеся з лікарем перед початком прийому{' '}
              <strong className={montserratAlternates.className}>Яблучного оцту</strong>!
            </p>
          </div>

          <p className={`${styles.signature} ${montserratAlternates.className}`}>
            Ваша Дар&apos;я Авдєєва 🌿
          </p>
        </div>
      </div>

      <div className={styles.rightSection}>
        <Image src="/about-us-2.jpg" alt="Наш маєток" fill className={styles.image} />
      </div>
    </section>
  )
}
