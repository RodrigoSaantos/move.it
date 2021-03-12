import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import { api, github} from '../services/api';
import SideBar from '../components/SideBar';
import { EffectBlur } from '../components/EffectBlur';

export interface ApiGithubProps {
  login: string;
  name: string;
  id: number;
  avatar_url: string;
  url: string;
}

interface HomeProps {
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

export default function Dashboard(props: HomeProps) {
  
  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
      user={props.user}
      xp={props.user.xp}
    >
      <EffectBlur>
        <div className={styles.container}>
          <Head>
            <title>Início | move.it</title>
          </Head>
          <SideBar />
          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile login={props.user.profile.name} avatar_url={props.user.profile.avatar_url} />
                <CompletedChallenges />
                <Countdown />
              </div>

              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </EffectBlur>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted, user, xp } = ctx.req.cookies


  const response = await github.post('login/oauth/access_token', {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: ctx.query.code
  })

  const data = response.data;

  const accessToken = data
  
  const accessTokenFormated = accessToken.split('&');
  const accessTokenFormatedFinal = accessTokenFormated[0].split('=')

  const profile = await api.get('user', {
    headers: {
      'Authorization': `token ${accessTokenFormatedFinal[1]}`,
    }
  });

  return {
    props: {
      data,
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      user: {
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengesCompleted: Number(challengesCompleted),
        profile: profile.data,
        xp: Number(xp),
      },
    }
  }
}
