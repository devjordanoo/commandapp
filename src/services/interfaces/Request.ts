export interface IRequest<T> {
    data: T | null;
    status: number;
    message: string;
    hasError: boolean;
}