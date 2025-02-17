const path = require("path");

module.exports = {
    webpack: {
        alias: {
            "@api": path.resolve(__dirname, "src/api"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@components": path.resolve(__dirname, "src/components"),
            "@routes": path.resolve(__dirname, "src/routes"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
        },
    },
};
