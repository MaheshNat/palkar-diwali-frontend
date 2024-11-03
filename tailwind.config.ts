import { IconBackground } from "@tabler/icons-react";
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  mode: "jit",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          background: "var(--primary-background)",
          light: "var(--primary-light)",
        },
        "primary-light": {
          background: "var(--primary-light-background)",
        },
        "primary-hover": {
          background: "var(--primary-hover-background)",
        },
        "primary-dark": {
          background: "var(--primary-dark-background)",
        },
        "primary-medium": {
          background: "var(--primary-medium-background)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
          border: "var(--secondary-border)",
        },
        tertiary: {
          DEFAULT: "var(--tertiary)",
        },
        "grid-dots": {
          background: "var(--grid-dots)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
          border: "var(--destructive-border)",
        },
        creative: {
          DEFAULT: "var(--creative)",
          foreground: "var(--creative-foreground)",
          background: "var(--creative-background)",
        },
        "green-light": {
          background: "var(--green-light-background)",
          border: "var(--green-light-border)",
          foreground: "var(--green-light-foreground)",
        },
        "blue-light": {
          background: "var(--blue-light-background)",
          border: "var(--blue-light-border)",
          foreground: "var(--blue-light-foreground)",
        },
        successive: {
          DEFAULT: "var(--successive)",
          foreground: "var(--successive-foreground)",
          border: "var(--successive-border)",
        },
        info: {
          DEFAULT: "var(--info)",
          foreground: "var(--info-foreground)",
          border: "var(--info-border)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
          background: "var(--muted-background)",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        "row-edit": {
          DEFAULT: "var(--row-edit)",
          foreground: "var(--row-edit-foreground)",
          border: "var(--row-edit-border)",
        },
        "row-edit-dark": {
          DEFAULT: "var(--row-edit-dark)",
          foreground: "var(--row-edit-dark-foreground)",
          border: "var(--row-edit-dark-border)",
        },
        "row-delete": {
          DEFAULT: "var(--row-delete)",
          foreground: "var(--row-delete-foreground)",
          border: "var(--row-delete-border)",
        },
        "row-create": {
          DEFAULT: "var(--row-create)",
          foreground: "var(--row-create-foreground)",
          border: "var(--row-create-border)",
        },
        "row-select": {
          DEFAULT: "var(--row-select)",
          foreground: "var(--row-select-foreground)",
          border: "var(--row-select-border)",
        },
        "duckdb-varchar": {
          DEFAULT: "var(--duckdb-varchar)",
          light: "var(--duckdb-varchar-light)",
        },
        "duckdb-integer": {
          DEFAULT: "var(--duckdb-integer)",
          light: "var(--duckdb-integer-light)",
        },
        "duckdb-real": {
          DEFAULT: "var(--duckdb-real)",
          light: "var(--duckdb-real-light)",
        },
        "duckdb-boolean": {
          DEFAULT: "var(--duckdb-boolean)",
          light: "var(--duckdb-boolean-light)",
        },
        "duckdb-timestamp": {
          DEFAULT: "var(--duckdb-timestamp)",
          light: "var(--duckdb-timestamp-light)",
        },
        "duckdb-other": {
          DEFAULT: "var(--duckdb-other)",
          light: "var(--duckdb-other-light)",
        },
        "duckdb-hover": "var(--duckdb-hover)",
        "duckdb-text": "var(--duckdb-text)",
        "ner-person": {
          DEFAULT: "var(--ner-person)",
          light: "var(--ner-person-light)",
        },
        "ner-norp": {
          DEFAULT: "var(--ner-norp)",
          light: "var(--ner-norp-light)",
        },
        "ner-fac": {
          DEFAULT: "var(--ner-fac)",
          light: "var(--ner-fac-light)",
        },
        "ner-org": {
          DEFAULT: "var(--ner-org)",
          light: "var(--ner-org-light)",
        },
        "ner-gpe": {
          DEFAULT: "var(--ner-gpe)",
          light: "var(--ner-gpe-light)",
        },
        "ner-loc": {
          DEFAULT: "var(--ner-loc)",
          light: "var(--ner-loc-light)",
        },
        "ner-product": {
          DEFAULT: "var(--ner-product)",
          light: "var(--ner-product-light)",
        },
        "ner-event": {
          DEFAULT: "var(--ner-event)",
          light: "var(--ner-event-light)",
        },
        "ner-work-of-art": {
          DEFAULT: "var(--ner-work-of-art)",
          light: "var(--ner-work-of-art-light)",
        },
        "ner-law": {
          DEFAULT: "var(--ner-law)",
          light: "var(--ner-law-light)",
        },
        "ner-language": {
          DEFAULT: "var(--ner-language)",
          light: "var(--ner-language-light)",
        },
        "ner-date": {
          DEFAULT: "var(--ner-date)",
          light: "var(--ner-date-light)",
        },
        "ner-time": {
          DEFAULT: "var(--ner-time)",
          light: "var(--ner-time-light)",
        },
        "ner-percent": {
          DEFAULT: "var(--ner-percent)",
          light: "var(--ner-percent-light)",
        },
        "ner-money": {
          DEFAULT: "var(--ner-money)",
          light: "var(--ner-money-light)",
        },
        "ner-quantity": {
          DEFAULT: "var(--ner-quantity)",
          light: "var(--ner-quantity-light)",
        },
        "ner-ordinal": {
          DEFAULT: "var(--ner-ordinal)",
          light: "var(--ner-ordinal-light)",
        },
        "ner-cardinal": {
          DEFAULT: "var(--ner-cardinal)",
          light: "var(--ner-cardinal-light)",
        },
        "pii-credit-card": {
          DEFAULT: "var(--pii-credit-card)",
          light: "var(--pii-credit-card-light)",
        },
        "pii-crypto": {
          DEFAULT: "var(--pii-crypto)",
          light: "var(--pii-crypto-light)",
        },
        "pii-email-address": {
          DEFAULT: "var(--pii-email-address)",
          light: "var(--pii-email-address-light)",
        },
        "pii-iban-code": {
          DEFAULT: "var(--pii-iban-code)",
          light: "var(--pii-iban-code-light)",
        },
        "pii-ip-address": {
          DEFAULT: "var(--pii-ip-address)",
          light: "var(--pii-ip-address-light)",
        },
        "pii-phone-number": {
          DEFAULT: "var(--pii-phone-number)",
          light: "var(--pii-phone-number-light)",
        },
        "job-status": {
          finished: {
            bg: "var(--job-status-finished-bg)",
            text: "var(--job-status-finished-text)",
          },
          queued: {
            bg: "var(--job-status-queued-bg)",
            text: "var(--job-status-queued-text)",
          },
          starting: {
            bg: "var(--job-status-starting-bg)",
            text: "var(--job-status-starting-text)",
          },
          started: {
            bg: "var(--job-status-started-bg)",
            text: "var(--job-status-started-text)",
          },
          running: {
            bg: "var(--job-status-running-bg)",
            text: "var(--job-status-running-text)",
          },
          failed: {
            bg: "var(--job-status-failed-bg)",
            text: "var(--job-status-failed-text)",
          },
          canceled: {
            bg: "var(--job-status-canceled-bg)",
            text: "var(--job-status-canceled-text)",
          },
          provisioning: {
            bg: "var(--job-status-provisioning-bg)",
            text: "var(--job-status-provisioning-text)",
          },
        },
        "train-loss": {
          DEFAULT: "var(--train-loss-chart-color)",
        },
        "eval-loss": {
          DEFAULT: "var(--eval-loss-chart-color)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        jb: ["var(--font-jb)"],
        geist: ["var(--font-geist)"],
        poly: ["var(--font-poly)"],
        ibm: ["var(--font-ibm)"],
        mono: ["var(--font-jb)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "top-slide": {
          "0%": {
            transform: "translateX(-50%)",
          },
          "60%": {
            transform: "translateX(10%)",
          },
          "80%": {
            transform: "translateX(-5%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "bottom-slide": {
          "0%": {
            transform: "translateX(50%)",
          },
          "60%": {
            transform: "translateX(-10%)",
          },
          "80%": {
            transform: "translateX(5%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        "dots-opacity-roll": {
          "0%": {
            opacity: "100%",
          },
          "75%": {
            opacity: "0%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        "infinite-slow-scroll": {
          "0%": {
            transform: "scroll(0)",
          },
          "100%": {
            transform: "translateY(-30%)",
          },
        },
        "gears-cw-spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "gears-ccw-spin": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(-360deg)",
          },
        },
        "border-rotate": {
          "0%": {
            backgroundPosition: "0% 0%",
          },
          "100%": {
            backgroundPosition: "200% 0%",
          },
        },
        "spin-slow": {
          "0%": {
            transform: "translate(-50%, -50%) rotate(0deg)",
          },
          "100%": {
            transform: "translate(-50%, -50%) rotate(360deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "top-slide": "top-slide 0.5s ease-in-out",
        "bottom-slide": "bottom-slide 0.5s ease-in-out",
        "dots-opacity-roll": "dots-opacity-roll 1s ease-in-out infinite",
        "infinite-slow-scroll": "infinite-slow-scroll 5s linear infinite",
        "gears-cw-spin": "gears-cw-spin 2s linear infinite",
        "gears-ccw-spin": "gears-ccw-spin 2s linear infinite",
        "border-rotate": "border-rotate 2s linear infinite",
        "spin-slow": "spin-slow 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
