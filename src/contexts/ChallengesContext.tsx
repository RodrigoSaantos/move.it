import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { ApiGithubProps } from '../pages/dashboard';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  isLevelUpModalOpen: boolean;
  xp: number;
  user: {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    profile: ApiGithubProps;
    xp: number;
  }
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  xp: number;
  user: {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    profile: ApiGithubProps;
    xp: number;
  }
}

export const ChallengesContext = createContext({} as ChallengeContextData);


export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.user.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.user.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.user.challengesCompleted ?? 0);
  const [xp, setXp] = useState(rest.xp ?? 0);
  const [user, setUser] = useState(rest.user ?? null);

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set(String(user.profile.id), { 
      login: user.profile.login, 
      name: user.profile.name,
      avatar_url: user.profile.avatar_url, 
      url: user.profile.url,
      level: String(level),
      currentExperience: String(currentExperience),
      challengesCompleted: String(challengesCompleted),
      xp: String(xp),

    })
  }, [level, currentExperience, challengesCompleted, user, xp]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex];
    
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🥇', {
        body: `Valendo ${challenge.amount}xp!`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
    setXp(xp + amount)
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted, 
        experienceToNextLevel,
        activeChallenge,
        isLevelUpModalOpen,
        user,
        xp,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      { isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  )
}