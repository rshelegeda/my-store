"use client";

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import styles from './Header.module.css';

interface IconProps {
    color?: string;
}

const CartIcon: React.FC<IconProps> = ({color = 'currentColor'}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.cartIcon}
    >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
);

interface BurgerIconProps {
    isOpen: boolean;
    color?: string;
}

const BurgerIcon: React.FC<BurgerIconProps> = ({isOpen, color = '#006e41'}) => (
    <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.burgerSvg}
    >
        <line
            x1="3"
            y1="6"
            x2="21"
            y2="6"
            style={{
                transformOrigin: 'center',
                transform: isOpen ? 'rotate(45deg) translate(0, 6px)' : 'none',
                transition: 'transform 0.3s ease',
            }}
        />
        <line
            x1="3"
            y1="12"
            x2="21"
            y2="12"
            style={{
                opacity: isOpen ? 0 : 1,
                transition: 'opacity 0.2s ease',
            }}
        />
        <line
            x1="3"
            y1="18"
            x2="21"
            y2="18"
            style={{
                transformOrigin: 'center',
                transform: isOpen ? 'rotate(-45deg) translate(0, -6px)' : 'none',
                transition: 'transform 0.3s ease',
            }}
        />
    </svg>
);

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        {title: 'Про нас', href: '/about'},
        {title: 'Наша продукція', href: '/products'},
        {title: 'Доставка та оплата', href: '/delivery-payment'},
        {title: 'Контакти', href: '/contact'},
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            }

            if (currentScrollY !== lastScrollY) {
                setIsMenuOpen(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    return (
        <header className={`${styles.header} ${!isVisible ? styles.headerHidden : ''}`}>
            <div className={styles.headerContent}>

                <Link href="/" className={styles.logoLink} onClick={() => setIsMenuOpen(false)}>
                    <Image
                        src="/logo.png"
                        alt="Логотип компанії"
                        width={60}
                        height={60}
                        className={styles.logoImage}
                        priority
                    />
                </Link>

                <div className={styles.rightSection}>

                    <nav className={styles.navigation}>
                        <ul className={styles.navList}>
                            {navLinks.map((link) => (
                                <li key={link.title} className={styles.navItem}>
                                    <Link href={link.href} className={styles.navLink}>
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <button className={styles.ctaButton}>
                        <CartIcon/>
                        <span className={styles.ctaText}>Кошик</span>
                    </button>

                    <button
                        className={styles.burgerButton}
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                    >
                        <BurgerIcon isOpen={isMenuOpen}/>
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <nav className={styles.mobileNavigation} id="mobile-navigation">
                    <ul className={styles.mobileNavList}>
                        {navLinks.map((link) => (
                            <li key={link.title} className={styles.mobileNavItem}>
                                <Link
                                    href={link.href}
                                    className={styles.mobileNavLink}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}
