import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export default [
    {
        ignores: ['node_modules', 'build'],
    },
    {
        plugins: {
            react: eslintPluginReact,
            import: eslintPluginImport,
            'jsx-a11y': eslintPluginJsxA11y,
            'react-hooks': eslintPluginReactHooks,
        },
        rules: {
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    },
];
