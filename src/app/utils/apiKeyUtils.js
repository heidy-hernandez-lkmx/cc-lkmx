/**
 * Genera una nueva API key con el prefijo "cc-lkmx-"
 */
export const generateApiKey = () => {
  const prefix = "cc-lkmx-";
  const randomPart = Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("");
  return prefix + randomPart;
};

/**
 * Enmascara una API key mostrando solo el prefijo
 */
export const maskKey = (key) => {
  if (!key) return "****************";

  // Prefijo que queremos mostrar
  const prefix = "cc-lkmx-";

  // Si la key comienza con el prefijo, mostrar el prefijo completo y ocultar el resto
  if (key.startsWith(prefix)) {
    return prefix + "*****************************";
  }

  // Si no tiene el prefijo esperado, buscar cualquier guion para mostrar hasta ahí
  const dashIndex = key.indexOf("-");
  if (dashIndex !== -1) {
    const foundPrefix = key.substring(0, dashIndex + 1);
    return foundPrefix + "*****************************";
  }

  // Si no hay guion, mostrar los primeros 4 caracteres y ocultar el resto
  if (key.length <= 8) return "****************";
  return key.substring(0, 4) + "*****************************";
};
