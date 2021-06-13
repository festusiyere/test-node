import { decode } from '../src/utils/jwt.utils';

test('it should generate a token for user  ', () => {
    const privateKey = config.get('privateKey');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const response = decode(token);
    expect(response).toBe(200);
});
