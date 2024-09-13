export default interface ResponseData {
    message: string;
    ok: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}