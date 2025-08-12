export const productImageUrl = (id: string, size: "sm" | "md" | "lg" = "md") => {
  const dims = {
    sm: { w: 400, h: 300 },
    md: { w: 600, h: 450 },
    lg: { w: 960, h: 720 },
  }[size];
  // Deterministic placeholder image per product using picsum
  return `https://picsum.photos/seed/${encodeURIComponent(id)}/${dims.w}/${dims.h}`;
};
