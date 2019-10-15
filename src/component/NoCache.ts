import { createDecorator } from 'vue-class-component';
import { ComputedOptions } from 'vue';

const NoCache = createDecorator((options, key) => {
    if (!options.computed) return;
    const field = options.computed[key] as ComputedOptions<any>;
    field.cache = false;
});

export default NoCache;
