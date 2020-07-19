module.exports = {
  name: 'got-demo',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/got-demo',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
