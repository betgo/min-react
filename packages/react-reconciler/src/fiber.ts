import { Key, Props, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
import { UpdateQueue } from './updateQueue';

export class FiberNode {
  type: any;
  tag: WorkTag;
  pendingProps: Props;
  key: Key;
  stateNode: any;
  ref: Ref;

  return: FiberNode | null;
  sibling: FiberNode | null;
  child: FiberNode | null;
  index: number;

  memorizedProps: Props;
  memorizedState: any;
  alternate: FiberNode | null;
  flags: Flags;
  updateQueue: UpdateQueue<any> | null;

  constructor(tag: WorkTag, pedingProps: Props, key: Key) {
    // 实例
    this.tag = tag;
    this.key = key;

    this.stateNode = null;

    this.type = null;

    // 构成树状结构
    this.return = null;
    this.sibling = null;
    this.child = null;
    this.index = 0;

    this.ref = null;

    // 工作单元
    this.pendingProps = pedingProps;
    this.memorizedProps = null;
    this.memorizedState = null;
    this.alternate = null;
    this.updateQueue = null;
    // 副作用
    this.flags = NoFlags;
  }
}

export class FiberRootNode {
  container: Container;
  curent: FiberNode;
  finishedWork: FiberNode | null;
  constructor(container: Container, hostRootFiber: FiberNode) {
    this.container = container;
    this.curent = hostRootFiber;
    this.finishedWork = null;
  }
}

export const createWorkInProgress = (current: FiberNode, pendingProps: Props): FiberNode => {
  let wip = current.alternate;
  if (wip === null) {
    // mount
    wip = new FiberNode(current.tag, pendingProps, current.key);
    wip.type = current.type;
    wip.stateNode = current.stateNode;

    wip.alternate = current;
    current.alternate = wip;
  } else {
    // update
    wip.pendingProps = pendingProps;
    wip.flags = NoFlags;
  }
  wip.type = current.type;
  wip.updateQueue = current.updateQueue;
  wip.child = current.child;
  wip.memorizedState = current.memorizedState;
  wip.memorizedProps = current.memorizedProps;

  return wip;
};
