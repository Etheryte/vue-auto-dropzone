module.exports = {
    // Adaptation of https://flaviocopes.com/how-to-list-object-methods-javascript/
    getDeepPropertyNames(input: Object) {
        let properties: Set<string> = new Set();

        for (let current = input; current && current.constructor !== Object; current = Object.getPrototypeOf(current)) {
            Object.getOwnPropertyNames(current).forEach(name => {
                properties.add(name);
            });
        }

        // Sorted simply for an easier debugging overview
        return [...properties.keys()];
    },
};
