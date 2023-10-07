export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html, { event }) => {
        // console.log('render:html', html)
        // console.log(...event.node.req.rawHeaders.entries())
    })
})
