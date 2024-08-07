export const scroll_to_top = () => {
    document.documentElement.scrollTop = 0;
}

export const smooth_scroll_to_top = () => {
    if (window.scrollTo) {
        window.scrollTo({"behavior": "smooth", "top": 0});
    } else if (window.scroll) {
        window.scroll({"behavior": "smooth", "top": 0});
    }
}

export const smooth_scroll = (destination) => {
    let target = document.getElementById(destination);
    if (window.scrollTo) {
        window.scrollTo({"behavior": "smooth", "top": target.offsetTop});
    } else if (window.scroll) {
        window.scroll({"behavior": "smooth", "top": target.offsetTop});
    }
}