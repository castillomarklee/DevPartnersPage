"use strict";app.service("EmailAddressBookService",["$http","$log","$q","$location","$ocLazyLoad","$localStorage","$rootScope","CORS_PROXY","G_AUTH_API","API","JS_REQUIRES","PopupWindow","MSAuthService","ResponseValidator",function($http,$log,$q,$location,$ocLazyLoad,$localStorage,$rootScope,CORS_PROXY,G_AUTH_API,API,JS_REQUIRES,PopupWindow,MSAuthService,ResponseValidator){var _this=this;this.supportedClients=[{name:"GMail",buttonClass:"gmail",logo:"assets/images/gmail-logo.png"},{name:"YahooMail",buttonClass:"yahoo",logo:"assets/images/yahoomail-logo.png"},{name:"Outlook",buttonClass:"outlook",logo:"assets/images/outlook.png"}],this.initializeContactsAPIs=function(client){var deferred=$q.defer();switch(client){case"GMail":return gapi.load("client:auth2",function(){gapi.client.init({apiKey:G_AUTH_API.web.api_key,discoveryDocs:["https://people.googleapis.com/$discovery/rest?version=v1"],clientId:G_AUTH_API.web.client_id,scope:"https://www.google.com/m8/feeds"}).then(function(){deferred.resolve({success:!0})})}),deferred.promise;case"YahooMail":return deferred.resolve({success:!0}),deferred.promise;case"Outlook":return $ocLazyLoad.load(JS_REQUIRES.scripts.MSAPI).then(function(response){return MSAuthService.init()})}},this.initializeContacts=function(client){var deferred=$q.defer();switch(client){case"GMail":return gapi.auth2.getAuthInstance().isSignedIn.get()?deferred.resolve({success:!0}):gapi.auth2.getAuthInstance().signIn().then(function(response){deferred.resolve({success:!0})}),deferred.promise;case"YahooMail":return delete $localStorage.ycode,PopupWindow.popupCenter("https://api.login.yahoo.com/oauth2/request_auth?client_id="+API.Y_CLIENT+"&response_type=code&scope=sdct-r&nonce=YihsFwGKgt3KJUh6tPs2&redirect_uri="+API.Y_REDIRECT),_this.yahooCodeWatcher=$rootScope.$watch(function(){return $localStorage.ycode},function(newValue,oldValue){$localStorage.ycode&&(_this.yahooCodeWatcher(),deferred.resolve({success:!0}))}),deferred.promise;case"Outlook":return MSAuthService.login()}},this.getEmailContacts=function(client,page,perPage){switch(client){case"GMail":return this.getGmailContacts(page,perPage);case"YahooMail":return this.getYahooContacts(page,perPage);case"Outlook":return this.getOutlookContacts(page,perPage)}},this.getGmailContacts=function(page,perPage){var deferred=$q.defer(),xhr=new XMLHttpRequest;return xhr.onload=function(){var response=JSON.parse(xhr.responseText),contacts=[];_.forEach(response.feed.entry,function(entry){entry.gd$email&&contacts.push({email:entry.gd$email[0].address,name:entry.title.$t})}),deferred.resolve({success:!0,data:contacts,hasNext:response.feed.entry&&response.feed.entry.length==perPage})},xhr.onerror=function(){deferred.reject({success:!0,data:xhr.responseText})},xhr.open("GET",String.format("https://www.google.com/m8/feeds/contacts/default/full?access_token={0}&alt=json&max-results={1}&start-index={2}",gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,perPage,(page-1)*perPage+1)),xhr.send(),deferred.promise},this.getYahooContacts=function(page,perPage){return $http.get(API.END_POINT+"/Yahoo/"+$localStorage.ycode).then(function(response){if(ResponseValidator.isValid(response)){var contacts=[];return _.forEach(response.data.data.contacts,function(item){contacts.push({email:item.email,name:item.contactName?item.contactName.givenName+" "+item.contactName.familyName:void 0})}),{success:!0,data:contacts}}return ResponseValidator.isErrorResponseValid(response)?{success:!1,errorMessage:response.data.error.details}:{success:!1,errorMessage:"We were unable to fetch your Yahoo contacts. Please try again later."}})},this.getOutlookContacts=function(){var client=MicrosoftGraph.Client.init({authProvider:function(done){done(null,MSAuthService.getAccessToken())}}),deferred=$q.defer();return client.api("/me/contacts").select("givenName,surname,emailAddresses").orderby("givenName ASC").get(function(err,res){if(err)deferred.reject({success:!1,errorMessage:err});else{var contacts=[];_.forEach(res.value,function(item){item.emailAddresses&&0<item.emailAddresses.length&&contacts.push({email:item.emailAddresses[0].address,name:item.givenName+" "+item.surname})}),deferred.resolve({success:!0,data:contacts})}}),deferred.promise},this.release=function(){_this.yahooCodeWatcher&&_this.yahooCodeWatcher(),MSAuthService.release()}}]);