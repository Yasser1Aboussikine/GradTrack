import { z } from 'zod'

const academicInfo = z.object({
    school: z.enum(["SSE", "SBA", "SAHS(SSHS)", "LC"]),
    major: z.enum([]),
    minor : z.enum(["Buisness Administration", "Psychologie","Mathematics", "individual Minor" ]).optional()
})

export default academicInfo;