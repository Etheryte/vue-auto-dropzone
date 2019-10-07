const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const cleanupGlobal = require('jsdom-global')()
const Dropzone = require('dropzone');
const libPath = require.resolve('dropzone');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const libString = await fs.readFile(libPath, 'utf8');

    await page.evaluate(libString);

    /*
    const res = await page.evaluate(async () => {
        // @ts-ignore
        const instance = new window.Dropzone(document.body, {
            url: '127.0.0.1',
        });
        const proto = Object.getPrototypeOf(instance);

        // All the events the instance can emit
        const eventNames = proto.events;

        const methodNames = [];
        const propertyNames = [];
        const includeInternal = false;

        Object.entries(proto).forEach(([key, value]) => {
            // Internal values are prefixed with an underscore
            if (!includeInternal && key.startsWith('_')) return;

            if (typeof value === 'function') {
                methodNames.push(key);
            } else {
                propertyNames.push(key);
            }
        });

        return Object.keys(proto);
    });

    console.log(res);
    */

    const instance = new Dropzone(document.body, {
        url: '127.0.0.1',
    });
    const proto = Object.getPrototypeOf(instance);

    console.log(instance.destroy);

    await browser.close();
    await cleanupGlobal();
})();
