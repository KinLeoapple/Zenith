export class RequestTimeout {
    timeout: boolean;
    request: Promise<unknown>

    constructor(timeout: boolean, request: Promise<unknown>) {
        this.timeout = timeout;
        this.request = request;
    }
}