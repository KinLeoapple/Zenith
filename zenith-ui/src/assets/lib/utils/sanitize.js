import {is_html} from "@/assets/lib/utils/is_html.js";

export const sanitize = (content, html) => {
    if (content !== null) {
        if (is_html(content)) {
            return content;
        }
        return html;
    }
}