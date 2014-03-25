angular.module('app').directive('particle', function() {
    return {
        restrict: 'E',

        template: '<canvas></canvas>',
        replace: true,
        scope: { },
        link: function (scope, elm, attrs, controller) {

            var context = elm[0].getContext('2d'),
                screenWidth = window.innerWidth,
                screenHeight = window.innerHeight,
                firstEmitter = new jEmitter.ParticleEmitter({
                    spreadX : 0,
                    spreadY : window.innerHeight/2,
                    minVelocity : 3,
                    maxVelocity : 3,
                    minGravity : 0,
                    maxGravity : 0,
                    minWind	: 0,
                    maxWind	: 10,
                    minSize : 5,
                    maxSize : 15,
                    minSizeStep : -3,
                    maxSizeStep : -3,
                    maxParticleEmit : 1,
                    minParticleEmit : 0,
                    colors: ['89A4F0']
                });

            function animate() {
                context.clearRect(0,0,screenWidth,screenHeight);
                firstEmitter.render(context);
                window.requestAnimationFrame(animate);
            }

            elm[0].width = screenWidth;
            elm[0].height = screenHeight;
            elm.css({
                opacity: 0.3,
                position: 'fixed'
            });

            animate();

             setInterval(function() {
                firstEmitter.emit(-10,screenHeight/2);
             }, 50);
        }
    };
});