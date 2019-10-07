const puppeteer = require('puppeteer');
const fs = require('fs').promises;

// Dropzone requires a DOM context
const jsdomCleanup = require('jsdom-global')()
const Dropzone = require('dropzone');
const libPath = require.resolve('dropzone');

// Adaptation of https://flaviocopes.com/how-to-list-object-methods-javascript/
function getDeepPropertyNames(input) {
    let properties: Set<string> = new Set();

    for (let current = input; current && current.constructor !== Object; current = Object.getPrototypeOf(current)) {
        Object.getOwnPropertyNames(current).forEach(name => {
            properties.add(name)
        });
    }

    // Sorted simply for an easier debugging overview
    return [...properties.keys()];
}

(async() => {
    // TODO: Obsolete?
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const libString = await fs.readFile(libPath, 'utf8');

    await page.evaluate(libString);

    // Create a placeholder instance to see what's exposed
    const instance = new Dropzone(document.body, {
        // URL is a required parameter, just loop it back
        url: '127.0.0.1',
    });
    const protoKeys = getDeepPropertyNames(instance);

    // All the events the instance can emit
    const eventNames = instance.events;
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

    console.log('methods', methodNames);
    console.log('props', propertyNames);

    await browser.close();
    await jsdomCleanup();
})();
