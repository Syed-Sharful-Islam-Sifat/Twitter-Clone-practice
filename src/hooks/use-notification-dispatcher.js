import { useCallback, useState } from "react";

export function useNotificationDispatcher(initialState) {
  const [state, setState] = useState(initialState);
  const dispatch = useCallback(
    async (action, payload) => {
      if(!(action instanceof Function)) {
        return
      }
      const newState = await action(payload, state, dispatch);
      if (newState !== undefined) {
        setState(newState);
      }
    },
    [state]
  );
  return [state, dispatch]};