import { createConatiner, updateContainer } from 'react-reconciler/src/fiberReconciler';
import { Container } from './hostConfig';
import { ReactElementType } from 'shared/ReactTypes';

export function createRoot(container: Container) {
  const root = createConatiner(container);
  return {
    render(element: ReactElementType) {
      updateContainer(element, root);
    },
  };
}
