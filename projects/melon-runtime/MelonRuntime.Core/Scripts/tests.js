(()=>{"use strict";var e={936:(e,t)=>{function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.runStdTests=void 0;var o=Melon.testing.test,r=Melon.std,s=r.json,i=r.system;t.runStdTests=function(){o("Melon.std.environment.getEnvironmentVariables() should return an object",(function(e){var t=Melon.std.environment.getEnvironmentVariables();e.true("object"==n(t))})),o("Melon.std.environment.setEnvironmentVariable() should work correctly",(function(e){Melon.std.environment.setEnvironmentVariable("test","test"),e.equals(Melon.std.environment.getEnvironmentVariables().test,"test")})),o("Melon.std.environment.clearLocalEnvironmentVariableds() should work correctly",(function(e){Melon.std.environment.setEnvironmentVariable("test","test"),Melon.std.environment.clearLocalEnvironmentVariables(),e.equals(Melon.std.environment.getEnvironmentVariables().test,void 0)})),o("Melon.std.environment.baseDirectory should not be null or empty",(function(e){e.truthy(Melon.std.environment.baseDirectory)})),o("Melon.std.system.osInformation should have the correct value",(function(e){var t=Melon.dotnet.getStaticProperty("System:Environment:OSVersion"),n=i.osInformation;e.equals(t.Platform,n.platform),e.equals(t.VersionString,n.versionString),e.equals(t.ServicePack,n.servicePack)})),o("Melon.std.json.deserialize should deserialize JSON value correctly",(function(e){var t=s.deserialize('{"a": 1}');e.equals(1,t.a),e.equals(Object.keys(t).length,1)})),o("Melon.std.json.serialize should serialize an object correctly",(function(e){var t=s.serialize({a:1});e.equals(1,s.deserialize(t).a)})),o("Melon.std.json.tryParse should parse JSON value correctly",(function(e){var t=s.tryParse('{"a": 1}');e.equals(1,t.a)})),o("Melon.std.json.tryStringify should stringify an object correctly",(function(e){var t=s.tryStringify({a:1});e.equals(1,s.tryParse(t).a)}))}}},t={};(0,function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}(936).runStdTests)()})();