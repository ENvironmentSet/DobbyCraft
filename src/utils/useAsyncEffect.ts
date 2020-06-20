import { useEffect, DependencyList } from 'react';

function useAsyncEffect(
  asyncEffect: () => Promise<void | (() => void)>,
  deps: DependencyList = [],
) {
  useEffect(() => {
    const boxedCleanupOrNoop = asyncEffect();

    return () => {
      boxedCleanupOrNoop.then(cleanupOrNoop => {
        typeof cleanupOrNoop === 'function' && cleanupOrNoop();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default useAsyncEffect;
