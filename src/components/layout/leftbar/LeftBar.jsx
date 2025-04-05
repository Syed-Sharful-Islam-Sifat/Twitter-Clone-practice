import { BsHouseFill, BsHouse } from 'react-icons/bs'
import { FaUser, FaRegUser } from 'react-icons/fa'
import { AiOutlineInbox, AiFillInbox } from 'react-icons/ai'
import { RiNotification2Fill, RiNotification2Line } from 'react-icons/ri'
import { AiOutlineSearch, AiFillSearch } from 'react-icons/ai'
import { BiHash } from 'react-icons/bi'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { IoEllipsisHorizontalCircleOutline } from 'react-icons/io5'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import styles from './LeftBar.module.css'

const items = [
  {
    label: 'Home',
    href: '/',
    icon: BsHouse,
    activeIcon: BsHouseFill
  },
  {
    label: 'Explore',
    href: '/explore',
    icon: BiHash,
    activeIcon: BiHash
  },
  {
    label: 'Notifications',
    href: '/notifications',
    icon: RiNotification2Line,
    activeIcon: RiNotification2Fill
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: AiOutlineInbox,
    activeIcon: AiFillInbox
  },
  {
    label: 'Bookmarks',
    href: '/bookmarks',
    icon: BsBookmark,
    activeIcon: BsBookmarkFill
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: FaRegUser,
    activeIcon: FaUser
  }
]

export default function LeftBar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  
  return (
    <div className={styles.leftBar}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.twitterLogo}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
        </Link>
      </div>
      
      <nav className={styles.navigation}>
        {items.map((item) => {
          const isActive = pathname === item.href
          const Icon = isActive ? item.activeIcon : item.icon
          
          return (
            <Link 
              key={item.label} 
              href={item.href} 
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <div className={styles.navIconContainer}>
                <Icon className={styles.navIcon} />
              </div>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          )
        })}
        
        <button className={styles.moreButton}>
          <div className={styles.navIconContainer}>
            <IoEllipsisHorizontalCircleOutline className={styles.navIcon} />
          </div>
          <span className={styles.navLabel}>More</span>
        </button>
      </nav>
      
      {session ? (
        <button className={styles.postButton}>
          Post
        </button>
      ) : (
        <Link href="/auth/login" className={styles.loginButton}>
          Log in
        </Link>
      )}
    </div>
  )
}
