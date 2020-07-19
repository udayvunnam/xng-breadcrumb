module.exports = {
  name: 'star-wars',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/star-wars',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
