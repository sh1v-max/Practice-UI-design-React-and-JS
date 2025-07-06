import { useEffect, useRef, useState } from 'react'

export default function Otp({ otpLength = 6 }) {
  const [otpField, setOtpField] = useState(new Array(otpLength).fill(''))
  // console.log(otpField)
  const ref = useRef([])
  // console.log(ref)

  const handleKeyDown = (e, index) => {
    const key = e.key
    const copyOtpField = [...otpField]
    // console.log(key)

    // prevent the SYSTEM issue
    if (e.keyCode === 255) {
      e.preventDefault()
      return
    }

    // don't use this... it's a bug in your SYSTEM
    // if (isNaN(key)) {
    //   return
    // }

    // allow only digits 0–9
    if (!/^\d$/.test(key)) {
      if (key === 'Backspace' || key === 'ArrowLeft' || key === 'ArrowRight') {
        // handled below
      } else {
        e.preventDefault()
        return
      }
    }

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

    // handle arrow
    if (key === 'ArrowLeft') {
      if (index > 0) ref.current[index - 1].focus()
      return
    }
    if (key === 'ArrowRight') {
      if (index + 1 < otpField.length) ref.current[index + 1].focus()
      return
    }

    copyOtpField[index] = key
    setOtpField(copyOtpField)
    if (index + 1 < otpField.length) {
      ref.current[index + 1].focus()
    }
  }

  useEffect(() => {
    ref.current[0].focus()
  }, [])

  return (
    <div className="otp-page">
      <div className="otp-card">
        <div className="otp-header">

          <h1 className="otp-title">Verification Code</h1>

          <p className="otp-subtitle">
            We've sent a {otpLength}-digit code to your device
          </p>

          <p className="otp-description">Enter the code below to continue</p>
        </div>

        <div className="container">
          {otpField.map((value, index) => {
            return (
              <input
                ref={(currentInput) => (ref.current[index] = currentInput)}
                key={index}
                type="text"
                value={value}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-label={`Digit ${index + 1}`}
                className={`otp-input ${value ? 'filled' : ''}`}
              />
            )
          })}
        </div>

        <div className="otp-verify">
          <button className="verify-btn">Verify Code</button>

          <div className="resend-section">
            Didn't receive the code?{' '}
            <button className="resend-btn">Resend Code</button>
          </div>
        </div>

        <div className="otp-tip">
          <p>
            <strong>Tip:</strong> Use arrow keys to navigate between fields,
            or simply type to auto-advance
          </p>
        </div>
      </div>
    </div>
  )
}
