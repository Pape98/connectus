module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"indent": "off",
		"linebreak-style": [
			"error",
			"unix"
		],
		"semi": [
			"error",
			"always"
		],
		"no-unused-vars": "warn",
		"react/prop-types": 0

	}
};
