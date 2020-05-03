'use strict'

app.factory('MediaItem', ['$http', 'API', 'ResponseValidator', 'FileService', 'CONST_MEDIA_LIB', 'Error', 'Upload',
  function ($http, API, ResponseValidator, FileService, CONST_MEDIA_LIB, Error, Upload) {
    function MediaItem(data) {
      if (data) {
        this.setData(data);
      }
    }

    MediaItem.prototype = {
      setData: function(data) {
        angular.extend(this, data);
      },
      upload: function() {
        var _this = this;
        _this.status = 'uploading';
        return FileService.resize(_this.blob, {
          resizeIf: function(width, height) {
            return width !== 1920 || height !== 1080;
          },
          quality: .8,
          centerCrop: true,
          width: 1920,
          height: 1080,
          restoreExif: false}).then(function(resizedFile) {
            return FileService.uploadBlogImage(resizedFile).then(function(response) {
              if (ResponseValidator.isValid(response)) {
                _this.blob = undefined;
                _this.setData(response.data.data[0]);
                _this.status = 'uploadSuccess';
                _this.error = undefined;
                return {success: true};
              } else {
                _this.status = 'uploadFailed';
                var error = handleError('upload', response);
                _this.error = new Error({message: error.errorMessage});
                return error;
              }
            }, function(errorResponse) {
              _this.status = 'uploadFailed';
              var error = handleError('upload', errorResponse);
              _this.error = new Error({message: error.errorMessage});
              return error;
            });
        });
      },
      delete: function() {
        return $http.post(API.END_POINT + String.format('/media/library/{0}/delete', this.id)).then(function(response) {
          if (ResponseValidator.isValid(response)) {
            return {success: true};
          } else {
            return handleError('delete', response);
          }
        }, function(errorResponse) {
          return handleError('delete', errorResponse);
        });
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
      switch (processType) {
        case 'upload':
          return CONST_MEDIA_LIB.UPLOAD_FAILED;
      }
    };

    return MediaItem;
}]);