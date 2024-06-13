import { RequestDetail } from "../common";
import { headersToObject } from "../utils/map";
import { MainProcess } from "./fork";
import { loadStackSource } from "./source";

export function proxyFetch(mainProcess: MainProcess) {
  if (!globalThis.fetch) {
    return;
  }
  const originalFetch = globalThis.fetch;

  globalThis["fetch"] = fetchProxyFactory(originalFetch, mainProcess);
}

function fetchProxyFactory(fetchFn: typeof fetch, mainProcess: MainProcess) {
  return function (request: string | URL | Request, options?: RequestInit) {
    const requestDetail = new RequestDetail();
    loadStackSource(requestDetail);
    requestDetail.requestStartTime = new Date().getTime();

    if (typeof request === "string") {
      requestDetail.url = request;
    } else if (request instanceof URL) {
      requestDetail.url = request.toString();
    }

    requestDetail.method = options?.method ?? "GET";
    requestDetail.requestHeaders = options?.headers ?? {};
    requestDetail.requestData = options?.body;

    mainProcess.registerRequest(requestDetail);
    return fetchFn(request as string | Request, options)
      .then(fetchResponseHandlerFactory(requestDetail, mainProcess))
      .catch(fetchErrorHandlerFactory(requestDetail, mainProcess));
  };
}

function fetchResponseHandlerFactory(
  requestDetail: RequestDetail,
  mainProcess: MainProcess
) {
  return (response: Response) => {
    requestDetail.requestEndTime = new Date().getTime();
    requestDetail.responseHeaders = headersToObject(response.headers);
    requestDetail.responseStatusCode = response.status || 0;

    response
      .clone()
      .arrayBuffer()
      .then((buffer) => {
        requestDetail.responseData = Buffer.from(buffer);
      })
      .finally(() => {
        mainProcess.updateRequest(requestDetail);
        mainProcess.endRequest(requestDetail);
      });

    return response;
  };
}

function fetchErrorHandlerFactory(
  requestDetail: RequestDetail,
  mainProcess: MainProcess
) {
  return (err: unknown) => {
    requestDetail.requestEndTime = new Date().getTime();
    requestDetail.responseStatusCode = 0;
    mainProcess.updateRequest(requestDetail);
    mainProcess.endRequest(requestDetail);
    throw err;
  };
}
