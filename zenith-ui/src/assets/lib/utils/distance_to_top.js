export function distance_to_top(tag) {
    const element = document.querySelector(tag);
    return element.getBoundingClientRect().top;
}

export function scroll_distance_to_top() {
    let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) bodyScrollTop = document.body.scrollTop;
    if (document.documentElement) documentScrollTop = document.documentElement.scrollTop;
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}