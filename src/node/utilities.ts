module.exports = {
    // Adaptation of https://flaviocopes.com/how-to-list-object-methods-javascript/
    getDeepPropertyNames(input: Object) {
        let properties: Set<string> = new Set();

        for (let current = input; current && current.constructor !== Object; current = Object.getPrototypeOf(current)) {
            Object.getOwnPropertyNames(current).forEach(name => {
                properties.add(name);
            });
        }

        return [...properties.keys()];
    },
    lexicographicCompare(a: string, b: string) {
        return a.localeCompare(b);
    },
    getTypeHint(input: any) {
        if (typeof input === 'undefined' || input === null) return 'any';
        if (Array.isArray(input)) return 'any[]';
        if (typeof input === 'function') return 'Function';
        return typeof input;
    },
};
