import { mix } from "./mix"

// Default options
let defaults = {}
let errorType = null

/**
 * The Wretcher class used to perform easy fetch requests.
 *
 * Immutability : almost every method of this class return a fresh Wretcher object.
 */
export class Wretcher {

    constructor(
        private _url: string,
        private _options = {}) {}

    /**
     * Sets the default fetch options used for every subsequent fetch call.
     * @param opts New default options
     */
    defaults(opts: Object) {
        defaults = opts
        return this
    }

    /**
     * Mixins the default fetch options used for every subsequent fetch calls.
     * @param opts Options to mixin with the current default options
     */
    mixdefaults(opts: Object) {
        defaults = mix(defaults, opts)
        return this
    }

    /**
     * Sets the method (text, json ...) used to parse the data contained in the response body in case of an HTTP error.
     *
     * Persists for every subsequent requests.
     *
     * Default is "text".
     */
    errorType(method: "text" | "json") {
        errorType = method
        return this
    }

    /**
     * Returns a new Wretcher object with the url specified and the same options.
     * @param url String url
     */
    url(url: string) {
        return new Wretcher(url, this._options)
    }

    /**
     * Returns a new Wretcher object with the same url and new options.
     * @param options New options
     */
    options(options: Object) {
        return new Wretcher(this._url, options)
    }

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
    query(qp: Object) {
        return new Wretcher(appendQueryParams(this._url, qp), this._options)
    }

    /**
     * Shortcut to set the "Accept" header.
     * @param what Header value
     */
    accept(what: string) {
        return new Wretcher(this._url, mix(this._options, { headers: { "Accept" : what }}))
    }

    /**
    * Performs a get request.
    */
    get(opts = {}) {
        return doFetch(this._url)(mix(opts, this._options))
    }
    /**
    * Performs a delete request.
    */
    delete(opts = {}) {
        return doFetch(this._url)({ ...mix(opts, this._options), method: "DELETE" })
    }
    /**
    * Performs a put request.
    */
    put(opts = {}) {
        return doFetch(this._url)({ ...mix(opts, this._options), method: "PUT" })
    }
    /**
    * Performs a post request.
    */
    post(opts = {}) {
        return doFetch(this._url)({ ...mix(opts, this._options), method: "POST" })
    }
    /**
    * Performs a patch request.
    */
    patch(opts = {}) {
        return doFetch(this._url)({ ...mix(opts, this._options), method: "PATCH" })
    }

    /**
     * Sets the content type header, stringifies an object and sets the request body.
     * @param jsObject An object
     */
    json(jsObject: Object) {
        return new Wretcher(this._url,
            { 
                ...this._options,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsObject)
            })
    }
    /**
     * Converts the javascript object to a FormData and sets the request body.
     * @param formObject An object
     */
    formData(formObject: Object) {
        const formData = new FormData()
        for(const key in formObject) {
            if(formObject[key] instanceof Array) {
                for(const item of formObject[key])
                    formData.append(key + "[]", item)
            } else {
                formData.append(key, formObject[key])
            }
        }

        return new Wretcher(this._url,
            { 
                ...this._options,
                body: formData
            })
    }
}

// Internal helpers

const appendQueryParams = (url: string, qp: Object) => {
    const usp = new URLSearchParams()
    const index = url.indexOf("?")
    for(const key in qp) {
        if(qp[key] instanceof Array) {
            for(const val of qp[key])
                usp.append(key, val)
        } else {
            usp.append(key, qp[key])
        }
    }
    return ~index ?
        `${url.substring(0, index)}?${usp.toString()}` :
        `${url}?${usp.toString()}`
}

type WretcherError = Error & { status: number, response: Response, text?: string, json?: Object }

const doFetch = url => (opts = {}) => {
    const req = fetch(url, mix(defaults, opts))
    let wrapper : Promise<void | Response> = req.then(response => {
        if (!response.ok) {
            return response[errorType || "text"]().then(_ => {
                const err = new Error(_)
                err[errorType] = _
                err["status"] = response.status
                err["response"] = response
                throw err
            })
        }
        return response
    })
    let catchers = []
    const doCatch = <T>(promise : Promise<T>) : Promise<T> => catchers.reduce((accumulator, catcher) => accumulator.catch(catcher), promise)
    const responseTypes = {
        /**
         * Retrieves the raw result as a promise.
         */
        res:  (cb: (response : Response) => any) => doCatch(wrapper.then(_ => _ && cb && cb(_) || _)),
        /**
         * Retrieves the result as a parsed JSON object.
         */
        json: (cb: (json : Object) => any) => doCatch(wrapper
            .then(_ => _ && _.json())
            .then(_ => _ && cb && cb(_) || _)),
        /**
         * Retrieves the result as a Blob object.
         */
        blob: (cb: (blob : Blob) => any) => doCatch(wrapper
            .then(_ => _ && _.blob())
            .then(_ => _ && cb && cb(_) || _)),
        /**
         * Retrieves the result as a FormData object.
         */
        formData: (cb: (fd : FormData) => any) => doCatch(wrapper
            .then(_ => _ && _.formData())
            .then(_ => _ && cb && cb(_) || _)),
        /**
         * Retrieves the result as an ArrayBuffer object.
         */
        arrayBuffer: (cb: (ab : ArrayBuffer) => any) => doCatch(wrapper
            .then(_ => _ && _.arrayBuffer())
            .then(_ => _ && cb && cb(_) || _)),
        /**
         * Retrieves the result as a string.
         */
        text: (cb: (text : string) => any) => doCatch(wrapper
            .then(_ => _ && _.text())
            .then(_ => _ && cb && cb(_) || _)),
        /**
         * Catches an http response with a specific error code and performs a callback.
         */
        error: (code: number, cb) => {
            catchers.push(err => {
                if(err.status === code) cb(err)
                else throw err
            })
            return responseTypes
        },
        /**
         * Catches a bad request (http code 400) and performs a callback.
         */
        badRequest: (cb: (error: WretcherError) => any) => responseTypes.error(400, cb),
        /**
         * Catches an unauthorized request (http code 401) and performs a callback.
         */
        unauthorized: (cb: (error: WretcherError) => any) => responseTypes.error(401, cb),
        /**
         * Catches a forbidden request (http code 403) and performs a callback.
         */
        forbidden: (cb: (error: WretcherError) => any) => responseTypes.error(403, cb),
        /**
         * Catches a "not found" request (http code 404) and performs a callback.
         */
        notFound: (cb: (error: WretcherError) => any) => responseTypes.error(404, cb),
        /**
         * Catches a timeout (http code 408) and performs a callback.
         */
        timeout: (cb: (error: WretcherError) => any) => responseTypes.error(408, cb),
        /**
         * Catches an internal server error (http code 500) and performs a callback.
         */
        internalError: (cb: (error: WretcherError) => any) => responseTypes.error(500, cb)
    }

    return responseTypes
}