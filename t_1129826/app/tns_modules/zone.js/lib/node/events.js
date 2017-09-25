"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("../common/events");
Zone.__load_patch('EventEmitter', function (global, Zone, api) {
    var callAndReturnFirstParam = function (fn) {
        return function (self, args) {
            fn(self, args);
            return self;
        };
    };
    // For EventEmitter
    var EE_ADD_LISTENER = 'addListener';
    var EE_PREPEND_LISTENER = 'prependListener';
    var EE_REMOVE_LISTENER = 'removeListener';
    var EE_REMOVE_ALL_LISTENER = 'removeAllListeners';
    var EE_LISTENERS = 'listeners';
    var EE_ON = 'on';
    var compareTaskCallbackVsDelegate = function (task, delegate) {
        if (task.callback === delegate || task.callback.listener === delegate) {
            // same callback, same capture, same event name, just return
            return true;
        }
        return false;
    };
    function patchEventEmitterMethods(obj) {
        var result = events_1.patchEventTarget(global, [obj], {
            useGlobalCallback: false,
            addEventListenerFnName: EE_ADD_LISTENER,
            removeEventListenerFnName: EE_REMOVE_LISTENER,
            prependEventListenerFnName: EE_PREPEND_LISTENER,
            removeAllFnName: EE_REMOVE_ALL_LISTENER,
            listenersFnName: EE_LISTENERS,
            checkDuplicate: false,
            returnTarget: true,
            compareTaskCallbackVsDelegate: compareTaskCallbackVsDelegate
        });
        if (result && result[0]) {
            obj[EE_ON] = obj[EE_ADD_LISTENER];
        }
    }
    // EventEmitter
    var events;
    try {
        events = require('events');
    }
    catch (err) {
    }
    if (events && events.EventEmitter) {
        patchEventEmitterMethods(events.EventEmitter.prototype);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkNBQXVGO0FBRXZGLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxFQUFFLFVBQUMsTUFBVyxFQUFFLElBQWMsRUFBRSxHQUFpQjtJQUMvRSxJQUFNLHVCQUF1QixHQUFHLFVBQUMsRUFBbUM7UUFDbEUsTUFBTSxDQUFDLFVBQUMsSUFBUyxFQUFFLElBQVc7WUFDNUIsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRixtQkFBbUI7SUFDbkIsSUFBTSxlQUFlLEdBQUcsYUFBYSxDQUFDO0lBQ3RDLElBQU0sbUJBQW1CLEdBQUcsaUJBQWlCLENBQUM7SUFDOUMsSUFBTSxrQkFBa0IsR0FBRyxnQkFBZ0IsQ0FBQztJQUM1QyxJQUFNLHNCQUFzQixHQUFHLG9CQUFvQixDQUFDO0lBQ3BELElBQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQztJQUNqQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7SUFFbkIsSUFBTSw2QkFBNkIsR0FBRyxVQUFTLElBQVMsRUFBRSxRQUFhO1FBQ3JFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDdEUsNERBQTREO1lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUMsQ0FBQztJQUVGLGtDQUFrQyxHQUFRO1FBQ3hDLElBQU0sTUFBTSxHQUFHLHlCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzdDLGlCQUFpQixFQUFFLEtBQUs7WUFDeEIsc0JBQXNCLEVBQUUsZUFBZTtZQUN2Qyx5QkFBeUIsRUFBRSxrQkFBa0I7WUFDN0MsMEJBQTBCLEVBQUUsbUJBQW1CO1lBQy9DLGVBQWUsRUFBRSxzQkFBc0I7WUFDdkMsZUFBZSxFQUFFLFlBQVk7WUFDN0IsY0FBYyxFQUFFLEtBQUs7WUFDckIsWUFBWSxFQUFFLElBQUk7WUFDbEIsNkJBQTZCLEVBQUUsNkJBQTZCO1NBQzdELENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDcEMsQ0FBQztJQUNILENBQUM7SUFFRCxlQUFlO0lBQ2YsSUFBSSxNQUFNLENBQUM7SUFDWCxJQUFJLENBQUM7UUFDSCxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNsQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFELENBQUM7QUFDSCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtnbG9iYWxTb3VyY2VzLCBwYXRjaEV2ZW50VGFyZ2V0LCB6b25lU3ltYm9sRXZlbnROYW1lc30gZnJvbSAnLi4vY29tbW9uL2V2ZW50cyc7XG5cblpvbmUuX19sb2FkX3BhdGNoKCdFdmVudEVtaXR0ZXInLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IF9ab25lUHJpdmF0ZSkgPT4ge1xuICBjb25zdCBjYWxsQW5kUmV0dXJuRmlyc3RQYXJhbSA9IChmbjogKHNlbGY6IGFueSwgYXJnczogYW55W10pID0+IGFueSkgPT4ge1xuICAgIHJldHVybiAoc2VsZjogYW55LCBhcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgZm4oc2VsZiwgYXJncyk7XG4gICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuICB9O1xuXG4gIC8vIEZvciBFdmVudEVtaXR0ZXJcbiAgY29uc3QgRUVfQUREX0xJU1RFTkVSID0gJ2FkZExpc3RlbmVyJztcbiAgY29uc3QgRUVfUFJFUEVORF9MSVNURU5FUiA9ICdwcmVwZW5kTGlzdGVuZXInO1xuICBjb25zdCBFRV9SRU1PVkVfTElTVEVORVIgPSAncmVtb3ZlTGlzdGVuZXInO1xuICBjb25zdCBFRV9SRU1PVkVfQUxMX0xJU1RFTkVSID0gJ3JlbW92ZUFsbExpc3RlbmVycyc7XG4gIGNvbnN0IEVFX0xJU1RFTkVSUyA9ICdsaXN0ZW5lcnMnO1xuICBjb25zdCBFRV9PTiA9ICdvbic7XG5cbiAgY29uc3QgY29tcGFyZVRhc2tDYWxsYmFja1ZzRGVsZWdhdGUgPSBmdW5jdGlvbih0YXNrOiBhbnksIGRlbGVnYXRlOiBhbnkpIHtcbiAgICBpZiAodGFzay5jYWxsYmFjayA9PT0gZGVsZWdhdGUgfHwgdGFzay5jYWxsYmFjay5saXN0ZW5lciA9PT0gZGVsZWdhdGUpIHtcbiAgICAgIC8vIHNhbWUgY2FsbGJhY2ssIHNhbWUgY2FwdHVyZSwgc2FtZSBldmVudCBuYW1lLCBqdXN0IHJldHVyblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICBmdW5jdGlvbiBwYXRjaEV2ZW50RW1pdHRlck1ldGhvZHMob2JqOiBhbnkpIHtcbiAgICBjb25zdCByZXN1bHQgPSBwYXRjaEV2ZW50VGFyZ2V0KGdsb2JhbCwgW29ial0sIHtcbiAgICAgIHVzZUdsb2JhbENhbGxiYWNrOiBmYWxzZSxcbiAgICAgIGFkZEV2ZW50TGlzdGVuZXJGbk5hbWU6IEVFX0FERF9MSVNURU5FUixcbiAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJGbk5hbWU6IEVFX1JFTU9WRV9MSVNURU5FUixcbiAgICAgIHByZXBlbmRFdmVudExpc3RlbmVyRm5OYW1lOiBFRV9QUkVQRU5EX0xJU1RFTkVSLFxuICAgICAgcmVtb3ZlQWxsRm5OYW1lOiBFRV9SRU1PVkVfQUxMX0xJU1RFTkVSLFxuICAgICAgbGlzdGVuZXJzRm5OYW1lOiBFRV9MSVNURU5FUlMsXG4gICAgICBjaGVja0R1cGxpY2F0ZTogZmFsc2UsXG4gICAgICByZXR1cm5UYXJnZXQ6IHRydWUsXG4gICAgICBjb21wYXJlVGFza0NhbGxiYWNrVnNEZWxlZ2F0ZTogY29tcGFyZVRhc2tDYWxsYmFja1ZzRGVsZWdhdGVcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0ICYmIHJlc3VsdFswXSkge1xuICAgICAgb2JqW0VFX09OXSA9IG9ialtFRV9BRERfTElTVEVORVJdO1xuICAgIH1cbiAgfVxuXG4gIC8vIEV2ZW50RW1pdHRlclxuICBsZXQgZXZlbnRzO1xuICB0cnkge1xuICAgIGV2ZW50cyA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgfVxuXG4gIGlmIChldmVudHMgJiYgZXZlbnRzLkV2ZW50RW1pdHRlcikge1xuICAgIHBhdGNoRXZlbnRFbWl0dGVyTWV0aG9kcyhldmVudHMuRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XG4gIH1cbn0pO1xuIl19