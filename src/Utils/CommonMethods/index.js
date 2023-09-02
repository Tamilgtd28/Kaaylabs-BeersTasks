export const filterTextLength = (value, length) => {
    if (value?.length > length) {
        return value.substring(0, length).trim() + '...';
    }
    else {
        return value
    }
}