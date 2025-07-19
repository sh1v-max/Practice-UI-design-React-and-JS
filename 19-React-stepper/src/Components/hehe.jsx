import { useState } from "react";

function Stepper({ steps }) {
  const [currentStep, setCurrentStep] = useState(0);
  
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

function AboutSection() {
  return (
    <div className="about-section">
      <div className="about-card">
        <h2 className="about-title">About This Stepper</h2>
        <div className="about-content">
          <p>This is a modern, dark-themed React stepper component designed for multi-step forms and workflows. It features:</p>
          <div className="feature-grid">
            <div className="feature-item">
              <div className="feature-icon">✨</div>
              <div>
                <h4>Modern Design</h4>
                <p>Clean, dark theme with smooth transitions</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <div>
                <h4>Interactive States</h4>
                <p>Visual feedback for active, completed, and pending steps</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <div>
                <h4>Responsive Layout</h4>
                <p>Adapts beautifully to different screen sizes</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <div>
                <h4>Accessible</h4>
                <p>Built with accessibility best practices in mind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const steps = [
    {
      label: "Personal Info",
      content: (
        <div className="step-content">
          <h3>Personal Information</h3>
          <p>Please provide your basic personal details to get started with your account setup.</p>
          <div className="form-preview">
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-placeholder"></div>
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-placeholder"></div>
            </div>
            <div className="input-group">
              <label>Phone Number</label>
              <div className="input-placeholder"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Account Info",
      content: (
        <div className="step-content">
          <h3>Account Information</h3>
          <p>Set up your account credentials and preferences for a personalized experience.</p>
          <div className="form-preview">
            <div className="input-group">
              <label>Username</label>
              <div className="input-placeholder"></div>
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="input-placeholder"></div>
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <div className="input-placeholder"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Payment",
      content: (
        <div className="step-content">
          <h3>Payment Details</h3>
          <p>Secure payment information to complete your subscription setup.</p>
          <div className="form-preview">
            <div className="input-group">
              <label>Card Number</label>
              <div className="input-placeholder"></div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label>Expiry Date</label>
                <div className="input-placeholder"></div>
              </div>
              <div className="input-group">
                <label>CVV</label>
                <div className="input-placeholder"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Confirmation",
      content: (
        <div className="step-content">
          <h3>Confirmation</h3>
          <p>Review and confirm all your information before proceeding to the final step.</p>
          <div className="confirmation-preview">
            <div className="confirmation-item">
              <span className="label">Name:</span>
              <span className="value">John Doe</span>
            </div>
            <div className="confirmation-item">
              <span className="label">Email:</span>
              <span className="value">john.doe@example.com</span>
            </div>
            <div className="confirmation-item">
              <span className="label">Username:</span>
              <span className="value">johndoe123</span>
            </div>
            <div className="confirmation-item">
              <span className="label">Payment:</span>
              <span className="value">**** **** **** 1234</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Complete",
      content: (
        <div className="step-content success">
          <div className="success-icon">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3>Setup Complete!</h3>
          <p>Congratulations! Your account has been successfully created and configured. You're all set to start using the platform.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>Multi-Step Form</h1>
          <p>Complete the following steps to set up your account</p>
        </header>
        
        <Stepper steps={steps} />
        
        <AboutSection />
      </div>
      
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%);
          color: #e2e8f0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .app-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .app-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        .app-header p {
          color: #94a3b8;
          font-size: 1.1rem;
        }

        /* Stepper Styles */
        .stepper-wrapper {
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(51, 65, 85, 0.3);
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 3rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        }

        .stepper-header {
          margin-bottom: 2rem;
        }

        .stepper-progress {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          position: relative;
        }

        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          position: relative;
        }

        .step-indicator {
          position: relative;
          z-index: 2;
          margin-bottom: 1rem;
        }

        .step-circle {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #374151;
          border: 2px solid #4b5563;
          color: #9ca3af;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .step-circle.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: #667eea;
          color: white;
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
        }

        .step-circle.completed {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-color: #10b981;
          color: white;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
        }

        .check-icon {
          width: 1.2rem;
          height: 1.2rem;
        }

        .step-number {
          font-size: 1rem;
        }

        .step-connector {
          position: absolute;
          top: 1.5rem;
          left: 3rem;
          right: -100%;
          height: 2px;
          background: #374151;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .step-connector.completed {
          background: linear-gradient(90deg, #10b981 0%, #059669 100%);
        }

        .step-item:last-child .step-connector {
          display: none;
        }

        .step-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #6b7280;
          text-align: center;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .step-label.active {
          color: #667eea;
          font-weight: 600;
        }

        .step-label.completed {
          color: #10b981;
          font-weight: 600;
        }

        /* Content Styles */
        .stepper-content {
          margin: 2rem 0;
        }

        .content-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(51, 65, 85, 0.2);
          border-radius: 0.75rem;
          padding: 2rem;
          min-height: 300px;
        }

        .step-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #f1f5f9;
          margin-bottom: 0.75rem;
        }

        .step-content p {
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .step-content.success {
          text-align: center;
        }

        .success-icon {
          width: 4rem;
          height: 4rem;
          margin: 0 auto 1rem;
          color: #10b981;
        }

        .success-icon svg {
          width: 100%;
          height: 100%;
        }

        .form-preview {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .input-row {
          display: flex;
          gap: 1rem;
        }

        .input-group {
          flex: 1;
        }

        .input-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #cbd5e1;
          margin-bottom: 0.5rem;
        }

        .input-placeholder {
          height: 2.5rem;
          background: rgba(51, 65, 85, 0.3);
          border: 1px solid rgba(71, 85, 105, 0.3);
          border-radius: 0.375rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .confirmation-preview {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .confirmation-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: rgba(51, 65, 85, 0.2);
          border-radius: 0.5rem;
          border-left: 3px solid #667eea;
        }

        .confirmation-item .label {
          font-weight: 500;
          color: #cbd5e1;
        }

        .confirmation-item .value {
          color: #f1f5f9;
          font-weight: 600;
        }

        /* Controls Styles */
        .stepper-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
        }

        .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .btn-icon {
          width: 1rem;
          height: 1rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.2);
        }

        .btn-primary:hover:not(.disabled) {
          transform: translateY(-1px);
          box-shadow: 0 10px 15px -3px rgba(102, 126, 234, 0.3);
        }

        .btn-secondary {
          background: rgba(51, 65, 85, 0.5);
          color: #e2e8f0;
          border: 1px solid rgba(71, 85, 105, 0.3);
        }

        .btn-secondary:hover:not(.disabled) {
          background: rgba(51, 65, 85, 0.8);
          transform: translateY(-1px);
        }

        .btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .step-counter {
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* About Section */
        .about-section {
          margin-top: 3rem;
        }

        .about-card {
          background: rgba(30, 41, 59, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(51, 65, 85, 0.3);
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
        }

        .about-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 1rem;
          text-align: center;
        }

        .about-content p {
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 2rem;
          text-align: center;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .feature-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 1.5rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(51, 65, 85, 0.2);
          border-radius: 0.75rem;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
          border-color: rgba(102, 126, 234, 0.3);
        }

        .feature-icon {
          font-size: 1.5rem;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 0.5rem;
          flex-shrink: 0;
        }

        .feature-item h4 {
          font-size: 1rem;
          font-weight: 600;
          color: #f1f5f9;
          margin-bottom: 0.5rem;
        }

        .feature-item p {
          font-size: 0.875rem;
          color: #94a3b8;
          line-height: 1.5;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .app-header h1 {
            font-size: 2rem;
          }

          .stepper-wrapper {
            padding: 1.5rem;
          }

          .stepper-progress {
            flex-direction: column;
            gap: 1rem;
          }

          .step-item {
            flex-direction: row;
            align-items: center;
            width: 100%;
            text-align: left;
          }

          .step-indicator {
            margin-bottom: 0;
            margin-right: 1rem;
          }

          .step-connector {
            display: none;
          }

          .step-circle {
            width: 2.5rem;
            height: 2.5rem;
          }

          .stepper-controls {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .step-counter {
            order: -1;
            width: 100%;
            text-align: center;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }

          .input-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}