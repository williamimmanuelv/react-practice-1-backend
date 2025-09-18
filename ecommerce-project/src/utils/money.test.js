import { it, expect, describe } from 'vitest';
import { formatMoney } from './money';

describe('formatMoney', () => {
    it('formats 1999 as $19.99', () => {
        expect(formatMoney(1999)).toBe('$19.99')
    });

    it('displays two decimals', () => {
        expect(formatMoney(1090)).toBe('$10.90');
        expect(formatMoney(100)).toBe('$1.00')
    })

})