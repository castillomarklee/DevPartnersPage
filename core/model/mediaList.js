'use strict'

app.factory('MediaList', ['$http', 'API', 'ResponseValidator', 'List', 'MediaItem', 'CONST_MEDIA_LIB',
  function($http, API, ResponseValidator, List, MediaItem, CONST_MEDIA_LIB) {
    function MediaList(data) {
      if (data) {
        this.setData(data);
      }
    }
    angular.extend(MediaList.prototype, List.prototype);

    MediaList.prototype.setData = function(data) {
      angular.extend(this, data);
      if (data.items && data.size > 0) {
        for (var i = 0; i < data.size; i++) {
          data.items[i] = new MediaItem(data.items[i]);
        }
      }
    };
    MediaList.prototype.loadPage = function(page) {
      var _this = this;
      var params = {
        params: {
          page: _this.page,
          perPage: _this.perPage,
          orderBy: 'desc'
        }
      };
      if (_this.filter) {
        params.params.fileName = _this.filter;
      }
      return $http.get(API.END_POINT + '/media', params).then(function(response) {
        if (ResponseValidator.isValid(response)) {
          _this.setData(response.data.data);
          return {success: true};
        } else {
          return handleError('getListByPage', response);
        }
      }, function(errorResponse) {
        return handleError('getListByPage', errorResponse);
      });
    };
    MediaList.prototype.add = function(item, position) {
      if (!this.items) this.items = [];
      if (position) {
        this.items.splice(position, 0, item);
      } else {
        this.items.push(item);
      }
    };
    MediaList.prototype.remove = function(position) {
      if (this.items && position < this.items.length) {
        return this.items.splice(position, 1);
      }
    };

    var handleError = function(processType, errorResponse) {
      if (ResponseValidator.isErrorResponseValid(errorResponse)) {
        return {success: false, errorMessage: errorResponse.data.error.details};
      } else {
        return {success: false, errorMessage: getDefaultErrorMessage(processType)};
      }
    };
    var getDefaultErrorMessage = function(processType) {
      switch(processType) {
        case 'getListByPage':
          return CONST_MEDIA_LIB.GET_LIST_FAILED;
      }
    };

    return MediaList;
}]);