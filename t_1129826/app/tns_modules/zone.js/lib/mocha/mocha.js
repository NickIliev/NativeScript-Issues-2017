/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
'use strict';
(function (context) {
    var Mocha = context.Mocha;
    if (typeof Mocha === 'undefined') {
        throw new Error('Missing Mocha.js');
    }
    if (typeof Zone === 'undefined') {
        throw new Error('Missing Zone.js');
    }
    var ProxyZoneSpec = Zone['ProxyZoneSpec'];
    var SyncTestZoneSpec = Zone['SyncTestZoneSpec'];
    if (!ProxyZoneSpec) {
        throw new Error('Missing ProxyZoneSpec');
    }
    if (Mocha['__zone_patch__']) {
        throw new Error('"Mocha" has already been patched with "Zone".');
    }
    Mocha['__zone_patch__'] = true;
    var rootZone = Zone.current;
    var syncZone = rootZone.fork(new SyncTestZoneSpec('Mocha.describe'));
    var testZone = null;
    var suiteZone = rootZone.fork(new ProxyZoneSpec());
    var mochaOriginal = {
        after: Mocha.after,
        afterEach: Mocha.afterEach,
        before: Mocha.before,
        beforeEach: Mocha.beforeEach,
        describe: Mocha.describe,
        it: Mocha.it
    };
    function modifyArguments(args, syncTest, asyncTest) {
        var _loop_1 = function (i) {
            var arg = args[i];
            if (typeof arg === 'function') {
                // The `done` callback is only passed through if the function expects at
                // least one argument.
                // Note we have to make a function with correct number of arguments,
                // otherwise mocha will
                // think that all functions are sync or async.
                args[i] = (arg.length === 0) ? syncTest(arg) : asyncTest(arg);
                // Mocha uses toString to view the test body in the result list, make sure we return the
                // correct function body
                args[i].toString = function () {
                    return arg.toString();
                };
            }
        };
        for (var i = 0; i < args.length; i++) {
            _loop_1(i);
        }
        return args;
    }
    function wrapDescribeInZone(args) {
        var syncTest = function (fn) {
            return function () {
                return syncZone.run(fn, this, arguments);
            };
        };
        return modifyArguments(args, syncTest);
    }
    function wrapTestInZone(args) {
        var asyncTest = function (fn) {
            return function (done) {
                return testZone.run(fn, this, [done]);
            };
        };
        var syncTest = function (fn) {
            return function () {
                return testZone.run(fn, this);
            };
        };
        return modifyArguments(args, syncTest, asyncTest);
    }
    function wrapSuiteInZone(args) {
        var asyncTest = function (fn) {
            return function (done) {
                return suiteZone.run(fn, this, [done]);
            };
        };
        var syncTest = function (fn) {
            return function () {
                return suiteZone.run(fn, this);
            };
        };
        return modifyArguments(args, syncTest, asyncTest);
    }
    context.describe = context.suite = Mocha.describe = function () {
        return mochaOriginal.describe.apply(this, wrapDescribeInZone(arguments));
    };
    context.xdescribe = context.suite.skip = Mocha.describe.skip = function () {
        return mochaOriginal.describe.skip.apply(this, wrapDescribeInZone(arguments));
    };
    context.describe.only = context.suite.only = Mocha.describe.only = function () {
        return mochaOriginal.describe.only.apply(this, wrapDescribeInZone(arguments));
    };
    context.it = context.specify = context.test = Mocha.it = function () {
        return mochaOriginal.it.apply(this, wrapTestInZone(arguments));
    };
    context.xit = context.xspecify = Mocha.it.skip = function () {
        return mochaOriginal.it.skip.apply(this, wrapTestInZone(arguments));
    };
    context.it.only = context.test.only = Mocha.it.only = function () {
        return mochaOriginal.it.only.apply(this, wrapTestInZone(arguments));
    };
    context.after = context.suiteTeardown = Mocha.after = function () {
        return mochaOriginal.after.apply(this, wrapSuiteInZone(arguments));
    };
    context.afterEach = context.teardown = Mocha.afterEach = function () {
        return mochaOriginal.afterEach.apply(this, wrapTestInZone(arguments));
    };
    context.before = context.suiteSetup = Mocha.before = function () {
        return mochaOriginal.before.apply(this, wrapSuiteInZone(arguments));
    };
    context.beforeEach = context.setup = Mocha.beforeEach = function () {
        return mochaOriginal.beforeEach.apply(this, wrapTestInZone(arguments));
    };
    (function (originalRunTest, originalRun) {
        Mocha.Runner.prototype.runTest = function (fn) {
            var _this = this;
            Zone.current.scheduleMicroTask('mocha.forceTask', function () {
                originalRunTest.call(_this, fn);
            });
        };
        Mocha.Runner.prototype.run = function (fn) {
            this.on('test', function (e) {
                if (Zone.current !== rootZone) {
                    throw new Error('Unexpected zone: ' + Zone.current.name);
                }
                testZone = rootZone.fork(new ProxyZoneSpec());
            });
            return originalRun.call(this, fn);
        };
    })(Mocha.Runner.prototype.runTest, Mocha.Runner.prototype.run);
})(window);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jaGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb2NoYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxZQUFZLENBQUM7QUFFYixDQUFDLFVBQUMsT0FBWTtJQUNaLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFFNUIsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDaEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFNLGFBQWEsR0FBSSxJQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDckQsSUFBTSxnQkFBZ0IsR0FBSSxJQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUUzRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFL0IsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM5QixJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLElBQUksUUFBUSxHQUFTLElBQUksQ0FB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QUFHLENBQUMsQ0FBQztBQUVqRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4oKGNvbnRleHQ6IGFueSkgPT4ge1xuICBjb25zdCBNb2NoYSA9IGNvbnRleHQuTW9jaGE7XG5cbiAgaWYgKHR5cGVvZiBNb2NoYSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgTW9jaGEuanMnKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgWm9uZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgWm9uZS5qcycpO1xuICB9XG5cbiAgY29uc3QgUHJveHlab25lU3BlYyA9IChab25lIGFzIGFueSlbJ1Byb3h5Wm9uZVNwZWMnXTtcbiAgY29uc3QgU3luY1Rlc3Rab25lU3BlYyA9IChab25lIGFzIGFueSlbJ1N5bmNUZXN0Wm9uZVNwZWMnXTtcblxuICBpZiAoIVByb3h5Wm9uZVNwZWMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgUHJveHlab25lU3BlYycpO1xuICB9XG5cbiAgaWYgKE1vY2hhWydfX3pvbmVfcGF0Y2hfXyddKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdcIk1vY2hhXCIgaGFzIGFscmVhZHkgYmVlbiBwYXRjaGVkIHdpdGggXCJab25lXCIuJyk7XG4gIH1cblxuICBNb2NoYVsnX196b25lX3BhdGNoX18nXSA9IHRydWU7XG5cbiAgY29uc3Qgcm9vdFpvbmUgPSBab25lLmN1cnJlbnQ7XG4gIGNvbnN0IHN5bmNab25lID0gcm9vdFpvbmUuZm9yayhuZXcgU3luY1Rlc3Rab25lU3BlYygnTW9jaGEuZGVzY3JpYmUnKSk7XG4gIGxldCB0ZXN0Wm9uZTogWm9uZSA9IG51bGw7XG4gIGNvbnN0IHN1aXRlWm9uZSA9IHJvb3Rab25lLmZvcmsobmV3IFByb3h5Wm9uZVNwZWMoKSk7XG5cbiAgY29uc3QgbW9jaGFPcmlnaW5hbCA9IHtcbiAgICBhZnRlcjogTW9jaGEuYWZ0ZXIsXG4gICAgYWZ0ZXJFYWNoOiBNb2NoYS5hZnRlckVhY2gsXG4gICAgYmVmb3JlOiBNb2NoYS5iZWZvcmUsXG4gICAgYmVmb3JlRWFjaDogTW9jaGEuYmVmb3JlRWFjaCxcbiAgICBkZXNjcmliZTogTW9jaGEuZGVzY3JpYmUsXG4gICAgaXQ6IE1vY2hhLml0XG4gIH07XG5cbiAgZnVuY3Rpb24gbW9kaWZ5QXJndW1lbnRzKGFyZ3M6IElBcmd1bWVudHMsIHN5bmNUZXN0OiBGdW5jdGlvbiwgYXN5bmNUZXN0PzogRnVuY3Rpb24pOiBhbnlbXSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgYXJnID0gYXJnc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIFRoZSBgZG9uZWAgY2FsbGJhY2sgaXMgb25seSBwYXNzZWQgdGhyb3VnaCBpZiB0aGUgZnVuY3Rpb24gZXhwZWN0cyBhdFxuICAgICAgICAvLyBsZWFzdCBvbmUgYXJndW1lbnQuXG4gICAgICAgIC8vIE5vdGUgd2UgaGF2ZSB0byBtYWtlIGEgZnVuY3Rpb24gd2l0aCBjb3JyZWN0IG51bWJlciBvZiBhcmd1bWVudHMsXG4gICAgICAgIC8vIG90aGVyd2lzZSBtb2NoYSB3aWxsXG4gICAgICAgIC8vIHRoaW5rIHRoYXQgYWxsIGZ1bmN0aW9ucyBhcmUgc3luYyBvciBhc3luYy5cbiAgICAgICAgYXJnc1tpXSA9IChhcmcubGVuZ3RoID09PSAwKSA/IHN5bmNUZXN0KGFyZykgOiBhc3luY1Rlc3QoYXJnKTtcbiAgICAgICAgLy8gTW9jaGEgdXNlcyB0b1N0cmluZyB0byB2aWV3IHRoZSB0ZXN0IGJvZHkgaW4gdGhlIHJlc3VsdCBsaXN0LCBtYWtlIHN1cmUgd2UgcmV0dXJuIHRoZVxuICAgICAgICAvLyBjb3JyZWN0IGZ1bmN0aW9uIGJvZHlcbiAgICAgICAgYXJnc1tpXS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBhcmcudG9TdHJpbmcoKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJncyBhcyBhbnk7XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwRGVzY3JpYmVJblpvbmUoYXJnczogSUFyZ3VtZW50cyk6IGFueVtdIHtcbiAgICBjb25zdCBzeW5jVGVzdDogYW55ID0gZnVuY3Rpb24oZm46IEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzeW5jWm9uZS5ydW4oZm4sIHRoaXMsIGFyZ3VtZW50cyBhcyBhbnkgYXMgYW55W10pO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG1vZGlmeUFyZ3VtZW50cyhhcmdzLCBzeW5jVGVzdCk7XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwVGVzdEluWm9uZShhcmdzOiBJQXJndW1lbnRzKTogYW55W10ge1xuICAgIGNvbnN0IGFzeW5jVGVzdCA9IGZ1bmN0aW9uKGZuOiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGRvbmU6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0ZXN0Wm9uZS5ydW4oZm4sIHRoaXMsIFtkb25lXSk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBzeW5jVGVzdDogYW55ID0gZnVuY3Rpb24oZm46IEZ1bmN0aW9uKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0ZXN0Wm9uZS5ydW4oZm4sIHRoaXMpO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIG1vZGlmeUFyZ3VtZW50cyhhcmdzLCBzeW5jVGVzdCwgYXN5bmNUZXN0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXBTdWl0ZUluWm9uZShhcmdzOiBJQXJndW1lbnRzKTogYW55W10ge1xuICAgIGNvbnN0IGFzeW5jVGVzdCA9IGZ1bmN0aW9uKGZuOiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGRvbmU6IEZ1bmN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzdWl0ZVpvbmUucnVuKGZuLCB0aGlzLCBbZG9uZV0pO1xuICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3luY1Rlc3Q6IGFueSA9IGZ1bmN0aW9uKGZuOiBGdW5jdGlvbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc3VpdGVab25lLnJ1bihmbiwgdGhpcyk7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4gbW9kaWZ5QXJndW1lbnRzKGFyZ3MsIHN5bmNUZXN0LCBhc3luY1Rlc3QpO1xuICB9XG5cbiAgY29udGV4dC5kZXNjcmliZSA9IGNvbnRleHQuc3VpdGUgPSBNb2NoYS5kZXNjcmliZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtb2NoYU9yaWdpbmFsLmRlc2NyaWJlLmFwcGx5KHRoaXMsIHdyYXBEZXNjcmliZUluWm9uZShhcmd1bWVudHMpKTtcbiAgfTtcblxuICBjb250ZXh0LnhkZXNjcmliZSA9IGNvbnRleHQuc3VpdGUuc2tpcCA9IE1vY2hhLmRlc2NyaWJlLnNraXAgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbW9jaGFPcmlnaW5hbC5kZXNjcmliZS5za2lwLmFwcGx5KHRoaXMsIHdyYXBEZXNjcmliZUluWm9uZShhcmd1bWVudHMpKTtcbiAgfTtcblxuICBjb250ZXh0LmRlc2NyaWJlLm9ubHkgPSBjb250ZXh0LnN1aXRlLm9ubHkgPSBNb2NoYS5kZXNjcmliZS5vbmx5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vY2hhT3JpZ2luYWwuZGVzY3JpYmUub25seS5hcHBseSh0aGlzLCB3cmFwRGVzY3JpYmVJblpvbmUoYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgY29udGV4dC5pdCA9IGNvbnRleHQuc3BlY2lmeSA9IGNvbnRleHQudGVzdCA9IE1vY2hhLml0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vY2hhT3JpZ2luYWwuaXQuYXBwbHkodGhpcywgd3JhcFRlc3RJblpvbmUoYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgY29udGV4dC54aXQgPSBjb250ZXh0LnhzcGVjaWZ5ID0gTW9jaGEuaXQuc2tpcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtb2NoYU9yaWdpbmFsLml0LnNraXAuYXBwbHkodGhpcywgd3JhcFRlc3RJblpvbmUoYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgY29udGV4dC5pdC5vbmx5ID0gY29udGV4dC50ZXN0Lm9ubHkgPSBNb2NoYS5pdC5vbmx5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vY2hhT3JpZ2luYWwuaXQub25seS5hcHBseSh0aGlzLCB3cmFwVGVzdEluWm9uZShhcmd1bWVudHMpKTtcbiAgfTtcblxuICBjb250ZXh0LmFmdGVyID0gY29udGV4dC5zdWl0ZVRlYXJkb3duID0gTW9jaGEuYWZ0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbW9jaGFPcmlnaW5hbC5hZnRlci5hcHBseSh0aGlzLCB3cmFwU3VpdGVJblpvbmUoYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgY29udGV4dC5hZnRlckVhY2ggPSBjb250ZXh0LnRlYXJkb3duID0gTW9jaGEuYWZ0ZXJFYWNoID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vY2hhT3JpZ2luYWwuYWZ0ZXJFYWNoLmFwcGx5KHRoaXMsIHdyYXBUZXN0SW5ab25lKGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIGNvbnRleHQuYmVmb3JlID0gY29udGV4dC5zdWl0ZVNldHVwID0gTW9jaGEuYmVmb3JlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vY2hhT3JpZ2luYWwuYmVmb3JlLmFwcGx5KHRoaXMsIHdyYXBTdWl0ZUluWm9uZShhcmd1bWVudHMpKTtcbiAgfTtcblxuICBjb250ZXh0LmJlZm9yZUVhY2ggPSBjb250ZXh0LnNldHVwID0gTW9jaGEuYmVmb3JlRWFjaCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBtb2NoYU9yaWdpbmFsLmJlZm9yZUVhY2guYXBwbHkodGhpcywgd3JhcFRlc3RJblpvbmUoYXJndW1lbnRzKSk7XG4gIH07XG5cbiAgKChvcmlnaW5hbFJ1blRlc3QsIG9yaWdpbmFsUnVuKSA9PiB7XG4gICAgTW9jaGEuUnVubmVyLnByb3RvdHlwZS5ydW5UZXN0ID0gZnVuY3Rpb24oZm46IEZ1bmN0aW9uKSB7XG4gICAgICBab25lLmN1cnJlbnQuc2NoZWR1bGVNaWNyb1Rhc2soJ21vY2hhLmZvcmNlVGFzaycsICgpID0+IHtcbiAgICAgICAgb3JpZ2luYWxSdW5UZXN0LmNhbGwodGhpcywgZm4pO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE1vY2hhLlJ1bm5lci5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24oZm46IEZ1bmN0aW9uKSB7XG4gICAgICB0aGlzLm9uKCd0ZXN0JywgKGU6IGFueSkgPT4ge1xuICAgICAgICBpZiAoWm9uZS5jdXJyZW50ICE9PSByb290Wm9uZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCB6b25lOiAnICsgWm9uZS5jdXJyZW50Lm5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRlc3Rab25lID0gcm9vdFpvbmUuZm9yayhuZXcgUHJveHlab25lU3BlYygpKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gb3JpZ2luYWxSdW4uY2FsbCh0aGlzLCBmbik7XG4gICAgfTtcblxuXG4gIH0pKE1vY2hhLlJ1bm5lci5wcm90b3R5cGUucnVuVGVzdCwgTW9jaGEuUnVubmVyLnByb3RvdHlwZS5ydW4pO1xuXG59KSh3aW5kb3cpOyJdfQ==