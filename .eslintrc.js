module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "airbnb-typescript",
    ],
    overrides: [
      {
        files: ['*.ts', '*.tsx'], // Your TypeScript files extension
        parserOptions: {
          project: ['./tsconfig.json'], // Specify it only for TypeScript files
        },
      }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        "project": ["tsconfig.json"]
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
    }
};
