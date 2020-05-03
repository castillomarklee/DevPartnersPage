'use strict'

app.factory('FileService', ['Upload', 'API', function(Upload, API) {
  var service = {};

  service.getFileAsBlob = function(fileUrl, fileName) {
    return Upload.dataUrltoBlob(fileUrl, fileName);
  };

  service.uploadProjectFiles = function(projectId, files) {
    return Upload.upload({
      url: API.END_POINT + "/document",
      arrayKey: '',
      data: {
        'projectId': projectId,
        files: files
      }
    });
  };

  service.resize = function(file, resizeConfig) {
    return Upload.resize(file, resizeConfig);
  };

  service.uploadProfilePicture = function(picture) {
    return Upload.upload({
      url: API.END_POINT + "/User/Avatar",
      data: {
        avatarFile: picture
      }
    });
  };

  service.uploadBlogImage = function(image) {
    return Upload.upload({
      url: API.END_POINT + "/media/library",
      data: {
        images: image
      }
    });
  };

  return service;
}]);