/** 数字不足指定长度时，在前面补0 */
export const prependZero = (num: number, length: number): string => {
    const numStr = num.toString()
    const intStr = Math.floor(num).toString()
    if (intStr.length < length) {
        const zeroStr = new Array(length - intStr.length).fill('0').join('')
        return zeroStr + numStr
    } else {
        return numStr
    }
}
