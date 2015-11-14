/**
 * Created by yskang on 2015. 11. 14..
 */

describe('mvUser', function() {
    beforeEach(module('app'));

    describe('isAdmin', function(){
        it('should return false if the roles array does not have an admin entry', inject(function(mvUser) {
            var user = new mvUser();
            user.roles = ['not admin'];
            expect(user.isAdmin()).to.be.falsey;
        }))

        it('should return ture if the roles array has an admin entry', inject(function(mvUser) {
            var user = new mvUser();
            user.roles = ['admin'];
            expect(user.isAdmin()).to.be.true;

        }))
    })


})