interface ElementPosition {
    x: number;
    y: number;
}

export function elementPosition(element: HTMLElement): ElementPosition {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left,
        y: rect.top,
    };
}