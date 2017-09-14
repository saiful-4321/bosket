/**
 * The Wretcher class used to perform easy fetch requests.
 *
 * Immutability : almost every method of this class return a fresh Wretcher object.
 */
export declare class Wretcher {
    private _url;
    private _options;
    constructor(_url: string, _options?: {});
    /**
     * Sets the default fetch options used for every subsequent fetch call.
     * @param opts New default options
     */
    defaults(opts: Object): this;
    /**
     * Mixins the default fetch options used for every subsequent fetch calls.
     * @param opts Options to mixin with the current default options
     */
    mixdefaults(opts: Object): this;
    /**
     * Sets the method (text, json ...) used to parse the data contained in the response body in case of an HTTP error.
     *
     * Persists for every subsequent requests.
     *
     * Default is "text".
     */
    errorType(method: "text" | "json"): this;
    /**
     * Returns a new Wretcher object with the url specified and the same options.
     * @param url String url
     */
    url(url: string): Wretcher;
    /**
     * Returns a new Wretcher object with the same url and new options.
     * @param options New options
     */
    options(options: Object): Wretcher;
    /**
     * Converts a javascript object to query parameters,
     * then appends this query string to the current url.
     *
     * ```
     * let w = wretch("http://example.com") // url is http://example.com
     * w = w.query({ a: 1, b : 2 }) // url is now http://example.com?a=1&b=2
     * ```
     *
     * @param qp An object which will be converted.
     */
    query(qp: Object): Wretcher;
    /**
     * Shortcut to set the "Accept" header.
     * @param what Header value
     */
    accept(what: string): Wretcher;
    /**
    * Performs a get request.
    */
    get(opts?: {}): {
        res: (cb: (response: Response) => any) => Promise<any>;
        json: (cb: (json: Object) => any) => Promise<any>;
        blob: (cb: (blob: Blob) => any) => Promise<any>;
        formData: (cb: (fd: FormData) => any) => Promise<any>;
        arrayBuffer: (cb: (ab: ArrayBuffer) => any) => Promise<any>;
        text: (cb: (text: string) => any) => Promise<any>;
        error: (code: number, cb: any) => any;
        badRequest: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        unauthorized: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        forbidden: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        notFound: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        timeout: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        internalError: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
    };
    /**
    * Performs a delete request.
    */
    delete(opts?: {}): {
        res: (cb: (response: Response) => any) => Promise<any>;
        json: (cb: (json: Object) => any) => Promise<any>;
        blob: (cb: (blob: Blob) => any) => Promise<any>;
        formData: (cb: (fd: FormData) => any) => Promise<any>;
        arrayBuffer: (cb: (ab: ArrayBuffer) => any) => Promise<any>;
        text: (cb: (text: string) => any) => Promise<any>;
        error: (code: number, cb: any) => any;
        badRequest: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        unauthorized: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        forbidden: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        notFound: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        timeout: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        internalError: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
    };
    /**
    * Performs a put request.
    */
    put(opts?: {}): {
        res: (cb: (response: Response) => any) => Promise<any>;
        json: (cb: (json: Object) => any) => Promise<any>;
        blob: (cb: (blob: Blob) => any) => Promise<any>;
        formData: (cb: (fd: FormData) => any) => Promise<any>;
        arrayBuffer: (cb: (ab: ArrayBuffer) => any) => Promise<any>;
        text: (cb: (text: string) => any) => Promise<any>;
        error: (code: number, cb: any) => any;
        badRequest: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        unauthorized: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        forbidden: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        notFound: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        timeout: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        internalError: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
    };
    /**
    * Performs a post request.
    */
    post(opts?: {}): {
        res: (cb: (response: Response) => any) => Promise<any>;
        json: (cb: (json: Object) => any) => Promise<any>;
        blob: (cb: (blob: Blob) => any) => Promise<any>;
        formData: (cb: (fd: FormData) => any) => Promise<any>;
        arrayBuffer: (cb: (ab: ArrayBuffer) => any) => Promise<any>;
        text: (cb: (text: string) => any) => Promise<any>;
        error: (code: number, cb: any) => any;
        badRequest: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        unauthorized: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        forbidden: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        notFound: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        timeout: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        internalError: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
    };
    /**
    * Performs a patch request.
    */
    patch(opts?: {}): {
        res: (cb: (response: Response) => any) => Promise<any>;
        json: (cb: (json: Object) => any) => Promise<any>;
        blob: (cb: (blob: Blob) => any) => Promise<any>;
        formData: (cb: (fd: FormData) => any) => Promise<any>;
        arrayBuffer: (cb: (ab: ArrayBuffer) => any) => Promise<any>;
        text: (cb: (text: string) => any) => Promise<any>;
        error: (code: number, cb: any) => any;
        badRequest: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        unauthorized: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        forbidden: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        notFound: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        timeout: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
        internalError: (cb: (error: Error & {
            status: number;
            response: Response;
            text?: string;
            json?: Object;
        }) => any) => any;
    };
    /**
     * Sets the content type header, stringifies an object and sets the request body.
     * @param jsObject An object
     */
    json(jsObject: Object): Wretcher;
    /**
     * Converts the javascript object to a FormData and sets the request body.
     * @param formObject An object
     */
    formData(formObject: Object): Wretcher;
}