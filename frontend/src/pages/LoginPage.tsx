import Background from '@/components/Background'
import LoginCard from '@/components/LoginCard'

const LoginPage = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <Background/>
      <LoginCard/>
    </div>
  )
}

export default LoginPage