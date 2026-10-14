export function generateId() {
  return `${Date.now() + (Math.random() * 10 + 1)}`;
}
