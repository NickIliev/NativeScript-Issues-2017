"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_view_model_1 = require("./main-view-model");
var frame_1 = require("ui/frame");
var page;
// Event handler for Page "navigatingTo" event attached in main-page.xml
function navigatingTo(args) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function onActionLoaded(args) {
    if (page.ios) {
        var navigationBar = frame_1.topmost().ios.controller.navigationBar;
        navigationBar.translucent = false;
        navigationBar.barStyle = 0;
        page.backgroundSpanUnderStatusBar = true;
        page.actionBarHidden = false;
        // added this lines of code
        navigationBar.shadowImage = UIImage.alloc().init();
        navigationBar.setBackgroundImageForBarMetrics(UIImage.alloc().init(), 0 /* Default */);
    }
}
exports.onActionLoaded = onActionLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscURBQW9EO0FBRXBELGtDQUFrQztBQUNsQyxJQUFJLElBQUksQ0FBRTtBQUVWLHdFQUF3RTtBQUN4RSxzQkFBNkIsSUFBZTtJQUN4Qzs7OztNQUlFO0lBQ0YsSUFBSSxHQUFTLElBQUksQ0FBQyxNQUFNLENBQUM7SUFFekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGlDQUFlLEVBQUUsQ0FBQztBQUNoRCxDQUFDO0FBVEQsb0NBU0M7QUFFRCx3QkFBK0IsSUFBSTtJQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNYLElBQUksYUFBYSxHQUFHLGVBQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzNELGFBQWEsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFFN0IsMkJBQTJCO1FBQzNCLGFBQWEsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsZUFBb0IsQ0FBQyxDQUFBO0lBQy9GLENBQUM7QUFDTCxDQUFDO0FBWkQsd0NBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuaW1wb3J0IHsgSGVsbG9Xb3JsZE1vZGVsIH0gZnJvbSAnLi9tYWluLXZpZXctbW9kZWwnO1xuXG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInVpL2ZyYW1lXCJcbmxldCBwYWdlIDtcblxuLy8gRXZlbnQgaGFuZGxlciBmb3IgUGFnZSBcIm5hdmlnYXRpbmdUb1wiIGV2ZW50IGF0dGFjaGVkIGluIG1haW4tcGFnZS54bWxcbmV4cG9ydCBmdW5jdGlvbiBuYXZpZ2F0aW5nVG8oYXJnczogRXZlbnREYXRhKSB7XG4gICAgLypcbiAgICBUaGlzIGdldHMgYSByZWZlcmVuY2UgdGhpcyBwYWdl4oCZcyA8UGFnZT4gVUkgY29tcG9uZW50LiBZb3UgY2FuXG4gICAgdmlldyB0aGUgQVBJIHJlZmVyZW5jZSBvZiB0aGUgUGFnZSB0byBzZWUgd2hhdOKAmXMgYXZhaWxhYmxlIGF0XG4gICAgaHR0cHM6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvYXBpLXJlZmVyZW5jZS9jbGFzc2VzL191aV9wYWdlXy5wYWdlLmh0bWxcbiAgICAqL1xuICAgIHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcblxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgSGVsbG9Xb3JsZE1vZGVsKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkFjdGlvbkxvYWRlZChhcmdzKSB7XG4gICAgaWYgKHBhZ2UuaW9zKSB7XG4gICAgICAgIHZhciBuYXZpZ2F0aW9uQmFyID0gdG9wbW9zdCgpLmlvcy5jb250cm9sbGVyLm5hdmlnYXRpb25CYXI7ICAgICAgICBcbiAgICAgICAgbmF2aWdhdGlvbkJhci50cmFuc2x1Y2VudCA9IGZhbHNlO1xuICAgICAgICBuYXZpZ2F0aW9uQmFyLmJhclN0eWxlID0gMDsgXG4gICAgICAgIHBhZ2UuYmFja2dyb3VuZFNwYW5VbmRlclN0YXR1c0JhciA9IHRydWU7XG4gICAgICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gZmFsc2U7IFxuXG4gICAgICAgIC8vIGFkZGVkIHRoaXMgbGluZXMgb2YgY29kZVxuICAgICAgICBuYXZpZ2F0aW9uQmFyLnNoYWRvd0ltYWdlID0gVUlJbWFnZS5hbGxvYygpLmluaXQoKTtcbiAgICAgICAgbmF2aWdhdGlvbkJhci5zZXRCYWNrZ3JvdW5kSW1hZ2VGb3JCYXJNZXRyaWNzKFVJSW1hZ2UuYWxsb2MoKS5pbml0KCksIFVJQmFyTWV0cmljcy5EZWZhdWx0KVxuICAgIH0gXG59Il19