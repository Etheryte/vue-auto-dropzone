const fs = require('fs').promises;
const path = require('path');

const vue = require('vue');
const puppeteer = require('puppeteer');
const stringify = require('javascript-stringify').stringify;

const prettier = require('prettier');
const Linter = require('eslint').Linter;
const linter = new Linter();
const linterConfig = require(path.resolve(process.env.PWD, '.eslintrc.js'));

// Dropzone requires a DOM context
const jsdomCleanup = require('jsdom-global')();
const Dz = require('dropzone');

const { getDeepPropertyNames, getTypeHint } = require('./utilities');

const stylePath = require.resolve('dropzone/dist/min/dropzone.min.css');
const styleOutputPath = path.resolve(process.env.PWD, 'src/component/generated.css');
const scriptOutputPath = path.resolve(process.env.PWD, 'src/component/Generated.vue');

(async() => {
    try {
        // Create a placeholder instance to see what's exposed
        const instance = new Dz(document.body, {
            // URL is a required parameter, just loop it back
            url: '127.0.0.1',
        });
        const protoKeys = getDeepPropertyNames(instance);

        const methodNames: string[] = [];
        const propertyNames: string[] = [];
        // Hint at types where Dropzone doesn't provide definitions
        const typeHints: string[] = [];
        // Exclude fields we want to manually set or ignore
        const exclude = [
            // Yeah nah
            'constructor',
            // We use this as a prop
            'options',
            // Internal dependencies
            // 'Emitter',
            // 'URL',
        ];
        const includeInternal = false;
        // The methods etc are sourced from Dropzone so hint that in Intellisense
        const generatedClassName = 'Dropzone';

        // TODO: Implement type hints via typing live things
        protoKeys.forEach(key => {
            if (exclude.indexOf(key) !== -1) return;
            // Internal values are prefixed with an underscore
            if (!includeInternal && key.startsWith('_')) return;

            const value = instance[key];
            typeHints.push(`${key}: ${getTypeHint(value)}`);
            if (typeof value === 'function') {
                methodNames.push(key);
            } else {
                propertyNames.push(key);
            }
        });

        // Just for debug convenience
        methodNames.sort();
        propertyNames.sort();
        typeHints.sort();

        // For Dropzone methods that we don't define, autofill them with a pass-through to the underlying instance
        // Each is a computed property getter-setter pair that updates the underlying instance
        const computedMethodPartials = methodNames.map((name) => {
            // Stringify doesn't expand context variables, so inline the name here instead
            return `
                get ${name}(this: ${generatedClassName}) {
                    return this.instance.${name};
                }
                set ${name}(this: ${generatedClassName}, value) {
                    this.instance.${name} = value;
                }
            `;
        });

        // For all properties, make them non-cached computed properties, e.g. just getters
        const computedPropertyPartials = propertyNames.map((name) => {
            return `get ${name}(this: ${generatedClassName}) {
                return this.instance.${name};
            }`;
        });

        const combinedPartials = ([] as string[])
            .concat(computedMethodPartials)
            .concat(computedPropertyPartials)
            .join('\n');

        const output = `<script lang="ts">
        // NB! THIS IS A GENERATED FILE. ANY MODIFICATIONS YOU MAKE HERE WILL BE LOST WITH THE NEXT BUILD.
        import Vue from 'vue';
        import Component from 'vue-class-component';

        import { DropzoneInstance } from './interfaces';

        // Dropzone type definitions aren't up to date, hint the user where possible
        interface TypeHints {
            ${typeHints}
        }

        // Assuming every key has a hint
        type UntypedKeys = Exclude<keyof TypeHints, keyof DropzoneInstance>;
        type UntypedFields = Pick<TypeHints, UntypedKeys>

        @Component
        export default class ${generatedClassName} extends Vue {
            instance!: DropzoneInstance & UntypedFields;

            ${combinedPartials}
        }
        </script>
        `;

        const pretty = prettier.format(output, {
            parser: 'vue',
        });

        // The calling script calls ESLint in turn
        await fs.writeFile(scriptOutputPath, pretty, 'utf8');
        await jsdomCleanup();

        // Mirror styles at the time of bundling to avoid release-out-of-sync issues
        const styles = await fs.readFile(stylePath, 'utf8');
        await fs.writeFile(styleOutputPath, styles, 'utf8');
    } catch (e) {
        console.error(e);
        (process as any).exit(1);
    }
})();
