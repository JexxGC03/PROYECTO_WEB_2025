export declare const looksEmail: (value?: string) => boolean;
export declare function resolveClientValue(input?: string): Promise<{
    ref?: string;
    name?: string;
    email?: string;
} | {
    ref: import("mongoose").Types.ObjectId;
}>;
//# sourceMappingURL=client.d.ts.map