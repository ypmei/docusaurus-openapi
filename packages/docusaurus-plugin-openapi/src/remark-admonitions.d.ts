/* ============================================================================
 * Copyright (c) Cloud Annotations
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

declare module "remark-admonitions" {
  type Options = any;

  const plugin: (options?: Options) => void;
  export = plugin;
}
