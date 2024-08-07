import {MAX_REQUEST_TIMEOUT} from "@/assets/lib/data/static.ts";
import axios from "axios";
import {RequestTimeout} from "@/assets/lib/api/request_timeout.ts";
import {api_prefix} from "@/assets/lib/api/api_prefix.ts";

const prefix = api_prefix();

export const request = (url: string, options: object = {}) => {
    return new Promise(resolve => {
        const controller = new AbortController();
        const signal = {signal: controller.signal};
        Object.assign(options, signal);

        const request = axios(`${prefix}/${url}`, options).then(r => {
            clearTimeout(abortTimer);
            resolve(r.data as object);
        }).catch(() => {
            clearTimeout(abortTimer);
            resolve(new Promise(() => resolve(null)))
        });

        const abortTimer = setTimeout(() => {
            controller.abort();
            const timeoutRequest = new RequestTimeout(
                true,
                request
            )
            resolve(timeoutRequest);
        }, MAX_REQUEST_TIMEOUT * 1000);
    });
}