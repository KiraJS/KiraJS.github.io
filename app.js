// Code goes here
;(function(){
  'use strict';

angular.module('mailBoxApp', [
  'mailBoxApp.users',
  'mailBoxApp.send',
  'ui.router',
  'firebase'
]);

angular.module('mailBoxApp')
  .service('MailService', function($firebaseObject, $firebaseArray){
    var ref = new Firebase('https://mailboxapp.firebaseio.com/');
    var mailsRef = ref.child('mails');
    this.mails = $firebaseArray(mailsRef);
    var outgoingRef = ref.child('outgoing');
    this.outgoing = $firebaseArray(outgoingRef);
    console.log(this.outgoing)
  })
  .component('incomingBox', {
    templateUrl: '/app/mailbox/incomingBox.html',
    controller: function(MailService) {
      this.mails = MailService.mails;
    }
  })
  .component('incomingLetter', {
    templateUrl: '/app/mailbox/incomingLetter.html',
    bindings: {
      mail: '<'
    },
  })
  .component('outgoingBox', {
    templateUrl: '/app/mailbox/outgoingBox.html',
    controller: function(MailService) {
      this.outgoing = MailService.outgoing;
      console.log('component', this.outgoing);
    }
  })
  .component('outgoingLetter', {
    templateUrl: '/app/mailbox/outgoingLetter.html',
    bindings: {
      outgoing: '<'
    },
  })
  .config(function($stateProvider){
    $stateProvider
    .state('incoming', {
      url: "/incoming",
      template: '<incoming-box></incoming-box>'
    })
    .state('outgoing', {
      url: "/outgoing",
      template: '<outgoing-box></outgoing-box>'
    })
  })
})();

;(function(){
  angular.module('mailBoxApp.send', ['ui.router']);
  angular.module('mailBoxApp.send')
    .service('SendService', function(){
    })
    .component('send', {
      templateUrl: '/app/send/send.html',
      controller: function(SendService) {
      }
    })
    .config(function($stateProvider){
      $stateProvider
      .state('send', {
        url: "/send",
        template: '<send></send>'
      })
    })
})();

;(function(){
  angular.module('mailBoxApp.users', ['ui.router']);
  angular.module('mailBoxApp.users')
    .service('UsercService', function($firebaseObject, $firebaseArray){
      var ref = new Firebase('https://mailboxapp.firebaseio.com/');
      var usersRef = ref.child('users');
      this.users = $firebaseArray(usersRef);
       console.log("test", this.users);
    })
    .component('userBox', {
      templateUrl: '/app/users/users.html',
      controller: function(UsercService) {
        this.users = UsercService.users;
      }
    })
    .component('userCard', {
      templateUrl: '/app/users/user.html',
      bindings: {
        user: '<'
      }
    })
    .config(function($stateProvider){
      $stateProvider
      .state('users', {
        url: "/users",
        template: '<user-box></user-box>'
      })
    })
})();
