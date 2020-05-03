'use strict'

app.factory('BlogEntries', ['$http', 'API', 'ResponseValidator', 'BlogEntry', 'List', 'CONST_BLOG',
function($http, API, ResponseValidator, BlogEntry, List, CONST_BLOG) {
  function BlogEntries(data) {
    if (data) {
      this.setData(data);
    }
    this.order = {
      sortBy: 'datePublished',
      orderBy: 'desc'
    }
  }

  angular.extend(BlogEntries.prototype, List.prototype);

  BlogEntries.prototype.setData = function(data) {
    angular.extend(this, data);
    if (data.items && data.size > 0) {
      for (var i = 0; i < data.size; i++) {
        data.items[i] = new BlogEntry(data.items[i]);
      }
    }
    if (data.featured) {
      for (var i = 0; i < data.featured.length; i++) {
        data.featured[i] = new BlogEntry(data.featured[i]);
      }
    }
    if (data.result) {
      for (var i = 0; i < data.result.length; i++) {
        data.result[i] = new BlogEntry(data.result[i]);
      }
    }
  };
  BlogEntries.prototype.getListByPage = function(page, viewType, userId) {
    var _this = this, endpoint;
    var params = {
      params: {
        page: page,
        perPage: _this.perPage,
        viewType: viewType
      }
    };
    if (_this.order) {
      if (_this.order.sortBy) {
        params.params.sortBy = _this.order.sortBy;
      }
      if (_this.order.orderBy) {
        params.params.orderBy = _this.order.orderBy;
      }
    }
    if (_this.categoryId && _this.categoryId !== 'all') {
      params.params.categoryId = _this.categoryId;
    }
    if (userId) {
      params.params.userId = userId;
      endpoint = "/post/drafts";
    } else {
      endpoint = "/post";
    }
    return $http.get(API.END_POINT + endpoint, params).then(function(response) {
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
  BlogEntries.prototype.getFeaturedPosts = function() {
    var _this = this;
    return $http.get(API.END_POINT + '/post/featured').then(function(response) {
      if (ResponseValidator.isValid(response)) {
        _this.setData(response.data.data);
        return {success: true};
      } else {
        return handleError('getFeaturedPosts', response);
      }
    }, function(errorResponse) {
      return handleError('getFeaturedPosts', errorResponse);
    });
  };
  BlogEntries.prototype.getFeaturedSubcategoryPost = function(subcategoryId) {
    var _this = this;
    return $http.get(API.END_POINT + '/post/getfeaturedsubcatblog?isfeaturedsubcat=true&subcatId='+subcategoryId).then(function(response) {
      if (ResponseValidator.isValid(response)) {
        _this.setData(response.data);
        return {success: true};
      } else {
        return handleError('getFeaturedSubcategoryPost', response);
      }
    }, function(errorResponse) {
      return handleError('getFeaturedSubcategoryPost', errorResponse);
    });
  };
  BlogEntries.prototype.getRecommendations = function(category, excludedPost) {
    var _this = this;
    var params = {
      params: {
        page: 1,
        perPage: 3,
        sortBy: "datePublished",
        orderBy: "desc",
        categoryId: category,
        excludedPostId: excludedPost,
        isRecommendation: true,
        viewType: 'public'
      }
    };
    return $http.get(API.END_POINT + '/post', params).then(function(response) {
      if (ResponseValidator.isValid(response)) {
        _this.setData(response.data.data);
        return {success: true};
      } else {
        return handleError('getRecommendations', response);
      }
    }, function(errorResponse) {
      return handleError('getRecommendations', errorResponse);
    });
  };
  BlogEntries.prototype.setCategoryFilter = function(category) {
    this.categoryId = category;
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
      case 'getListByPage':
        return CONST_BLOG.LOAD_ENTRIES_FAILED;
      case 'getFeaturedPosts':
        return CONST_BLOG.LOAD_FEATURED_ENTRIES_FAILED;
      case 'getRecommendations':
        return CONST_BLOG.LOAD_RECOMMENDATIONS_FAILED;
    }
  };

  return BlogEntries;
}]);