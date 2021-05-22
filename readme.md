# pdx clean air i5 corridor data page

## usage

### prerequisites

- `pnpm install`

### develop

- `pnpm start`
- open `http://localhost:3000`
  - all non-local requests are forwarded off to `pdxcleanair.org`, but local html documents are forwarded a fileserver that hosts content out of the `build/` directory
    - image/css/frame/etc assets are not-available anywhere but `pdxcleanair.org` ATM, thus thin proxy is required!
- edit entries in `src/`
- refresh, your webpage

### build

- `node build.js`
- observe
