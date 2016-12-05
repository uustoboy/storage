(function (factory) {

    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }

}(function ($) {

    function _isStorageText( name ){ 
        if( name ==='session' || name === 'local' ){
            return true;
        }else{
            return false;
        }
    }

    var storageBrowser = {};
    if( window.sessionStorage ){
        storageBrowser.isStorage = true;
    }else{
      storageBrowser.isStorage = false;
    }

    if( window.localStorage ){
        storageBrowser.isLocal = true;
    }else{
      storageBrowser.isLocal = false;
    }
    
    $.isSession = storageBrowser.isStorage;
    $.isLocal = storageBrowser.isLocal;
    
    $.storage = function( name,key,value ){

        if( !$.isSession || !$.isLocal ){
            alert( 'This browser does NOT support Storage!' );
            return false;
        }
        if( arguments.length === 1 && !$.isFunction(name) && _isStorageText(name) ){
            switch( name )
            {
                case 'session':
                       return window.sessionStorage ;
                  break;
                case 'local':
                       return window.localStorage ;
                  break;
                default:
            }
        }

        if(  arguments.length === 2 && !$.isFunction(name) && !$.isFunction(key)  && _isStorageText(name) ){
            switch( name )
            {
                case 'session':
                       return sessionStorage[ key ] ;
                  break;
                case 'local':
                       return localStorage[ key ] ;
                  break;
                default:  
            }
        }
        
        if(  arguments.length === 3 && !$.isFunction(name) && !$.isFunction(key) && !$.isFunction(value) && _isStorageText(name)   ){
            switch( name )
            {
                case 'session':
                    if ( $.trim(value).length === 0 && !$.isFunction(value)) {
                        return sessionStorage.removeItem(key);
                    }else{
                        try {
                            return sessionStorage[ key ] = value;
                        }catch(e) {}
                    }
                  break;
                case 'local':
                    if ( $.trim(value).length === 0 && !$.isFunction(value)) {
                        return localStorage.removeItem(key);
                    }else{
                        try {
                            return localStorage[ key ] = value;
                        }catch(e) {}
                    }
                  break;
                default:
            }
        }
        return false;
    } 


    //删除localStorage 的key值；
    $.removeStorage = function( name,key ){
        if( arguments.length === 1 && !$.isFunction(name) && _isStorageText(name) ){
            return false;
        }
        switch( name )
        {
            case 'session':
                 if( key === 'clearAll' ){
                     sessionStorage.clear();
                     return false;
                 }else{
                     return sessionStorage[ key ] ;
                 }
              break;
            case 'local':
                   if( key === 'clearAll' ){
                     localStorage.clear();
                     return false;
                 }else{
                     return localStorage[ key ] ;
                 }
              break;
            default:
        }

    }

    //时时监听 Storage 的变化;
    $.wachStorage = function( fn ){
        if( window.addEventListener ){
            window.addEventListener('storage',fn,true);
        }else{
            window.attachEvent('storage',fn);
        }
    }
}));