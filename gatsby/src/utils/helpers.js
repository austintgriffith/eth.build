export const isBrowser = typeof window !== "undefined"
export const isProduction = process.node_ENV === "production"
export const isMobile =
  isBrowser && window.matchMedia("(max-width: 767px)").matches
