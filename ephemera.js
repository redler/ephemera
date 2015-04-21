/*

    We currently always use 
        - jQuery (or equivalent)
        - lodash (or underscore.js, or equivalent),
        - global.UTIL (wrapper around some useful utility methods, tooltips, logging, etc)
        
    Alternatives like zepto or lo-dash can be passsed as arguments to the IIFE
        
*/
/*jshint devel:true, laxbreak:true, unused:false, bitwise:false */
/*global _, UTIL */
(function (global, $, _, undefined) { 'use strict';

    var m = {}; // modules

    var setupEnvironment = function () {
        m.Environment.initialize();
    };

    var registerGlobals = function () {
        m.Environment.globals();  
    };
    
    var registerListeners = function () {
        m.UI.listeners();
        m.TheModel.listeners();
    };
    
    var registerTips = function () {
        /* UTIL is a utility object that provides, among other things, an abstraction layer
           over the tooltip system for a page -- in this case, tipsy.
           Register the tips we need, and the framework activates the tip system below
        */
        var UTIL = global.UTIL;
        UTIL.registerTip(['.classname','Tiptext'], {gravity: 'w', fade: false, opacity: 1 });
        UTIL.registerTip(['.another-selector','Other tiptext']);
    };

    var late = function () {
        m.UI.late();
        // other "late" things go here
    };
    
    var afterDomReady = function () {
        thing_to_run_on_DOMReady();
    };
    
    var exportGlobal = function (thingName, thing, force) {
        var overwrite = !!force,
            exists = typeof global[thingName] !== 'undefined';
        if (exists && !overwrite) {
            throw new Error('Cannot export [' + thingName + '] to global scope because it already exists. Use force option to override.');
        }
        global[thingName] = thing;
    };    

    m = {

        Environment : {

            /* General environmental functions */
            initialize : function () {
                m.Environment.setup();
            },

            /* overall setup, bootstrapping, logging access, checking credentials, modes */
            setup : function () { 
                UTIL.setlogging(false);
                m.Environment.doSomething();
            },
            
            globals : function () { // export globals, optionally grouped by categories like "Environment"
                
                exportGlobal('func_published_as_global', function (a) {
                    var b = do_something_with_a(a);
                    return b;
                });
                
                exportGlobal('another_func', function (a) {
                    return ~~a;
                });
                
                exportGlobal('UTIL', (function () {
                    
                    var _state = {
                        logging : false;
                    };
                    
                    var f = {
                        
                        setlogging : function (on_off) {
                            _state.logging = !!on_off;
                        },
                        
                        getlogging : function () {
                            return !!_state.logging;
                        }
                        
                        registerTip : function (/* arguments */) {
                            // set tipsy or bootstrap tooltip with arguments
                            //   e.g. (tipsy):
                            //      arguments[0] as selector
                            //      arguments[1] as text
                            //      arguments[2] as config object
                        }                 
                        
                    };
                    
                    return f;
                    
                }()));
            },
            
            do_something_with : function (d) {
                return d;
            },

            doSomething : function (el) {
                /* can attach functions to global scope using this pattern as well */
                exportGlobal('a_global_function', function (x) {
                    do_something_with(x);
                });
                
                return true;
            }

        },

        UI : {

            listeners : function () {
                /* General UI-level listeners go here */
                $('.some-button-area').on('click', '.do-something', m.UI.do_a_thing);
            },

            setup : function () {
                /* things to do early, before nearly everything else has run */
            },

            late : function () {
                /* things to do, trigger, or bind late, after nearly everything else has run */
                registerTips();
                UTIL.activateTips();   
            },
            
            do_a_thing : function (e) {
                e.preventDefault();
                do_something_here();
            }

        },


        /*
        * Lightweight models
        */

        TheModel : {

            listeners : function () {
                $('body').on('click', '.do-something', m.TheModel.something_handler);
                $('.some-class').on('click', m.TheModel.some_class_handler);
            },

            something_handler : function (e) {
                e.preventDefault();
                do_something();
            },

            some_class_handler : function (e) {
                e.preventDefault();
                do_something_else();
            }

        },

        AnotherModel : {

        }

    }; // m


    setupEnvironment();
    registerGlobals();
    registerListeners();
    late();
    $(function () {
        afterDomReady();
    });

}(
    window,
    jQuery || $, 
    _ 
    /* undefined */
));
