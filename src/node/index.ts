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
const Dropzone = require('dropzone');
const libPath = require.resolve('dropzone');

const outputFile = path.resolve(process.env.PWD, 'src/components/generated.js');
const { getDeepPropertyNames } = require('./utilities');

(async() => {
    try {
        // Create a placeholder instance to see what's exposed
        const instance = new Dropzone(document.body, {
            // URL is a required parameter, just loop it back
            url: '127.0.0.1',
        });
        const protoKeys = getDeepPropertyNames(instance);

        const methodNames: string[] = [];
        const propertyNames: string[] = [];
        // Exclude fields we want to manually set or ignore
        const exclude = [
            'constructor',
            'options',
        ];
        const includeInternal = false;

        protoKeys.forEach(key => {
            if (exclude.indexOf(key) !== -1) return;
            // Internal values are prefixed with an underscore
            if (!includeInternal && key.startsWith('_')) return;

            const value = instance[key];
            if (typeof value === 'function') {
                methodNames.push(key);
            } else {
                propertyNames.push(key);
            }
        });

        // Just for debug convenience
        methodNames.sort();
        propertyNames.sort();

        // For Dropzone methods that we don't define, autofill them with a pass-through to the underlying instance
        // Each is a computed property getter-setter pair that updates the underlying instance
        const computedMethodPartials = methodNames.reduce((result, name) => {
            // Stringify doesn't expand context variables, so inline the name here instead
            const computed = {
                cache: false,
                get: new Function(`return function ${name}() {
                    return this.instance.${name};
                }`)(),
                set: new Function(`return function ${name}(value) {
                    this.instance.${name} = value;
                }`)(),
            };
            result[name] = computed;
            return result;
        }, {});

        // For all properties, make them non-cached computed properties, e.g. just getters
        const computedPropertyPartials = propertyNames.reduce((result, name) => {
            const computed = {
                cache: false,
                get: new Function(`return function ${name}() {
                    return this.instance.${name};
                }`)(),
            };
            result[name] = computed;
            return result;
        }, {});

        const output = `// NB! THIS IS A GENERATED FILE. ANY MODIFICATIONS YOU MAKE WILL BE LOST WITH THE NEXT BUILD.
        export const computedMethodPartials = ${stringify(computedMethodPartials)};
        export const computedPropertyPartials = ${stringify(computedPropertyPartials)};
        `;
        // Fix generic stringifying output issues with default values, let ESLint handle the rest
        const pretty = prettier.format(output);

        // The calling script calls ESLint in turn
        await fs.writeFile(outputFile, pretty);
        await jsdomCleanup();
    } catch (e) {
        console.error(e);
        (process as any).exit(1);
    }
})();
