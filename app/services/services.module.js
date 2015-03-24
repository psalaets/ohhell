angular.module('app.services', [
  // angular wrapper around localForage
  'LocalForageModule'
]).config(function($localForageProvider) {
  $localForageProvider.config({
    name: 'Oh Hell'
  });
});