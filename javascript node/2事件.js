//事件类型
文档加载或准备就绪事件
鼠标事件
鼠标滚轮事件
拖放事件
键盘事件
文本输入事件

//事件分类

依赖于设备的输入事件：如鼠标键盘的传统事件，又包括新的触摸事件类型
独立于设备的输入事件
用户界面事件：文本输入域获取键盘焦点的focus事件，用户改变表单元素显示值的change事件和提交按钮事件
状态变化事件
特定API事件：拖放API如“dragstart”，“dragenter”，“dragover”，“drop”,HTML5的<video><audio>元素定义的“waiting”,“playing”,“seeking”，“，volumechange”
计时器和错误处理程序

//鼠标事件

click        //高级事件
contextmenu  //可以取消的事件，也可以像click时间那样使用
dblclick     //双击鼠标触发
mousedown    //鼠标按下触发
mouseup      //鼠标释放按键触发
mousemove    //移动鼠标时触发
mouseout     //鼠标离开元素时触发
mouseover    //当鼠标进入元素时触发
mouseenter   //类似mouseover但不冒泡
mouseleave   //类似mouseot但不冒泡
mousewheel   //除火狐以外都支持

//键盘事件
keydown
keyup
keypress

//触屏移动设备事件
orientationchange  //设备旋转
gestureend         //手势结束
gesturechange      //跟踪手势
touchstart         //手指触摸屏幕时出发事件
touchend           //手指离开屏幕时出发事件