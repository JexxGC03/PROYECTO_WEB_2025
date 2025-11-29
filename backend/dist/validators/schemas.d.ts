import { z } from "zod";
export declare const caseCreateSchema: z.ZodObject<{
    plaintiffName: z.ZodString;
    defendantName: z.ZodString;
    client: z.ZodOptional<z.ZodString>;
    caseType: z.ZodEnum<{
        CIVIL: "CIVIL";
        PENAL: "PENAL";
        LABORAL: "LABORAL";
        FAMILIA: "FAMILIA";
        ADMINISTRATIVO: "ADMINISTRATIVO";
        OTRO: "OTRO";
    }>;
    caseNumber: z.ZodString;
    priority: z.ZodDefault<z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const caseUpdateSchema: z.ZodObject<{
    plaintiffName: z.ZodOptional<z.ZodString>;
    defendantName: z.ZodOptional<z.ZodString>;
    client: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    caseType: z.ZodOptional<z.ZodEnum<{
        CIVIL: "CIVIL";
        PENAL: "PENAL";
        LABORAL: "LABORAL";
        FAMILIA: "FAMILIA";
        ADMINISTRATIVO: "ADMINISTRATIVO";
        OTRO: "OTRO";
    }>>;
    caseNumber: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        URGENT: "URGENT";
    }>>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        OPEN: "OPEN";
        IN_PROGRESS: "IN_PROGRESS";
        RESOLVED: "RESOLVED";
        CLOSED: "CLOSED";
    }>>;
}, z.core.$strip>;
export declare const mapUiPriority: (label: string) => "LOW" | "MEDIUM" | "HIGH" | "URGENT";
//# sourceMappingURL=schemas.d.ts.map