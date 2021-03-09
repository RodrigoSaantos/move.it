import { FC, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

interface ProfileProps {
  login: string;
  avatar_url: string;
}

export const Profile: React.FC<ProfileProps> = (props) => {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src={props.avatar_url} alt={props.login}/>
      <div>
        <strong>{props.login}</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}