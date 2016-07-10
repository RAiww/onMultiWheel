/*! onMultiWheel - RAiww. MIT @license: ra.iww.twbbs.org/ffish/MIT_License. */

"use strict";

    function onMultiWheel(){
        if(! 'jz' in window ) return;
        if( window.onmultiwheel !== true ){
            ion_bindListener();
            window.onmultiwheel = document.onmultiwheel = true;
        }
        onMultiWheel = Function();


//>> 綁定監聽 -----

        function ion_bindListener(){
            let jEvtList;

            jEvtList = {
                wheel: function( evt ){
                    ion_multiWheelEvt( 'wheel', evt );
                },
                multimouse: function( evt ){
                    ion_multiWheelEvt( 'multimouse', evt );
                },
            };

            jz.wCode.evtBind( window, 'add', jEvtList, true );

            jEvtList = null;
        }


//>> -----

        let ArrEvtProp = [ 'deltaMode', 'deltaX', 'deltaY', 'deltaZ' ];

        function ion_multiWheelEvt( jUseType, evt ){
            let jListenerInf = ion_evtHandle( jUseType, evt );
            /* 對 multimouse 的 preventDefault 第一次必須試探的執行 */
            if( jListenerInf && !jListenerInf.target.dispatchEvent( jListenerInf.evt ) ){
                evt.preventDefault();
            }
        }

        function ion_evtHandle( jUseType, evt ){
            let jEvtInf = ion_getEvtInf( jUseType, evt );
            if( !jEvtInf ) return;

            let jNewEvt = new CustomEvent( 'multiwheel', {
                    bubbles: true,
                    cancelable: true,
                    detail: jEvtInf.annex,
                } );

            for(let p = 0, jItem; jItem = ArrEvtProp[ p++ ] ; ){
                let jVal = jEvtInf.evt[ jItem ];
                jNewEvt[ jItem ] = ( typeof jVal === 'number' )? jVal : null;
            }

            jEvtInf.evt = jNewEvt;
            return jEvtInf;
        }

        let ion_dwellTime = 13,
            ion_refPointInf = {
                mouse: { timeStamp: null, x: null, y: null },
                touch: { timeStamp: null, id: null, x: null, y: null },
            };

        function ion_getEvtInf( jUseType, evt ){
            let jEvtInf = null,
                jAnnex = {
                    useType: jUseType,
                };

            if( jUseType === 'wheel' ){
                jEvtInf = {
                    target: evt.target,
                    evt: evt,
                    annex: jAnnex,
                };
            }else if( jUseType === 'multimouse' ){
                let jDetail_multimouse = evt.detail,
                    jUseType_multimouse = jDetail_multimouse.useType,
                    jRefPointInf = ion_refPointInf[ jUseType_multimouse ];

                jAnnex.useType = jUseType_multimouse;

                if( evt.timeStamp - jRefPointInf.timeStamp < ion_dwellTime ) return null;

                let isTouch = jUseType_multimouse === 'touch',
                    jState_multimouse = jDetail_multimouse.state;

                if( isTouch && jDetail_multimouse.touchIDList.length !== 1 ){
                    ion_setRefPointInf( 'touch', 'empty' );
                    return null;
                }

                switch( jState_multimouse ){
                    case 'start':
                        ion_setRefPointInf( jUseType_multimouse, 'renew', evt );
                        jEvtInf = {
                            target: evt.target,
                            evt: ion_getImitateWheelInf( jUseType_multimouse, evt ),
                            annex: jAnnex,
                        };
                        break;
                    case 'move':
                        if( isTouch && evt.detail.id !== jRefPointInf.id ){
                            ion_setRefPointInf( 'touch', 'renew', evt );

                        }else if( jUseType_multimouse === 'mouse' || isTouch ){
                            jEvtInf = {
                                target: evt.target,
                                evt: ion_getImitateWheelInf( jUseType_multimouse, evt ),
                                annex: jAnnex,
                            };
                            ion_setRefPointInf( jUseType_multimouse, 'update', evt );
                        }
                        break;
                    case 'end':
                        if( jUseType_multimouse === 'mouse' || ( isTouch && evt.detail.id === jRefPointInf.id ) )
                            ion_setRefPointInf( jUseType_multimouse, 'empty' );
                        break;
                }
            }

            return jEvtInf;
        }

        function ion_getImitateWheelInf( jUseType, evt ){
            let jRefPointInf = ion_refPointInf[ jUseType ];
            return {
                deltaX: jRefPointInf.x - evt.pageX,
                deltaY: jRefPointInf.y - evt.pageY,
            };
        }

        function ion_setRefPointInf( jUseType, jState, evt ){
            let jRefPointInf = ion_refPointInf[ jUseType ];
            switch( jState ){
                case 'renew':
                    jRefPointInf.timeStamp = evt.timeStamp;
                    jRefPointInf.x = evt.pageX;
                    jRefPointInf.y = evt.pageY;
                    if( jUseType === 'touch' ) jRefPointInf.id = evt.detail.id;
                    break;
                case 'update':
                    jRefPointInf.timeStamp = evt.timeStamp;
                    jRefPointInf.x = evt.pageX;
                    jRefPointInf.y = evt.pageY;
                    break;
                case 'empty':
                    jRefPointInf.timeStamp = jRefPointInf.x = jRefPointInf.y = null;
                    if( jUseType === 'touch' ) jRefPointInf.id = null;
                    break;
            }
        }
    }
