export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: { main: "#a21dfbff" },
        background: {
            default: mode === "light" ? "#f5f7fa" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#9aebeeff",
        },
    },
    shape: { borderRadius: 12 },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: { padding: "1.5rem", borderRadius: "16px" },
            },
        },
    },
});
