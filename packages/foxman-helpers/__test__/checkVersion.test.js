const {checkVersion} = require('../lib/checkVersion');
const path = require('path');

test('checkVersion', function () {
    expect(
        /** result */
        checkVersion({ version: '2.0.0', versionLimit: '1.0.0' })
    ).toBe(
        /** expectedValue */
        true
        );

    expect(
        /** result */
        checkVersion({ version: '1.0.0', versionLimit: '2.0.0' })
    ).toBe(
        /** expectedValue */
        false
        );
});

test('checkVersion-prerelease', function () {
    expect(
        /** result */
        checkVersion({ version: '1.0.0', versionLimit: '1.0.0-0' })
    ).toBe(
        /** expectedValue */
        true
        );
});