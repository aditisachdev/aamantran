import React, { useState } from "react";
import { Steps, Button } from "element-react";
import SelectDesign from "./SelectDesign";
import GetDetails from "./GetDetails";
import Share from "./Share";
import styles from "./CreateInvite.module.scss";

const CreateInvite = () => {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <>
      <Steps space={400} active={currentStep}>
        <Steps.Step title="Step 1" description="Select Design"></Steps.Step>
        <Steps.Step title="Step 2" description="Personalize"></Steps.Step>
        <Steps.Step title="Step 3" description="Share"></Steps.Step>
      </Steps>
      {currentStep === 1 && (
        <div>
          Select a design from the following:
          <SelectDesign />
        </div>
      )}
      {currentStep === 2 && (
        <div>
          Please enter your information for this invite:
          <GetDetails />
        </div>
      )}
      {currentStep === 3 && (
        <div>
          Share your invite with your contacts:
          <Share />
        </div>
      )}
      <Button
        onClick={() => setCurrentStep(currentStep === 3 ? 0 : currentStep + 1)}
      >
        Next
      </Button>
    </>
  );
};

export default CreateInvite;
