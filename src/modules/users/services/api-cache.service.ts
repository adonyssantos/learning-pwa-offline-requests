class UserApiCache {
  private _cacheRequests: Array<any> = [];
  private _cacheGetRequests: Array<any> = [];

  constructor() {
    this._cacheRequests = [];
    this._cacheGetRequests = [];
  }

  private getLocalStorage = () => {
    const localCache = localStorage.getItem('userCache');

    if (localCache) {
      const parsedCache = JSON.parse(localCache);

      this._cacheRequests = parsedCache;
    }

    return this._cacheRequests;
  };

  private setLocalStorage = () => {
    const requestToCache = JSON.stringify(this._cacheRequests);

    localStorage.setItem('userCache', requestToCache);
  };

  public getCachedRequests = () => {
    this.getLocalStorage();

    const cachedRequest = this._cacheRequests;

    return cachedRequest;
  };

  public getCachedRequestSize = () => {
    this.getLocalStorage();

    const cachedRequestSize = this._cacheRequests?.length;

    return cachedRequestSize;
  };

  public deleteCachedRequest = (url: string) => {
    this.getLocalStorage();

    const cachedRequest = this._cacheRequests;
    const filteredRequest = cachedRequest.filter(request => request.url !== url);

    this._cacheRequests = filteredRequest;
    this.setLocalStorage();

    return this._cacheRequests;
  };

  public get = async (url: string) => {
    const localCache = localStorage.getItem(url);
    // const cacheGetRequest = this._cacheGetRequests.find(request => request.url === url);
    // const cachedRequest = cacheGetRequest?.request;
    const isOnline = navigator.onLine; // Check it online make the request

    if (isOnline) {
      return fetch(url)
        .then(response => response.json())
        .then(data => {
          this._cacheGetRequests.push({ url, data });
          localStorage.setItem(url, JSON.stringify(data));

          return {
            data,
            message: 'Request made online',
          };
        });
    }

    // console.log(cachedRequest);

    if (localCache) {
      return {
        data: JSON.parse(localCache),
        message: 'Request made from cache',
      };
    }

    // If not cached, make the request
    return {
      data: null,
      message: 'Request not cached and offline',
    };
  };

  public post = async (url: string, options: object) => {
    // Check it online make the request
    const isOnline = navigator.onLine;

    if (isOnline) {
      // Make the request
      return fetch(url, options)
        .then(response => response.json())
        .then(data => {
          return {
            data,
            message: 'User saved in the database',
          };
        });
    }

    // Add the request to the cache
    this._cacheRequests.push({
      url,
      options,
    });

    // Save the cache in the local storage
    this.setLocalStorage();

    return {
      data: null,
      message: 'User saved in the cache',
    };
  };
}

const userApiCache = new UserApiCache();

export default userApiCache;
