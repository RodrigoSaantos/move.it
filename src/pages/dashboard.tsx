import { GetServerSideProps } from 'next';

import { api, github} from '../services/api';

export default function Dashboard(props) {

  return (
    <div>
      <h1>Nome: {props.profile.login}</h1>
      <p>{props.data}</p>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  const response = await github.post('login/oauth/access_token', {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: query.code
  })

  const data = response.data;

  const accessToken = data
  
  const accessTokenFormated = accessToken.split('&');
  const accessTokenFormatedFinal = accessTokenFormated[0].split('=')

  const profile = await api.get('user', {
    headers: {
      'Authorization': `token ${accessTokenFormatedFinal[1]}`,
    }
  })

  return {
    props: {
      data,
      profile: profile.data,
    }
  }
}