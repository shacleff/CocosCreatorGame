// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        period: 8,
        degree: 0,
        direction: 1.0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.node.runAction(cc.repeatForever(this.clockwise(-180)));
    },

    x_degree_transfer(x, y, degree) {

        return (x) * (Math.cos(degree * Math.PI / 180.0)) + (y) * (Math.sin(degree * Math.PI / 180.0));

    },

    y_degree_transfer(x, y, degree) {

        return (y) * (Math.cos(degree * Math.PI / 180.0)) - (x) * (Math.sin(degree * Math.PI / 180.0));

    },

    clockwise (d) {
        
        var degree = d + 180;

        var fake_x = this.node.height / 2.0;

        var x11 = this.x_degree_transfer(fake_x, 0, degree), y11 = this.y_degree_transfer(fake_x, 0, degree), x12 = this.x_degree_transfer(0, fake_x, degree), y12 = this.y_degree_transfer(0, fake_x, degree);
        var x21 = this.x_degree_transfer(fake_x, 0, degree), y21 = this.y_degree_transfer(fake_x, 0, degree), x22 = this.x_degree_transfer(0, -fake_x, degree), y22 = this.y_degree_transfer(0, -fake_x, degree);
        var x31 = this.x_degree_transfer(-fake_x, 0, degree), y31 = this.y_degree_transfer(-fake_x, 0, degree), x32 = this.x_degree_transfer(0, -fake_x, degree), y32 = this.y_degree_transfer(0, -fake_x, degree);
        var x41 = this.x_degree_transfer(-fake_x, 0, degree), y41 = this.y_degree_transfer(-fake_x, 0, degree), x42 = this.x_degree_transfer(0, fake_x, degree), y42 = this.y_degree_transfer(0, fake_x, degree);

        cc.log("x11 %f y11 %f, x12 %f y12 %f", x11, y11, x12, y12);

        var rot11 = cc.rotateBy(2, 90);
        var rot12 = cc.spawn(cc.moveBy(2, cc.v2(x11, y11)).easing(cc.easeSineIn()), cc.moveBy(2, cc.v2(x12, y12)).easing(cc.easeSineOut()));
        var rot1 = cc.spawn(rot11, rot12);
        
        var rot21 = cc.rotateBy(2, 90);
        var rot22 = cc.spawn(cc.moveBy(2, cc.v2(x21, y21)).easing(cc.easeSineOut()), cc.moveBy(2, cc.v2(x22, y22)).easing(cc.easeSineIn()));
        var rot2 = cc.spawn(rot21, rot22);
        
        var rot31 = cc.rotateBy(2, 90);
        var rot32 = cc.spawn(cc.moveBy(2, cc.v2(x31, y31)).easing(cc.easeSineIn()), cc.moveBy(2, cc.v2(x32, y32)).easing(cc.easeSineOut()));
        var rot3 = cc.spawn(rot31, rot32);
        
        var rot41 = cc.rotateBy(2, 90);
        var rot42 = cc.spawn(cc.moveBy(2, cc.v2(x41, y41)).easing(cc.easeSineOut()), cc.moveBy(2, cc.v2(x42, y42)).easing(cc.easeSineIn()));
        var rot4 = cc.spawn(rot41, rot42);

        return cc.sequence(rot1, rot2, rot3, rot4);

    },

    start () {

    },

    myshift: function (count, degree) {

        this.node.stopAllActions();
        this.degree -= 0.8; //  error range, 0.7 or 0.8 is good

        degree = count % 2 ? degree : degree - 180;

        this.node.runAction(cc.repeatForever(this.clockwise(degree)));
    },

    update (dt) {
        var w = (360.0 / this.period) * this.direction;
        this.degree += (w * dt);
    },
});
