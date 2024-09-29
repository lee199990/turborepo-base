/*
 * 字符串操作测试
 * @Author: 
 * @Date:   2024/1/6
 * @Last Modified by:
 * @Last Modified time: 2024/1/6 9:28
 */

import { specifyLengthDivision } from '../../lib/string';

describe('specifyLengthDivision', () => {
    it('应将字符串划分为指定的长度分段', () => {
        // Test case 1
        const result1 = specifyLengthDivision('abcdefghij', 2);
        expect(result1).to.deep.equal(['ab', 'cd', 'ef', 'gh', 'ij']);

        // Test case 2
        const result2 = specifyLengthDivision('abcdefghij', 3);
        expect(result2).to.deep.equal(['abc', 'def', 'ghi', 'j']);

        // Test case 3
        const result3 = specifyLengthDivision('abcdefghij', 5);
        expect(result3).to.deep.equal(['abcde', 'fghij']);
    });
    it('如果输入字符串为空，则应返回一个空数组', () => {
        const result = specifyLengthDivision('', 2);
        expect(result).to.deep.equal([]);
    });

    it('如果切分长度大于字符串的长度，则应将整个字符串作为单个元素返回', () => {
        const result = specifyLengthDivision('abcdefghij', 20);
        expect(result).to.deep.equal(['abcdefghij']);
    });
});
