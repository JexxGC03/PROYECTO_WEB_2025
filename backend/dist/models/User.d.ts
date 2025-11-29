import { Schema } from "mongoose";
declare const _default: import("mongoose").Model<{
    fullName: string;
    email: string;
    passwordHash: string;
    role: "ADMIN" | "AGENT" | "CLIENT";
    isActive: boolean;
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    fullName: string;
    email: string;
    passwordHash: string;
    role: "ADMIN" | "AGENT" | "CLIENT";
    isActive: boolean;
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    fullName: string;
    email: string;
    passwordHash: string;
    role: "ADMIN" | "AGENT" | "CLIENT";
    isActive: boolean;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    fullName: string;
    email: string;
    passwordHash: string;
    role: "ADMIN" | "AGENT" | "CLIENT";
    isActive: boolean;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    fullName: string;
    email: string;
    passwordHash: string;
    role: "ADMIN" | "AGENT" | "CLIENT";
    isActive: boolean;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    fullName: string;
    email: string;
    passwordHash: string;
    role: "ADMIN" | "AGENT" | "CLIENT";
    isActive: boolean;
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=User.d.ts.map