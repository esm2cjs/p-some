var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var esm_exports = {};
__export(esm_exports, {
  AggregateError: () => import_aggregate_error.default,
  FilterError: () => FilterError,
  default: () => pSome
});
module.exports = __toCommonJS(esm_exports);
var import_aggregate_error = __toESM(require("@esm2cjs/aggregate-error"));
var import_p_cancelable = __toESM(require("@esm2cjs/p-cancelable"));
class FilterError extends Error {
}
function pSome(iterable, options) {
  return new import_p_cancelable.default((resolve, reject, onCancel) => {
    const {
      count,
      filter = () => true
    } = options;
    if (!Number.isFinite(count)) {
      reject(new TypeError(`Expected a finite number, got ${typeof options.count}`));
      return;
    }
    const values = [];
    const errors = [];
    let elementCount = 0;
    let isSettled = false;
    const completed = /* @__PURE__ */ new Set();
    const maybeSettle = () => {
      if (values.length === count) {
        resolve(values);
        isSettled = true;
      }
      if (elementCount - errors.length < count) {
        reject(new import_aggregate_error.default(errors));
        isSettled = true;
      }
      return isSettled;
    };
    const cancelPending = () => {
      for (const promise of iterable) {
        if (!completed.has(promise) && typeof promise.cancel === "function") {
          promise.cancel();
        }
      }
    };
    onCancel(cancelPending);
    for (const element of iterable) {
      elementCount++;
      (async () => {
        try {
          const value = await element;
          if (isSettled) {
            return;
          }
          if (!filter(value)) {
            throw new FilterError("Value does not satisfy filter");
          }
          values.push(value);
        } catch (error) {
          errors.push(error);
        } finally {
          completed.add(element);
          if (!isSettled && maybeSettle()) {
            cancelPending();
          }
        }
      })();
    }
    if (count > elementCount) {
      reject(new RangeError(`Expected input to contain at least ${options.count} items, but contains ${elementCount} items`));
      cancelPending();
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AggregateError,
  FilterError
});
//# sourceMappingURL=index.js.map
