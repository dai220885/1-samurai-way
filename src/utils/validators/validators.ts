export const requiredField = (value: string) => {
    if (value) return undefined;
    return 'Field is required'
}


//создатель валидаторов максимальной длины:
export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined
}
//
// export const maxLength15 =  (value: string) => {
//     if (value && value.length > 15) return `Max length is 15 symbols`;
//     return undefined
// }