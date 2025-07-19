import { useState } from "react";

export default function Stepper({ steps }) {
  const [currentStep, setCurrentStep] = useState(0);
  console.log(currentStep);
  const handleContinue = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <div className="stepper">
      <div>
        {steps.map(({ label, content }, index) => {
          return (
            <div key={label} className="stepper-container">
              <div
                className={`step-number ${
                  index <= currentStep ? "active" : ""
                }`}
              >
                {index + 1}
                {index < steps.length - 1 && (
                  <div
                    className={`step-line ${
                      index < currentStep ? "active" : ""
                    }`}
                  ></div>
                )}
              </div>
              <div className="step-label">{label}</div>
            </div>
          );
        })}
      </div>
      <div className="stepper-content">{steps[currentStep].content}</div>
      <div className="stepper-controls">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleContinue}>Continue</button>
      </div>
    </div>
  );
}
