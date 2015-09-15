# ng-collpase 让展开收起更自如

##  实例参考：http://plnkr.co/edit/aQHSk3P6RtX9RGlduV6u?p=preview  ##

1.定义module时依赖

  var testApp = angular.module('test', ['collpase']);


2.html代码中使用指令初始化一个 your-collpase-id

  <ul ng-collpase="your-collpase-id" ng-collpase-option="{current:{'1':1}}">

  
3.定义控制块和响应块

  <a ng-collpase-target="your-collpase-tap" ng-collpase-parent="your-collpase-id">

  <p ng-collpase-href="your-collpase-tap" ng-collpase-parent="your-collpase-id">

  
