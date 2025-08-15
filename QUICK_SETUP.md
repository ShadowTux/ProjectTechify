# Quick Setup Guide

This guide helps you get set up quickly.

## 🚀 Steps

1. Install the userscripts from the `user-scripts` folder into your userscript manager (Tampermonkey/Violentmonkey).
2. Ensure the "Enhanced Search !Bang Redirects v2" script is enabled.
3. Browse to your favorite search engine and try queries like `!a2 test`.

## Local Development

```bash
# Build project (no-op placeholder)
npm run build

# Run simple tests
npm run test
```

## Troubleshooting

- Open the browser console and run `showBangs()` to verify status
- Test a bang directly with `testDuckDuckGoBang('!a2')`
- Clear cache with `clearDuckDuckGoCache()`

See `README.md` for more details.
