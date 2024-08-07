import {md5} from 'js-md5';
import {JSEncrypt} from 'jsencrypt';
import {get_key} from "@/assets/lib/api/api.js";

export const crypt_str = async (str: string) => {
    const md5Password = md5(str.toString()).toString();

    return new Promise(resolve => {
        const encrypt = new JSEncrypt();
        get_key().then(r => {
            if (r !== null) {
                if (r instanceof Object) {
                    const response = r as {
                        key: string,
                    };
                    const publicKeyBase64 = response.key;
                    if (publicKeyBase64 !== null) {
                        encrypt.setPublicKey(publicKeyBase64)
                        resolve(encrypt.encrypt(md5Password));
                    }
                }
            }
        });
    });
}