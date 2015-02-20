'use strict';

describe('Directive: artistDisplay', function () {

  // load the directive's module
  beforeEach(module('rockboxWebClientApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<artist-display></artist-display>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the artistDisplay directive');
  }));
});
