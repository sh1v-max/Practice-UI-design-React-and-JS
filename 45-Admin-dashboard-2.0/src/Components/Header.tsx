import avatar from '../images/dashboard/avatar.svg'

const Header = () => {
  return (
    <div className="bg-purple-400 px-8 py-3 pb-15">
      <div className="flex items-center justify-between">
        {/* Left: Back */}
        <div className="flex items-center gap-1 text-gray-900 font-medium">
          <span className="text-[22px] font-bold">&lt;</span>
          <span className="text-[22px]">Back</span>
        </div>

        {/* Center: Dashboard */}
        <h1 className="text-[22px] font-semibold text-black text-center flex-1">
          Dashboard
        </h1>

        {/* Right: Profile */}
        <img
          className="w-[40px] h-[40px] rounded-full"
          src={avatar}
          alt="Profile"
        />
      </div>
    </div>
  )
}

export default Header
