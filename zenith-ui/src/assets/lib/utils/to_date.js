export function to_date(timestamp) {
    let date = new Date(Number(timestamp));
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${lpad(month)}-${lpad(day)}`;
}

function lpad(number) {
    return number < 10 ? "0" + number : number;
}