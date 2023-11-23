"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  default: () => Command
});
module.exports = __toCommonJS(src_exports);
var import_api = require("@raycast/api");
var import_child_process = require("child_process");
var import_jsx_runtime = require("react/jsx-runtime");
var ITEMS = [
  {
    id: "1",
    title: "Chrome",
    browser: "chrome",
    icon: "chrome.svg"
  },
  {
    id: "2",
    title: "Safari",
    browser: "safari",
    icon: "safari.svg"
  }
];
function Command() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.List, {
    children: ITEMS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.List.Item, {
      icon: item.icon,
      title: item.title,
      actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.ActionPanel, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.Action, {
          title: "Switch",
          onAction: () => {
            (0, import_child_process.exec)("osascript /Users/willpayne/bin/Config/Raycast/changedefaultbrowser.scpt " + item.browser);
            (0, import_api.popToRoot)();
          }
        })
      })
    }, item.id))
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vcmF5Y2FzdC9leHRlbnRpb25zL3N3aXRjaC1icm93c2VyL3NyYy9pbmRleC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IEFjdGlvblBhbmVsLCBBY3Rpb24sIExpc3QsIHBvcFRvUm9vdCB9IGZyb20gXCJAcmF5Y2FzdC9hcGlcIjtcbmltcG9ydCB7IGV4ZWMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xuY29uc3QgSVRFTVMgPSBbXG4gIHtcbiAgICBpZDogXCIxXCIsXG4gICAgdGl0bGU6IFwiQ2hyb21lXCIsXG4gICAgYnJvd3NlcjogXCJjaHJvbWVcIixcbiAgICBpY29uOiBcImNocm9tZS5zdmdcIixcbiAgfSxcbiAge1xuICAgIGlkOiBcIjJcIixcbiAgICB0aXRsZTogXCJTYWZhcmlcIixcbiAgICBicm93c2VyOiBcInNhZmFyaVwiLFxuICAgIGljb246IFwic2FmYXJpLnN2Z1wiLFxuICB9LFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAgcmV0dXJuIChcbiAgICA8TGlzdD5cbiAgICAgIHtJVEVNUy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgPExpc3QuSXRlbVxuICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICBpY29uPXtpdGVtLmljb259XG4gICAgICAgICAgdGl0bGU9e2l0ZW0udGl0bGV9XG4gICAgICAgICAgYWN0aW9ucz17XG4gICAgICAgICAgICA8QWN0aW9uUGFuZWw+XG4gICAgICAgICAgICAgIDxBY3Rpb25cbiAgICAgICAgICAgICAgICB0aXRsZT17XCJTd2l0Y2hcIn1cbiAgICAgICAgICAgICAgICBvbkFjdGlvbj17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgZXhlYyhcIm9zYXNjcmlwdCAvVXNlcnMvd2lsbHBheW5lL2Jpbi9Db25maWcvUmF5Y2FzdC9jaGFuZ2VkZWZhdWx0YnJvd3Nlci5zY3B0IFwiICsgaXRlbS5icm93c2VyKTtcbiAgICAgICAgICAgICAgICAgIHBvcFRvUm9vdCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgICAgIH1cbiAgICAgICAgLz5cbiAgICAgICkpfVxuICAgIDwvTGlzdD5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFxRDtBQUNyRCwyQkFBcUI7QUFEckI7QUFFQSxJQUFNLFFBQVE7QUFBQSxFQUNaO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxTQUFTO0FBQUEsSUFDVCxNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULE1BQU07QUFBQSxFQUNSO0FBQ0Y7QUFFZSxTQUFSLFVBQTJCO0FBQ2hDLFNBQ0UsNENBQUM7QUFBQSxJQUNFLGdCQUFNLElBQUksQ0FBQyxTQUNWLDRDQUFDLGdCQUFLLE1BQUw7QUFBQSxNQUVDLE1BQU0sS0FBSztBQUFBLE1BQ1gsT0FBTyxLQUFLO0FBQUEsTUFDWixTQUNFLDRDQUFDO0FBQUEsUUFDQyxzREFBQztBQUFBLFVBQ0MsT0FBTztBQUFBLFVBQ1AsVUFBVSxNQUFNO0FBQ2QsMkNBQUssNkVBQTZFLEtBQUssT0FBTztBQUM5RixzQ0FBVTtBQUFBLFVBQ1o7QUFBQSxTQUNGO0FBQUEsT0FDRjtBQUFBLE9BWkcsS0FBSyxFQWNaLENBQ0Q7QUFBQSxHQUNIO0FBRUo7IiwKICAibmFtZXMiOiBbXQp9Cg==
