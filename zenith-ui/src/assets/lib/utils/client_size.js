export function client_height() {
    let body = (document.compatMode && document.compatMode == 'CSS1Compat') ?
        document.documentElement : document.body;
    return body.clientHeight;
}

export function client_width() {
    let body = (document.compatMode && document.compatMode == 'CSS1Compat') ?
        document.documentElement : document.body;
    return body.clientWidth;
}