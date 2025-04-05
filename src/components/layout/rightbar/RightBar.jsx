import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { BsSearch } from 'react-icons/bs';
import { IoMdSettings } from 'react-icons/io';
import { RiNotification3Line } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import { BiHash } from 'react-icons/bi';
import { BsBookmark } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { IoEllipsisHorizontalCircleOutline } from 'react-icons/io5';
import styles from './RightBar.module.css';

const RightBar = () => {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Trending topics data
  const trendingTopics = [
    { category: 'Trending in Technology', topic: 'React', tweets: '125K' },
    { category: 'Trending in Web Development', topic: 'Next.js', tweets: '45.2K' },
    { category: 'Trending in Programming', topic: 'JavaScript', tweets: '89.7K' },
    { category: 'Trending in Design', topic: 'UI/UX', tweets: '32.1K' },
  ];
  
  // Who to follow data
  const whoToFollow = [
    { name: 'Elon Musk', handle: '@elonmusk', avatar: 'https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg' },
    { name: 'Mark Zuckerberg', handle: '@finkd', avatar: 'https://pbs.twimg.com/profile_images/1674815862879176704/8v1JgqXk_400x400.jpg' },
    { name: 'Bill Gates', handle: '@BillGates', avatar: 'https://pbs.twimg.com/profile_images/1674815862879176704/8v1JgqXk_400x400.jpg' },
  ];
  
  return (
    <div className={styles.rightBar}>
      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <BsSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search" 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Premium Section */}
      <div className={styles.premiumSection}>
        <h2 className={styles.premiumTitle}>Subscribe to Premium</h2>
        <p className={styles.premiumText}>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
        <button className={styles.premiumButton}>Subscribe</button>
      </div>
      
      {/* Trending Section */}
      <div className={styles.trendingSection}>
        <h2 className={styles.sectionTitle}>Trends for you</h2>
        {trendingTopics.map((item, index) => (
          <div key={index} className={styles.trendingItem}>
            <div className={styles.trendingCategory}>{item.category}</div>
            <div className={styles.trendingTopic}>{item.topic}</div>
            <div className={styles.trendingTweets}>{item.tweets} Tweets</div>
          </div>
        ))}
        <button className={styles.showMoreButton}>Show more</button>
      </div>
      
      {/* Who to follow Section */}
      <div className={styles.whoToFollowSection}>
        <h2 className={styles.sectionTitle}>Who to follow</h2>
        {whoToFollow.map((user, index) => (
          <div key={index} className={styles.followItem}>
            <div className={styles.followAvatar}>
              <img src={user.avatar} alt={user.name} />
            </div>
            <div className={styles.followInfo}>
              <div className={styles.followName}>{user.name}</div>
              <div className={styles.followHandle}>{user.handle}</div>
            </div>
            <button className={styles.followButton}>Follow</button>
          </div>
        ))}
        <button className={styles.showMoreButton}>Show more</button>
      </div>
      
      {/* Footer Links */}
      <div className={styles.footerLinks}>
        <div className={styles.footerRow}>
          <a href="#" className={styles.footerLink}>Terms of Service</a>
          <a href="#" className={styles.footerLink}>Privacy Policy</a>
          <a href="#" className={styles.footerLink}>Cookie Policy</a>
        </div>
        <div className={styles.footerRow}>
          <a href="#" className={styles.footerLink}>Accessibility</a>
          <a href="#" className={styles.footerLink}>Ads info</a>
          <a href="#" className={styles.footerLink}>More</a>
          <button className={styles.footerMoreButton}>
            <IoEllipsisHorizontalCircleOutline />
          </button>
        </div>
        <div className={styles.copyright}>© 2023 X Corp.</div>
      </div>
    </div>
  );
};

export default RightBar;
