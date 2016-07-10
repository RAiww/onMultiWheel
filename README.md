滾輪組事件
=======


> 作者： RAiww <ra@iww.twbbs.org> (http://ra.iww.twbbs.org/)<br />
> 版本： v0.1.1<br />
> 授權： MIT @license: [ra.iww.twbbs.org/ffish/MIT_License](http://ra.iww.twbbs.org/ffish/MIT_License)



## 簡介


一次綁定多樣性的滾輪（滾輪 + 滑鼠 + 觸控）。



## 目錄


  * lib
    * [JzTree 補充包](lib/jzTree_additional.js)
    * [onMultiMouse.js](lib/onMultiMouse.js)
    * [onMultiWheel.js](lib/onMultiWheel.js)
  * test
    * [index.html](test/index.html)
  * [README.md](README.md)



## 使用方法


```js
// onMultiWheel 監聽就緒
onMultiWheel();

// 新增
document.addEventListener( 'onMultiWheel', function(){...}, false );
// 移除
document.removeEventListener( 'onMultiWheel', function(){...}, false );
```


[觀看演示](https://jsfiddle.net/RAiww/oo8gd39t/)。


**注意：**
  - onMultiWheel 監聽事件是靠綁定 wheel、multimouse 等事件來達成。



## event 參數


evt：

  - detail：
    - useType： 來源類型（wheel, mouse, touch）
  - deltaMode
  - deltaX： 水平捲動。向右為正值。
  - deltaY： 垂直捲動。向下為正值。
  - deltaZ

