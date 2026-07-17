import { defineConfig } from 'tsdown';

// core owns the schema source modules (src/schemas.ts, src/auth.ts, src/constants.ts) and builds
// two entries from them:
//   - src/index.ts    → the curated public surface (spec + OAuth `*Schema` constants only)
//   - src/internal.ts → the wholesale internal seam the sibling SDK packages resolve at runtime
//   - src/protocol.ts → the public, role-neutral Protocol extension point
// All modules import only `zod/v4`, so the graph stays runtime-neutral; `platform: 'neutral'`
// makes a node-only dependency leaking in fail the build here instead of silently shipping.
export default defineConfig({
    failOnWarn: 'ci-only',
    entry: ['src/index.ts', 'src/internal.ts', 'src/protocol.ts'],
    format: ['esm', 'cjs'],
    fixedExtension: true,
    outDir: 'dist',
    clean: true,
    sourcemap: true,
    target: 'esnext',
    platform: 'neutral',
    dts: {
        resolver: 'tsc',
        compilerOptions: {
            baseUrl: '.',
            paths: {
                '@modelcontextprotocol/core-internal': ['../core-internal/src/index.ts'],
                '@modelcontextprotocol/core-internal/public': ['../core-internal/src/exports/public/index.ts']
            }
        }
    },
    noExternal: ['@modelcontextprotocol/core-internal'],
    external: ['@modelcontextprotocol/core/internal']
});
