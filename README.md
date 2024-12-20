# Vite React TypeScript Project

## Build Configuration

The build output directory can be configured using environment variables:

### Environment Variables

- `VITE_BUILD_OUTDIR`: Specifies the output directory for production builds
  - Default: `dist`
  - Can be set in `.env` files or environment

### Examples

```bash
# Using .env file
VITE_BUILD_OUTDIR=build

# Using command line
VITE_BUILD_OUTDIR=custom-build npm run build
```

### Environment Files

- `.env`: Default environment variables
- `.env.production`: Production-specific variables
- `.env.local`: Local overrides (git-ignored)
- `.env.production.local`: Production local overrides (git-ignored)

## Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Build Output

The production build will be generated in the configured output directory:
- Default: `./dist/`
- Configurable via `VITE_BUILD_OUTDIR`

The build output includes:
- Optimized and minified assets
- Source maps
- Vendor chunk splitting
- Static assets