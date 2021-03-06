(async() => {
    const fs = require('fs').promises;
    const path = require('path');

    const prettier = require('prettier');

    // Dropzone requires a DOM context
    const jsdomCleanup = require('jsdom-global')();
    const Dz = require('dropzone');

    const { getDeepPropertyNames, getTypeHint, capitalizeFirstLetter } = require('./utilities');

    const comments = require(path.resolve(process.env.PWD, 'src/component/comments.ts'));
    const stylePath = require.resolve('dropzone/dist/min/dropzone.min.css');
    const styleOutputPath = path.resolve(process.env.PWD, 'src/component/vueAutoDropzone.css');
    // TODO: Use minified instead?
    const libraryPath = require.resolve('dropzone/dist/dropzone.js');
    const libraryOutputPath = path.resolve(process.env.PWD, 'src/component/dropzone.js');
    const componentBasePath = path.resolve(process.env.PWD, 'src/component/ComponentBase.vue');
    const componentOutputPath = path.resolve(process.env.PWD, 'src/component/VueAutoDropzone.vue');

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
            // Internal dependencies
            'Emitter',
            'URL',
            // We use this as a prop
            'options',
            // We override this to make it reactive
            'files',
            // We provide this as a more general public method
            'addFile',
            // We provide these as getters
            'getAcceptedFiles',
            'getRejectedFiles',
            'getQueuedFiles',
            'getUploadingFiles',
            'getAddedFiles',
            'getActiveFiles',
            // Internal logic
            'clickableElements',
            'element', // Use $el instead
            'previewsContainer', // Can be the container or a fragment, don't expose
            'previewTemplate', // Use slots instead
            'init', // Use Vue hooks instead
        ];
        const includeInternal = false;
        const baseClassName = 'VueAutoDropzone';
        const defaultMessage = instance.options.dictDefaultMessage;

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
            //  CombinedInstance['${name}']
            return `
                ${comments[name] ? `/** ${comments[name]} */` : ''}
                ${name}(...args: Parameters<CombinedInstance['${name}']>) {
                    if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
                    return this.instance.${name}.apply(this.instance, args);
                }
                /** Overwrite Dropzone's internal \`${name}()\` method */
                set${capitalizeFirstLetter(name)}(value: CombinedInstance['${name}']) {
                    if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
                    this.instance.${name} = value;
                }
            `;
        });

        // For all properties, make them non-cached computed properties, e.g. just getters
        const computedPropertyPartials = propertyNames.map((name) => {
            return `
                ${comments[name] ? `/** ${comments[name]} */` : ''}
                @NoCache
                get ${name}(this: ${baseClassName}) {
                    if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
                    return this.instance.${name};
                }
            `;
        });

        const combinedPartials = ([] as string[])
            .concat(computedMethodPartials)
            .concat(computedPropertyPartials)
            .join('\n');

        const componentBase = await fs.readFile(componentBasePath, 'utf8');

        const rawOutput = componentBase
            .replace('// $$HEADER', '// NB! THIS IS A GENERATED FILE. ANY MODIFICATIONS YOU MAKE HERE WILL BE LOST.')
            .replace('// $$TYPE_HINTS', typeHints)
            .replace('// $$DEFAULT_MESSAGE', defaultMessage)
            .replace('// $$COMBINED_PARTIALS', combinedPartials);

        const output = prettier.format(rawOutput, {
            parser: 'vue',
        });

        // The calling script calls ESLint in turn
        await fs.writeFile(componentOutputPath, output, 'utf8');
        await jsdomCleanup();

        // Mirror styles at the time of bundling to avoid release-out-of-sync issues
        const styles = await fs.readFile(stylePath, 'utf8');
        await fs.writeFile(styleOutputPath, [
            styles,
            `.vue-auto-dropzone.is-hidden {display: block;width: 0;height: 0;margin: 0;padding: 0;overflow: hidden;}`,
        ].join(''), 'utf8');

        // Monkeypatch Dropzone for SSR
        const baseLib = await fs.readFile(libraryPath, 'utf8');
        const rawLib = baseLib.substring('"use strict";'.length);
        const lib = [
            '/* eslint-disable */',
            '/// <reference path="dropzone" />',
            // '"use strict";',
            // rawLib,
            // 'Dropzone.autoDiscover = false;', // Only mount manually
            baseLib,
        ].join('\n');
        await fs.writeFile(libraryOutputPath, lib, 'utf8');
    } catch (e) {
        console.error(e);
        (process as any).exit(1);
    }
})();
