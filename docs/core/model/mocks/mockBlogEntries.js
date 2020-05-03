'use strict'

app.factory('MockBlogEntries', ['$q', 'BlogEntries', 'BlogEntry', function ($q, BlogEntries, BlogEntry) {
  function MockBlogEntries(data) {
    if (data) {
      this.setData(data);
    }
  }
  angular.extend(MockBlogEntries.prototype, BlogEntries.prototype);

  var list = [
    new BlogEntry({
      id: "1",
      title: "The Quick Brown Fox Jumped Over the Lazy Dog",
      datePublished: "2017-05-10T10:50:00+0400",
      status: "active",
      category: "news",
      categoryName: "News",
      coverImg: "https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg"
    }),
    new BlogEntry({
      id: "2",
      title: "There are More Things to Heave and Earth",
      datePublished: "2017-05-12T10:50:00+0400",
      status: "active",
      category: "technology",
      categoryName: "Technology",
      coverImg: "https://www.newton.ac.uk/files/covers/968361.jpg"
    }),
    new BlogEntry({
      id: "3",
      title: "Dreamt of in Your Philosophy",
      datePublished: "2017-06-10T12:50:00+0400",
      status: "active",
      category: "outsourcing",
      categoryName: "Outsourcing",
      coverImg: "http://random-international.com/wp-content/uploads/2012/10/RR-home-img2.jpg"

    }),
    new BlogEntry({
      id: "4",
      title: "Veni, Vidi, Vici",
      datePublished: "2017-07-10T10:50:00+0400",
      status: "active",
      category: "news",
      categoryName: "News",
      coverImg: "https://phillipbrande.files.wordpress.com/2013/10/random-pic-14.jpg"

    }),
    new BlogEntry({
      id: "5",
      title: "Unplague Me!",
      datePublished: "2017-07-15T11:50:00+0400",
      status: "active",
      category: "news",
      categoryName: "News",
      coverImg: "https://www.miataturbo.net/attachments/insert-bs-here-4/78009d1370019848-random-pictures-thread-only-rule-keep-sfw-1682345-slide-slide-1-biz-stone-explains-how-he-turned-91-random-photos-into-movie-jpg"
    }),
    new BlogEntry({
      id: "6",
      title: "Entry 6",
      datePublished: "2017-05-10T10:50:00+0400",
      status: "active",
      category: "news",
      categoryName: "News",
      coverImg: "https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg"
    }),
    new BlogEntry({
      id: "7",
      title: "Entry 7",
      datePublished: "2017-05-12T10:50:00+0400",
      status: "active",
      category: "recruitment",
      categoryName: "Recruitment",
      coverImg: "https://www.newton.ac.uk/files/covers/968361.jpg"
    }),
    new BlogEntry({
      id: "8",
      title: "Entry 8",
      datePublished: "2017-06-10T12:50:00+0400",
      status: "active",
      category: "news",
      categoryName: "News",
      coverImg: "http://random-international.com/wp-content/uploads/2012/10/RR-home-img2.jpg"

    }),
    new BlogEntry({
      id: "9",
      title: "Entry 9",
      datePublished: "2017-07-10T10:50:00+0400",
      status: "active",
      category: "news",
      categoryName: "News",
      coverImg: "https://phillipbrande.files.wordpress.com/2013/10/random-pic-14.jpg"

    }),
    new BlogEntry({
      id: "10",
      title: "Entry 10",
      datePublished: "2017-07-15T11:50:00+0400",
      status: "active",
      category: "news",
      categoryName: "News",
      coverImg: "https://www.miataturbo.net/attachments/insert-bs-here-4/78009d1370019848-random-pictures-thread-only-rule-keep-sfw-1682345-slide-slide-1-biz-stone-explains-how-he-turned-91-random-photos-into-movie-jpg"
    })
  ];

  MockBlogEntries.prototype.perPage = 5;
  MockBlogEntries.prototype.getListByPage = function(page) {
    var deferred = $q.defer();
    var _this = this;
    setTimeout(function () {
      var endIndexExclusive = _this.perPage * page;
      var startIndex = endIndexExclusive - _this.perPage;
      var items, records;
      if (_this.filters) {
        var filteredList = [];
        angular.forEach(list, function (value, key) {
          if (_this.filters.status && _this.filters.rule) {
            if (value.status === _this.filters.status && value.rule === _this.filters.rule) {
              filteredList.push(value);
            }
          } else if (_this.filters.status) {
            if (_this.filters.status === value.status) {
              filteredList.push(value);
            }
          } else if (_this.filters.rule) {
            if (_this.filters.rule === value.rule) {
              filteredList.push(value);
            }
          } else {
            filteredList.push(value);
          }
        });
        items = filteredList.slice(startIndex, endIndexExclusive);
        records = filteredList.length;
      } else {
        items = list.slice(startIndex, endIndexExclusive);
        records = list.length;
      }
      _this.setData({
        items: items,
        page: page,
        size: items ? items.length : 0,
        records: records
      });
      deferred.resolve({ success: true });
    }, 2000);
    return deferred.promise;
  };

  return MockBlogEntries;
}]);