const Header = () => {
  return (
    <div className="w-full  backdrop-blur-xl py-4 px-10 shadow-lg flex justify-between items-center">
        <img className="w-14 h-14 rounded-lg" src="/logo.png"/>
        <button  className="text-white bg-linear-to-tr from-[#2498e8] to-[#67b3e6] py-1 px-4 rounded-sm font-body cursor-pointer">Signup</button>   
    </div>
  )
}

export default Header;