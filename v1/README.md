# Classic V1 Design Rollback Instructions

This folder contains the original design of your website. If you ever want to completely rollback to this layout, follow these steps:

1. **Delete** (or rename to e.g. `index.new.html`, `style.new.css`, `script.new.js`) the root files:
   - `index.html`
   - `style.css`
   - `script.js`
2. **Move** all files from this `v1/` directory back into the main root directory:
   - `index.html`
   - `style.css`
   - `script.js`
   - `timeline.css`
3. **Open** `index.html` (the newly restored one in the root) and verify all assets load correctly.

*Note: In the backup version of `index.html`, paths to assets inside `/Assests` have been adjusted to `../Assests` to ensure it runs correctly inside the `/v1` subdirectory. If you move it back to the root, make sure to search and replace `../Assests` with `Assests` so they resolve relative to the root.*
