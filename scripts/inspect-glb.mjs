import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

// Inspect the authored data before changing a viewer or optimizing its asset.
const file = process.argv.find((arg, index) => index > 1 && !arg.startsWith("--"))
  ?? "public/heritage/magnet-2.glb";
const bytes = readFileSync(file);
if (bytes.length < 20 || bytes.toString("ascii", 0, 4) !== "glTF"
  || bytes.readUInt32LE(4) !== 2 || bytes.readUInt32LE(8) !== bytes.length
  || bytes.readUInt32LE(16) !== 0x4e4f534a) {
  throw new Error("Not a valid GLB 2.0 container");
}
const jsonLength = bytes.readUInt32LE(12);
if (20 + jsonLength > bytes.length) throw new Error("Truncated GLB JSON chunk");
const gltf = JSON.parse(bytes.toString("utf8", 20, 20 + jsonLength));
const primitives = (gltf.meshes ?? []).flatMap(mesh => mesh.primitives);
const materials = gltf.materials ?? [];
const hasColorData = primitives.some(primitive => primitive.attributes.COLOR_0 !== undefined)
  || materials.some(material => material.pbrMetallicRoughness?.baseColorTexture
    || material.pbrMetallicRoughness?.baseColorFactor
    || material.extensions?.KHR_materials_pbrSpecularGlossiness?.diffuseTexture
    || material.extensions?.KHR_materials_pbrSpecularGlossiness?.diffuseFactor);
console.log(JSON.stringify({
  file,
  bytes: bytes.length,
  sha256: createHash("sha256").update(bytes).digest("hex"),
  meshes: gltf.meshes?.length ?? 0,
  materials: materials.length,
  textures: gltf.textures?.length ?? 0,
  images: gltf.images?.length ?? 0,
  primitives: primitives.map(primitive => ({
    attributes: Object.keys(primitive.attributes),
    material: primitive.material ?? null,
    vertices: gltf.accessors[primitive.attributes.POSITION].count,
    indices: primitive.indices === undefined ? null : gltf.accessors[primitive.indices].count,
  })),
  hasColorData,
  note: hasColorData
    ? "Color data exists; compare the rendered result with the approved source."
    : "No authored color data. Recover the original materials/textures from the source project; a viewer cannot reconstruct them.",
}, null, 2));
if (process.argv.includes("--require-color") && !hasColorData) process.exitCode = 1;
