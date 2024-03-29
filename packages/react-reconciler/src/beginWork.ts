import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode } from './fiber';
import { UpdateQueue, processUpdateQueue } from './updateQueue';
import { HostComponent, HostRoot, HostText } from './workTags';
import { mountChildFibers, reconcileChildFibers } from './childFibers';

// 递归中的往下
export function beginWork(wip: FiberNode) {
  //比较tag,返回fiberNode
  switch (wip.tag) {
    case HostRoot:
      return updateHostRoot(wip);
    case HostComponent:
      return updateHostComponent(wip);
    case HostText:
      return null;
    default:
      if (__DEV__) {
        console.warn('beginWork未实现类型');
      }
      break;
  }
  return null;
}
const updateHostRoot = (wip: FiberNode) => {
  const baseState = wip.memorizedState;
  const updateQuene = wip.updateQueue as UpdateQueue<Element>;
  const pending = updateQuene?.shared.pending;
  updateQuene.shared.pending = null;
  const { memorizedState } = processUpdateQueue(baseState, pending);
  wip.memorizedState = memorizedState;

  // 子节点
  const nextChildren = wip.memorizedState;
  reconcileChildren(wip, nextChildren);
  return wip.child;
};

const updateHostComponent = (wip: FiberNode) => {
  const nextProps = wip.pendingProps;
  const nextChildren = nextProps.children;
  reconcileChildren(wip, nextChildren);
  return wip.child;
};

function reconcileChildren(wip: FiberNode, children?: ReactElementType) {
  const current = wip.alternate;
  if (current !== null) {
    // update
    wip.child = reconcileChildFibers(wip, current?.child, children);
  } else {
    // mount
    wip.child = mountChildFibers(wip, null, children);
  }
}
