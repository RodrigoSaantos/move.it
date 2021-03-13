import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { api, github} from '../services/api';
import SideBar from '../components/SideBar';
import { EffectBlur } from '../components/EffectBlur';
import { SideBarProvider } from '../contexts/SideBarContext';
import DashboardHome from '../components/DasboardHome'
import LeaderboardHome from '../components/LeaderboardHome';

export interface ApiGithubProps {
  login: string;
  name: string;
  id: number;
  avatar_url: string;
  url: string;
}

export interface HomeProps {
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
      level={props.user.level}
      currentExperience={props.user.currentExperience} 
      challengesCompleted={props.user.challengesCompleted}
      user={props.user}
      xp={props.user.xp}
    >
      <EffectBlur>
            <Head>
              <title>Início | move.it</title>
            </Head>
        <SideBarProvider>
          <SideBar />
          <DashboardHome />
          <LeaderboardHome />
        </SideBarProvider>
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
