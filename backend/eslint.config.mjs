import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import jest from "eslint-plugin-jest";

export default [
    eslint.configs.recommended,
    {
        "env": {
            "node": true,
            "commonjs": true
        }
    },
    {
        ignores: ["build"],
    },
    {
        files: ["**/*.js", "**/*.spec.js"],

        plugins: {
            "@stylistic": stylistic,
        },
        rules: {
            "@stylistic/no-multiple-empty-lines": [
                "error",
                {
                    max: 1,
                    maxEOF: 1,
                    maxBOF: 0,
                },
            ],
            "@stylistic/indent": ["error", 2, {SwitchCase: 1}],
            "@stylistic/quotes": ["error", "single"],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/comma-dangle": ["error", "always-multiline"],
            "@stylistic/no-tabs": ["error"],
            "@stylistic/max-len": [
                "error",
                {
                    code: 120,
                    tabWidth: 2,
                },
            ],
            "@stylistic/arrow-parens": ["error", "always"],
            "@stylistic/brace-style": ["error", "1tbs", {allowSingleLine: false}],
            "@stylistic/no-inner-declarations": "off",
        },
    },
    {
        files: ["**/*.spec.js"],
        plugins: {jest},
    },

];
