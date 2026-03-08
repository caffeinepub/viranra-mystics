import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Inquiry {
    id: bigint;
    serviceType: ServiceType;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone?: string;
}
export interface UserProfile {
    name: string;
}
export enum ServiceType {
    adsProduction = "adsProduction",
    videoEditing = "videoEditing",
    preWeddingPhotography = "preWeddingPhotography",
    aiAgent = "aiAgent",
    songVideoProduction = "songVideoProduction",
    videoThumbnail = "videoThumbnail"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitInquiry(name: string, email: string, phone: string | null, serviceType: ServiceType, message: string): Promise<bigint>;
}
