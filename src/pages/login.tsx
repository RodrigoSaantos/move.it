export default function Login() {
  return (
    <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`}>
      Faça login com seu Github para começar
    </a>
  )
}