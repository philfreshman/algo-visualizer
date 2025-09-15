import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    distDir: 'out',
    images: {
        unoptimized: true
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? '/algo-visualizer' : '',
    basePath: process.env.NODE_ENV === 'production' ? '/algo-visualizer' : '',
    webpack: (config) => {
        // Add support for WASM
        config.experiments = {
            ...config.experiments,
            asyncWebAssembly: true,
        }

        // Add WASM file handling
        config.module.rules.push({
            test: /\.wasm$/,
            type: 'webassembly/async',
        })

        return config
    },
}

export default nextConfig
