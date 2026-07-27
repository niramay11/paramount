export default function loadFeatures() {
  return import("framer-motion").then((mod) => mod.domAnimation);
}
