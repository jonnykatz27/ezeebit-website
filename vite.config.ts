import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

function safeBuildCopyPlugin() {
  let isBuild = false
  return {
    name: 'safe-build-copy',
    config(_: any, { command }: { command: string }) {
      // Skip during the SSR build — public assets are already in dist/ from the
      // client build, and we don't want them copied into dist/server/.
      if (command === 'build' && !process.env.VITE_SSR_BUILD) {
        isBuild = true
        return { publicDir: false }
      }
    },
    writeBundle(options: any) {
      if (!isBuild) return
      const publicDir = path.resolve(__dirname, 'public')
      const outDir = options.dir || path.resolve(__dirname, 'dist')

      function safeCopy(srcDir: string, destDir: string) {
        if (!fs.existsSync(srcDir)) return
        const entries = fs.readdirSync(srcDir, { withFileTypes: true })
        for (const entry of entries) {
          const srcPath = path.join(srcDir, entry.name)
          const destPath = path.join(destDir, entry.name)
          try {
            if (entry.isDirectory()) {
              fs.mkdirSync(destPath, { recursive: true })
              safeCopy(srcPath, destPath)
            } else {
              fs.copyFileSync(srcPath, destPath)
            }
          } catch {
          }
        }
      }

      safeCopy(publicDir, outDir)
    }
  }
}

export default defineConfig({
  plugins: [react(), safeBuildCopyPlugin()],
  ssr: {
    // react-helmet-async ships CommonJS. Left external, Node's ESM loader can't
    // resolve its named exports and the SSR bundle throws on import. Bundling it
    // lets Vite handle the interop.
    noExternal: ['react-helmet-async'],
  },
})