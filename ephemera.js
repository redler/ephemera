(function (UTIL, $, _, global, undefined) { 'use strict';

    var m = {}; // modules

    var environmentSetup = function () {
        m.Environment.initialize();
    };

    var registerListeners = function () {
        m.TheModel.listeners();
    };

    var last = function () {
        m.UI.last();
    };

    m = {

        Environment : {

            /* General environmental functions */
            initialize : function () {
                m.Environment.setup();
            },

            /* overall setup, bootstrapping, logging access, checking credentials */
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
                /* UTIL is a utility object that provides, among other things, an abstraction layer
                   over the tooltip system for a page -- in this case, tipsy */
                UTIL.registerTip(['.classname','Tiptext'], {gravity: 'w', fade: false, opacity: 1 });
            },

            setup : function () {
                /* things to do early, before nearly everything else has run */
            },

            last : function () {
                /* things to do, trigger, or bind late, after nearly everything else has run */
                UTIL.activateTips();   
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
