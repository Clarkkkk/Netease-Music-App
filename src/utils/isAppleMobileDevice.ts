/** is iOS or iPad OS */
export function isAppleMobileDevice() {
    const userAgent = navigator.userAgent
    return userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1
}
