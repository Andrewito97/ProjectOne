export default function (text) {
    const array = text.split('');
    for(let i = 0; i < array.length; i++) {
        if(array[i] === ' ' && array[i + 1] === ' ') {
            array[i] = '&nbsp;'
        }
    };
    const newText = array.join('');
    return newText
};
