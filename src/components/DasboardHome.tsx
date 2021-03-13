import React, { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";
import { SideBarContext } from "../contexts/SideBarContext";
import { ChallengeBox } from "./ChallengeBox";
import { CompletedChallenges } from "./CompletedChallenges";
import { Countdown } from "./Countdown";
import { ExperienceBar } from "./ExperienceBar";
import { Profile } from "./Profile";
import styles from '../styles/pages/Home.module.css';

export default function DashboardHome() {
  const { user } = useContext(ChallengesContext);
  const { buttonHome } = useContext(SideBarContext);

  return (
    <>
      {buttonHome &&

        <div className={styles.container}>
                    
        <ExperienceBar />


        <CountdownProvider>
          <section>
            <div>
              <Profile login={user.profile.name} avatar_url={user.profile.avatar_url} />
              <CompletedChallenges />
              <Countdown />
            </div>
      
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
        </div>
      }
    </>
    
  )
}