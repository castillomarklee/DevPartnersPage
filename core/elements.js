'use strict'

app.directive('incrementDecrementBtn', ['$timeout', function($timeout){
  return {
    restrict:'E',
    scope:{
      min: '=',
      max:'=',
      value:'=',
      thisClass: '@',
      thisOnChange: '&'
    },
    replace: true,
    template: '<div class="{{::thisClass}}">' + 
      '<button type="button" class="minus" ng-click="value = value - 1;triggerChange($event);" ng-disabled="value <= min"> - </button>' + 
      '<input type="text" ng-model="value" ng-readonly="true" >' +
      '<button type="button" class="plus" ng-click="value = value + 1;triggerChange($event);" ng-disabled="value >= max"> + </button>' + 
    '</div>',
    link: function(scope, element, attrs, ctrls) {
      scope.triggerChange = function(e) {        
        $timeout(function(){
          scope.thisOnChange({});
        });
        e.stopPropagation();
      };
    }
  };
}]);

app.directive('fileTypeIcon', function() {
  return {
    restrict: 'E',
    scope: {
      fileType: '='
    },
    template: '<i class="{{icon}}"></i>',
    controller: function($scope) {
      if ($scope.fileType.indexOf('image/') !== -1) {
        $scope.icon = "fa fa-file-image-o";
      } else if ($scope.fileType.indexOf('pdf') !== -1) {
        $scope.icon = "fa fa-file-pdf-o";
      } else {
        $scope.icon = "fa fa-file-o";
      }
    }
  };
});

app.directive('progressOverlay', function() {
  return {
    restrict: 'E',
    scope: {
      message: '='
    },
    template: '<div class="progress-overlay"><span us-spinner></span><div class="message"> {{message && message !== "" ? message : "Processing. Please wait."}} </div></div>'
  };
});

app.directive('currenciesDropdown', ['$timeout', 'Currency', function($timeout, Currency) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      name: '@',
      id: '@',
      required: '=',
      selectedCurrency: '=',
      onChange: '&',
      onLoading: '&',
      onLoaded: '&',
      onLoadFailed: '&'
    },
    template: '<select name="{{name}}" id="{{id}}" class="selectpicker custom-dropdown-menu" ' +
      'ng-model="selectedCurrency" ' + 
      'ng-options="currency.id as currency.name for currency in currencies" ' +
      'elem-ready="loadCurrencies()" ' +
      'ng-change="onChange({})" ng-required="required"></select>',    
    link: function(scope, element, attrs, ctrls) {
      scope.renderCurrenciesDropdown = function() {
        $timeout(function() {
          var currenciesDropdown = $(scope.id);
          currenciesDropdown.selectpicker('refresh');
          currenciesDropdown.selectpicker('render');
        });
      };
      scope.loadCurrencies = function() {
        scope.onLoading();
        scope.renderCurrenciesDropdown();
        Currency.getList().then(function(response) {
          if (response.success) {
            scope.currencies = response.data;
            scope.renderCurrenciesDropdown();
            scope.onLoaded({currencies: scope.currencies});
          } else {
            scope.onLoadFailed({errorMessage: response.errorMessage});
          }
        });
      };
    }
}}]);

app.directive('optionsSeparator', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      class: '@'
    },
    template: '<div class="{{::\'or-container\' + class}}">' + 
                '<hr class="or-hr">' +
                '<div id="or">or</div>' +
              '</div>'
  }
});