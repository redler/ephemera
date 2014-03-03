/*

    We currently always use 
        - jQuery (or equivalent)
        - underscore (or equivalent),
        - UTIL (wrapper around some useful utility methods, tooltips, logging, etc)
        
    Alternatives like zepto or lo-dash can be passsed as arguments to the IIFE
        
*/
(function (UTIL, $, _, global, undefined) { 'use strict';

    var m = {}; // modules

    var environmentSetup = function () {
        m.Environment.initialize();
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
        UTIL.registerTip(['.classname','Tiptext'], {gravity: 'w', fade: false, opacity: 1 });
        UTIL.registerTip(['.another-selector','Other tiptext']);
    };

    var last = function () {
        m.UI.last();
        // other "late" things go here
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

            doSomething : function (el) {
                /* if we need to attach/export functions to global scope, do so like this */
                global.a_global_function = function (x) {
                    do_something_with(x);
                }
                
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

            last : function () {
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

    $(document).ready(environmentSetup);
    $(document).ready(registerListeners);
    $(document).ready(last);

}(
    UTIL || {}, 
    jQuery || $ || {}, 
    _ || {}, 
    window
    /* undefined */
));
