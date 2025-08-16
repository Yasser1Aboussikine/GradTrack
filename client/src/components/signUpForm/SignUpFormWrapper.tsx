import { useState } from "react";
import { Box, Button, Stepper, Step, StepLabel, Paper } from "@mui/material";
import type { FieldPath } from "react-hook-form";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "../../lib/zodSchemas/signupValidation.schema";
import { signupDefaultValues } from "./signUpDefaultValues";

//TODO: add confirmation step later

import AccountInfo from "./accountInfo";
import ProfileInfo from "./profileInfo";
import AcademicInfo from "./academicInfo";

// Mock data for schools and majors
// TODO: replace with actual API calls

const mockSchools = [
  { id: 1, name: "School of Business Administration" },
  { id: 2, name: "School of Humanities and Social Sciences" },
  { id: 3, name: "School of Science and Engineering" },
];

const mockMajorsBySchool: Record<number, { id: number; name: string }[]> = {
  1: [
    { id: 1, name: "Business Administration" },
    { id: 2, name: "Finance" },
    { id: 3, name: "Marketing" },
  ],
  2: [
    { id: 4, name: "Psychology" },
    { id: 5, name: "International Studies" },
    { id: 6, name: "Communication" },
  ],
  3: [
    { id: 7, name: "Computer Science" },
    { id: 8, name: "Mathematics" },
    { id: 9, name: "Physics" },
  ],
};

const steps = ["Account Info", "Profile Info", "Academic Info / Upload"];

export default function SignUpForm() {
  const [activeStep, setActiveStep] = useState(0);

  // Create schema instance and infer type locally
  const validMajorIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const formSchema = signUpSchema(validMajorIds);
  type FormData = z.infer<typeof formSchema>;

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: signupDefaultValues,
  });

  const onNext = async () => {
    let fieldsToValidate: FieldPath<FormData>[] = [];

    switch (activeStep) {
      case 0:
        fieldsToValidate = [
          "accountInfo.firstName",
          "accountInfo.lastName",
          "accountInfo.email",
          "accountInfo.password",
          "accountInfo.confirmPassword",
        ];
        break;
      case 1:
        fieldsToValidate = [
          "profileInfo.phoneNumber",
          "profileInfo.bio",
          "profileInfo.birthDate",
        ];
        break;
      case 2:
        fieldsToValidate = [
          "academicInfo.schoolId",
          "academicInfo.majorId",
          "academicInfo.academicTranscript",
        ];
        break;
    }

    const isValid = await methods.trigger(fieldsToValidate);
    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const onBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = (data: FormData) => {
    console.log("Final form data:", data);
    alert("Form submitted! Check console.");
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <AccountInfo />;
      case 1:
        return <ProfileInfo />;
      case 2:
        return (
          <AcademicInfo
            schools={mockSchools}
            majorsBySchool={mockMajorsBySchool}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="form-container">
        <h1 className="form-title">Create Your Account</h1>

        <Paper className="styled-paper" elevation={0}>
          <Stepper
            className="styled-stepper"
            activeStep={activeStep}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div className="step-content">{renderStep(activeStep)}</div>

          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                className="styled-button outlined"
                variant="outlined"
                disabled={activeStep === 0}
                onClick={onBack}
              >
                ← Back
              </Button>

              {activeStep < steps.length - 1 ? (
                <Button
                  className="styled-button contained"
                  variant="contained"
                  onClick={onNext}
                >
                  Next →
                </Button>
              ) : (
                <Button
                  className="styled-button contained"
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              )}
            </Box>
          </form>
        </Paper>
      </div>
    </FormProvider>
  );
}
