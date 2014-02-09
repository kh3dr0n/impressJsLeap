// ImpressJSLeap 0.1
// Kh3dr0n © 2014
// Controle ImpressJS with Leap motion 
$(document).ready(function() {
    var ctl = new Leap.Controller({
        enableGestures: true
    });

    var swiper = ctl.gesture('swipe');

    var tolerance = 10;
    var cooloff = 80;

    var icontrol = _.debounce(function(xDir, yDir) {

        if (xDir > 0) {
            impress().next();
        } else {
            impress().prev();
        }

    }, cooloff);

    swiper.update(function(g) {
        if (Math.abs(g.translation()[0]) > tolerance || Math.abs(g.translation()[1]) > tolerance) {
            var xDir = Math.abs(g.translation()[0]) > tolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
            var yDir = Math.abs(g.translation()[1]) > tolerance ? (g.translation()[1] < 0 ? -1 : 1) : 0;
            icontrol(xDir, yDir);
        }
    });

    ctl.connect();

})