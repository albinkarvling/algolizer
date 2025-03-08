import type {Config} from "tailwindcss";

export default {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            width: {
                main: "1200px",
            },
            maxWidth: {
                main: "90%",
            },
            colors: {
                "background-primary": "#fff",
                "background-secondary": "#f7f7f7",
                "background-tertiary": "#f0f0f0",
                "text-primary": "#000",
                "text-secondary": "#333",
                "background-conrols": "#02203c",
            },
        },
    },
    plugins: [],
} satisfies Config;
