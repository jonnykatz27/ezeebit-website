/// <reference types="vite/client" />

/**
 * Content hash of the files in public/demos, stamped onto the demo iframe URLs
 * so a changed demo is never served from a stale browser cache. Defined in
 * vite.config.ts; derived from the files themselves so the client and SSR
 * builds agree and the pre-rendered markup matches what hydrates.
 */
declare const __DEMO_VERSION__: string
