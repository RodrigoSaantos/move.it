import styles from '../styles/components/LeaderboardCard.module.css'
import { Profile } from './Profile'

import Cookies from 'js-cookie';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

export const LeaderboardCard = () => {
  const { user, challengesCompleted, xp } = useContext(ChallengesContext);
  const cookies = Cookies.getJSON();

  console.log(cookies);
  
  return (
    <div className={styles.container}>
      <div>1</div>
      <div className={styles.userBox}>
        <Profile login={user.profile.name} avatar_url="https://github.com/RodrigoSaantos.png" />
        <div className={styles.userBoxInfo}>
          <span> 
            <strong>{challengesCompleted} </strong> 
             completado{challengesCompleted > 1 && 's'}
          </span>
          <span>
            <strong>{xp} </strong> 
             xp
          </span>            
        </div>
      </div>
    </div>
  )
}