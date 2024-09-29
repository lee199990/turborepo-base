/*
 * 文件简短说明
 * @Author: 
 * @Date:   2024/1/5
 * @Last Modified by:
 * @Last Modified time: 2024/1/5 11:42
 */
import { proportion, randomIntThroughRange, toFloor } from '../../lib'

describe('toFloor', () => {
    it('将数字按照指定位数向下取整', () => {
        expect(toFloor(3.145, 2)).to.equal('3.14')
        expect(toFloor(3.145, 0)).to.equal('3')
    })

    it('对于零值返回字符串 "0"', () => {
        expect(toFloor(0)).to.equal('0')
    })

    it('对于 zeroSpaced 为 true 时，在小数点后补充指定数量的零', () => {
        expect(toFloor(3.14, 4, true)).to.equal('3.1400')
    })

    it('对于不需要补充零的情况，不在小数点后补充零', () => {
        expect(toFloor(3.14, 3, false)).to.equal('3.14')
    })
})

describe('proportion', () => {
    it('应该返回正确的占比', () => {
        expect(proportion(5, 0, 100)).equal(0.05)
        expect(proportion(50, 0, 100)).equal(0.5)
    })
    it('X小于min时返回0', () => {
        expect(proportion(0, 0, 100)).equal(0)
        expect(proportion(-1, 0, 100)).equal(0)
    })
    it('X大于max时返回1', () => {
        expect(proportion(100, 0, 100)).equal(1)
        expect(proportion(110, 0, 100)).equal(1)
    })
})

describe('random', () => {
    it('应该返回范围内的数字', () => {
        // 测试返回值应该在指定的数字范围内
        expect(randomIntThroughRange(0, 9)).to.match(/^[0-9]$/)
    })
    it('上下限一致时应该返回相同的数字', () => {
        expect(randomIntThroughRange(0, 0)).to.equal(0)
    })
    it('上下限相差1时应该返回相同的数字', () => {
        expect(randomIntThroughRange(0, 1)).to.match(/^[01]$/)
    })
})
