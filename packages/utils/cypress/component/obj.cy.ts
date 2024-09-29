import { upperObjectKey } from '../../lib';

describe('upperObjectKey', () => {
    it('将对象的键转为大写', () => {
        const obj = {
            name: 'Alice',
            age: 30,
            city: 'Beijing'
        };

        const result = upperObjectKey(obj);

        expect(result).to.deep.equal({
            NAME: 'Alice',
            AGE: 30,
            CITY: 'Beijing'
        });
    });

    it('保持对象的原始属性顺序', () => {
        const obj = {
            name: 'Alice',
            age: 30,
            city: 'Beijing'
        };

        const result = upperObjectKey(obj);

        const expectedKeys = Object.keys(obj).map(key => key.toUpperCase());
        expect(Object.keys(result)).to.deep.equal(expectedKeys);
    });

    it('对空对象返回空对象', () => {
        const obj = {};

        const result = upperObjectKey(obj);

        expect(result).to.deep.equal({});
    });
});
