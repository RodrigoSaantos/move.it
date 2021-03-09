import Link from 'next/link';
import { useState } from 'react';

import styles from '../styles/components/SideBar.module.css';

export default function SideBar() {

  const [buttonHome, setButtonHome] = useState(true);
  const [buttonAward, setButtonAward] = useState(false);

  function handleButtonHome() {
    setButtonHome(true);
    setButtonAward(false);
  }

  function handleButtonAward() {
    setButtonHome(false);
    setButtonAward(true);
  }
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