import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

/**
 * The demos are plain files in public/, so they carry no build hash and a
 * browser can keep serving an old copy to the iframe long after the demo
 * changed. Stamping their URLs with a hash of their own contents busts that
 * cache exactly when they change. Hashing the files rather than using a
 * timestamp keeps the client and SSR builds in agreement, which matters
 * because the value is baked into the pre-rendered markup.
 */
function demosVersion() {
  const dir = path.resolve(__dirname, 'public/demos')
  if (!fs.existsSync(dir)) return 'dev'
  const h = crypto.createHash('sha1')
  for (const name of fs.readdirSync(dir).sort()) {
    h.update(name)
    h.update(fs.readFileSync(path.join(dir, name)))
  }
  return h.digest('hex').slice(0, 8)
}

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
  define: {
    __DEMO_VERSION__: JSON.stringify(demosVersion()),
  },
  ssr: {
    // react-helmet-async ships CommonJS. Left external, Node's ESM loader can't
    // resolve its named exports and the SSR bundle throws on import. Bundling it
    // lets Vite handle the interop.
    noExternal: ['react-helmet-async'],
  },
})