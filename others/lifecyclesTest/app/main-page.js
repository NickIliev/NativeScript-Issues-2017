"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    console.log("navigatingTo");
}
exports.navigatingTo = navigatingTo;
function navigatedTo(args) {
    console.log("navigatedTo");
}
exports.navigatedTo = navigatedTo;
function loaded(args) {
    console.log("loaded");
}
exports.loaded = loaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0Esd0VBQXdFO0FBQ3hFLHNCQUE2QixJQUFlO0lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUE7QUFDL0IsQ0FBQztBQUZELG9DQUVDO0FBRUQscUJBQTRCLElBQWU7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUM5QixDQUFDO0FBRkQsa0NBRUM7QUFFRCxnQkFBdUIsSUFBZTtJQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ3pCLENBQUM7QUFGRCx3QkFFQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcblxuXG4vLyBFdmVudCBoYW5kbGVyIGZvciBQYWdlIFwibmF2aWdhdGluZ1RvXCIgZXZlbnQgYXR0YWNoZWQgaW4gbWFpbi1wYWdlLnhtbFxuZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRpbmdUbyhhcmdzOiBFdmVudERhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhcIm5hdmlnYXRpbmdUb1wiKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGVkVG8oYXJnczogRXZlbnREYXRhKSB7XG4gICAgY29uc29sZS5sb2coXCJuYXZpZ2F0ZWRUb1wiKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZGVkKGFyZ3M6IEV2ZW50RGF0YSkge1xuICAgIGNvbnNvbGUubG9nKFwibG9hZGVkXCIpXG59Il19