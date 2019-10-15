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
            // We provide these as getters
            'getAcceptedFiles',
            'getRejectedFiles',
            'getQueuedFiles',
            'getUploadingFiles',
            'getAddedFiles',
            'getActiveFiles',
        ];
        const includeInternal = false;
        // The methods etc are sourced from Dropzone so hint that in Intellisense
        const baseClassName = 'VueAutoDropzone';

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

        // TODO: Obsolete?
        // const sourceComments = getComments([...methodNames, ...propertyNames].sort());
        // console.log(sourceComments);

        // For Dropzone methods that we don't define, autofill them with a pass-through to the underlying instance
        // Each is a computed property getter-setter pair that updates the underlying instance
        const computedMethodPartials = methodNames.map((name) => {
            // Stringify doesn't expand context variables, so inline the name here instead
            //  CombinedInstance['${name}']
            return `
                ${comments[name] ? `/** ${comments[name]} */` : ''}
                ${name}(...args: Parameters<CombinedInstance['${name}']>) {
                    return this.instance.${name}.apply(this, args);
                }
                /** Overwrite Dropzone's internal \`${name}()\` method */
                set${capitalizeFirstLetter(name)}(value: CombinedInstance['${name}']) {
                    this.instance.${name} = value;
                }
            `;
        });

        // For all properties, make them non-cached computed properties, e.g. just getters
        const computedPropertyPartials = propertyNames.map((name) => {
            return `
                ${comments[name] ? `/** ${comments[name]} */` : ''}
                get ${name}(this: ${baseClassName}) {
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
            .replace('// $$COMBINED_PARTIALS', combinedPartials);

        const output = prettier.format(rawOutput, {
            parser: 'vue',
        });

        // The calling script calls ESLint in turn
        await fs.writeFile(componentOutputPath, output, 'utf8');
        await jsdomCleanup();

        // Mirror styles at the time of bundling to avoid release-out-of-sync issues
        const styles = await fs.readFile(stylePath, 'utf8');
        await fs.writeFile(styleOutputPath, styles, 'utf8');
    } catch (e) {
        console.error(e);
        (process as any).exit(1);
    }
})();
