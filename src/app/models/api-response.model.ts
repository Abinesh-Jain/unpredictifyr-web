export interface ApiResponse<T, U> {
    success?: boolean;
    message?: string;
    data?: T[];
    info?: U;
}