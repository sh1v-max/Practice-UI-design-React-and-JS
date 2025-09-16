import logo from '../images/footer_logo.svg'

const Footer = () => {
  return (
    <div className="flex items-center justify-center h-full bg-white rounded-b-[46px]">
      <div className="text-gray-400 font-bold my-25">
        <img src={logo} alt="" className="m-auto w-50" />
      </div>
    </div>
  )
}

export default Footer
