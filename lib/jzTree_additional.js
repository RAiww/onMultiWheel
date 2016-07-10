"use strict";

let jNavigatorID = naviVerify( navigator.userAgent );

CustomEvent = !/IE/.test( jNavigatorID.browser ) ? window.CustomEvent : function( jName, jInf ){
    let evt = document.createEvent('Event'),
        jArgu = [ jName ];

    [ 'bubbles', 'cancelable' ].map(function( jElem ){
        if( jInf.hasOwnProperty( jElem ) ) jArgu.push( jInf[ jElem ] );
        else jArgu.push( false );
    });
    evt.initEvent.apply( evt, jArgu );

    if( jInf.hasOwnProperty('detail') ) evt['detail'] = jInf['detail'];

    return evt;
};


window.jz = {
    wCode: {
        evtBind: function( HElem, jMethod, jEvtList ){
            if( jMethod !== 'add' && jMethod !== 'remove' ) return;
            else jMethod = jMethod + 'EventListener';

            for(var jName in jEvtList )
                HElem[ jMethod ]( jName, jEvtList[ jName ], false );
        },
        evtStopDefault: function( evt ){
            evt.preventDefault();
        },
    },
};
