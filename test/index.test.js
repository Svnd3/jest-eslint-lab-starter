const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('capitalizeWords', () => {
    test('capitalizes each word in a sentence', () => {
        expect(capitalizeWords('hello world')).toBe('Hello World');
    });

    test('handles single word', () => {
        expect(capitalizeWords('hello')).toBe('Hello');
    });

    test('handles empty string', () => {
        expect(capitalizeWords('')).toBe('');
    });

    test('handles special characters', () => {
        expect(capitalizeWords('hello-world')).toBe('Hello-World');
    });

    test('handles mixed casing', () => {
        expect(capitalizeWords('hELLo woRLD')).toBe('HELLo WoRLD');
    });
});

describe('filterActiveUsers', () => {
    test('filters active users from mixed list', () => {
        const users = [
            { name: 'Alice', isActive: true },
            { name: 'Bob', isActive: false },
        ];

        expect(filterActiveUsers(users)).toEqual([
            { name: 'Alice', isActive: true },
        ]);
    });

    test('returns empty array if all users inactive', () => {
        const users = [{ name: 'Bob', isActive: false }];

        expect(filterActiveUsers(users)).toEqual([]);
    });

    test('returns empty array for empty input', () => {
        expect(filterActiveUsers([])).toEqual([]);
    });

    test('handles missing isActive property', () => {
        const users = [{ name: 'Charlie' }];
        expect(filterActiveUsers(users)).toEqual([]);
    });
});

describe('logAction', () => {
    test('returns formatted log string', () => {
        const result = logAction('login', 'Alice');

        expect(result).toMatch(/User Alice performed login at/);
    });

    test('handles empty strings', () => {
        const result = logAction('', '');

        expect(result).toMatch(/User\s{2}performed\s{2}at/);
    });

    test('handles missing parameters', () => {
        const result = logAction();

        expect(result).toMatch(/User undefined performed undefined at/);
    });

    test('includes valid ISO timestamp', () => {
        const result = logAction('login', 'Alice');
        const datePart = result.split(' at ')[1];

        expect(new Date(datePart).toString()).not.toBe('Invalid Date');
    });
});
