/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";

import { useSelector } from "react-redux";

import buildPostmanRequest from "./../buildPostmanRequest";
import { useActions } from "./../redux/actions";
import makeRequest from "./makeRequest";

function isRequestComplete(params) {
  for (let paramList of Object.values(params)) {
    for (let param of paramList) {
      if (param.required && !param.value) {
        return false;
      }
    }
  }
  return true;
}

function Execute() {
  const postman = useSelector((state) => state.postman);

  const pathParams = useSelector((state) => state.params.path);
  const queryParams = useSelector((state) => state.params.query);
  const cookieParams = useSelector((state) => state.params.cookie);
  const headerParams = useSelector((state) => state.params.header);
  const contentType = useSelector((state) => state.contentType);
  const body = useSelector((state) => state.body);
  const accept = useSelector((state) => state.accept);
  const endpoint = useSelector((state) => state.endpoint);
  const auth = useSelector((state) => state.auth);
  const selectedAuthID = useSelector((state) => state.selectedAuthID);
  const authOptionIDs = useSelector((state) => state.authOptionIDs);
  const proxy = useSelector((state) => state.options.proxy);

  const params = useSelector((state) => state.params);
  const finishedRequest = isRequestComplete(params);

  const { setResponse } = useActions();

  const postmanRequest = buildPostmanRequest(postman, {
    queryParams,
    pathParams,
    cookieParams,
    contentType,
    accept,
    headerParams,
    body,
    endpoint,
    auth,
    selectedAuthID,
    authOptionIDs,
  });

  return (
    <button
      className="button button--block button--primary"
      style={{ height: "48px", marginBottom: "var(--ifm-spacing-vertical)" }}
      disabled={!finishedRequest}
      onClick={async () => {
        setResponse("loading...");
        try {
          const res = await makeRequest(postmanRequest, proxy, body);
          setResponse(res);
        } catch (e) {
          setResponse(e.message ?? "Error fetching.");
        }
      }}
    >
      Execute
    </button>
  );
}

export default Execute;
