import { createStandardUrl, createSubdomains } from '../../lib/tools'

describe('tools', () => {
    it('createSubdomains', () => {
        expect(createSubdomains('{s}.a.com', [])).be.an('array', '应该返回一个数组')
        expect(createSubdomains('{s}.a.com', [])).deep.equal(['{s}.a.com'], '应该返回原始字符')
        expect(createSubdomains('{s}.a.com', ['t1', 't2'])).deep.equal(['t1.a.com', 't2.a.com'], '应该替换并且返回对应条目')
    })

    it('createStandardUrl', () => {
        expect(createStandardUrl('a.com', {})).be.an('string', '应返回字符串')
    })
})
