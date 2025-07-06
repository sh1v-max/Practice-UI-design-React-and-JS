import { useRef, useState } from 'react'

export default function Otp({ otpLength = 6 }) {
  const [otpField, setOtpField] = useState(new Array(otpLength).fill(''))
  // console.log(otpField)
  const ref = useRef([])
  console.log(ref)

  const handleKeyDown = (e, index) => {
    const key = e.key
    const copyOtpField = [...otpField]
    // console.log(key)

    if (e.keyCode === 255) {
      // Ignore or suppress this phantom key
      e.preventDefault()
      return
    }

    // don't use this... it's a bug in your SYSTEM
    // if (isNaN(key)) {
    //   return
    // }

    // for backspace
    if (key === 'Backspace') {
      // ref.current[index - 1].focus()
      console.log('backspace pressed')
      copyOtpField[index] = ''
      setOtpField(copyOtpField)
      if (index - 1 >= 0) {
        ref.current[index - 1].focus()
      }
      return
      // if backspace is pressed, we don't need to go to the next step
    }

    copyOtpField[index] = key
    setOtpField(copyOtpField)
    // ref.current[index + 1].focus()
    if (index + 1 < otpField.length) {
      ref.current[index + 1].focus()
    }
  }

  return (
    <div className="container">
      {otpField.map((value, index) => {
        return (
          <input
            ref={(currentInput) => (ref.current[index] = currentInput)}
            key={index}
            type="text"
            value={value}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        )
      })}
    </div>
  )
}
