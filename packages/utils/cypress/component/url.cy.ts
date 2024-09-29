import { objectToQueryParams } from '../../lib';

describe('objectToQueryParams', () => {
    it('字符串应该正确转为路由 ', () => {
        expect(objectToQueryParams({ method: 'get', p: '2' })).eq(
            'method=get&p=2',
            '路由参数字符串'
        );

        expect(objectToQueryParams({ method: 'get', p: '{}' })).eq(
            'method=get&p=%7B%7D',
            '应该转义花括号'
        );

        expect(objectToQueryParams({ a: [1, 2] })).eq('a=1%2C2', '应该转义数组');
    });

    it('应该正确处理空对象', () => {
        expect(objectToQueryParams({})).eq('', '应该为空');
    });
});
