"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web_view_1 = require("./web-view");
function navigatingTo(args) {
    var page = args.object;
}
exports.navigatingTo = navigatingTo;
function onWvLoaded(args) {
    var wv = args.object;
    var clientWithSsl = new web_view_1.WebViewClientSslImpl(wv);
    var androidWebView = wv.android;
    androidWebView.setWebViewClient(clientWithSsl);
}
exports.onWvLoaded = onWvLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsdUNBQWtEO0FBRWxELHNCQUE2QixJQUFlO0lBQ3hDLElBQUksSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDakMsQ0FBQztBQUZELG9DQUVDO0FBR0Qsb0JBQTJCLElBQUk7SUFDM0IsSUFBSSxFQUFFLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUU5QixJQUFNLGFBQWEsR0FBRyxJQUFJLCtCQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELElBQU0sY0FBYyxHQUEyQixFQUFFLENBQUMsT0FBTyxDQUFDO0lBQzFELGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBTkQsZ0NBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5pbXBvcnQgeyBXZWJWaWV3IH0gZnJvbSBcInVpL3dlYi12aWV3XCI7XG5cbmltcG9ydCB7IFdlYlZpZXdDbGllbnRTc2xJbXBsIH0gZnJvbSBcIi4vd2ViLXZpZXdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRpbmdUbyhhcmdzOiBFdmVudERhdGEpIHtcbiAgICBsZXQgcGFnZSA9IDxQYWdlPmFyZ3Mub2JqZWN0O1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBvbld2TG9hZGVkKGFyZ3MpIHtcbiAgICBsZXQgd3YgPSA8V2ViVmlldz5hcmdzLm9iamVjdDtcblxuICAgIGNvbnN0IGNsaWVudFdpdGhTc2wgPSBuZXcgV2ViVmlld0NsaWVudFNzbEltcGwod3YpO1xuICAgIGNvbnN0IGFuZHJvaWRXZWJWaWV3ID0gPGFuZHJvaWQud2Via2l0LldlYlZpZXc+d3YuYW5kcm9pZDtcbiAgICBhbmRyb2lkV2ViVmlldy5zZXRXZWJWaWV3Q2xpZW50KGNsaWVudFdpdGhTc2wpO1xufVxuXG4iXX0=