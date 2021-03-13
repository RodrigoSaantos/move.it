import styles from '../styles/pages/Login.module.css';


export default function Login() {
  console.log(process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID);

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>

      <div className={styles.content}>
        <img src="/icons/logo.svg" alt="Logo"/>

        <form 
          className={styles.form}
        >

          <strong>Bem-vindo</strong>

          <div className={styles.iconText}>
            <img src="/icons/github.svg" alt="github icon"/>
            <span>Faça login com seu Github para começar</span>
          </div>

          <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`} className={styles.button}>
            <button type="button">Sign In</button>
            
            <button type="button"><img src="/icons/arrow-right.svg" alt="Seta para direita"/></button>
              
          </a>

        </form>
      </div>      
    </div>
  )
}