import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]
	},
	{
		languageOptions: { 
			globals: globals.browser 
		}
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		rules:{
			"no-unused-vars": ["warn", {
				vars: "all",
				args: "all",
				ignoreRestSiblings: false,
				argsIgnorePattern: "^_",
			}],
//			"indent": ["warn", "tab"],
		}
	},
];