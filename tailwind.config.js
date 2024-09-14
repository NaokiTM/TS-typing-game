/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'bg-emerald-600',
    'bg-neutral-100',
    'text-black',
    'text-neutral-700',
    'bg-red-600',
    'bg-black',
    'from-red-600',
    'to-black',
    'from-emerald-600',
    'to-neutral-100',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

