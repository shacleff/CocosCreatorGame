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

        r: 256,
        v: 8,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.stopAllActions();
        this.node.setPosition(cc.v2(128, 0));
        // this.node.runAction(cc.repeatForever(this.clockwise(0)));
    },

    x_degree_transfer(x, y, degree) {

        return (x) * (Math.cos(degree * Math.PI / 180.0)) + (y) * (Math.sin(degree * Math.PI / 180.0));

    },

    y_degree_transfer(x, y, degree) {

        return (y) * (Math.cos(degree * Math.PI / 180.0)) - (x) * (Math.sin(degree * Math.PI / 180.0));

    },

    clockwise (degree) {

        var x11 = this.x_degree_transfer(this.r, 0, degree), y11 = this.y_degree_transfer(this.r, 0, degree), x12 = this.x_degree_transfer(0, this.r, degree), y12 = this.y_degree_transfer(0, this.r, degree);
        var x21 = this.x_degree_transfer(this.r, 0, degree), y21 = this.y_degree_transfer(this.r, 0, degree), x22 = this.x_degree_transfer(0, -this.r, degree), y22 = this.y_degree_transfer(0, -this.r, degree);
        var x31 = this.x_degree_transfer(-this.r, 0, degree), y31 = this.y_degree_transfer(-this.r, 0, degree), x32 = this.x_degree_transfer(0, -this.r, degree), y32 = this.y_degree_transfer(0, -this.r, degree);
        var x41 = this.x_degree_transfer(-this.r, 0, degree), y41 = this.y_degree_transfer(-this.r, 0, degree), x42 = this.x_degree_transfer(0, this.r, degree), y42 = this.y_degree_transfer(0, this.r, degree);

        cc.log("x11 %f y11 %f, x12 %f y12 %f", x11, y11, x12, y12);

        var ro1 = cc.spawn(cc.moveBy(this.v / 4, cc.v2(x11, y11)).easing(cc.easeSineIn()), cc.moveBy(this.v / 4, cc.v2(x12, y12)).easing(cc.easeSineOut()));
        var ro2 = cc.spawn(cc.moveBy(this.v / 4, cc.v2(x21, y21)).easing(cc.easeSineOut()), cc.moveBy(this.v / 4, cc.v2(x22, y22)).easing(cc.easeSineIn()));
        var ro3 = cc.spawn(cc.moveBy(this.v / 4, cc.v2(x31, y31)).easing(cc.easeSineIn()), cc.moveBy(this.v / 4, cc.v2(x32, y32)).easing(cc.easeSineOut()));
        var ro4 = cc.spawn(cc.moveBy(this.v / 4, cc.v2(x41, y41)).easing(cc.easeSineOut()), cc.moveBy(this.v / 4, cc.v2(x42, y42)).easing(cc.easeSineIn()));
        return cc.sequence(ro1, ro2, ro3, ro4);

    },

    anticlockwise () {

    },

    start () {

    },

    myshift: function (count, degree) {
        if (!(count % 2)) {

            this.node.stopAllActions();

        } else {
            this.node.runAction(cc.repeatForever(this.clockwise(degree)));
        }

    },

    getCenterPos: function () {
        var centerPos = cc.v2(this.node.x, this.node.y + this.node.height/2);
        return centerPos;
    },

    stopMove: function () {
        this.node.stopAllActions();
    },

    // update (dt) {},
});
