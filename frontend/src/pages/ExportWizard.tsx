import React from 'react';
import { useExport } from '../store/exportStore';
import { StepIndicator } from '../components/StepIndicator';
import { VoiceAssistant } from '../components/VoiceAssistant';

import { Step1ProductCapture } from '../steps/Step1ProductCapture';
import { Step2ProductAi } from '../steps/Step2ProductAi';
import { Step3DocumentOcr } from '../steps/Step3DocumentOcr';
import { Step4Compliance } from '../steps/Step4Compliance';
import { Step5Packaging } from '../steps/Step5Packaging';
import { Step6ShippingEstimator } from '../steps/Step6ShippingEstimator';
import { Step7ReadinessDocket } from '../steps/Step7ReadinessDocket';

export const ExportWizard: React.FC = () => {
  const { currentStep } = useExport();

  const renderActiveStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1ProductCapture />;
      case 2:
        return <Step2ProductAi />;
      case 3:
        return <Step3DocumentOcr />;
      case 4:
        return <Step4Compliance />;
      case 5:
        return <Step5Packaging />;
      case 6:
        return <Step6ShippingEstimator />;
      case 7:
        return <Step7ReadinessDocket />;
      default:
        return <Step1ProductCapture />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 7-Step Stepper Bar */}
      <StepIndicator />

      {/* Main Active Step Canvas */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderActiveStep()}
      </div>

      {/* Floating Voice Assistant Avatar */}
      <VoiceAssistant />

    </div>
  );
};
