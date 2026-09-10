# STT-01 implementation review — 2026-09-10

## Design and content

- Reference: the desktop and mobile screenshots supplied in the “Code landing page 3D” conversation. Figma file `Wqj6othDxGWVa5SFR79vjb`, node `0:1`, could not be retrieved because the connected Starter plan reached its MCP call limit. Exact vector/font parity is therefore not certified.
- Hero layout and attestation have a single owner: `heroStep1.module.css`. The desktop image blends into `#7f1821` and reaches the viewport edge; the mobile image precedes the text. Attestation uses `#5b1017`, a gold border and the architectural museum icon shown in the reference.
- Certificate 01 again renders the existing `museum.png` logo. Existing product, certificate, story and meaning images are reused.
- Two local SVG ornaments approximate the cloud motif from the supplied screenshots. They appear in Hero, product heading, certificates, 3D and Story. They are decorative and do not intercept input.
- Gallery uses `contain`, four vertical thumbnails on desktop and horizontal thumbnails at/below 800 px. All page breakpoints now agree at 800 px.
- Mobile Story order: inspiration, artefact image, product narrative, meaning cards. The product narrative restores text from the supplied reference.
- `stt-01.ts` was reviewed. Its shared dimensions, `6.8 × 7.4 cm, dày 0.7 cm`, are already consumed by the landing page and VI/EN records. The older desktop design shows different dimensions; the newer repository data is preserved.
- `ProductGallery.tsx` was reviewed; click, arrow keys, Home/End and selected state already work. No logic rewrite was needed.
- No obsolete `.figma-*` or `.product-viewer*` rules remain in the current `globals.css`. Viewer now imports its CSS Module rather than relying on removed global classes. No dependency or lockfile changes were needed.

## GLB finding — unresolved source asset limitation

The exact supplied repository asset is retained, without assigning a replacement white/gold material:

| Field | Value |
| --- | --- |
| Path | `public/heritage/magnet-2.glb` |
| Bytes | 5,866,560 |
| SHA-256 | `63349969d496312d13b68478a770e32b1e42236d667fcce9f6e63c13703d7395` |
| Meshes / primitives | 1 / 1 |
| Vertices / triangle indices | 184,126 / 914,061 |
| Materials / textures / images | 0 / 0 / 0 |
| Attributes | `POSITION` only; no normal, UV or vertex color |

The file contains geometry only. GLTFLoader consequently uses its default material; the model remains monochrome. No viewer or lossless optimization can recover absent authored colors from these bytes. A colored GLB exported from the original authoring project, with embedded materials/textures, is required to finish this requirement. Product photographs remain the reference for actual appearance.

Run `node scripts/inspect-glb.mjs` to reproduce the finding. For a replacement asset, run `node scripts/inspect-glb.mjs path/to/model.glb --require-color` before replacing the public file. This checks for authored color data, not visual equivalence; compare the render with the approved product after export. Preserve materials, vertex colors, UVs and embedded images during optimization.

## Viewer changes and validation

- Abortable GLB download, original material preservation, missing-normal calculation and centered scale through a parent group.
- Camera fits both vertical and horizontal fields of view after resize.
- Slow automatic rotation; mouse drag and one-finger swipe; wheel and two-finger zoom; restricted vertical angles.
- After release, wait 2.5 seconds, restore the home angle/zoom over 850 ms, then resume. New input cancels the return. The home button also resets the view.
- Reduced-motion preference disables automatic rotation and makes return immediate after the idle delay.
- Cleanup is registered before loading; geometry, materials, textures, observers, timers, controls and renderer are released on failure/unmount. Retry handles download failures and WebGL context loss.
- Browser checks cover 320, 390, 430, 768, 800, 801, 1024, 1366, 1440 and 1920 px, gallery input, desktop rotation/zoom, mobile swipe/pinch, exact home restoration, reduced motion, HTTP failure/retry and context loss/retry. No horizontal overflow was observed. English route remains available.
- Required local commands: `pnpm typecheck`, `pnpm lint`, `pnpm build`. ESLint ignores generated `out`, `work` and `outputs` directories, consistent with `.gitignore`.

Browser checks use Chromium/Edge desktop and mobile emulation. Physical iOS Safari has not been verified.
