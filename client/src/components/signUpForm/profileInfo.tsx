import { Box, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { SignupFormData } from "../../lib/zodSchemas/signupValidation.schema";

export default function profileInfo() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<SignupFormData>();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = event.target.value;
    if (dateString) {
      const date = new Date(dateString);
      setValue("profileInfo.birthDate", date);
    } else {
      setValue("profileInfo.birthDate", undefined);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Phone Number"
        {...register("profileInfo.phoneNumber")}
        error={!!errors.profileInfo?.phoneNumber}
        helperText={errors.profileInfo?.phoneNumber?.message as string}
      />
      <TextField
        label="Bio"
        multiline
        rows={4}
        {...register("profileInfo.bio")}
        error={!!errors.profileInfo?.bio}
        helperText={errors.profileInfo?.bio?.message as string}
      />
      <TextField
        label="Birth Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        onChange={handleDateChange}
        error={!!errors.profileInfo?.birthDate}
        helperText={errors.profileInfo?.birthDate?.message as string}
      />
    </Box>
  );
}
