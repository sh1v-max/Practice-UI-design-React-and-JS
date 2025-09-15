import avatar from '../images/dashboard/avatar.svg'

const Header = () => {
  return (
    <div className="bg-purple-400 px-4 py-3 pb-15">
      <div className="flex items-center justify-between">
        {/* Left: Back */}
        <div className="flex items-center gap-1 text-black font-medium">
          <span className="text-2xl">&lt;</span>
          <span className="text-base">Back</span>
        </div>

        {/* Center: Dashboard */}
        <h1 className="text-lg font-semibold text-gray-900 text-center flex-1">
          Dashboard
        </h1>

        {/* Right: Profile */}
        <img
          className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          src={avatar}
          alt="Profile"
        />
      </div>
    </div>
  )
}

export default Header
