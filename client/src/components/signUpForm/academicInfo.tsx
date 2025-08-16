import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import type { SignupFormData } from "../../lib/zodSchemas/signupValidation.schema";

/**
 * Props:
 * - schools: { id: number; name: string }[]
 * - majorsBySchool: Record<number, { id: number; name: string }[]>
 *
 * You can compute majorsBySchool from your API and pass it here.
 */
type Props = {
  schools: { id: number; name: string }[];
  majorsBySchool: Record<number, { id: number; name: string }[]>;
};

export default function academicInfo({ schools, majorsBySchool }: Props) {
  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<SignupFormData>();

  // watch nested schoolId to filter majors list
  const schoolId = watch("academicInfo.schoolId");
  const majorsForSelectedSchool =
    schoolId && typeof schoolId === "number"
      ? majorsBySchool[schoolId] ?? []
      : [];

  const fileError = (errors.academicInfo?.academicTranscript as any)
    ?.message as string | undefined;

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        select
        label="School"
        defaultValue="SSE"
        {...register("academicInfo.schoolId", { valueAsNumber: true })}
        error={!!errors.academicInfo?.schoolId}
        helperText={
          errors.academicInfo?.schoolId?.message as string | undefined
        }
      >
        <MenuItem value="">Select school</MenuItem>
        {schools.map((s) => (
          <MenuItem key={s.id} value={s.id}>
            {s.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Major"
        defaultValue=""
        {...register("academicInfo.majorId", { valueAsNumber: true })}
        error={!!errors.academicInfo?.majorId}
        helperText={errors.academicInfo?.majorId?.message as string | undefined}
      >
        <MenuItem value="">Select major</MenuItem>
        {majorsForSelectedSchool.map((m) => (
          <MenuItem key={m.id} value={m.id}>
            {m.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Minor (optional)"
        select
        defaultValue=""
        {...register("academicInfo.minor")}
        error={!!errors.academicInfo?.minor}
        helperText={errors.academicInfo?.minor?.message as string | undefined}
      >
        <MenuItem value="">No minor</MenuItem>
        <MenuItem value="Buisness Administration">
          Buisness Administration
        </MenuItem>
        <MenuItem value="Psychologie">Psychologie</MenuItem>
        <MenuItem value="Mathematics">Mathematics</MenuItem>
        <MenuItem value="individual Minor">individual Minor</MenuItem>
      </TextField>

      <Typography
        variant="h6"
        sx={{ color: "#2e7d32", fontWeight: 600, mt: 2 }}
      >
        Academic Transcript (PDF)
      </Typography>

      <Controller
        name="academicInfo.academicTranscript"
        control={control}
        render={({ field }) => {
          return (
            <>
              <Paper
                sx={{
                  padding: 3,
                  border: "2px dashed #c8e6c9",
                  borderRadius: 2,
                  backgroundColor: "#f8fff8",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: "#00bd00",
                    backgroundColor: "#f0fff0",
                  },
                }}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (
                      file &&
                      file.type === "application/pdf" &&
                      file.size <= 15 * 1024 * 1024
                    ) {
                      field.onChange(file);
                    } else {
                      field.onChange(null);
                    }
                  }}
                  style={{ display: "none" }}
                  id="transcript-upload"
                />
                <label htmlFor="transcript-upload">
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#4caf50",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    📄 Click to upload your transcript (PDF, max 15MB)
                  </Typography>
                </label>
              </Paper>

              {fileError && (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{ fontWeight: 500, mt: 1 }}
                >
                  {fileError}
                </Typography>
              )}

              {watch("academicInfo.academicTranscript") && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    bgcolor: "#f8fff8",
                    borderRadius: 2,
                    border: "1px solid #c8e6c9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#2e7d32", fontWeight: 500 }}
                    >
                      📎 Selected:{" "}
                      {(watch("academicInfo.academicTranscript") as File)?.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "#4caf50", display: "block", mt: 0.5 }}
                    >
                      File size:{" "}
                      {(
                        (watch("academicInfo.academicTranscript") as File)
                          ?.size /
                        (1024 * 1024)
                      ).toFixed(2)}{" "}
                      MB
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setValue("academicInfo.academicTranscript", null);
                    }}
                    sx={{
                      borderColor: "#f44336",
                      color: "#f44336",
                      "&:hover": {
                        borderColor: "#d32f2f",
                        backgroundColor: "rgba(244, 67, 54, 0.04)",
                      },
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              )}
            </>
          );
        }}
      />
    </Box>
  );
}