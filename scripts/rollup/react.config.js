import { getBaseRollupPlugins, getPackageJson, resolvePkgPath } from './utills';
import rollupPlugingeneratepackge from 'rollup-plugin-generate-package-json';
const { name, main } = getPackageJson('react');
//react包路径
const pkgPath = resolvePkgPath(name);
// react产物路径
const pkgDistPath = resolvePkgPath(name, true);

export default [
  //react
  {
    input: `${pkgPath}/${main}`,
    output: {
      file: `${pkgDistPath}/index.js`,
      name: 'index.js',
      format: 'umd',
    },
    plugins: [
      ...getBaseRollupPlugins(),
      rollupPlugingeneratepackge({
        inputFolder: pkgPath,
        outputFolder: pkgDistPath,
        baseContents: ({ name, main, description, version }) => ({
          name,
          version,
          description,
          main: 'index.js',
        }),
      }),
    ],
  },
  //jsx-runtime
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [
      //jsx-runtime
      {
        file: `${pkgDistPath}/jsx-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd',
      },
      //jsx-dev-runtime
      {
        file: `${pkgDistPath}/jsx-dev-runtime.js`,
        name: 'jsx-runtime.js',
        format: 'umd',
      },
    ],
    plugins: getBaseRollupPlugins(),
  },
];
