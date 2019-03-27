module.exports = {
    staticFileGlobs: [
        'build/index.html',
        'build/static/css/**.css',
        'build/static/js/**.js',
        'build/assets/**.png',
        'build/assets/**.jpg',
        'build/assets/**.svg',
        'build/assets/**.mp4',
        'build/assets/**.gif'
    ],
    swFilePath: './build/service-worker.js',
    stripPrefix: 'build/',
    importScripts: (['./service-worker-custom.js']),
    handleFetch: false,
    runtimeCaching: [{
        urlPattern: /this\\.is\\.a\\.regex/,
        handler: 'networkFirst'
    }]
}