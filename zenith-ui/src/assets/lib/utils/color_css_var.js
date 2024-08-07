export function color_css_var(name) {
    switch (name) {
        case "primary":
            return "var(--variant-plainColor, var(--joy-palette-primary-plainColor, var(--joy-palette-primary-500, #0B6BCB)))";
        case "danger":
            return "var(--variant-plainColor, var(--joy-palette-danger-plainColor, var(--joy-palette-danger-500, #C41C1C)))";
    }
}