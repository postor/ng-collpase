// Code goes here

// declare the app with no dependencies
angular.module('collpase', []).factory('CollpaseData', function(){
    // I know this doesn't work, but what will?
    var list = {};
    
    var newGroup = function(group,option){
      list[group] = {
        openCount: 0,
        items:{},
        option: angular.extend(
          {
            current: null,
            forceOneOpen: 0,
            forceOtherClose: 1,
          },
          option),
        init:function(){
          this.openCount = 0;
          if(this.option.current===null) return;  
          for(var j in this.option.current){
            this.items[j] = this.option.current[j];
            if(this.option.current[j])this.openCount++;
          }
        },
        select: function(key){
          console.log(key+' selected');
          if(this.items[key]){
            //已经展开
            if(this.option.forceOneOpen) return;
            
            this.openCount--;
            this.items[key] = 0;
          }else{
            //关闭
            if(this.option.forceOtherClose){
              this.openCount = 0;
              for(var k in this.items){
                this.items[k] = 0;
              }
            }
            //展开
            this.openCount++;
            this.items[key] = 1;
          }
        }
      };
      list[group].init();
    };
    
    return {
      newGroup:newGroup,
      list:list
    };
}).directive('ngCollpase', function($compile,$parse)
{ 
  
  return {
      restrict: 'A',
      controller: ['$scope','CollpaseData', function($scope,CollpaseData){
        $scope.collpaseData = CollpaseData;
      }],
      link: function(scope, el, attrs, controller) {
        var option = {};
        if(attrs.ngCollpaseOption){
          option = $parse(attrs.ngCollpaseOption)(scope);
        }
        scope.collpaseData.newGroup(attrs.ngCollpase,option);
      },
      scope: false
  };
}).directive('ngCollpaseTarget', function($compile,$parse)
{ 
  
  return {
      restrict: 'A',
      link: function(scope,tElement, tAttrs) {
        var key = tAttrs['ngCollpaseTarget'];
        key = $parse(key)(scope);
        var prefixedKey = key;
        var parent = tAttrs['ngCollpaseParent'];
        parent = $parse(parent)(scope);
        var prefixedParent = parent;
        
        tElement.attr('ng-class',"{'collpase-target-open':collpaseData.list['"
        +prefixedParent+"'].items['"+prefixedKey
        +"'],'collpase-target-close':!collpaseData.list['"
        +prefixedParent+"'].items['"+prefixedKey+"']}");
        
        tElement.attr('ng-click',"collpaseData.list['"
        +prefixedParent+"'].select('"+key+"')");
        //tElement.attr('ng-click',"test()");
        
        tElement.removeAttr('ng-collpase-target');
        
        $compile(tElement)(scope);
        
      }
  };
}).directive('ngCollpaseHref', function($compile,$parse)
{ 
  
  return {
      restrict: 'A',
      link: function(scope,tElement, tAttrs) {
        var key = tAttrs['ngCollpaseHref'];
        key = $parse(key)(scope);
        var prefixedKey = key;
        var parent = tAttrs['ngCollpaseParent'];
        parent = $parse(parent)(scope);
        var prefixedParent = parent;
        
        tElement.attr('ng-class',"{'collpase-href-open':collpaseData.list['"
        +prefixedParent+"'].items['"+prefixedKey
        +"'],'collpase-href-close':!collpaseData.list['"
        +prefixedParent+"'].items['"+prefixedKey+"']}");
        
        tElement.removeAttr('ng-collpase-href');
        
        $compile(tElement)(scope);
        
      }
  };
});

