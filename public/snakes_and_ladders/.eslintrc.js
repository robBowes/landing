module.exports = {
    "env": {
        "browser": true,
        "commonjs": true
    },
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "valid-jsdoc": [
            "warning",
            "never"
        ]
    }
};
