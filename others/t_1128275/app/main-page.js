"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function onSwitchLoaded(args) {
    console.log("switch loaded");
    var sw = args.object;
    sw.isUserInteractionEnabled = false;
}
exports.onSwitchLoaded = onSwitchLoaded;
function navigatingTo(args) {
    console.log("navigatingTo");
}
exports.navigatingTo = navigatingTo;
function loaded(args) {
    console.log("loaded");
}
exports.loaded = loaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsd0JBQStCLElBQWU7SUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUM3QixJQUFJLEVBQUUsR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRTdCLEVBQUUsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7QUFDeEMsQ0FBQztBQUxELHdDQUtDO0FBRUQsc0JBQTZCLElBQWU7SUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRkQsb0NBRUM7QUFFRCxnQkFBdUIsSUFBZTtJQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFGRCx3QkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFN3aXRjaCB9IGZyb20gXCJ1aS9zd2l0Y2hcIjtcblxuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvblN3aXRjaExvYWRlZChhcmdzOiBFdmVudERhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhcInN3aXRjaCBsb2FkZWRcIik7XG4gICAgbGV0IHN3ID0gPFN3aXRjaD5hcmdzLm9iamVjdDtcblxuICAgIHN3LmlzVXNlckludGVyYWN0aW9uRW5hYmxlZCA9IGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGNvbnNvbGUubG9nKFwibmF2aWdhdGluZ1RvXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZGVkKGFyZ3M6IEV2ZW50RGF0YSkgeyBcbiAgICBjb25zb2xlLmxvZyhcImxvYWRlZFwiKTtcbn0iXX0=