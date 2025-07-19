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
    <div className="stepper-wrapper">
      <div className="stepper-header">
        <div className="stepper-progress">
          {steps.map(({ label }, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            
            return (
              <div key={label} className="step-item">
                <div className="step-indicator">
                  <div className={`step-circle ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                    {isCompleted ? (
                      <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="step-number">{index + 1}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`step-connector ${isCompleted ? 'completed' : ''}`}></div>
                  )}
                </div>
                <div className={`step-label ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="stepper-content">
        <div className="content-card">
          {steps[currentStep].content}
        </div>
      </div>
      
      <div className="stepper-controls">
        <button 
          className={`btn btn-secondary ${currentStep === 0 ? 'disabled' : ''}`}
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        
        <div className="step-counter">
          Step {currentStep + 1} of {steps.length}
        </div>
        
        <button 
          className={`btn btn-primary ${currentStep === steps.length - 1 ? 'disabled' : ''}`}
          onClick={handleContinue}
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
          {currentStep !== steps.length - 1 && (
            <svg className="btn-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
