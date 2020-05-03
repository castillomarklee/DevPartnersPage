'use strict'

app.factory('BlogEntry', [
    '$http',
    '$sanitize',
    '$q',
    '$log',
    '$filter',
    '$sce',
    '$templateRequest',
    '$localStorage',
    'API',
    'ResponseValidator',
    'AuthService',
    'FileService',
    'CONST_BLOG',
    '$location',
    function (
        $http,
        $sanitize,
        $q,
        $log,
        $filter,
        $sce,
        $templateRequest,
        $localStorage,
        API,
        ResponseValidator,
        AuthService,
        FileService,
        CONST_BLOG,
        $location) {

        var SUBTITLE_CHAR_LIMIT = 130; // excluding ellipsis
        var MIN_CONTENT_LENGTH = 20;
        var WATCHED_PROPERTIES = [
            'draftPostTitle', 'categoryId', 'content', 'coverImagePath', 'isFeatured', 'subCategoryId', 'isFeaturedSubCategory'
        ];

        var _this;

        function BlogEntry(data) {
            _this = this;
            initPropertiesWatcher();

            if (data) {
                this.setData(data);
            } else {
                this.isFeatured = false;
            }
        }

        BlogEntry.prototype = {
            setData: function (data) {
                angular.extend(this, data);
                if (this.content && String.isUrl(this.content)) this.content = $sce.trustAsResourceUrl(this.content + "?v=" + this.datePublished);
                if (this.id && $localStorage.likedPosts) this.liked = $localStorage.likedPosts.indexOf(this.id) > -1;
                if (this.categoryId) this.categoryId = String(this.categoryId).toLowerCase();
                if (this.draftPostContentPath) this.draftPostContentPath += '?v=' + encodeURIComponent(this.dateUpdated);
                if (this.postContentPath) this.postContentPath += '?v=' + encodeURIComponent(this.datePublished);
                
                var link = String.format('{0}://{1}/post/{2}', $location.protocol(), $location.host(), this.id);
                this.shareable = {
                    link: link,
                    title: this.title,
                    summary: this.subTitle
                };
                this.shareable['twitter'] = {
                    link: link,
                    title: this.title,
                    summary: String.format("{0} via @DevPartnersPH: {1}", this.title, link)
                }
                this.hasUnpublishedChanges = checkHasUnpublishedChanges();
                updateOriginalValuesHolder();
            },
            saveAsDraft: function () {
                this.status = true;
                return this.save(_this.isPublished, true);
            },
            publish: function () {
                this.status = true;
                return this.save(true);
            },
            save: function (publish, saveAsDraft) {
                var endpoint = !saveAsDraft || !_this.displayId ? '/post' : '/post/draft';
                return $http.post(API.END_POINT + endpoint, getContentToSave(publish)).then(function (response) {
                    if (ResponseValidator.isValid(response)) {
                        _this.id = response.data.data.id;
                        _this.displayId = _this.id;
                        _this.dateUpdated = $filter('date')(new Date(), 'M/d/yyyy h:mm:ss a', 'UTC');
                        _this.hasUnpublishedChanges = checkHasUnpublishedChanges();
                        if (publish) _this.isPublished = true;
                        updateOriginalValuesHolder();
                        return { success: true };
                    } else {
                        return handleError('save', response);
                    }
                }, function (errorResponse) {
                    return handleError('save', errorResponse);
                });
            },
            load: function (draft) {
                var endpoint = draft ? '/post/' + this.id + '/draft' : '/post/' + this.id;    
                return $http.get(API.END_POINT + endpoint).then(function (response) {
                    if (ResponseValidator.isValid(response)) {
                        _this.setData(response.data.data);
                        return { success: true };
                    } else {
                        return handleError('load', response);
                    }
                }, function (errorResponse) {
                    return handleError('load', errorResponse);
                });
            },
            loadFromConstant: function () {
                //note: temporary
                var deferred = $q.defer();
                setTimeout(function () {
                    var content = _.find(CONST_BLOG.BLOG_ENTRIES, function (entry) {
                        return entry.id === _this.id;
                    });
                    _this.setData(content);
                    deferred.resolve({ success: content });
                }, 0);
                return deferred.promise;
            },
            loadContentHtml: function () {
                return loadContentHtml(true);
            },
            changeStatus: function (status) {
                return $http.post(API.END_POINT + String.format('/post/{0}/changeStatus', this.displayId), {
                    status: status ? 'active' : 'inactive'
                }).then(function (response) {
                    if (ResponseValidator.isValid(response)) {
                        _this.status = status;
                        return { success: true };
                    } else {
                        return handleError('changeStatus', response);
                    }
                }, function (errorResponse) {
                    return handleError('changeStatus', errorResponse);
                });
            },
            changeVisibility: function (isFeatured) {
                return $http.post(API.END_POINT + String.format('/post/{0}/changeVisibility', this.id)).then(function (response) {
                    if (ResponseValidator.isValid(response)) {
                        return { success: true };
                    } else {
                        return handleError('changeVisibility', response);
                    }
                }, function (errorResponse) {
                    return handleError('changeVisibility', errorResponse);
                });
            },
            hasCoverPhoto: function () {
                return this.coverImg && this.coverImg !== '';
            },
            addImage: function (image) {
                $log.debug('file size: ' + image.size);
                return FileService.uploadBlogImage(image).then(function (response) {
                    if (response.success) {
                        if (!_this.images) _this.images = [];
                        _this.images.push(response.data.data.image);
                        return { success: true, data: response.data.data };
                    } else {
                        return handleError('addImage', response);
                    }
                }, function (errorResponse) {
                    return handleError('addImage', errorResponse);
                });
            },
            setCoverImage: function (image) {
                $log.debug('file size: ' + image.size);
                return FileService.uploadBlogImage(image).then(function (response) {
                    if (response.success) {
                        _this.coverImg = response.imagePath;
                        return { success: true };
                    } else {
                        return handleError('setCoverImage', response);
                    }
                }, function (errorResponse) {
                    return handleError('setCoverImage', errorResponse);
                });
            },
            like: function () {
                if (this.liked) return;

                _this.liked = true;
                $http.post(API.END_POINT + String.format('/Post/{0}/Like', this.id)).then(function (response) {
                    if (ResponseValidator.isValid(response)) {
                        if (!$localStorage.likedPosts) $localStorage.likedPosts = [];
                        $localStorage.likedPosts.push(_this.id);
                        return { success: true };
                    } else {
                        _this.liked = false;
                        return handleError('like', response);
                    }
                }, function (errorResponse) {
                    _this.liked = false;
                    return handleError('like', errorResponse);
                });
            },
            unlike: function () {
                if (!this.liked) return;

                _this.liked = false;
                $http.post(API.END_POINT + String.format('/Post/{0}/Unlike', this.id)).then(function (response) {
                    if (ResponseValidator.isValid(response)) {
                        if ($localStorage.likedPosts) {
                            var likedPostIndex = $localStorage.likedPosts.indexOf(_this.id);
                            if (likedPostIndex > -1) $localStorage.likedPosts.splice(likedPostIndex, 1);
                        }
                        return { success: true };
                    } else {
                        _this.liked = true;
                        return handleError('unlike', response);
                    }
                }, function (errorResponse) {
                    _this.liked = true;
                    return handleError('unlike', errorResponse);
                });
            },
            isValid: function () {
                return this.draftPostTitle && this.content && this.categoryId && this.content.length > MIN_CONTENT_LENGTH;
            },
            hasChanges: function () {
                return _.findIndex(WATCHED_PROPERTIES, function(property) {
                    return _this[property] !== _this['_' + property];
                }) != -1;
            },
            revertToPublishedVersion: function() {
                return loadContentHtml(false).then(function(response) {
                    if (response.success) {
                        _this.draftPostTitle = _this.postTitle;
                        return _this.saveAsDraft();
                    } else {
                        return {success: false, errorMessage: 'Unable to revert the draft into the published version.'};
                    }
                });
            }
        };

        var initPropertiesWatcher = function () {
            _.each(WATCHED_PROPERTIES, function(property) {
                var privatePropertyName = '__' + property;
                Object.defineProperty(_this, '_' + property, {
                    get: function() {
                        return this[privatePropertyName];
                    },
                    set: function(newValue) {
                        this[privatePropertyName] = newValue;
                    },
                    enumerable: false,
                    configurable: false
                });
            });
        }

        var loadContentHtml = function(loadDraft) {
            var contentUrl = $sce.trustAsResourceUrl(loadDraft ? _this.draftPostContentPath : _this.postContentPath);
            return $templateRequest(contentUrl).then(function (response) {
                _this.contentUrl = _this.content;
                _this.content = response;
                _this._content = _this.content;
                return { success: true };
            }, function (response) {
                return { success: false, errorMessage: 'Unable to load the blog post content.' };
            });
        };

        var updateOriginalValuesHolder = function() {
            _.each(WATCHED_PROPERTIES, function(property) {
                _this["_" + property] = _this[property];
            });
        };

        var checkHasUnpublishedChanges = function() {
            if (_this.isPublished) {
                var datePublished = Date.parse(_this.datePublished),
                    dateUpdated = Date.parse(_this.dateUpdated);
                return dateUpdated > datePublished;
            }
            return false;
        };

        var getContentToSave = function(isPublished) {
            _this.postSubTitle = String.ellipsize(String.extractHTMLInnerText(_this.content), SUBTITLE_CHAR_LIMIT);

            var postBody = {};
            if (isPublished) {
                _this.postTitle = $sanitize(_this.draftPostTitle);
                angular.extend(postBody, _this);
            } else {
                angular.extend(postBody, _this);
                postBody.postTitle = $sanitize(_this.draftPostTitle);
            }

            postBody.isPublished = isPublished;
            postBody.shareable = undefined;
            _.each(WATCHED_PROPERTIES, function(property) {
                delete postBody['__' + property];
            });
            return postBody;
        };

        var handleError = function (processType, errorResponse) {
            if (ResponseValidator.isErrorResponseValid(errorResponse)) {
                return { success: false, errorMessage: errorResponse.data.error.details };
            } else {
                return { success: false, errorMessage: getDefaultErrorMessage(processType) };
            }
        };
        var getDefaultErrorMessage = function (processType) {
            switch (processType) {
                case 'save':
                    return CONST_BLOG.SAVE_BLOG_ENTRY_FAILED;
                case 'load':
                    return CONST_BLOG.LOAD_BLOG_ENTRY_FAILED;
                case 'changeStatus':
                    return CONST_BLOG.CHANGE_STATUS_FAILED;
                case 'changeVisibility':
                    return CONST_BLOG.CHANGE_VISIBILITY_FAILED;
                case 'addImage':
                    return CONST_BLOG.UPLOAD_IMAGE_FAILED;
                case 'setCoverImage':
                    return CONST_BLOG.UPLOAD_COVER_IMG_FAILED;
                case 'like':
                    return CONST_BLOG.LIKE_POST_FAILED;
                case 'unlike':
                    return CONST_BLOG.UNLIKE_POST_FAILED;
            }
        };

        return BlogEntry;
    }]);