const fs = require('fs').promises;
const path = require('path');

const vue = require('vue');
const puppeteer = require('puppeteer');
const stringify = require('javascript-stringify').stringify;

// TODO: This or sth else, format the output component, write, then minifiy to .min
const prettier = require('prettier');
const Linter = require('eslint').Linter;
const linter = new Linter();
const linterConfig = require(path.resolve(process.env.PWD, '.eslintrc.js'));

// Dropzone requires a DOM context
const jsdomCleanup = require('jsdom-global')();
const Dropzone = require('dropzone');
const libPath = require.resolve('dropzone');

const fileHeaderPath = path.resolve(process.env.PWD, 'src/node/header.js');
const outputFile = path.resolve(process.env.PWD, 'src/components/generated.js');
const { getDeepPropertyNames } = require('./utilities');

(async() => {
    // Create a placeholder instance to see what's exposed
    const instance = new Dropzone(document.body, {
        // URL is a required parameter, just loop it back
        url: '127.0.0.1',
    });
    const protoKeys = getDeepPropertyNames(instance);

    // All the events the instance can emit
    const eventNames: string[] = instance.events;
    const methodNames: string[] = [];
    const propertyNames: string[] = [];
    const includeInternal = false;

    protoKeys.forEach(key => {
        // Internal values are prefixed with an underscore
        if (!includeInternal && key.startsWith('_')) return;

        const value = instance[key];
        if (typeof value === 'function') {
            methodNames.push(key);
        } else {
            propertyNames.push(key);
        }
    });

    // console.log('methods', methodNames);
    // console.log('props', propertyNames);

    // For Dropzone methods that we don't define, autofill them with a pass-through to the underlying instance
    const methodPartials = methodNames.reduce((result, name) => {
        // TODO: Types
        // Stringify doesn't expand context variables, so inline the name here instead
        const method = new Function(`return function ${name}(...args) {
            return this.dropzone.${name}.apply(this, args);
        }`)();
        result[name] = method;
        return result;
    }, {});

    // For all properties, make them non-cached computed properties, e.g. just getters
    const computedPartials = propertyNames.reduce((result, name) => {
        const computed = {
            cache: false,
            get: new Function(`return function ${name}() {
                return this.dropzone.${name};
            }`)(),
        };
        result[name] = computed;
        return result;
    }, {});

    // This is a glorious hack to keep types for dev but get the flat configuration object for production
    let componentDefinition;
    // Vue.extend() binds additional properties to the object, so feed it a copy
    vue.extend(Object.assign({}, componentDefinition = {
        data() {
            return {
                hasBeenMounted: false,
            };
        },
        mounted() {
            if (this.$isServer && this.hasBeenMounted) {
                return;
            }
            this.hasBeenMounted = true;
            /*
            this.dropzone = new Dropzone(
                this.$refs.dropzoneElement,
                this.dropzoneSettings
            );
            */
        },
        // TODO: Filter partials against what we define here
        methods: methodPartials,
        // TODO: Ibid
        computed: computedPartials,
    }));

    const definitionString = stringify(componentDefinition);
    const header = await fs.readFile(fileHeaderPath);
    const component = `${header}
    export default ${definitionString};
    `;
    // Fix generic stringify output issues with default values, let ESLint handle the rest
    const pretty = prettier.format(component);

    // The calling script calls ESLint in turn
    await fs.writeFile(outputFile, pretty);
    await jsdomCleanup();
})();
