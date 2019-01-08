/**
 * 自定义的网元以及附件attachment
 */
CNode = function (id) {
    CNode.superClass.constructor.call(this, id);
}
twaver.Util.ext("CNode", twaver.Node, {
    getVectorUIClass: function () {
        return CNodeUI;
    }
});
CNodeUI = function (network, element) {
    CNodeUI.superClass.constructor.call(this, network, element);
}
twaver.Util.ext('CNodeUI', twaver.vector.NodeUI, {
    checkAttachments: function () {
        CNodeUI.superClass.checkAttachments.call(this);
        this.checkCAttachment();
    },
    checkCAttachment: function () {
        var tip = this._element.getClient("tip");
        var showTip = this._element.getClient("show.tip");
        if (tip != null && tip !== "" && showTip != null && showTip != false) {
            if (!this._CAttachment) {
                this._CAttachment = new CAttachment(this);
                this.addAttachment(this._CAttachment);
            }
        } else {
            if (this._CAttachment) {
                this.removeAttachment(this._CAttachment);
                this._CAttachment = null;
            }
        }
    }
});
CAttachment = function (elementUI, showInAttachmentDiv) {
    CAttachment.superClass.constructor.call(this, elementUI, showInAttachmentDiv);
};
twaver.Util.ext('CAttachment', twaver.canvas.BasicAttachment, {
    paint: function (ctx) {
        CAttachment.superClass.paint.apply(this, arguments);
        _twaver.g.drawText(ctx, this.text, this._contentRect, this.font, this.getStyle('alarm.color'));
    },
    validate: function () {
        this.font = null;
        if (this._element.getClient("tip.font")) {
            this.font = this._element.getClient("tip.font");
        }
        this.text = this._element.getClient("tip");
        this._textSize = _twaver.g.getTextSize(this.font, this.text);
        this._fillColor = this._element.getClient("tip.fill.color");
        twaver.canvas.LabelAttachment.superClass.validate.call(this);
    },
    getContentWidth: function () {
        if (this._element.getClient("tip.width")) {
            return this._element.getClient("tip.width");
        }
        return this._textSize ? this._textSize.width : 0;
    },
    getContentHeight: function () {
        if (this._element.getClient("tip.height")) {
            return this._element.getClient("tip.height");
        }
        return this._textSize ? this._textSize.height : 0;
    },
    getCornerRadius: function () {
        if (this._element.getClient('tip.corner.radius')) {
            return this._element.getClient('tip.corner.radius');
        }
        return 5;
    },
    getPointerLength: function () {
        if (this._element.getClient('tip.pointer.length')) {
            return this._element.getClient('tip.pointer.length');
        }
        return 10;
    },
    getPointerWidth: function () {
        if (this._element.getClient('tip.pointer.width')) {
            return this._element.getClient('tip.pointer.width');
        }
        return 8;
    },
    getPosition: function () {
        if (this._element.getClient('tip.position')) {
            return this._element.getClient('tip.position');
        }
        return "topleft.topleft";// 'topleft.topleft', 'top.top', 'topright.topright', 'right.right', 'left.left', 'bottom.bottom', 'bottoml
    },
    getXOffset: function () {
        if (this._element.getClient('tip.xoffset')) {
            return this._element.getClient('tip.xoffset');
        }
        return 0;
    },
    getYOffset: function () {
        if (this._element.getClient('tip.yoffset')) {
            return this._element.getClient('tip.yoffset');
        }
        return 0;
    },
    getPadding: function () {
        if (this._element.getClient('tip.padding.left')) {
            return this._element.getClient('tip.padding.left');
        }
        return 0;
    },
    getPaddingLeft: function () {
        if (this._element.getClient('tip.padding.left')) {
            return this._element.getClient('tip.padding.left');
        }
        return 0;
    },
    getPaddingRight: function () {
        if (this._element.getClient('tip.padding.right')) {
            return this._element.getClient('tip.padding.right');
        }
        return 0;
    },
    getPaddingTop: function () {
        if (this._element.getClient('tip.padding.top')) {
            return this._element.getClient('tip.padding.top');
        }
        return 0;
    },
    getPaddingBottom: function () {
        if (this._element.getClient('tip.padding.bottom')) {
            return this._element.getClient('tip.padding.bottom');
        }
        return 0;
    },
    getDirection: function () {
        if (this._element.getClient('tip.direction')) {
            return this._element.getClient('tip.direction');
        }
        return "aboveleft";
    },
    isFill: function () {
        return this._fillColor != null;
    },
    getFillColor: function () {
        return this._fillColor;
    },
    getGradient: function () {
        if (this._element.getClient('tip.gradient')) {
            return this._element.getClient('tip.gradient');
        }
        return "none";
    },
    getGradientColor: function () {
        if (this._element.getClient('tip.gradient.color')) {
            return this._element.getClient('tip.gradient.color');
        }
        return "#FFFFFF";
    },
    getOutlineWidth: function () {
        if (this._element.getClient('tip.outline.width')) {
            return this._element.getClient('tip.outline.width');
        }
        return -1;
    },
    getOutlineColor: function () {
        if (this._element.getClient('tip.outline.color')) {
            return this._element.getClient('tip.outline.color');
        }
        return "#000000";
    },
    getCap: function () {
        if (this._element.getClient('tip.cap')) {
            return this._element.getClient('tip.cap');
        }
        return 'butt';
    },
    getJoin: function () {
        if (this._element.getClient('tip.join')) {
            return this._element.getClient('tip.join');
        }

        return 'miter';
    },
    getAlpha: function () {
        if (this._element.getClient('tip.alpha')) {
            return this._element.getClient('tip.alpha');
        }
        return 1;
    },
    isShadowable: function () {
        return false;
    }
});
