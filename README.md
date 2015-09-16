# ng-collpase 让展开收起更自如

##  实例参考：http://plnkr.co/edit/QFp379dEFQhKGRxmJz7p?p=preview  ##

1.定义module时依赖

<per><code>var testApp = angular.module('test', ['collpase']);</code></per>

2.html代码中使用指令初始化一个 your-collpase-id

<per><code>&lt;ul ng-collpase="your-collpase-id" ng-collpase-option="{current:{'1':1}}"&gt;
</code></per>
  
3.定义控制块和响应块

<per><code>
  &lt;a ng-collpase-target="your-collpase-tap" ng-collpase-parent="your-collpase-id"&gt;
  
  &lt;p ng-collpase-href="your-collpase-tap" ng-collpase-parent="your-collpase-id"&gt;
</code></per>
  
