import { ComputedOptions } from 'vue';
import { createDecorator } from 'vue-class-component';

const NoCache = createDecorator((options, key) => {
    if (!options.computed) return;
    const field = options.computed[key] as ComputedOptions<any>;
    field.cache = false;
});

export default NoCache;
