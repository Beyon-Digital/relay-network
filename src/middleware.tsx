import {
  urlMiddleware,
  retryMiddleware,
  authMiddleware,
  cacheMiddleware,
  progressMiddleware,
  uploadMiddleware,
  Middleware,
  RelayRequestAny,
  errorMiddleware,
  loggerMiddleware,
  perfMiddleware
} from 'react-relay-network-modern';

// constants
export const dev = process.env.NODE_ENV === "development";

export interface EnvBuilder {
  url: string;
  apiToken: string;
  token?: string;
};

export const middlewares = ({ url, apiToken, token }: EnvBuilder): Array<Middleware> => {
  return (
    [
      cacheMiddleware({
        size: 100, // max 100 requests
        'ttl': 900000, // 250 minutes
        'allowMutations': true,
        'allowFormData': true,
      }),
      urlMiddleware({
        url: () => Promise.resolve(url),
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: (req: RelayRequestAny) => ({
          "Access-Control-Allow-Origin": "true",
          "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
          "Access-Control-Allow-Credentials": "true",
          "CLIENT-ID": apiToken,
          "Access-Control-Allow-Headers": "API, Content-Type, Dnt, Origin, User-Agent, csrftoken, X-CSRFToken, Access-Control-Allow-Origin, AUTHORIZATION",
          'X-CSRFToken': req.fetchOpts.headers["X-CSRFToken"] ?? "",
          'csrftoken': req.fetchOpts.headers["csrftoken"] ?? "",
        }),
        'cache': 'reload',
        'redirect': 'follow'
      }),
      authMiddleware({
        token,
        allowEmptyToken: true,
        header: "AUTHORIZATION",
        "prefix": "Bearer "
      }),
      retryMiddleware({
        fetchTimeout: 360,
        retryDelays: (attempt) => Math.pow(2, attempt + 4) * 100, // or simple array [3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600],
        beforeRetry: ({ forceRetry, abort, delay, attempt, lastError, req }) => {
          if (attempt > 10) abort();
          console.log('call `forceRelayRetry()` for immediately retry! Or wait ' + delay + ' ms.');
        },
        statusCodes: [500, 503, 504],
        'logger': (event: any) => console.log('Retry: ', event)
      }),
      progressMiddleware({
        onProgress: (current, total) => {
          console.log('Downloaded: ' + current + ' B, total: ' + total + ' B');
          const px = new CustomEvent("progress", { detail: { progress: current / (total ?? 100) } });
          window.dispatchEvent(px);
        },
      }),
      uploadMiddleware(),
      ...(
        dev ? [
          errorMiddleware(),
          loggerMiddleware(),
          perfMiddleware(),
          (next) => async (req) => {
            const res = await next(req);
            console.log(res.json);
            return res;
          },
        ] : []
      ),
    ]
  )
};

