import { expect } from 'chai';
import { genEvent } from '../event_func/generate_event';

describe('Test the APP', () => {
    it('generate event schedule from file', () => {
        const path = 'example-event.json';

        const events = genEvent(path);

        for (const event of events) {
            console.log(event);
            const desc = event.description;
            expect(typeof desc === 'string').to.be.eq(true);
        }
    });
});
