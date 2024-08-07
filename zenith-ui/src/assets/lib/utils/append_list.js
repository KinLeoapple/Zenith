export function append_list(targetList, list) {
    let temp = targetList;
    for (let i = 0; i < list.length; i++) {
        let isContains = false;
        for (let j = 0; j < temp.length; j++) {
            if (temp[j].id === list[i].id) {
                isContains = true;
                break;
            }
        }
        if (!isContains) {
            temp.push(list[i]);
        }
    }
    return temp;
}