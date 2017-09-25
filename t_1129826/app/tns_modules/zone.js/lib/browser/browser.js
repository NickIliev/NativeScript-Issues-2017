"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview
 * @suppress {missingRequire}
 */
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("../common/events");
var timers_1 = require("../common/timers");
var utils_1 = require("../common/utils");
var define_property_1 = require("./define-property");
var event_target_1 = require("./event-target");
var property_descriptor_1 = require("./property-descriptor");
var register_element_1 = require("./register-element");
Zone.__load_patch('timers', function (global, Zone, api) {
    var set = 'set';
    var clear = 'clear';
    timers_1.patchTimer(global, set, clear, 'Timeout');
    timers_1.patchTimer(global, set, clear, 'Interval');
    timers_1.patchTimer(global, set, clear, 'Immediate');
});
Zone.__load_patch('requestAnimationFrame', function (global, Zone, api) {
    timers_1.patchTimer(global, 'request', 'cancel', 'AnimationFrame');
    timers_1.patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
    timers_1.patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
});
Zone.__load_patch('blocking', function (global, Zone, api) {
    var blockingMethods = ['alert', 'prompt', 'confirm'];
    for (var i = 0; i < blockingMethods.length; i++) {
        var name_1 = blockingMethods[i];
        utils_1.patchMethod(global, name_1, function (delegate, symbol, name) {
            return function (s, args) {
                return Zone.current.run(delegate, global, args, name);
            };
        });
    }
});
Zone.__load_patch('EventTarget', function (global, Zone, api) {
    event_target_1.eventTargetPatch(global, api);
    // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
    var XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
        api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
    }
    utils_1.patchClass('MutationObserver');
    utils_1.patchClass('WebKitMutationObserver');
    utils_1.patchClass('IntersectionObserver');
    utils_1.patchClass('FileReader');
});
Zone.__load_patch('on_property', function (global, Zone, api) {
    property_descriptor_1.propertyDescriptorPatch(api, global);
    define_property_1.propertyPatch();
    register_element_1.registerElementPatch(global);
});
Zone.__load_patch('canvas', function (global, Zone, api) {
    var HTMLCanvasElement = global['HTMLCanvasElement'];
    if (typeof HTMLCanvasElement !== 'undefined' && HTMLCanvasElement.prototype &&
        HTMLCanvasElement.prototype.toBlob) {
        utils_1.patchMacroTask(HTMLCanvasElement.prototype, 'toBlob', function (self, args) {
            return { name: 'HTMLCanvasElement.toBlob', target: self, callbackIndex: 0, args: args };
        });
    }
});
Zone.__load_patch('XHR', function (global, Zone, api) {
    // Treat XMLHTTPRequest as a macrotask.
    patchXHR(global);
    var XHR_TASK = utils_1.zoneSymbol('xhrTask');
    var XHR_SYNC = utils_1.zoneSymbol('xhrSync');
    var XHR_LISTENER = utils_1.zoneSymbol('xhrListener');
    var XHR_SCHEDULED = utils_1.zoneSymbol('xhrScheduled');
    function patchXHR(window) {
        function findPendingTask(target) {
            var pendingTask = target[XHR_TASK];
            return pendingTask;
        }
        var SYMBOL_ADDEVENTLISTENER = utils_1.zoneSymbol('addEventListener');
        var SYMBOL_REMOVEEVENTLISTENER = utils_1.zoneSymbol('removeEventListener');
        var oriAddListener = XMLHttpRequest.prototype[SYMBOL_ADDEVENTLISTENER];
        var oriRemoveListener = XMLHttpRequest.prototype[SYMBOL_REMOVEEVENTLISTENER];
        if (!oriAddListener) {
            var XMLHttpRequestEventTarget = window['XMLHttpRequestEventTarget'];
            if (XMLHttpRequestEventTarget) {
                oriAddListener = XMLHttpRequestEventTarget.prototype[SYMBOL_ADDEVENTLISTENER];
                oriRemoveListener = XMLHttpRequestEventTarget.prototype[SYMBOL_REMOVEEVENTLISTENER];
            }
        }
        var READY_STATE_CHANGE = 'readystatechange';
        var SCHEDULED = 'scheduled';
        function scheduleTask(task) {
            XMLHttpRequest[XHR_SCHEDULED] = false;
            var data = task.data;
            var target = data.target;
            // remove existing event listener
            var listener = target[XHR_LISTENER];
            if (!oriAddListener) {
                oriAddListener = target[SYMBOL_ADDEVENTLISTENER];
                oriRemoveListener = target[SYMBOL_REMOVEEVENTLISTENER];
            }
            if (listener) {
                oriRemoveListener.apply(target, [READY_STATE_CHANGE, listener]);
            }
            var newListener = target[XHR_LISTENER] = function () {
                if (target.readyState === target.DONE) {
                    // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                    // readyState=4 multiple times, so we need to check task state here
                    if (!data.aborted && XMLHttpRequest[XHR_SCHEDULED] && task.state === SCHEDULED) {
                        task.invoke();
                    }
                }
            };
            oriAddListener.apply(target, [READY_STATE_CHANGE, newListener]);
            var storedTask = target[XHR_TASK];
            if (!storedTask) {
                target[XHR_TASK] = task;
            }
            sendNative.apply(target, data.args);
            XMLHttpRequest[XHR_SCHEDULED] = true;
            return task;
        }
        function placeholderCallback() { }
        function clearTask(task) {
            var data = task.data;
            // Note - ideally, we would call data.target.removeEventListener here, but it's too late
            // to prevent it from firing. So instead, we store info for the event listener.
            data.aborted = true;
            return abortNative.apply(data.target, data.args);
        }
        var openNative = utils_1.patchMethod(window.XMLHttpRequest.prototype, 'open', function () { return function (self, args) {
            self[XHR_SYNC] = args[2] == false;
            return openNative.apply(self, args);
        }; });
        var XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
        var sendNative = utils_1.patchMethod(window.XMLHttpRequest.prototype, 'send', function () { return function (self, args) {
            var zone = Zone.current;
            if (self[XHR_SYNC]) {
                // if the XHR is sync there is no task to schedule, just execute the code.
                return sendNative.apply(self, args);
            }
            else {
                var options = { target: self, isPeriodic: false, delay: null, args: args, aborted: false };
                return zone.scheduleMacroTask(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
            }
        }; });
        var STRING_TYPE = 'string';
        var abortNative = utils_1.patchMethod(window.XMLHttpRequest.prototype, 'abort', function (delegate) { return function (self, args) {
            var task = findPendingTask(self);
            if (task && typeof task.type == STRING_TYPE) {
                // If the XHR has already completed, do nothing.
                // If the XHR has already been aborted, do nothing.
                // Fix #569, call abort multiple times before done will cause
                // macroTask task count be negative number
                if (task.cancelFn == null || (task.data && task.data.aborted)) {
                    return;
                }
                task.zone.cancelTask(task);
            }
            // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
            // task
            // to cancel. Do nothing.
        }; });
    }
});
Zone.__load_patch('geolocation', function (global, Zone, api) {
    /// GEO_LOCATION
    if (global['navigator'] && global['navigator'].geolocation) {
        utils_1.patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
    }
});
Zone.__load_patch('PromiseRejectionEvent', function (global, Zone, api) {
    // handle unhandled promise rejection
    function findPromiseRejectionHandler(evtName) {
        return function (e) {
            var eventTasks = events_1.findEventTasks(global, evtName);
            eventTasks.forEach(function (eventTask) {
                // windows has added unhandledrejection event listener
                // trigger the event listener
                var PromiseRejectionEvent = global['PromiseRejectionEvent'];
                if (PromiseRejectionEvent) {
                    var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                    eventTask.invoke(evt);
                }
            });
        };
    }
    if (global['PromiseRejectionEvent']) {
        Zone[utils_1.zoneSymbol('unhandledPromiseRejectionHandler')] =
            findPromiseRejectionHandler('unhandledrejection');
        Zone[utils_1.zoneSymbol('rejectionHandledHandler')] =
            findPromiseRejectionHandler('rejectionhandled');
    }
});
Zone.__load_patch('util', function (global, Zone, api) {
    api.patchOnProperties = utils_1.patchOnProperties;
    api.patchMethod = utils_1.patchMethod;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRztBQUNIOzs7R0FHRzs7QUFFSCwyQ0FBZ0Q7QUFDaEQsMkNBQTRDO0FBQzVDLHlDQUF1SDtBQUV2SCxxREFBZ0Q7QUFDaEQsK0NBQWdEO0FBQ2hELDZEQUE4RDtBQUM5RCx1REFBd0Q7QUFFeEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsVUFBQyxNQUFXLEVBQUUsSUFBYyxFQUFFLEdBQWlCO0lBQ3pFLElBQU0sR0FBRyxHQUFHLEtBQUssQ0FBQztJQUNsQixJQUFNLEtBQUssR0FBRyxPQUFPLENBQUM7SUFDdEIsbUJBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMxQyxtQkFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLG1CQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLFVBQUMsTUFBVyxFQUFFLElBQWMsRUFBRSxHQUFpQjtJQUN4RixtQkFBVSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDMUQsbUJBQVUsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2hFLG1CQUFVLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUN4RSxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFVBQUMsTUFBVyxFQUFFLElBQWMsRUFBRSxHQUFpQjtJ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SUFDSixDQUFDO0lBRUQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLElBQVksQ0FBQyxrQkFBVSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDekQsMkJBQTJCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUVyRCxJQUFZLENBQUMsa0JBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ2hELDJCQUEyQixDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEQsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsVUFBQyxNQUFXLEVBQUUsSUFBYyxFQUFFLEdBQWlCO0lBQ3ZFLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyx5QkFBaUIsQ0FBQztJQUMxQyxHQUFHLENBQUMsV0FBVyxHQUFHLG1CQUFXLENBQUM7QUFDaEMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXdcbiAqIEBzdXBwcmVzcyB7bWlzc2luZ1JlcXVpcmV9XG4gKi9cblxuaW1wb3J0IHtmaW5kRXZlbnRUYXNrc30gZnJvbSAnLi4vY29tbW9uL2V2ZW50cyc7XG5pbXBvcnQge3BhdGNoVGltZXJ9IGZyb20gJy4uL2NvbW1vbi90aW1lcnMnO1xuaW1wb3J0IHtwYXRjaENsYXNzLCBwYXRjaE1hY3JvVGFzaywgcGF0Y2hNZXRob2QsIHBhdGNoT25Qcm9wZXJ0aWVzLCBwYXRjaFByb3RvdHlwZSwgem9uZVN5bWJvbH0gZnJvbSAnLi4vY29tbW9uL3V0aWxzJztcblxuaW1wb3J0IHtwcm9wZXJ0eVBhdGNofSBmcm9tICcuL2RlZmluZS1wcm9wZXJ0eSc7XG5pbXBvcnQge2V2ZW50VGFyZ2V0UGF0Y2h9IGZyb20gJy4vZXZlbnQtdGFyZ2V0JztcbmltcG9ydCB7cHJvcGVydHlEZXNjcmlwdG9yUGF0Y2h9IGZyb20gJy4vcHJvcGVydHktZGVzY3JpcHRvcic7XG5pbXBvcnQge3JlZ2lzdGVyRWxlbWVudFBhdGNofSBmcm9tICcuL3JlZ2lzdGVyLWVsZW1lbnQnO1xuXG5ab25lLl9fbG9hZF9wYXRjaCgndGltZXJzJywgKGdsb2JhbDogYW55LCBab25lOiBab25lVHlwZSwgYXBpOiBfWm9uZVByaXZhdGUpID0+IHtcbiAgY29uc3Qgc2V0ID0gJ3NldCc7XG4gIGNvbnN0IGNsZWFyID0gJ2NsZWFyJztcbiAgcGF0Y2hUaW1lcihnbG9iYWwsIHNldCwgY2xlYXIsICdUaW1lb3V0Jyk7XG4gIHBhdGNoVGltZXIoZ2xvYmFsLCBzZXQsIGNsZWFyLCAnSW50ZXJ2YWwnKTtcbiAgcGF0Y2hUaW1lcihnbG9iYWwsIHNldCwgY2xlYXIsICdJbW1lZGlhdGUnKTtcbn0pO1xuXG5ab25lLl9fbG9hZF9wYXRjaCgncmVxdWVzdEFuaW1hdGlvbkZyYW1lJywgKGdsb2JhbDogYW55LCBab25lOiBab25lVHlwZSwgYXBpOiBfWm9uZVByaXZhdGUpID0+IHtcbiAgcGF0Y2hUaW1lcihnbG9iYWwsICdyZXF1ZXN0JywgJ2NhbmNlbCcsICdBbmltYXRpb25GcmFtZScpO1xuICBwYXRjaFRpbWVyKGdsb2JhbCwgJ21velJlcXVlc3QnLCAnbW96Q2FuY2VsJywgJ0FuaW1hdGlvbkZyYW1lJyk7XG4gIHBhdGNoVGltZXIoZ2xvYmFsLCAnd2Via2l0UmVxdWVzdCcsICd3ZWJraXRDYW5jZWwnLCAnQW5pbWF0aW9uRnJhbWUnKTtcbn0pO1xuXG5ab25lLl9fbG9hZF9wYXRjaCgnYmxvY2tpbmcnLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IF9ab25lUHJpdmF0ZSkgPT4ge1xuICBjb25zdCBibG9ja2luZ01ldGhvZHMgPSBbJ2FsZXJ0JywgJ3Byb21wdCcsICdjb25maXJtJ107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYmxvY2tpbmdNZXRob2RzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbmFtZSA9IGJsb2NraW5nTWV0aG9kc1tpXTtcbiAgICBwYXRjaE1ldGhvZChnbG9iYWwsIG5hbWUsIChkZWxlZ2F0ZSwgc3ltYm9sLCBuYW1lKSA9PiB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oczogYW55LCBhcmdzOiBhbnlbXSkge1xuICAgICAgICByZXR1cm4gWm9uZS5jdXJyZW50LnJ1bihkZWxlZ2F0ZSwgZ2xvYmFsLCBhcmdzLCBuYW1lKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5ab25lLl9fbG9hZF9wYXRjaCgnRXZlbnRUYXJnZXQnLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IF9ab25lUHJpdmF0ZSkgPT4ge1xuICBldmVudFRhcmdldFBhdGNoKGdsb2JhbCwgYXBpKTtcbiAgLy8gcGF0Y2ggWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldCdzIGFkZEV2ZW50TGlzdGVuZXIvcmVtb3ZlRXZlbnRMaXN0ZW5lclxuICBjb25zdCBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0ID0gKGdsb2JhbCBhcyBhbnkpWydYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0J107XG4gIGlmIChYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0ICYmIFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQucHJvdG90eXBlKSB7XG4gICAgYXBpLnBhdGNoRXZlbnRUYXJnZXQoZ2xvYmFsLCBbWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldC5wcm90b3R5cGVdKTtcbiAgfVxuICBwYXRjaENsYXNzKCdNdXRhdGlvbk9ic2VydmVyJyk7XG4gIHBhdGNoQ2xhc3MoJ1dlYktpdE11dGF0aW9uT2JzZXJ2ZXInKTtcbiAgcGF0Y2hDbGFzcygnSW50ZXJzZWN0aW9uT2JzZXJ2ZXInKTtcbiAgcGF0Y2hDbGFzcygnRmlsZVJlYWRlcicpO1xufSk7XG5cblpvbmUuX19sb2FkX3BhdGNoKCdvbl9wcm9wZXJ0eScsIChnbG9iYWw6IGFueSwgWm9uZTogWm9uZVR5cGUsIGFwaTogX1pvbmVQcml2YXRlKSA9PiB7XG4gIHByb3BlcnR5RGVzY3JpcHRvclBhdGNoKGFwaSwgZ2xvYmFsKTtcbiAgcHJvcGVydHlQYXRjaCgpO1xuICByZWdpc3RlckVsZW1lbnRQYXRjaChnbG9iYWwpO1xufSk7XG5cblpvbmUuX19sb2FkX3BhdGNoKCdjYW52YXMnLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IF9ab25lUHJpdmF0ZSkgPT4ge1xuICBjb25zdCBIVE1MQ2FudmFzRWxlbWVudCA9IGdsb2JhbFsnSFRNTENhbnZhc0VsZW1lbnQnXTtcbiAgaWYgKHR5cGVvZiBIVE1MQ2FudmFzRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgSFRNTENhbnZhc0VsZW1lbnQucHJvdG90eXBlICYmXG4gICAgICBIVE1MQ2FudmFzRWxlbWVudC5wcm90b3R5cGUudG9CbG9iKSB7XG4gICAgcGF0Y2hNYWNyb1Rhc2soSFRNTENhbnZhc0VsZW1lbnQucHJvdG90eXBlLCAndG9CbG9iJywgKHNlbGY6IGFueSwgYXJnczogYW55W10pID0+IHtcbiAgICAgIHJldHVybiB7bmFtZTogJ0hUTUxDYW52YXNFbGVtZW50LnRvQmxvYicsIHRhcmdldDogc2VsZiwgY2FsbGJhY2tJbmRleDogMCwgYXJnczogYXJnc307XG4gICAgfSk7XG4gIH1cbn0pO1xuXG5ab25lLl9fbG9hZF9wYXRjaCgnWEhSJywgKGdsb2JhbDogYW55LCBab25lOiBab25lVHlwZSwgYXBpOiBfWm9uZVByaXZhdGUpID0+IHtcbiAgLy8gVHJlYXQgWE1MSFRUUFJlcXVlc3QgYXMgYSBtYWNyb3Rhc2suXG4gIHBhdGNoWEhSKGdsb2JhbCk7XG5cbiAgY29uc3QgWEhSX1RBU0sgPSB6b25lU3ltYm9sKCd4aHJUYXNrJyk7XG4gIGNvbnN0IFhIUl9TWU5DID0gem9uZVN5bWJvbCgneGhyU3luYycpO1xuICBjb25zdCBYSFJfTElTVEVORVIgPSB6b25lU3ltYm9sKCd4aHJMaXN0ZW5lcicpO1xuICBjb25zdCBYSFJfU0NIRURVTEVEID0gem9uZVN5bWJvbCgneGhyU2NoZWR1bGVkJyk7XG5cbiAgaW50ZXJmYWNlIFhIUk9wdGlvbnMgZXh0ZW5kcyBUYXNrRGF0YSB7XG4gICAgdGFyZ2V0OiBhbnk7XG4gICAgYXJnczogYW55W107XG4gICAgYWJvcnRlZDogYm9vbGVhbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhdGNoWEhSKHdpbmRvdzogYW55KSB7XG4gICAgZnVuY3Rpb24gZmluZFBlbmRpbmdUYXNrKHRhcmdldDogYW55KSB7XG4gICAgICBjb25zdCBwZW5kaW5nVGFzazogVGFzayA9IHRhcmdldFtYSFJfVEFTS107XG4gICAgICByZXR1cm4gcGVuZGluZ1Rhc2s7XG4gICAgfVxuXG4gICAgY29uc3QgU1lNQk9MX0FEREVWRU5UTElTVEVORVIgPSB6b25lU3ltYm9sKCdhZGRFdmVudExpc3RlbmVyJyk7XG4gICAgY29uc3QgU1lNQk9MX1JFTU9WRUVWRU5UTElTVEVORVIgPSB6b25lU3ltYm9sKCdyZW1vdmVFdmVudExpc3RlbmVyJyk7XG5cbiAgICBsZXQgb3JpQWRkTGlzdGVuZXIgPSAoWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlIGFzIGFueSlbU1lNQk9MX0FEREVWRU5UTElTVEVORVJdO1xuICAgIGxldCBvcmlSZW1vdmVMaXN0ZW5lciA9IChYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUgYXMgYW55KVtTWU1CT0xfUkVNT1ZFRVZFTlRMSVNURU5FUl07XG4gICAgaWYgKCFvcmlBZGRMaXN0ZW5lcikge1xuICAgICAgY29uc3QgWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldCA9IHdpbmRvd1snWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldCddO1xuICAgICAgaWYgKFhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXQpIHtcbiAgICAgICAgb3JpQWRkTGlzdGVuZXIgPSBYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0LnByb3RvdHlwZVtTWU1CT0xfQURERVZFTlRMSVNURU5FUl07XG4gICAgICAgIG9yaVJlbW92ZUxpc3RlbmVyID0gWE1MSHR0cFJlcXVlc3RFdmVudFRhcmdldC5wcm90b3R5cGVbU1lNQk9MX1JFTU9WRUVWRU5UTElTVEVORVJdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IFJFQURZX1NUQVRFX0NIQU5HRSA9ICdyZWFkeXN0YXRlY2hhbmdlJztcbiAgICBjb25zdCBTQ0hFRFVMRUQgPSAnc2NoZWR1bGVkJztcblxuICAgIGZ1bmN0aW9uIHNjaGVkdWxlVGFzayh0YXNrOiBUYXNrKSB7XG4gICAgICAoWE1MSHR0cFJlcXVlc3QgYXMgYW55KVtYSFJfU0NIRURVTEVEXSA9IGZhbHNlO1xuICAgICAgY29uc3QgZGF0YSA9IDxYSFJPcHRpb25zPnRhc2suZGF0YTtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGRhdGEudGFyZ2V0O1xuICAgICAgLy8gcmVtb3ZlIGV4aXN0aW5nIGV2ZW50IGxpc3RlbmVyXG4gICAgICBjb25zdCBsaXN0ZW5lciA9IHRhcmdldFtYSFJfTElTVEVORVJdO1xuICAgICAgaWYgKCFvcmlBZGRMaXN0ZW5lcikge1xuICAgICAgICBvcmlBZGRMaXN0ZW5lciA9IHRhcmdldFtTWU1CT0xfQURERVZFTlRMSVNURU5FUl07XG4gICAgICAgIG9yaVJlbW92ZUxpc3RlbmVyID0gdGFyZ2V0W1NZTUJPTF9SRU1PVkVFVkVOVExJU1RFTkVSXTtcbiAgICAgIH1cblxuICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgIG9yaVJlbW92ZUxpc3RlbmVyLmFwcGx5KHRhcmdldCwgW1JFQURZX1NUQVRFX0NIQU5HRSwgbGlzdGVuZXJdKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5ld0xpc3RlbmVyID0gdGFyZ2V0W1hIUl9MSVNURU5FUl0gPSAoKSA9PiB7XG4gICAgICAgIGlmICh0YXJnZXQucmVhZHlTdGF0ZSA9PT0gdGFyZ2V0LkRPTkUpIHtcbiAgICAgICAgICAvLyBzb21ldGltZXMgb24gc29tZSBicm93c2VycyBYTUxIdHRwUmVxdWVzdCB3aWxsIGZpcmUgb25yZWFkeXN0YXRlY2hhbmdlIHdpdGhcbiAgICAgICAgICAvLyByZWFkeVN0YXRlPTQgbXVsdGlwbGUgdGltZXMsIHNvIHdlIG5lZWQgdG8gY2hlY2sgdGFzayBzdGF0ZSBoZXJlXG4gICAgICAgICAgaWYgKCFkYXRhLmFib3J0ZWQgJiYgKFhNTEh0dHBSZXF1ZXN0IGFzIGFueSlbWEhSX1NDSEVEVUxFRF0gJiYgdGFzay5zdGF0ZSA9PT0gU0NIRURVTEVEKSB7XG4gICAgICAgICAgICB0YXNrLmludm9rZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIG9yaUFkZExpc3RlbmVyLmFwcGx5KHRhcmdldCwgW1JFQURZX1NUQVRFX0NIQU5HRSwgbmV3TGlzdGVuZXJdKTtcblxuICAgICAgY29uc3Qgc3RvcmVkVGFzazogVGFzayA9IHRhcmdldFtYSFJfVEFTS107XG4gICAgICBpZiAoIXN0b3JlZFRhc2spIHtcbiAgICAgICAgdGFyZ2V0W1hIUl9UQVNLXSA9IHRhc2s7XG4gICAgICB9XG4gICAgICBzZW5kTmF0aXZlLmFwcGx5KHRhcmdldCwgZGF0YS5hcmdzKTtcbiAgICAgIChYTUxIdHRwUmVxdWVzdCBhcyBhbnkpW1hIUl9TQ0hFRFVMRURdID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0YXNrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlaG9sZGVyQ2FsbGJhY2soKSB7fVxuXG4gICAgZnVuY3Rpb24gY2xlYXJUYXNrKHRhc2s6IFRhc2spIHtcbiAgICAgIGNvbnN0IGRhdGEgPSA8WEhST3B0aW9ucz50YXNrLmRhdGE7XG4gICAgICAvLyBOb3RlIC0gaWRlYWxseSwgd2Ugd291bGQgY2FsbCBkYXRhLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyIGhlcmUsIGJ1dCBpdCdzIHRvbyBsYXRlXG4gICAgICAvLyB0byBwcmV2ZW50IGl0IGZyb20gZmlyaW5nLiBTbyBpbnN0ZWFkLCB3ZSBzdG9yZSBpbmZvIGZvciB0aGUgZXZlbnQgbGlzdGVuZXIuXG4gICAgICBkYXRhLmFib3J0ZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGFib3J0TmF0aXZlLmFwcGx5KGRhdGEudGFyZ2V0LCBkYXRhLmFyZ3MpO1xuICAgIH1cblxuICAgIGNvbnN0IG9wZW5OYXRpdmU6IEZ1bmN0aW9uID0gcGF0Y2hNZXRob2QoXG4gICAgICAgIHdpbmRvdy5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsICdvcGVuJywgKCkgPT4gZnVuY3Rpb24oc2VsZjogYW55LCBhcmdzOiBhbnlbXSkge1xuICAgICAgICAgIHNlbGZbWEhSX1NZTkNdID0gYXJnc1syXSA9PSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gb3Blbk5hdGl2ZS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgfSk7XG5cbiAgICBjb25zdCBYTUxIVFRQUkVRVUVTVF9TT1VSQ0UgPSAnWE1MSHR0cFJlcXVlc3Quc2VuZCc7XG4gICAgY29uc3Qgc2VuZE5hdGl2ZTogRnVuY3Rpb24gPSBwYXRjaE1ldGhvZChcbiAgICAgICAgd2luZG93LlhNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwgJ3NlbmQnLCAoKSA9PiBmdW5jdGlvbihzZWxmOiBhbnksIGFyZ3M6IGFueVtdKSB7XG4gICAgICAgICAgY29uc3Qgem9uZSA9IFpvbmUuY3VycmVudDtcbiAgICAgICAgICBpZiAoc2VsZltYSFJfU1lOQ10pIHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBYSFIgaXMgc3luYyB0aGVyZSBpcyBubyB0YXNrIHRvIHNjaGVkdWxlLCBqdXN0IGV4ZWN1dGUgdGhlIGNvZGUuXG4gICAgICAgICAgICByZXR1cm4gc2VuZE5hdGl2ZS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uczogWEhST3B0aW9ucyA9XG4gICAgICAgICAgICAgICAge3RhcmdldDogc2VsZiwgaXNQZXJpb2RpYzogZmFsc2UsIGRlbGF5OiBudWxsLCBhcmdzOiBhcmdzLCBhYm9ydGVkOiBmYWxzZX07XG4gICAgICAgICAgICByZXR1cm4gem9uZS5zY2hlZHVsZU1hY3JvVGFzayhcbiAgICAgICAgICAgICAgICBYTUxIVFRQUkVRVUVTVF9TT1VSQ0UsIHBsYWNlaG9sZGVyQ2FsbGJhY2ssIG9wdGlvbnMsIHNjaGVkdWxlVGFzaywgY2xlYXJUYXNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgY29uc3QgU1RSSU5HX1RZUEUgPSAnc3RyaW5nJztcblxuICAgIGNvbnN0IGFib3J0TmF0aXZlID0gcGF0Y2hNZXRob2QoXG4gICAgICAgIHdpbmRvdy5YTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsICdhYm9ydCcsXG4gICAgICAgIChkZWxlZ2F0ZTogRnVuY3Rpb24pID0+IGZ1bmN0aW9uKHNlbGY6IGFueSwgYXJnczogYW55W10pIHtcbiAgICAgICAgICBjb25zdCB0YXNrOiBUYXNrID0gZmluZFBlbmRpbmdUYXNrKHNlbGYpO1xuICAgICAgICAgIGlmICh0YXNrICYmIHR5cGVvZiB0YXNrLnR5cGUgPT0gU1RSSU5HX1RZUEUpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBYSFIgaGFzIGFscmVhZHkgY29tcGxldGVkLCBkbyBub3RoaW5nLlxuICAgICAgICAgICAgLy8gSWYgdGhlIFhIUiBoYXMgYWxyZWFkeSBiZWVuIGFib3J0ZWQsIGRvIG5vdGhpbmcuXG4gICAgICAgICAgICAvLyBGaXggIzU2OSwgY2FsbCBhYm9ydCBtdWx0aXBsZSB0aW1lcyBiZWZvcmUgZG9uZSB3aWxsIGNhdXNlXG4gICAgICAgICAgICAvLyBtYWNyb1Rhc2sgdGFzayBjb3VudCBiZSBuZWdhdGl2ZSBudW1iZXJcbiAgICAgICAgICAgIGlmICh0YXNrLmNhbmNlbEZuID09IG51bGwgfHwgKHRhc2suZGF0YSAmJiAoPFhIUk9wdGlvbnM+dGFzay5kYXRhKS5hYm9ydGVkKSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXNrLnpvbmUuY2FuY2VsVGFzayh0YXNrKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSBhcmUgdHJ5aW5nIHRvIGFib3J0IGFuIFhIUiB3aGljaCBoYXMgbm90IHlldCBiZWVuIHNlbnQsIHNvIHRoZXJlIGlzIG5vXG4gICAgICAgICAgLy8gdGFza1xuICAgICAgICAgIC8vIHRvIGNhbmNlbC4gRG8gbm90aGluZy5cbiAgICAgICAgfSk7XG4gIH1cbn0pO1xuXG5ab25lLl9fbG9hZF9wYXRjaCgnZ2VvbG9jYXRpb24nLCAoZ2xvYmFsOiBhbnksIFpvbmU6IFpvbmVUeXBlLCBhcGk6IF9ab25lUHJpdmF0ZSkgPT4ge1xuICAvLy8gR0VPX0xPQ0FUSU9OXG4gIGlmIChnbG9iYWxbJ25hdmlnYXRvciddICYmIGdsb2JhbFsnbmF2aWdhdG9yJ10uZ2VvbG9jYXRpb24pIHtcbiAgICBwYXRjaFByb3RvdHlwZShnbG9iYWxbJ25hdmlnYXRvciddLmdlb2xvY2F0aW9uLCBbJ2dldEN1cnJlbnRQb3NpdGlvbicsICd3YXRjaFBvc2l0aW9uJ10pO1xuICB9XG59KTtcblxuWm9uZS5fX2xvYWRfcGF0Y2goJ1Byb21pc2VSZWplY3Rpb25FdmVudCcsIChnbG9iYWw6IGFueSwgWm9uZTogWm9uZVR5cGUsIGFwaTogX1pvbmVQcml2YXRlKSA9PiB7XG4gIC8vIGhhbmRsZSB1bmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb25cbiAgZnVuY3Rpb24gZmluZFByb21pc2VSZWplY3Rpb25IYW5kbGVyKGV2dE5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBmdW5jdGlvbihlOiBhbnkpIHtcbiAgICAgIGNvbnN0IGV2ZW50VGFza3MgPSBmaW5kRXZlbnRUYXNrcyhnbG9iYWwsIGV2dE5hbWUpO1xuICAgICAgZXZlbnRUYXNrcy5mb3JFYWNoKGV2ZW50VGFzayA9PiB7XG4gICAgICAgIC8vIHdpbmRvd3MgaGFzIGFkZGVkIHVuaGFuZGxlZHJlamVjdGlvbiBldmVudCBsaXN0ZW5lclxuICAgICAgICAvLyB0cmlnZ2VyIHRoZSBldmVudCBsaXN0ZW5lclxuICAgICAgICBjb25zdCBQcm9taXNlUmVqZWN0aW9uRXZlbnQgPSBnbG9iYWxbJ1Byb21pc2VSZWplY3Rpb25FdmVudCddO1xuICAgICAgICBpZiAoUHJvbWlzZVJlamVjdGlvbkV2ZW50KSB7XG4gICAgICAgICAgY29uc3QgZXZ0ID0gbmV3IFByb21pc2VSZWplY3Rpb25FdmVudChldnROYW1lLCB7cHJvbWlzZTogZS5wcm9taXNlLCByZWFzb246IGUucmVqZWN0aW9ufSk7XG4gICAgICAgICAgZXZlbnRUYXNrLmludm9rZShldnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgaWYgKGdsb2JhbFsnUHJvbWlzZVJlamVjdGlvbkV2ZW50J10pIHtcbiAgICAoWm9uZSBhcyBhbnkpW3pvbmVTeW1ib2woJ3VuaGFuZGxlZFByb21pc2VSZWplY3Rpb25IYW5kbGVyJyldID1cbiAgICAgICAgZmluZFByb21pc2VSZWplY3Rpb25IYW5kbGVyKCd1bmhhbmRsZWRyZWplY3Rpb24nKTtcblxuICAgIChab25lIGFzIGFueSlbem9uZVN5bWJvbCgncmVqZWN0aW9uSGFuZGxlZEhhbmRsZXInKV0gPVxuICAgICAgICBmaW5kUHJvbWlzZVJlamVjdGlvbkhhbmRsZXIoJ3JlamVjdGlvbmhhbmRsZWQnKTtcbiAgfVxufSk7XG5cblpvbmUuX19sb2FkX3BhdGNoKCd1dGlsJywgKGdsb2JhbDogYW55LCBab25lOiBab25lVHlwZSwgYXBpOiBfWm9uZVByaXZhdGUpID0+IHtcbiAgYXBpLnBhdGNoT25Qcm9wZXJ0aWVzID0gcGF0Y2hPblByb3BlcnRpZXM7XG4gIGFwaS5wYXRjaE1ldGhvZCA9IHBhdGNoTWV0aG9kO1xufSk7XG4iXX0=