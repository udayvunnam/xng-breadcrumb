module.exports = {
  name: '@xng/xng-breadcrumb',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/xng-breadcrumb',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
