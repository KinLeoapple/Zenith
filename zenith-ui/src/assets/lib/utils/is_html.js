export const is_html = (text) => {
    try {
        const fragment = new DOMParser().parseFromString(text, "text/html");
        return fragment.body.children.length > 0;
    } catch (error) {
    }
    return false;
}