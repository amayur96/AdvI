/**
 * AdvI Design Tokens — single source of truth.
 * Consumed by: Tailwind preset, CSS variable generator, and JS imports.
 */

export const colors = {
  maize: {
    50: "#FFFDF0",
    100: "#FFF9D6",
    200: "#FFF0A8",
    300: "#FFE57A",
    400: "#FFD84D",
    500: "#FFCB05",
    600: "#D4A904",
    700: "#AA8703",
    800: "#806502",
    900: "#554401",
  },
  umblue: {
    50: "#E8F0FA",
    100: "#B8D0EE",
    200: "#88B0E2",
    300: "#5890D6",
    400: "#2870CA",
    500: "#1B4F8F",
    600: "#0D3B6E",
    700: "#00274C",
    800: "#001D38",
    900: "#001324",
  },
  surface: "#ffffff",
  background: "#F8FAFC",
  border: "#E2E8F0",
  success: "#10B981",
  "success-bg": "#D1FAE5",
  warning: "#F59E0B",
  "warning-bg": "#FEF3C7",
  danger: {
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
  },
};

export const fonts = {
  sans: "'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

export const radius = {
  DEFAULT: "12px",
  sm: "8px",
  lg: "16px",
  xl: "20px",
  full: "9999px",
};

export const shadows = {
  sm: "0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04)",
  lg: "0 10px 15px -3px rgba(0,0,0,.08), 0 4px 6px -2px rgba(0,0,0,.04)",
};
