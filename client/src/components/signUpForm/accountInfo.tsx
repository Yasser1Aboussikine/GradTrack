import { TextField, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { SignupFormData } from "../../lib/zodSchemas/signupValidation.schema";

export default function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignupFormData>();

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="First Name"
        {...register("accountInfo.firstName")}
        error={!!errors.accountInfo?.firstName}
        helperText={errors.accountInfo?.firstName?.message as string}
      />
      <TextField
        label="Last Name"
        {...register("accountInfo.lastName")}
        error={!!errors.accountInfo?.lastName}
        helperText={errors.accountInfo?.lastName?.message as string}
      />
      <TextField
        label="Email"
        {...register("accountInfo.email")}
        error={!!errors.accountInfo?.email}
        helperText={errors.accountInfo?.email?.message as string}
      />
      <TextField
        label="Password"
        type="password"
        {...register("accountInfo.password")}
        error={!!errors.accountInfo?.password}
        helperText={errors.accountInfo?.password?.message as string}
      />
      <TextField
        label="Confirm Password"
        type="password"
        {...register("accountInfo.confirmPassword")}
        error={!!errors.accountInfo?.confirmPassword}
        helperText={errors.accountInfo?.confirmPassword?.message as string}
      />
    </Box>
  );
}
