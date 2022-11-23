import userApiCache from '../services/api-cache.service';
import { useEffect } from 'react';
import useNetwork from '../hooks/use-network.hook';

export default function UserCacheProvider({ children, onNetworkOnline }: any) {
  const { isOnline } = useNetwork();

  useEffect(() => {
    const cacheSize = userApiCache.getCachedRequestSize();
    const hasCachedRequests = !!cacheSize;

    if (isOnline && hasCachedRequests) {
      const cachedRequest = userApiCache.getCachedRequests();

      cachedRequest.forEach((request: any) => {
        fetch(request.url, request.options)
          .then(response => response.json())
          .then(users => {
            userApiCache.deleteCachedRequest(request.url);
            onNetworkOnline(users);
          });
      });
    }
  }, [isOnline]);

  return children;
}
