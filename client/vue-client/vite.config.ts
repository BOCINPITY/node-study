import {fileURLToPath, URL} from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "node:path";


export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // 开发服务器代理配置
    server: {
        proxy: {
            // 选项写法
            '/api': {
                target: 'http://localhost:9527',
                changeOrigin: true,
            },
        },
    },
    build:{
        outDir:path.resolve(__dirname,"../../public"),
        rollupOptions:{
            output: {
                assetFileNames: assetInfo => {
                    if (assetInfo.name && assetInfo.name.endsWith('.css')) {
                        return 'css/[name]-[hash][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
            }
        }
    }
})
