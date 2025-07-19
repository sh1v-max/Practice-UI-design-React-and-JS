import Stepper from "./Components/Stepper";
import "./styles.css";

export default function App() {
  const steps = [
    {
      label: "Personal Info",
      content: (
        <div className="step-content">
          <h3>Personal Information</h3>
          <p>Please provide your basic personal details to get started with your account setup.</p>
        </div>
      ),
    },
    {
      label: "Account Info",
      content: (
        <div className="step-content">
          <h3>Account Information</h3>
          <p>Set up your account credentials and preferences for a personalized experience.</p>
        </div>
      ),
    },
    {
      label: "Payment",
      content: (
        <div className="step-content">
          <h3>Payment Details</h3>
          <p>Secure payment information to complete your subscription setup.</p>
        </div>
      ),
    },
    {
      label: "Confirmation",
      content: (
        <div className="step-content">
          <h3>Confirmation</h3>
          <p>Review and confirm all your information before proceeding to the final step.</p>
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
          <h1>Multi-Step Form Stepper</h1>
          <p>Complete the following steps to set up your account</p>
        </header>
        
        <Stepper steps={steps} />
        
      </div>
    </div>
  );
}
