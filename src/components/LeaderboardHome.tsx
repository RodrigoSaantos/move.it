import { useContext } from 'react';
import { SideBarContext } from '../contexts/SideBarContext';
import styles from '../styles/components/LeaderboardCard.module.css';

import { LeaderboardCard } from './LeaderboardCard';

export default function LeaderboardHome() {
  const { buttonAward } = useContext(SideBarContext);

  return (
    <>
      {buttonAward &&
      <div className={styles.leaderboard}>
        <strong>Leaderboard</strong>

        <section>
          <div>
            <span>POSIÇÃO</span>
            <span>USUÁRIO</span>
            <span>DESAFIOS</span>
            <span>EXPERIÊNCIA</span>
          </div>

          <LeaderboardCard />
        </section>
      </div>}
    </>
    
  )
}