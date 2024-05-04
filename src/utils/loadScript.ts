export const loadScript = (url: string, options: { crossOrigin: boolean }): Promise<void> => {
    const allScripts = Array.from(document.querySelectorAll('script')).map((item) => item.src)
    if (
        /^\//.test(url)
            ? allScripts.includes(window.location.origin + url)
            : allScripts.includes(url)
    ) {
        return Promise.resolve()
    }

    const script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    script.async = true
    if (options.crossOrigin) {
        script.crossOrigin = 'anonymous'
    }
    document.body.appendChild(script)

    return new Promise((resolve, reject) => {
        script.onload = () => resolve()
        script.onerror = () => reject(`Request Error: ${url}`)
    })
}
