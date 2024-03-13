import { getBaseRollupPlugins, getPackageJson, resolvePkgPath } from './utills';
import rollupPlugingeneratepackge from 'rollup-plugin-generate-package-json';
import alias from '@rollup/plugin-alias';
const { name, module } = getPackageJson('react-dom');
//react-dom包路径
const pkgPath = resolvePkgPath(name);
// react-dom产物路径
const pkgDistPath = resolvePkgPath(name, true);

export default [
  //react-dom
  {
    input: `${pkgPath}/${module}`,
    output: [
      {
        file: `${pkgDistPath}/index.js`,
        name: 'ReactDOM',
        format: 'umd',
      },
      {
        file: `${pkgDistPath}/client.js`,
        name: 'client',
        format: 'umd',
      },
    ],
    plugins: [
      ...getBaseRollupPlugins(),
      alias({
        entries: {
          hostConfig: `${pkgPath}/src/hostConfig.ts`,
        },
      }),
      rollupPlugingeneratepackge({
        inputFolder: pkgPath,
        outputFolder: pkgDistPath,
        baseContents: ({ name, main, description, version }) => ({
          name,
          version,
          description,
          peerDependencies: {
            react: version,
          },
          main: 'index.js',
        }),
      }),
    ],
  },
];
