import Link from 'next/link';
import { useContext, useState } from 'react';
import { SideBarContext } from '../contexts/SideBarContext';

import styles from '../styles/components/SideBar.module.css';

export default function SideBar() {

  const { buttonHome, buttonAward, handleButtonAward, handleButtonHome } = useContext(SideBarContext);

  return (
    <aside className={styles.container}>
      <Link href="">
        <a>
          <img src="/icons/logo-dashboard.svg" alt="Logo"/>
        </a>
      </Link>

      <div className={styles.menu}>
        <button 
          type="button" 
          onClick={handleButtonHome}
          className={buttonHome ? styles.active : ''}
        >
          { buttonHome ?
          <img src="/icons/home.svg" alt="Home"/>
          : 
          <img src="/icons/home-off.svg" alt="Home"/>
        }
        </button>
        <button 
          type="button" 
          onClick={handleButtonAward}
          className={buttonAward ? styles.active : ''}
        >
          { buttonAward ? 
          <img src="/icons/award.svg" alt="Rank"/>
          : 
          <img src="/icons/award-off.svg" alt="Rank"/>
          
        }
        </button>

      </div>

    </aside>
  )
}