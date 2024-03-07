import { Action } from 'shared/ReactTypes';

export interface Update<State> {
  action: Action<State>;
}
export type UpdateQueue<State> = {
  shared: {
    pending: Update<State> | null;
  };
};

export const createUpdate = <State>(action: Action<State>): Update<State> => {
  return {
    action,
  };
};

export const createUpdateQueue = <Action>() => {
  return {
    shared: {
      pending: null,
    },
  } as UpdateQueue<Action>;
};

export const enqueueUpdate = <Action>(updateQueue: UpdateQueue<Action>, update: Update<Action>) => {
  updateQueue.shared.pending = update;
};

/**
 * 处理更新队列并返回记忆化的状态。
 *
 * @template State 状态的类型。
 * @param {State} baseState 基础状态。
 * @param {Update<State> | null} pendingUpdate 待处理的更新。
 * @returns {{ memorizedState: State }} 包含记忆化状态的对象。
 */
export const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State> | null,
): { memorizedState: State } => {
  const result: ReturnType<typeof processUpdateQueue<State>> = { memorizedState: baseState };
  if (pendingUpdate !== null) {
    const action = pendingUpdate.action;
    if (action instanceof Function) {
      result.memorizedState = action(baseState);
    } else {
      result.memorizedState = action;
    }
  }
  return result;
};
