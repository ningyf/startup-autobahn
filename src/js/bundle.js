// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function () {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style = document.createElement('style'),
            script = document.getElementsByTagName('script')[0],
            info = null;

        style.type = 'text/css';
        style.id = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function (media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function (media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());

// Include a performance.now polyfill
(function () {

    if ('performance' in window === false) {
        window.performance = {};
    }

    // IE 8
    Date.now = (Date.now || function () {
        return new Date().getTime();
    });

    if ('now' in window.performance === false) {
        var offset = window.performance.timing && window.performance.timing.navigationStart ? window.performance.timing.navigationStart
            : Date.now();

        window.performance.now = function () {
            return Date.now() - offset;
        };
    }

})();

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

/*
 _ _      _       _
 ___| (_) ___| | __  (_)___
 / __| | |/ __| |/ /  | / __|
 \__ \ | | (__|   < _ | \__ \
 |___/_|_|\___|_|\_(_)/ |___/
 |__/

 Version: 1.5.9
 Author: Ken Wheeler
 Website: http://kenwheeler.github.io
 Docs: http://kenwheeler.github.io/slick
 Repo: http://github.com/kenwheeler/slick
 Issues: http://github.com/kenwheeler/slick/issues

 */
!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
    "use strict";
    var b = window.Slick || {};
    b = function () {
        function c(c, d) {
            var f, e = this;
            e.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: a(c),
                appendDots: a(c),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (a, b) {
                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (b + 1) + "</button>"
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !1,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, e.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.hidden = "hidden", e.paused = !1, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, f, d), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0), e.checkResponsive(!0)
        }

        var b = 0;
        return c
    }(), b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
        var e = this;
        if ("boolean" == typeof c) d = c, c = null; else if (0 > c || c >= e.slideCount) return !1;
        e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) {
            a(c).attr("data-slick-index", b)
        }), e.$slidesCache = e.$slides, e.reinit()
    }, b.prototype.animateHeight = function () {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.animate({height: b}, a.options.speed)
        }
    }, b.prototype.animateSlide = function (b, c) {
        var d = {}, e = this;
        e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({left: b}, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({top: b}, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({animStart: e.currentLeft}).animate({animStart: b}, {
            duration: e.options.speed,
            easing: e.options.easing,
            step: function (a) {
                a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
            },
            complete: function () {
                c && c.call()
            }
        })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
            e.disableTransition(), c.call()
        }, e.options.speed))
    }, b.prototype.asNavFor = function (b) {
        var c = this, d = c.options.asNavFor;
        d && null !== d && (d = a(d).not(c.$slider)), null !== d && "object" == typeof d && d.each(function () {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0)
        })
    }, b.prototype.applyTransition = function (a) {
        var b = this, c = {};
        b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.autoPlay = function () {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer), a.slideCount > a.options.slidesToShow && a.paused !== !0 && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }, b.prototype.autoPlayClear = function () {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }, b.prototype.autoPlayIterator = function () {
        var a = this;
        a.options.infinite === !1 ? 1 === a.direction ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0), a.slideHandler(a.currentSlide + a.options.slidesToScroll)) : (a.currentSlide - 1 === 0 && (a.direction = 1), a.slideHandler(a.currentSlide - a.options.slidesToScroll)) : a.slideHandler(a.currentSlide + a.options.slidesToScroll)
    }, b.prototype.buildArrows = function () {
        var b = this;
        b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, b.prototype.buildDots = function () {
        var c, d, b = this;
        if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
            for (d = '<ul class="' + b.options.dotsClass + '">', c = 0; c <= b.getDotCount(); c += 1) d += "<li>" + b.options.customPaging.call(this, b, c) + "</li>";
            d += "</ul>", b.$dots = a(d).appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, b.prototype.buildOut = function () {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) {
            a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
        }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
    }, b.prototype.buildRows = function () {
        var b, c, d, e, f, g, h, a = this;
        if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
            for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
                var i = document.createElement("div");
                for (c = 0; c < a.options.rows; c++) {
                    var j = document.createElement("div");
                    for (d = 0; d < a.options.slidesPerRow; d++) {
                        var k = b * h + (c * a.options.slidesPerRow + d);
                        g.get(k) && j.appendChild(g.get(k))
                    }
                    i.appendChild(j)
                }
                e.appendChild(i)
            }
            a.$slider.html(e), a.$slider.children().children().children().css({
                width: 100 / a.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, b.prototype.checkResponsive = function (b, c) {
        var e, f, g, d = this, h = !1, i = d.$slider.width(), j = window.innerWidth || a(window).width();
        if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
            f = null;
            for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
            null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
        }
    }, b.prototype.changeSlide = function (b, c) {
        var f, g, h, d = this, e = a(b.target);
        switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
            case"previous":
                g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
                break;
            case"next":
                g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
                break;
            case"index":
                var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
                d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
                break;
            default:
                return
        }
    }, b.prototype.checkNavigable = function (a) {
        var c, d, b = this;
        if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1]; else for (var e in c) {
            if (a < c[e]) {
                a = d;
                break
            }
            d = c[e]
        }
        return a
    }, b.prototype.cleanUpEvents = function () {
        var b = this;
        b.options.dots && null !== b.$dots && (a("li", b.$dots).off("click.slick", b.changeSlide), b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).off("mouseenter.slick", a.proxy(b.setPaused, b, !0)).off("mouseleave.slick", a.proxy(b.setPaused, b, !1))), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.$list.off("mouseenter.slick", a.proxy(b.setPaused, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.setPaused, b, !1)), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.cleanUpRows = function () {
        var b, a = this;
        a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.html(b))
    }, b.prototype.clickHandler = function (a) {
        var b = this;
        b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
    }, b.prototype.destroy = function (b) {
        var c = this;
        c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            a(this).attr("style", a(this).data("originalStyling"))
        }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
    }, b.prototype.disableTransition = function (a) {
        var b = this, c = {};
        c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.fadeSlide = function (a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({zIndex: c.options.zIndex}), c.$slides.eq(a).animate({opacity: 1}, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
            opacity: 1,
            zIndex: c.options.zIndex
        }), b && setTimeout(function () {
            c.disableTransition(a), b.call()
        }, c.options.speed))
    }, b.prototype.fadeSlideOut = function (a) {
        var b = this;
        b.cssTransitions === !1 ? b.$slides.eq(a).animate({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }))
    }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
        var b = this;
        null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
    }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
        var a = this;
        return a.currentSlide
    }, b.prototype.getDotCount = function () {
        var a = this, b = 0, c = 0, d = 0;
        if (a.options.infinite === !0) for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; else if (a.options.centerMode === !0) d = a.slideCount; else for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d - 1
    }, b.prototype.getLeft = function (a) {
        var c, d, f, b = this, e = 0;
        return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
    }, b.prototype.getOption = b.prototype.slickGetOption = function (a) {
        var b = this;
        return b.options[a]
    }, b.prototype.getNavigableIndexes = function () {
        var e, a = this, b = 0, c = 0, d = [];
        for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d
    }, b.prototype.getSlick = function () {
        return this
    }, b.prototype.getSlideCount = function () {
        var c, d, e, b = this;
        return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) {
            return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
        }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
    }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
        var c = this;
        c.changeSlide({data: {message: "index", index: parseInt(a)}}, b)
    }, b.prototype.init = function (b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA()
    }, b.prototype.initArrowEvents = function () {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.on("click.slick", {message: "previous"}, a.changeSlide), a.$nextArrow.on("click.slick", {message: "next"}, a.changeSlide))
    }, b.prototype.initDotEvents = function () {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {message: "index"}, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.setPaused, b, !0)).on("mouseleave.slick", a.proxy(b.setPaused, b, !1))
    }, b.prototype.initializeEvents = function () {
        var b = this;
        b.initArrowEvents(), b.initDotEvents(), b.$list.on("touchstart.slick mousedown.slick", {action: "start"}, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {action: "move"}, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {action: "end"}, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.$list.on("mouseenter.slick", a.proxy(b.setPaused, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.setPaused, b, !1)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.initUI = function () {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(), a.options.autoplay === !0 && a.autoPlay()
    }, b.prototype.keyHandler = function (a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({data: {message: "previous"}}) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({data: {message: "next"}}))
    }, b.prototype.lazyLoad = function () {
        function g(b) {
            a("img[data-lazy]", b).each(function () {
                var b = a(this), c = a(this).attr("data-lazy"), d = document.createElement("img");
                d.onload = function () {
                    b.animate({opacity: 0}, 100, function () {
                        b.attr("src", c).animate({opacity: 1}, 200, function () {
                            b.removeAttr("data-lazy").removeClass("slick-loading")
                        })
                    })
                }, d.src = c
            })
        }

        var c, d, e, f, b = this;
        b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = e + b.options.slidesToShow, b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
    }, b.prototype.loadSlider = function () {
        var a = this;
        a.setPosition(), a.$slideTrack.css({opacity: 1}), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }, b.prototype.next = b.prototype.slickNext = function () {
        var a = this;
        a.changeSlide({data: {message: "next"}})
    }, b.prototype.orientationChange = function () {
        var a = this;
        a.checkResponsive(), a.setPosition()
    }, b.prototype.pause = b.prototype.slickPause = function () {
        var a = this;
        a.autoPlayClear(), a.paused = !0
    }, b.prototype.play = b.prototype.slickPlay = function () {
        var a = this;
        a.paused = !1, a.autoPlay()
    }, b.prototype.postSlide = function (a) {
        var b = this;
        b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay === !0 && b.paused === !1 && b.autoPlay(), b.options.accessibility === !0 && b.initADA()
    }, b.prototype.prev = b.prototype.slickPrev = function () {
        var a = this;
        a.changeSlide({data: {message: "previous"}})
    }, b.prototype.preventDefault = function (a) {
        a.preventDefault()
    }, b.prototype.progressiveLazyLoad = function () {
        var c, d, b = this;
        c = a("img[data-lazy]", b.$slider).length, c > 0 && (d = a("img[data-lazy]", b.$slider).first(), d.attr("src", null), d.attr("src", d.attr("data-lazy")).removeClass("slick-loading").load(function () {
            d.removeAttr("data-lazy"), b.progressiveLazyLoad(), b.options.adaptiveHeight === !0 && b.setPosition()
        }).error(function () {
            d.removeAttr("data-lazy"), b.progressiveLazyLoad()
        }))
    }, b.prototype.refresh = function (b) {
        var d, e, c = this;
        e = c.slideCount - c.options.slidesToShow, c.options.infinite || (c.slideCount <= c.options.slidesToShow ? c.currentSlide = 0 : c.currentSlide > e && (c.currentSlide = e)), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {currentSlide: d}), c.init(), b || c.changeSlide({
            data: {
                message: "index",
                index: d
            }
        }, !1)
    }, b.prototype.registerBreakpoints = function () {
        var c, d, e, b = this, f = b.options.responsive || null;
        if ("array" === a.type(f) && f.length) {
            b.respondTo = b.options.respondTo || "window";
            for (c in f) if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
                for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
                b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
            }
            b.breakpoints.sort(function (a, c) {
                return b.options.mobileFirst ? a - c : c - a
            })
        }
    }, b.prototype.reinit = function () {
        var b = this;
        b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses(0), b.setPosition(), b.$slider.trigger("reInit", [b]), b.options.autoplay === !0 && b.focusHandler()
    }, b.prototype.resize = function () {
        var b = this;
        a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
            b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
        }, 50))
    }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
        var d = this;
        return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
    }, b.prototype.setCSS = function (a) {
        var d, e, b = this, c = {};
        b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
    }, b.prototype.setDimensions = function () {
        var a = this;
        a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({padding: "0px " + a.options.centerPadding}) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({padding: a.options.centerPadding + " 0px"})), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }, b.prototype.setFade = function () {
        var c, b = this;
        b.$slides.each(function (d, e) {
            c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
                position: "relative",
                right: c,
                top: 0,
                zIndex: b.options.zIndex - 2,
                opacity: 0
            }) : a(e).css({position: "relative", left: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0})
        }), b.$slides.eq(b.currentSlide).css({zIndex: b.options.zIndex - 1, opacity: 1})
    }, b.prototype.setHeight = function () {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.css("height", b)
        }
    }, b.prototype.setOption = b.prototype.slickSetOption = function (b, c, d) {
        var f, g, e = this;
        if ("responsive" === b && "array" === a.type(c)) for (g in c) if ("array" !== a.type(e.options.responsive)) e.options.responsive = [c[g]]; else {
            for (f = e.options.responsive.length - 1; f >= 0;) e.options.responsive[f].breakpoint === c[g].breakpoint && e.options.responsive.splice(f, 1), f--;
            e.options.responsive.push(c[g])
        } else e.options[b] = c;
        d === !0 && (e.unload(), e.reinit())
    }, b.prototype.setPosition = function () {
        var a = this;
        a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
    }, b.prototype.setProps = function () {
        var a = this, b = document.body.style;
        a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
    }, b.prototype.setSlideClasses = function (a) {
        var c, d, e, f, b = this;
        d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a, d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
    }, b.prototype.setupInfinite = function () {
        var c, d, e, b = this;
        if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
            for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
            for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
            b.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                a(this).attr("id", "")
            })
        }
    }, b.prototype.setPaused = function (a) {
        var b = this;
        b.options.autoplay === !0 && b.options.pauseOnHover === !0 && (b.paused = a, a ? b.autoPlayClear() : b.autoPlay())
    }, b.prototype.selectHandler = function (b) {
        var c = this, d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
            e = parseInt(d.attr("data-slick-index"));
        return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
    }, b.prototype.slideHandler = function (a, b, c) {
        var d, e, f, g, h = null, i = this;
        return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
            i.postSlide(d);
        }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () {
            i.postSlide(d)
        }) : i.postSlide(d))) : (i.options.autoplay === !0 && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () {
            i.postSlide(e)
        })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function () {
            i.postSlide(e)
        }) : i.postSlide(e))))
    }, b.prototype.startLoad = function () {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
    }, b.prototype.swipeDirection = function () {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "left" : "right" : "vertical"
    }, b.prototype.swipeEnd = function (a) {
        var c, b = this;
        if (b.dragging = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
        if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) switch (b.swipeDirection()) {
            case"left":
                c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.slideHandler(c), b.currentDirection = 0, b.touchObject = {}, b.$slider.trigger("swipe", [b, "left"]);
                break;
            case"right":
                c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.slideHandler(c), b.currentDirection = 1, b.touchObject = {}, b.$slider.trigger("swipe", [b, "right"])
        } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
    }, b.prototype.swipeHandler = function (a) {
        var b = this;
        if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
            case"start":
                b.swipeStart(a);
                break;
            case"move":
                b.swipeMove(a);
                break;
            case"end":
                b.swipeEnd(a)
        }
    }, b.prototype.swipeMove = function (a) {
        var d, e, f, g, h, b = this;
        return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
    }, b.prototype.swipeStart = function (a) {
        var c, b = this;
        return 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0))
    }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
        var a = this;
        null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
    }, b.prototype.unload = function () {
        var b = this;
        a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, b.prototype.unslick = function (a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]), b.destroy()
    }, b.prototype.updateArrows = function () {
        var b, a = this;
        b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, b.prototype.updateDots = function () {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, b.prototype.visibility = function () {
        var a = this;
        document[a.hidden] ? (a.paused = !0, a.autoPlayClear()) : a.options.autoplay === !0 && (a.paused = !1, a.autoPlay())
    }, b.prototype.initADA = function () {
        var b = this;
        b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({tabindex: "-1"}), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
            a(this).attr({role: "option", "aria-describedby": "slick-slide" + b.instanceUid + c})
        }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) {
            a(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + b.instanceUid + c,
                id: "slick-slide" + b.instanceUid + c
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
    }, b.prototype.activateADA = function () {
        var a = this;
        a.$slideTrack.find(".slick-active").attr({"aria-hidden": "false"}).find("a, input, button, select").attr({tabindex: "0"})
    }, b.prototype.focusHandler = function () {
        var b = this;
        b.$slider.on("focus.slick blur.slick", "*", function (c) {
            c.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function () {
                b.isPlay && (d.is(":focus") ? (b.autoPlayClear(), b.paused = !0) : (b.paused = !1, b.autoPlay()))
            }, 0)
        })
    }, a.fn.slick = function () {
        var f, g, a = this, c = arguments[0], d = Array.prototype.slice.call(arguments, 1), e = a.length;
        for (f = 0; e > f; f++) if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
        return a
    }
});

/*!
 Waypoints - 4.0.0
 Copyright © 2011-2015 Caleb Troughton
 Licensed under the MIT license.
 https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
 */
!function () {
    "use strict";

    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element) throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
    }

    var e = 0, i = {};
    t.prototype.queueTrigger = function (t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function (t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function () {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, t.prototype.disable = function () {
        return this.enabled = !1, this
    }, t.prototype.enable = function () {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function () {
        return this.group.next(this)
    }, t.prototype.previous = function () {
        return this.group.previous(this)
    }, t.invokeAll = function (t) {
        var e = [];
        for (var o in i) e.push(i[o]);
        for (var n = 0, r = e.length; r > n; n++) e[n][t]()
    }, t.destroyAll = function () {
        t.invokeAll("destroy")
    }, t.disableAll = function () {
        t.invokeAll("disable")
    }, t.enableAll = function () {
        t.invokeAll("enable")
    }, t.refreshAll = function () {
        t.Context.refreshAll()
    }, t.viewportHeight = function () {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function () {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function () {
            return this.context.innerHeight() - this.adapter.outerHeight()
        }, "right-in-view": function () {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(), function () {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function e(t) {
        this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }

    var i = 0, o = {}, n = window.Waypoint, r = window.onload;
    e.prototype.add = function (t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, e.prototype.checkEmpty = function () {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical);
        t && e && (this.adapter.off(".waypoints"), delete o[this.key])
    }, e.prototype.createThrottledResizeHandler = function () {
        function t() {
            e.handleResize(), e.didResize = !1
        }

        var e = this;
        this.adapter.on("resize.waypoints", function () {
            e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.createThrottledScrollHandler = function () {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }

        var e = this;
        this.adapter.on("scroll.waypoints", function () {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.handleResize = function () {
        n.Context.refreshAll()
    }, e.prototype.handleScroll = function () {
        var t = {}, e = {
            horizontal: {
                newScroll: this.adapter.scrollLeft(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left"
            },
            vertical: {
                newScroll: this.adapter.scrollTop(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up"
            }
        };
        for (var i in e) {
            var o = e[i], n = o.newScroll > o.oldScroll, r = n ? o.forward : o.backward;
            for (var s in this.waypoints[i]) {
                var a = this.waypoints[i][s], l = o.oldScroll < a.triggerPoint, h = o.newScroll >= a.triggerPoint,
                    p = l && h, u = !l && !h;
                (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
            }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = {x: e.horizontal.newScroll, y: e.vertical.newScroll}
    }, e.prototype.innerHeight = function () {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
    }, e.prototype.remove = function (t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, e.prototype.innerWidth = function () {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
    }, e.prototype.destroy = function () {
        var t = [];
        for (var e in this.waypoints) for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
    }, e.prototype.refresh = function () {
        var t, e = this.element == this.element.window, i = e ? void 0 : this.adapter.offset(), o = {};
        this.handleScroll(), t = {
            horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
            },
            vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
            }
        };
        for (var r in t) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
                var l, h, p, u, c, d = this.waypoints[r][a], f = d.options.offset, w = d.triggerPoint, y = 0,
                    g = null == w;
                d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = y + l - f, h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
            }
        }
        return n.requestAnimationFrame(function () {
            for (var t in o) o[t].flushTriggers()
        }), this
    }, e.findOrCreateByElement = function (t) {
        return e.findByElement(t) || new e(t)
    }, e.refreshAll = function () {
        for (var t in o) o[t].refresh()
    }, e.findByElement = function (t) {
        return o[t.waypointContextKey]
    }, window.onload = function () {
        r && r(), e.refreshAll()
    }, n.requestAnimationFrame = function (e) {
        var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        i.call(window, e)
    }, n.Context = e
}(), function () {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function i(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
    }

    var o = {vertical: {}, horizontal: {}}, n = window.Waypoint;
    i.prototype.add = function (t) {
        this.waypoints.push(t)
    }, i.prototype.clearTriggerQueues = function () {
        this.triggerQueues = {up: [], down: [], left: [], right: []}
    }, i.prototype.flushTriggers = function () {
        for (var i in this.triggerQueues) {
            var o = this.triggerQueues[i], n = "up" === i || "left" === i;
            o.sort(n ? e : t);
            for (var r = 0, s = o.length; s > r; r += 1) {
                var a = o[r];
                (a.options.continuous || r === o.length - 1) && a.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints), o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function (e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function (t, e) {
        this.triggerQueues[e].push(t)
    }, i.prototype.remove = function (t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, i.prototype.first = function () {
        return this.waypoints[0]
    }, i.prototype.last = function () {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function (t) {
        return o[t.axis][t.name] || new i(t)
    }, n.Group = i
}(), function () {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }

    var e = window.jQuery, i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function (e, i) {
        t.prototype[i] = function () {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
        t[o] = e[o]
    }), i.adapters.push({name: "jquery", Adapter: t}), i.Adapter = t
}(), function () {
    "use strict";

    function t(t) {
        return function () {
            var i = [], o = arguments[0];
            return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function () {
                var n = t.extend({}, o, {element: this});
                "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
            }), i
        }
    }

    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();


/*!
 * skrollr core
 *
 * Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr
 *
 * Free to use under terms of MIT license
 */
!function (e, t, r) {
    "use strict";

    function n(r) {
        if (o = t.documentElement, a = t.body, Y(), le = this, r = r || {}, me = r.constants || {}, r.easing) for (var n in r.easing) X[n] = r.easing[n];
        Te = r.edgeStrategy || "set", fe = {
            beforerender: r.beforerender,
            render: r.render,
            keyframe: r.keyframe
        }, ue = r.forceHeight !== !1, ue && (ze = r.scale || 1), pe = r.mobileDeceleration || x, ge = r.smoothScrolling !== !1, ve = r.smoothScrollingDuration || A, he = {targetTop: le.getScrollTop()}, Ke = (r.mobileCheck || function () {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || e.opera)
        })(), Ke ? (ce = t.getElementById(r.skrollrBody || E), ce && ie(), j(), De(o, [y, S], [T])) : De(o, [y, b], [T]), le.refresh(), ke(e, "resize orientationchange", function () {
            var e = o.clientWidth, t = o.clientHeight;
            (t !== Be || e !== $e) && (Be = t, $e = e, _e = !0)
        });
        var i = R();
        return function l() {
            J(), Se = i(l)
        }(), le
    }

    var o, a, i = {
            get: function () {
                return le
            }, init: function (e) {
                return le || new n(e)
            }, VERSION: "0.6.30"
        }, l = Object.prototype.hasOwnProperty, s = e.Math, c = e.getComputedStyle, f = "touchstart",
        u = "touchmove", m = "touchcancel", p = "touchend", d = "skrollable", g = d + "-before",
        v = d + "-between", h = d + "-after", y = "skrollr", T = "no-" + y, b = y + "-desktop", S = y + "-mobile",
        k = "linear", w = 1e3, x = .004, E = "skrollr-body", A = 200, F = "start", C = "end", H = "center",
        D = "bottom", I = "___skrollable_id", P = /^(?:input|textarea|button|select)$/i, N = /^\s+|\s+$/g,
        O = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
        V = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi, z = /^(@?[a-z\-]+)\[(\w+)\]$/, q = /-([a-z0-9_])/g,
        L = function (e, t) {
            return t.toUpperCase()
        }, M = /[\-+]?[\d]*\.?[\d]+/g, $ = /\{\?\}/g, B = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
        _ = /[a-z\-]+-gradient/g, G = "", K = "", Y = function () {
            var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
            if (c) {
                var t = c(a, null);
                for (var r in t) if (G = r.match(e) || +r == r && t[r].match(e)) break;
                if (!G) return void(G = K = "");
                G = G[0], "-" === G.slice(0, 1) ? (K = G, G = {
                    "-webkit-": "webkit",
                    "-moz-": "Moz",
                    "-ms-": "ms",
                    "-o-": "O"
                }[G]) : K = "-" + G.toLowerCase() + "-"
            }
        }, R = function () {
            var t = e.requestAnimationFrame || e[G.toLowerCase() + "RequestAnimationFrame"], r = Ne();
            return (Ke || !t) && (t = function (t) {
                var n = Ne() - r, o = s.max(0, 1e3 / 60 - n);
                return e.setTimeout(function () {
                    r = Ne(), t()
                }, o)
            }), t
        }, U = function () {
            var t = e.cancelAnimationFrame || e[G.toLowerCase() + "CancelAnimationFrame"];
            return (Ke || !t) && (t = function (t) {
                return e.clearTimeout(t)
            }), t
        }, X = {
            begin: function () {
                return 0
            }, end: function () {
                return 1
            }, linear: function (e) {
                return e
            }, quadratic: function (e) {
                return e * e
            }, cubic: function (e) {
                return e * e * e
            }, swing: function (e) {
                return -s.cos(e * s.PI) / 2 + .5
            }, sqrt: function (e) {
                return s.sqrt(e)
            }, outCubic: function (e) {
                return s.pow(e - 1, 3) + 1
            }, bounce: function (e) {
                var t;
                if (.5083 >= e) t = 3; else if (.8489 >= e) t = 9; else if (.96208 >= e) t = 27; else {
                    if (!(.99981 >= e)) return 1;
                    t = 91
                }
                return 1 - s.abs(3 * s.cos(e * t * 1.028) / t)
            }
        };
    n.prototype.refresh = function (e) {
        var n, o, a = !1;
        for (e === r ? (a = !0, se = [], Ge = 0, e = t.getElementsByTagName("*")) : e.length === r && (e = [e]), n = 0, o = e.length; o > n; n++) {
            var i = e[n], l = i, s = [], c = ge, f = Te, u = !1;
            if (a && I in i && delete i[I], i.attributes) {
                for (var m = 0, p = i.attributes.length; p > m; m++) {
                    var g = i.attributes[m];
                    if ("data-anchor-target" !== g.name) if ("data-smooth-scrolling" !== g.name) if ("data-edge-strategy" !== g.name) if ("data-emit-events" !== g.name) {
                        var v = g.name.match(O);
                        if (null !== v) {
                            var h = {props: g.value, element: i, eventType: g.name.replace(q, L)};
                            s.push(h);
                            var y = v[1];
                            y && (h.constant = y.substr(1));
                            var T = v[2];
                            /p$/.test(T) ? (h.isPercentage = !0, h.offset = (0 | T.slice(0, -1)) / 100) : h.offset = 0 | T;
                            var b = v[3], S = v[4] || b;
                            b && b !== F && b !== C ? (h.mode = "relative", h.anchors = [b, S]) : (h.mode = "absolute", b === C ? h.isEnd = !0 : h.isPercentage || (h.offset = h.offset * ze))
                        }
                    } else u = !0; else f = g.value; else c = "off" !== g.value; else if (l = t.querySelector(g.value), null === l) throw'Unable to find anchor target "' + g.value + '"'
                }
                if (s.length) {
                    var k, w, x;
                    !a && I in i ? (x = i[I], k = se[x].styleAttr, w = se[x].classAttr) : (x = i[I] = Ge++, k = i.style.cssText, w = He(i)), se[x] = {
                        element: i,
                        styleAttr: k,
                        classAttr: w,
                        anchorTarget: l,
                        keyFrames: s,
                        smoothScrolling: c,
                        edgeStrategy: f,
                        emitEvents: u,
                        lastFrameIndex: -1
                    }, De(i, [d], [])
                }
            }
        }
        for (Ae(), n = 0, o = e.length; o > n; n++) {
            var E = se[e[n][I]];
            E !== r && (Q(E), te(E))
        }
        return le
    }, n.prototype.relativeToAbsolute = function (e, t, r) {
        var n = o.clientHeight, a = e.getBoundingClientRect(), i = a.top, l = a.bottom - a.top;
        return t === D ? i -= n : t === H && (i -= n / 2), r === D ? i += l : r === H && (i += l / 2), i += le.getScrollTop(), i + .5 | 0
    }, n.prototype.animateTo = function (e, t) {
        t = t || {};
        var n = Ne(), o = le.getScrollTop(), a = t.duration === r ? w : t.duration;
        return de = {
            startTop: o,
            topDiff: e - o,
            targetTop: e,
            duration: a,
            startTime: n,
            endTime: n + a,
            easing: X[t.easing || k],
            done: t.done
        }, de.topDiff || (de.done && de.done.call(le, !1), de = r), le
    }, n.prototype.stopAnimateTo = function () {
        de && de.done && de.done.call(le, !0), de = r
    }, n.prototype.isAnimatingTo = function () {
        return !!de
    }, n.prototype.isMobile = function () {
        return Ke
    }, n.prototype.setScrollTop = function (t, r) {
        return ye = r === !0, Ke ? Ye = s.min(s.max(t, 0), Ve) : e.scrollTo(0, t), le
    }, n.prototype.getScrollTop = function () {
        return Ke ? Ye : e.pageYOffset || o.scrollTop || a.scrollTop || 0
    }, n.prototype.getMaxScrollTop = function () {
        return Ve
    }, n.prototype.on = function (e, t) {
        return fe[e] = t, le
    }, n.prototype.off = function (e) {
        return delete fe[e], le
    }, n.prototype.destroy = function () {
        var e = U();
        e(Se), xe(), De(o, [T], [y, b, S]);
        for (var t = 0, n = se.length; n > t; t++) ae(se[t].element);
        o.style.overflow = a.style.overflow = "", o.style.height = a.style.height = "", ce && i.setStyle(ce, "transform", "none"), le = r, ce = r, fe = r, ue = r, Ve = 0, ze = 1, me = r, pe = r, qe = "down", Le = -1, $e = 0, Be = 0, _e = !1, de = r, ge = r, ve = r, he = r, ye = r, Ge = 0, Te = r, Ke = !1, Ye = 0, be = r
    };
    var j = function () {
        var n, i, l, c, d, g, v, h, y, T, b, S;
        ke(o, [f, u, m, p].join(" "), function (e) {
            var o = e.changedTouches[0];
            for (c = e.target; 3 === c.nodeType;) c = c.parentNode;
            switch (d = o.clientY, g = o.clientX, T = e.timeStamp, P.test(c.tagName) || e.preventDefault(), e.type) {
                case f:
                    n && n.blur(), le.stopAnimateTo(), n = c, i = v = d, l = g, y = T;
                    break;
                case u:
                    P.test(c.tagName) && t.activeElement !== c && e.preventDefault(), h = d - v, S = T - b, le.setScrollTop(Ye - h, !0), v = d, b = T;
                    break;
                default:
                case m:
                case p:
                    var a = i - d, k = l - g, w = k * k + a * a;
                    if (49 > w) {
                        if (!P.test(n.tagName)) {
                            n.focus();
                            var x = t.createEvent("MouseEvents");
                            x.initMouseEvent("click", !0, !0, e.view, 1, o.screenX, o.screenY, o.clientX, o.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), n.dispatchEvent(x)
                        }
                        return
                    }
                    n = r;
                    var E = h / S;
                    E = s.max(s.min(E, 3), -3);
                    var A = s.abs(E / pe), F = E * A + .5 * pe * A * A, C = le.getScrollTop() - F, H = 0;
                    C > Ve ? (H = (Ve - C) / F, C = Ve) : 0 > C && (H = -C / F, C = 0), A *= 1 - H, le.animateTo(C + .5 | 0, {
                        easing: "outCubic",
                        duration: A
                    })
            }
        }), e.scrollTo(0, 0), o.style.overflow = a.style.overflow = "hidden"
    }, W = function () {
        var e, t, r, n, a, i, l, c, f, u, m, p = o.clientHeight, d = Fe();
        for (c = 0, f = se.length; f > c; c++) for (e = se[c], t = e.element, r = e.anchorTarget, n = e.keyFrames, a = 0, i = n.length; i > a; a++) l = n[a], u = l.offset, m = d[l.constant] || 0, l.frame = u, l.isPercentage && (u *= p, l.frame = u), "relative" === l.mode && (ae(t), l.frame = le.relativeToAbsolute(r, l.anchors[0], l.anchors[1]) - u, ae(t, !0)), l.frame += m, ue && !l.isEnd && l.frame > Ve && (Ve = l.frame);
        for (Ve = s.max(Ve, Ce()), c = 0, f = se.length; f > c; c++) {
            for (e = se[c], n = e.keyFrames, a = 0, i = n.length; i > a; a++) l = n[a], m = d[l.constant] || 0, l.isEnd && (l.frame = Ve - l.offset + m);
            e.keyFrames.sort(Oe)
        }
    }, Z = function (e, t) {
        for (var r = 0, n = se.length; n > r; r++) {
            var o, a, s = se[r], c = s.element, f = s.smoothScrolling ? e : t, u = s.keyFrames, m = u.length, p = u[0],
                y = u[u.length - 1], T = f < p.frame, b = f > y.frame, S = T ? p : y, k = s.emitEvents,
                w = s.lastFrameIndex;
            if (T || b) {
                if (T && -1 === s.edge || b && 1 === s.edge) continue;
                switch (T ? (De(c, [g], [h, v]), k && w > -1 && (Ee(c, p.eventType, qe), s.lastFrameIndex = -1)) : (De(c, [h], [g, v]), k && m > w && (Ee(c, y.eventType, qe), s.lastFrameIndex = m)), s.edge = T ? -1 : 1, s.edgeStrategy) {
                    case"reset":
                        ae(c);
                        continue;
                    case"ease":
                        f = S.frame;
                        break;
                    default:
                    case"set":
                        var x = S.props;
                        for (o in x) l.call(x, o) && (a = oe(x[o].value), 0 === o.indexOf("@") ? c.setAttribute(o.substr(1), a) : i.setStyle(c, o, a));
                        continue
                }
            } else 0 !== s.edge && (De(c, [d, v], [g, h]), s.edge = 0);
            for (var E = 0; m - 1 > E; E++) if (f >= u[E].frame && f <= u[E + 1].frame) {
                var A = u[E], F = u[E + 1];
                for (o in A.props) if (l.call(A.props, o)) {
                    var C = (f - A.frame) / (F.frame - A.frame);
                    C = A.props[o].easing(C), a = ne(A.props[o].value, F.props[o].value, C), a = oe(a), 0 === o.indexOf("@") ? c.setAttribute(o.substr(1), a) : i.setStyle(c, o, a)
                }
                k && w !== E && ("down" === qe ? Ee(c, A.eventType, qe) : Ee(c, F.eventType, qe), s.lastFrameIndex = E);
                break
            }
        }
    }, J = function () {
        _e && (_e = !1, Ae());
        var e, t, n = le.getScrollTop(), o = Ne();
        if (de) o >= de.endTime ? (n = de.targetTop, e = de.done, de = r) : (t = de.easing((o - de.startTime) / de.duration), n = de.startTop + t * de.topDiff | 0), le.setScrollTop(n, !0); else if (!ye) {
            var a = he.targetTop - n;
            a && (he = {
                startTop: Le,
                topDiff: n - Le,
                targetTop: n,
                startTime: Me,
                endTime: Me + ve
            }), o <= he.endTime && (t = X.sqrt((o - he.startTime) / ve), n = he.startTop + t * he.topDiff | 0)
        }
        if (ye || Le !== n) {
            qe = n > Le ? "down" : Le > n ? "up" : qe, ye = !1;
            var l = {curTop: n, lastTop: Le, maxTop: Ve, direction: qe},
                s = fe.beforerender && fe.beforerender.call(le, l);
            s !== !1 && (Z(n, le.getScrollTop()), Ke && ce && i.setStyle(ce, "transform", "translate(0, " + -Ye + "px) " + be), Le = n, fe.render && fe.render.call(le, l)), e && e.call(le, !1)
        }
        Me = o
    }, Q = function (e) {
        for (var t = 0, r = e.keyFrames.length; r > t; t++) {
            for (var n, o, a, i, l = e.keyFrames[t], s = {}; null !== (i = V.exec(l.props));) a = i[1], o = i[2], n = a.match(z), null !== n ? (a = n[1], n = n[2]) : n = k, o = o.indexOf("!") ? ee(o) : [o.slice(1)], s[a] = {
                value: o,
                easing: X[n]
            };
            l.props = s
        }
    }, ee = function (e) {
        var t = [];
        return B.lastIndex = 0, e = e.replace(B, function (e) {
            return e.replace(M, function (e) {
                return e / 255 * 100 + "%"
            })
        }), K && (_.lastIndex = 0, e = e.replace(_, function (e) {
            return K + e
        })), e = e.replace(M, function (e) {
            return t.push(+e), "{?}"
        }), t.unshift(e), t
    }, te = function (e) {
        var t, r, n = {};
        for (t = 0, r = e.keyFrames.length; r > t; t++) re(e.keyFrames[t], n);
        for (n = {}, t = e.keyFrames.length - 1; t >= 0; t--) re(e.keyFrames[t], n)
    }, re = function (e, t) {
        var r;
        for (r in t) l.call(e.props, r) || (e.props[r] = t[r]);
        for (r in e.props) t[r] = e.props[r]
    }, ne = function (e, t, r) {
        var n, o = e.length;
        if (o !== t.length) throw"Can't interpolate between \"" + e[0] + '" and "' + t[0] + '"';
        var a = [e[0]];
        for (n = 1; o > n; n++) a[n] = e[n] + (t[n] - e[n]) * r;
        return a
    }, oe = function (e) {
        var t = 1;
        return $.lastIndex = 0, e[0].replace($, function () {
            return e[t++]
        })
    }, ae = function (e, t) {
        e = [].concat(e);
        for (var r, n, o = 0, a = e.length; a > o; o++) n = e[o], r = se[n[I]], r && (t ? (n.style.cssText = r.dirtyStyleAttr, De(n, r.dirtyClassAttr)) : (r.dirtyStyleAttr = n.style.cssText, r.dirtyClassAttr = He(n), n.style.cssText = r.styleAttr, De(n, r.classAttr)))
    }, ie = function () {
        be = "translateZ(0)", i.setStyle(ce, "transform", be);
        var e = c(ce), t = e.getPropertyValue("transform"), r = e.getPropertyValue(K + "transform"),
            n = t && "none" !== t || r && "none" !== r;
        n || (be = "")
    };
    i.setStyle = function (e, t, r) {
        var n = e.style;
        if (t = t.replace(q, L).replace("-", ""), "zIndex" === t) isNaN(r) ? n[t] = r : n[t] = "" + (0 | r); else if ("float" === t) n.styleFloat = n.cssFloat = r; else try {
            G && (n[G + t.slice(0, 1).toUpperCase() + t.slice(1)] = r), n[t] = r
        } catch (o) {
        }
    };
    var le, se, ce, fe, ue, me, pe, de, ge, ve, he, ye, Te, be, Se, ke = i.addEvent = function (t, r, n) {
        var o = function (t) {
            return t = t || e.event, t.target || (t.target = t.srcElement), t.preventDefault || (t.preventDefault = function () {
                t.returnValue = !1, t.defaultPrevented = !0
            }), n.call(this, t)
        };
        r = r.split(" ");
        for (var a, i = 0, l = r.length; l > i; i++) a = r[i], t.addEventListener ? t.addEventListener(a, n, !1) : t.attachEvent("on" + a, o), Re.push({
            element: t,
            name: a,
            listener: n
        })
    }, we = i.removeEvent = function (e, t, r) {
        t = t.split(" ");
        for (var n = 0, o = t.length; o > n; n++) e.removeEventListener ? e.removeEventListener(t[n], r, !1) : e.detachEvent("on" + t[n], r)
    }, xe = function () {
        for (var e, t = 0, r = Re.length; r > t; t++) e = Re[t], we(e.element, e.name, e.listener);
        Re = []
    }, Ee = function (e, t, r) {
        fe.keyframe && fe.keyframe.call(le, e, t, r)
    }, Ae = function () {
        var e = le.getScrollTop();
        Ve = 0, ue && !Ke && (a.style.height = ""), W(), ue && !Ke && (a.style.height = Ve + o.clientHeight + "px"), Ke ? le.setScrollTop(s.min(le.getScrollTop(), Ve)) : le.setScrollTop(e, !0), ye = !0
    }, Fe = function () {
        var e, t, r = o.clientHeight, n = {};
        for (e in me) t = me[e], "function" == typeof t ? t = t.call(le) : /p$/.test(t) && (t = t.slice(0, -1) / 100 * r), n[e] = t;
        return n
    }, Ce = function () {
        var e, t = 0;
        return ce && (t = s.max(ce.offsetHeight, ce.scrollHeight)), e = s.max(t, a.scrollHeight, a.offsetHeight, o.scrollHeight, o.offsetHeight, o.clientHeight), e - o.clientHeight
    }, He = function (t) {
        var r = "className";
        return e.SVGElement && t instanceof e.SVGElement && (t = t[r], r = "baseVal"), t[r]
    }, De = function (t, n, o) {
        var a = "className";
        if (e.SVGElement && t instanceof e.SVGElement && (t = t[a], a = "baseVal"), o === r) return void(t[a] = n);
        for (var i = t[a], l = 0, s = o.length; s > l; l++) i = Pe(i).replace(Pe(o[l]), " ");
        i = Ie(i);
        for (var c = 0, f = n.length; f > c; c++) -1 === Pe(i).indexOf(Pe(n[c])) && (i += " " + n[c]);
        t[a] = Ie(i)
    }, Ie = function (e) {
        return e.replace(N, "")
    }, Pe = function (e) {
        return " " + e + " "
    }, Ne = Date.now || function () {
        return +new Date
    }, Oe = function (e, t) {
        return e.frame - t.frame
    }, Ve = 0, ze = 1, qe = "down", Le = -1, Me = Ne(), $e = 0, Be = 0, _e = !1, Ge = 0, Ke = !1, Ye = 0, Re = [];
    "function" == typeof define && define.amd ? define([], function () {
        return i
    }) : "undefined" != typeof module && module.exports ? module.exports = i : e.skrollr = i
}(window, document);


//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function () {
    function n(n) {
        function t(t, r, e, u, i, o) {
            for (; i >= 0 && o > i; i += n) {
                var a = u ? u[i] : i;
                e = r(e, t[a], a, t)
            }
            return e
        }

        return function (r, e, u, i) {
            e = b(e, i, 4);
            var o = !k(r) && m.keys(r), a = (o || r).length, c = n > 0 ? 0 : a - 1;
            return arguments.length < 3 && (u = r[o ? o[c] : c], c += n), t(r, e, u, o, c, a)
        }
    }

    function t(n) {
        return function (t, r, e) {
            r = x(r, e);
            for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n) if (r(t[i], i, t)) return i;
            return -1
        }
    }

    function r(n, t, r) {
        return function (e, u, i) {
            var o = 0, a = O(e);
            if ("number" == typeof i) n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1; else if (r && i && a) return i = r(e, u), e[i] === u ? i : -1;
            if (u !== u) return i = t(l.call(e, o, a), m.isNaN), i >= 0 ? i + o : -1;
            for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n) if (e[i] === u) return i;
            return -1
        }
    }

    function e(n, t) {
        var r = I.length, e = n.constructor, u = m.isFunction(e) && e.prototype || a, i = "constructor";
        for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--;) i = I[r], i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
    }

    var u = this, i = u._, o = Array.prototype, a = Object.prototype, c = Function.prototype, f = o.push,
        l = o.slice, s = a.toString, p = a.hasOwnProperty, h = Array.isArray, v = Object.keys, g = c.bind,
        y = Object.create, d = function () {
        }, m = function (n) {
            return n instanceof m ? n : this instanceof m ? void(this._wrapped = n) : new m(n)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m), exports._ = m) : u._ = m, m.VERSION = "1.8.3";
    var b = function (n, t, r) {
        if (t === void 0) return n;
        switch (null == r ? 3 : r) {
            case 1:
                return function (r) {
                    return n.call(t, r)
                };
            case 2:
                return function (r, e) {
                    return n.call(t, r, e)
                };
            case 3:
                return function (r, e, u) {
                    return n.call(t, r, e, u)
                };
            case 4:
                return function (r, e, u, i) {
                    return n.call(t, r, e, u, i)
                }
        }
        return function () {
            return n.apply(t, arguments)
        }
    }, x = function (n, t, r) {
        return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)
    };
    m.iteratee = function (n, t) {
        return x(n, t, 1 / 0)
    };
    var _ = function (n, t) {
        return function (r) {
            var e = arguments.length;
            if (2 > e || null == r) return r;
            for (var u = 1; e > u; u++) for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
                var f = o[c];
                t && r[f] !== void 0 || (r[f] = i[f])
            }
            return r
        }
    }, j = function (n) {
        if (!m.isObject(n)) return {};
        if (y) return y(n);
        d.prototype = n;
        var t = new d;
        return d.prototype = null, t
    }, w = function (n) {
        return function (t) {
            return null == t ? void 0 : t[n]
        }
    }, A = Math.pow(2, 53) - 1, O = w("length"), k = function (n) {
        var t = O(n);
        return "number" == typeof t && t >= 0 && A >= t
    };
    m.each = m.forEach = function (n, t, r) {
        t = b(t, r);
        var e, u;
        if (k(n)) for (e = 0, u = n.length; u > e; e++) t(n[e], e, n); else {
            var i = m.keys(n);
            for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n)
        }
        return n
    }, m.map = m.collect = function (n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
            var a = e ? e[o] : o;
            i[o] = t(n[a], a, n)
        }
        return i
    }, m.reduce = m.foldl = m.inject = n(1), m.reduceRight = m.foldr = n(-1), m.find = m.detect = function (n, t, r) {
        var e;
        return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r), e !== void 0 && e !== -1 ? n[e] : void 0
    }, m.filter = m.select = function (n, t, r) {
        var e = [];
        return t = x(t, r), m.each(n, function (n, r, u) {
            t(n, r, u) && e.push(n)
        }), e
    }, m.reject = function (n, t, r) {
        return m.filter(n, m.negate(x(t)), r)
    }, m.every = m.all = function (n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (!t(n[o], o, n)) return !1
        }
        return !0
    }, m.some = m.any = function (n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (t(n[o], o, n)) return !0
        }
        return !1
    }, m.contains = m.includes = m.include = function (n, t, r, e) {
        return k(n) || (n = m.values(n)), ("number" != typeof r || e) && (r = 0), m.indexOf(n, t, r) >= 0
    }, m.invoke = function (n, t) {
        var r = l.call(arguments, 2), e = m.isFunction(t);
        return m.map(n, function (n) {
            var u = e ? t : n[t];
            return null == u ? u : u.apply(n, r)
        })
    }, m.pluck = function (n, t) {
        return m.map(n, m.property(t))
    }, m.where = function (n, t) {
        return m.filter(n, m.matcher(t))
    }, m.findWhere = function (n, t) {
        return m.find(n, m.matcher(t))
    }, m.max = function (n, t, r) {
        var e, u, i = -1 / 0, o = -1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++) e = n[a], e > i && (i = e)
        } else t = x(t, r), m.each(n, function (n, r, e) {
            u = t(n, r, e), (u > o || u === -1 / 0 && i === -1 / 0) && (i = n, o = u)
        });
        return i
    }, m.min = function (n, t, r) {
        var e, u, i = 1 / 0, o = 1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++) e = n[a], i > e && (i = e)
        } else t = x(t, r), m.each(n, function (n, r, e) {
            u = t(n, r, e), (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n, o = u)
        });
        return i
    }, m.shuffle = function (n) {
        for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) t = m.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
        return u
    }, m.sample = function (n, t, r) {
        return null == t || r ? (k(n) || (n = m.values(n)), n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))
    }, m.sortBy = function (n, t, r) {
        return t = x(t, r), m.pluck(m.map(n, function (n, r, e) {
            return {value: n, index: r, criteria: t(n, r, e)}
        }).sort(function (n, t) {
            var r = n.criteria, e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0) return 1;
                if (e > r || e === void 0) return -1
            }
            return n.index - t.index
        }), "value")
    };
    var F = function (n) {
        return function (t, r, e) {
            var u = {};
            return r = x(r, e), m.each(t, function (e, i) {
                var o = r(e, i, t);
                n(u, e, o)
            }), u
        }
    };
    m.groupBy = F(function (n, t, r) {
        m.has(n, r) ? n[r].push(t) : n[r] = [t]
    }), m.indexBy = F(function (n, t, r) {
        n[r] = t
    }), m.countBy = F(function (n, t, r) {
        m.has(n, r) ? n[r]++ : n[r] = 1
    }), m.toArray = function (n) {
        return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : []
    }, m.size = function (n) {
        return null == n ? 0 : k(n) ? n.length : m.keys(n).length
    }, m.partition = function (n, t, r) {
        t = x(t, r);
        var e = [], u = [];
        return m.each(n, function (n, r, i) {
            (t(n, r, i) ? e : u).push(n)
        }), [e, u]
    }, m.first = m.head = m.take = function (n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)
    }, m.initial = function (n, t, r) {
        return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
    }, m.last = function (n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))
    }, m.rest = m.tail = m.drop = function (n, t, r) {
        return l.call(n, null == t || r ? 1 : t)
    }, m.compact = function (n) {
        return m.filter(n, m.identity)
    };
    var S = function (n, t, r, e) {
        for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
            var c = n[o];
            if (k(c) && (m.isArray(c) || m.isArguments(c))) {
                t || (c = S(c, t, r));
                var f = 0, l = c.length;
                for (u.length += l; l > f;) u[i++] = c[f++]
            } else r || (u[i++] = c)
        }
        return u
    };
    m.flatten = function (n, t) {
        return S(n, t, !1)
    }, m.without = function (n) {
        return m.difference(n, l.call(arguments, 1))
    }, m.uniq = m.unique = function (n, t, r, e) {
        m.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = x(r, e));
        for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
            var c = n[o], f = r ? r(c, o, n) : c;
            t ? (o && i === f || u.push(c), i = f) : r ? m.contains(i, f) || (i.push(f), u.push(c)) : m.contains(u, c) || u.push(c)
        }
        return u
    }, m.union = function () {
        return m.uniq(S(arguments, !0, !0))
    }, m.intersection = function (n) {
        for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
            var i = n[e];
            if (!m.contains(t, i)) {
                for (var o = 1; r > o && m.contains(arguments[o], i); o++) ;
                o === r && t.push(i)
            }
        }
        return t
    }, m.difference = function (n) {
        var t = S(arguments, !0, !0, 1);
        return m.filter(n, function (n) {
            return !m.contains(t, n)
        })
    }, m.zip = function () {
        return m.unzip(arguments)
    }, m.unzip = function (n) {
        for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++) r[e] = m.pluck(n, e);
        return r
    }, m.object = function (n, t) {
        for (var r = {}, e = 0, u = O(n); u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }, m.findIndex = t(1), m.findLastIndex = t(-1), m.sortedIndex = function (n, t, r, e) {
        r = x(r, e, 1);
        for (var u = r(t), i = 0, o = O(n); o > i;) {
            var a = Math.floor((i + o) / 2);
            r(n[a]) < u ? i = a + 1 : o = a
        }
        return i
    }, m.indexOf = r(1, m.findIndex, m.sortedIndex), m.lastIndexOf = r(-1, m.findLastIndex), m.range = function (n, t, r) {
        null == t && (t = n || 0, n = 0), r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r) u[i] = n;
        return u
    };
    var E = function (n, t, r, e, u) {
        if (!(e instanceof t)) return n.apply(r, u);
        var i = j(n.prototype), o = n.apply(i, u);
        return m.isObject(o) ? o : i
    };
    m.bind = function (n, t) {
        if (g && n.bind === g) return g.apply(n, l.call(arguments, 1));
        if (!m.isFunction(n)) throw new TypeError("Bind must be called on a function");
        var r = l.call(arguments, 2), e = function () {
            return E(n, e, t, this, r.concat(l.call(arguments)))
        };
        return e
    }, m.partial = function (n) {
        var t = l.call(arguments, 1), r = function () {
            for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++) i[o] = t[o] === m ? arguments[e++] : t[o];
            for (; e < arguments.length;) i.push(arguments[e++]);
            return E(n, r, this, this, i)
        };
        return r
    }, m.bindAll = function (n) {
        var t, r, e = arguments.length;
        if (1 >= e) throw new Error("bindAll must be passed function names");
        for (t = 1; e > t; t++) r = arguments[t], n[r] = m.bind(n[r], n);
        return n
    }, m.memoize = function (n, t) {
        var r = function (e) {
            var u = r.cache, i = "" + (t ? t.apply(this, arguments) : e);
            return m.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
        };
        return r.cache = {}, r
    }, m.delay = function (n, t) {
        var r = l.call(arguments, 2);
        return setTimeout(function () {
            return n.apply(null, r)
        }, t)
    }, m.defer = m.partial(m.delay, m, 1), m.throttle = function (n, t, r) {
        var e, u, i, o = null, a = 0;
        r || (r = {});
        var c = function () {
            a = r.leading === !1 ? 0 : m.now(), o = null, i = n.apply(e, u), o || (e = u = null)
        };
        return function () {
            var f = m.now();
            a || r.leading !== !1 || (a = f);
            var l = t - (f - a);
            return e = this, u = arguments, 0 >= l || l > t ? (o && (clearTimeout(o), o = null), a = f, i = n.apply(e, u), o || (e = u = null)) : o || r.trailing === !1 || (o = setTimeout(c, l)), i
        }
    }, m.debounce = function (n, t, r) {
        var e, u, i, o, a, c = function () {
            var f = m.now() - o;
            t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null, r || (a = n.apply(i, u), e || (i = u = null)))
        };
        return function () {
            i = this, u = arguments, o = m.now();
            var f = r && !e;
            return e || (e = setTimeout(c, t)), f && (a = n.apply(i, u), i = u = null), a
        }
    }, m.wrap = function (n, t) {
        return m.partial(t, n)
    }, m.negate = function (n) {
        return function () {
            return !n.apply(this, arguments)
        }
    }, m.compose = function () {
        var n = arguments, t = n.length - 1;
        return function () {
            for (var r = t, e = n[t].apply(this, arguments); r--;) e = n[r].call(this, e);
            return e
        }
    }, m.after = function (n, t) {
        return function () {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }, m.before = function (n, t) {
        var r;
        return function () {
            return --n > 0 && (r = t.apply(this, arguments)), 1 >= n && (t = null), r
        }
    }, m.once = m.partial(m.before, 2);
    var M = !{toString: null}.propertyIsEnumerable("toString"),
        I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    m.keys = function (n) {
        if (!m.isObject(n)) return [];
        if (v) return v(n);
        var t = [];
        for (var r in n) m.has(n, r) && t.push(r);
        return M && e(n, t), t
    }, m.allKeys = function (n) {
        if (!m.isObject(n)) return [];
        var t = [];
        for (var r in n) t.push(r);
        return M && e(n, t), t
    }, m.values = function (n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
        return e
    }, m.mapObject = function (n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++) e = u[a], o[e] = t(n[e], e, n);
        return o
    }, m.pairs = function (n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];
        return e
    }, m.invert = function (n) {
        for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
        return t
    }, m.functions = m.methods = function (n) {
        var t = [];
        for (var r in n) m.isFunction(n[r]) && t.push(r);
        return t.sort()
    }, m.extend = _(m.allKeys), m.extendOwn = m.assign = _(m.keys), m.findKey = function (n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++) if (e = u[i], t(n[e], e, n)) return e
    }, m.pick = function (n, t, r) {
        var e, u, i = {}, o = n;
        if (null == o) return i;
        m.isFunction(t) ? (u = m.allKeys(o), e = b(t, r)) : (u = S(arguments, !1, !1, 1), e = function (n, t, r) {
            return t in r
        }, o = Object(o));
        for (var a = 0, c = u.length; c > a; a++) {
            var f = u[a], l = o[f];
            e(l, f, o) && (i[f] = l)
        }
        return i
    }, m.omit = function (n, t, r) {
        if (m.isFunction(t)) t = m.negate(t); else {
            var e = m.map(S(arguments, !1, !1, 1), String);
            t = function (n, t) {
                return !m.contains(e, t)
            }
        }
        return m.pick(n, t, r)
    }, m.defaults = _(m.allKeys, !0), m.create = function (n, t) {
        var r = j(n);
        return t && m.extendOwn(r, t), r
    }, m.clone = function (n) {
        return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n
    }, m.tap = function (n, t) {
        return t(n), n
    }, m.isMatch = function (n, t) {
        var r = m.keys(t), e = r.length;
        if (null == n) return !e;
        for (var u = Object(n), i = 0; e > i; i++) {
            var o = r[i];
            if (t[o] !== u[o] || !(o in u)) return !1
        }
        return !0
    };
    var N = function (n, t, r, e) {
        if (n === t) return 0 !== n || 1 / n === 1 / t;
        if (null == n || null == t) return n === t;
        n instanceof m && (n = n._wrapped), t instanceof m && (t = t._wrapped);
        var u = s.call(n);
        if (u !== s.call(t)) return !1;
        switch (u) {
            case"[object RegExp]":
            case"[object String]":
                return "" + n == "" + t;
            case"[object Number]":
                return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
            case"[object Date]":
            case"[object Boolean]":
                return +n === +t
        }
        var i = "[object Array]" === u;
        if (!i) {
            if ("object" != typeof n || "object" != typeof t) return !1;
            var o = n.constructor, a = t.constructor;
            if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor" in n && "constructor" in t) return !1
        }
        r = r || [], e = e || [];
        for (var c = r.length; c--;) if (r[c] === n) return e[c] === t;
        if (r.push(n), e.push(t), i) {
            if (c = n.length, c !== t.length) return !1;
            for (; c--;) if (!N(n[c], t[c], r, e)) return !1
        } else {
            var f, l = m.keys(n);
            if (c = l.length, m.keys(t).length !== c) return !1;
            for (; c--;) if (f = l[c], !m.has(t, f) || !N(n[f], t[f], r, e)) return !1
        }
        return r.pop(), e.pop(), !0
    };
    m.isEqual = function (n, t) {
        return N(n, t)
    }, m.isEmpty = function (n) {
        return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length
    }, m.isElement = function (n) {
        return !(!n || 1 !== n.nodeType)
    }, m.isArray = h || function (n) {
        return "[object Array]" === s.call(n)
    }, m.isObject = function (n) {
        var t = typeof n;
        return "function" === t || "object" === t && !!n
    }, m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (n) {
        m["is" + n] = function (t) {
            return s.call(t) === "[object " + n + "]"
        }
    }), m.isArguments(arguments) || (m.isArguments = function (n) {
        return m.has(n, "callee")
    }), "function" != typeof/./ && "object" != typeof Int8Array && (m.isFunction = function (n) {
        return "function" == typeof n || !1
    }), m.isFinite = function (n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }, m.isNaN = function (n) {
        return m.isNumber(n) && n !== +n
    }, m.isBoolean = function (n) {
        return n === !0 || n === !1 || "[object Boolean]" === s.call(n)
    }, m.isNull = function (n) {
        return null === n
    }, m.isUndefined = function (n) {
        return n === void 0
    }, m.has = function (n, t) {
        return null != n && p.call(n, t)
    }, m.noConflict = function () {
        return u._ = i, this
    }, m.identity = function (n) {
        return n
    }, m.constant = function (n) {
        return function () {
            return n
        }
    }, m.noop = function () {
    }, m.property = w, m.propertyOf = function (n) {
        return null == n ? function () {
        } : function (t) {
            return n[t]
        }
    }, m.matcher = m.matches = function (n) {
        return n = m.extendOwn({}, n), function (t) {
            return m.isMatch(t, n)
        }
    }, m.times = function (n, t, r) {
        var e = Array(Math.max(0, n));
        t = b(t, r, 1);
        for (var u = 0; n > u; u++) e[u] = t(u);
        return e
    }, m.random = function (n, t) {
        return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
    }, m.now = Date.now || function () {
        return (new Date).getTime()
    };
    var B = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}, T = m.invert(B),
        R = function (n) {
            var t = function (t) {
                return n[t]
            }, r = "(?:" + m.keys(n).join("|") + ")", e = RegExp(r), u = RegExp(r, "g");
            return function (n) {
                return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n
            }
        };
    m.escape = R(B), m.unescape = R(T), m.result = function (n, t, r) {
        var e = null == n ? void 0 : n[t];
        return e === void 0 && (e = r), m.isFunction(e) ? e.call(n) : e
    };
    var q = 0;
    m.uniqueId = function (n) {
        var t = ++q + "";
        return n ? n + t : t
    }, m.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var K = /(.)^/, z = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029"},
        D = /\\|'|\r|\n|\u2028|\u2029/g, L = function (n) {
            return "\\" + z[n]
        };
    m.template = function (n, t, r) {
        !t && r && (t = r), t = m.defaults({}, t, m.templateSettings);
        var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g"),
            u = 0, i = "__p+='";
        n.replace(e, function (t, r, e, o, a) {
            return i += n.slice(u, a).replace(D, L), u = a + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"), t
        }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var o = new Function(t.variable || "obj", "_", i)
        } catch (a) {
            throw a.source = i, a
        }
        var c = function (n) {
            return o.call(this, n, m)
        }, f = t.variable || "obj";
        return c.source = "function(" + f + "){\n" + i + "}", c
    }, m.chain = function (n) {
        var t = m(n);
        return t._chain = !0, t
    };
    var P = function (n, t) {
        return n._chain ? m(t).chain() : t
    };
    m.mixin = function (n) {
        m.each(m.functions(n), function (t) {
            var r = m[t] = n[t];
            m.prototype[t] = function () {
                var n = [this._wrapped];
                return f.apply(n, arguments), P(this, r.apply(m, n))
            }
        })
    }, m.mixin(m), m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (n) {
        var t = o[n];
        m.prototype[n] = function () {
            var r = this._wrapped;
            return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], P(this, r)
        }
    }), m.each(["concat", "join", "slice"], function (n) {
        var t = o[n];
        m.prototype[n] = function () {
            return P(this, t.apply(this._wrapped, arguments))
        }
    }), m.prototype.value = function () {
        return this._wrapped
    }, m.prototype.valueOf = m.prototype.toJSON = m.prototype.value, m.prototype.toString = function () {
        return "" + this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function () {
        return m
    })
}).call(this);
//# sourceMappingURL=underscore-min.map


/*! jQuery requestAnimationFrame - v0.1.3pre - 2016-02-03
 * https://github.com/gnarf37/jquery-requestAnimationFrame
 * Copyright (c) 2016 Corey Frang; Licensed MIT */

// UMD factory https://github.com/umdjs/umd/blob/master/jqueryPlugin.js
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function (jQuery) {

// requestAnimationFrame polyfill adapted from Erik Möller
// fixes from Paul Irish and Tino Zijdel
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating


    var animating;

    function raf() {
        if (animating) {
            window.requestAnimationFrame(raf);
            jQuery.fx.tick();
        }
    }

    if (window.requestAnimationFrame) {
        jQuery.fx.timer = function (timer) {
            if (timer() && jQuery.timers.push(timer) && !animating) {
                animating = true;
                raf();
            }
        };

        jQuery.fx.stop = function () {
            animating = false;
        };
    }

}));

/*
 Copyright (c) 2016 Niklas Knaack

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

(function () {

    function SVG3DTagCloud(element, params) {

        var settings = {

            entries: [],
            width: 480,
            height: 480,
            radius: '70%',
            radiusMin: 75,
            bgDraw: true,
            bgColor: '#000',
            opacityOver: 1.00,
            opacityOut: 0.05,
            opacitySpeed: 6,
            fov: 800,
            speed: 2,
            fontFamily: 'Arial, sans-serif',
            fontSize: '15',
            fontColor: '#fff',
            fontWeight: 'normal',//bold
            fontStyle: 'normal',//italic
            fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
            fontToUpperCase: false

        };

        //---

        if (params !== undefined)
            for (var prop in params)
                if (params.hasOwnProperty(prop) && settings.hasOwnProperty(prop))
                    settings[prop] = params[prop];

        //---

        if (!settings.entries.length)
            return false;

        //---

        var entryHolder = [];

        var radius;
        var diameter;

        var mouseReact = true;
        var mousePos = {x: 0, y: 0};

        var center2D;
        var center3D = {x: 0, y: 0, z: 0};

        var speed = {x: 0, y: 0};

        var position = {sx: 0, cx: 0, sy: 0, cy: 0};

        var MATHPI180 = Math.PI / 180;

        var svg;
        var svgNS = 'http://www.w3.org/2000/svg';

        var bg;

        var circle;

        //---

        function init() {

            svg = document.createElementNS(svgNS, 'svg');
            svg.addEventListener('mousemove', mouseMoveHandler);

            element.appendChild(svg);

            if (settings.bgDraw) {

                bg = document.createElementNS(svgNS, 'rect');
                bg.setAttribute('x', 0);
                bg.setAttribute('y', 0);
                bg.setAttribute('fill', settings.bgColor);

                svg.appendChild(bg);

            }

            //---

            addEntries();
            reInit();
            animloop();

            //---

            window.addEventListener('resize', resizeHandler);

        };

        function reInit() {

            var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            var svgWidth = windowWidth;
            var svgHeight = windowHeight;

            if (settings.width.toString().indexOf('%') > 0 || settings.height.toString().indexOf('%') > 0) {

                svgWidth = Math.round(element.offsetWidth / 100 * parseInt(settings.width));
                svgHeight = Math.round(svgWidth / 100 * parseInt(settings.height));

            } else {

                svgWidth = parseInt(settings.width);
                svgHeight = parseInt(settings.height);

            }

            if (windowWidth <= svgWidth)
                svgWidth = windowWidth;

            if (windowHeight <= svgHeight)
                svgHeight = windowHeight;

            svgHeight = (getDevice() == "mobile") ? 400 : 1000;

            //---

            center2D = {x: svgWidth / 2, y: svgHeight / 2};

            speed.x = settings.speed / center2D.x;
            speed.y = settings.speed / center2D.y;

            if (svgWidth >= svgHeight)
                diameter = svgHeight / 100 * parseInt(settings.radius);
            else
                diameter = svgWidth / 100 * parseInt(settings.radius);

            if (diameter < 1)
                diameter = 1;

            radius = diameter / 2;

            if (radius < settings.radiusMin) {

                radius = settings.radiusMin;
                diameter = radius * 2;

            }

            //---

            svg.setAttribute('width', svgWidth);
            svg.setAttribute('height', svgHeight);

            if (settings.bgDraw) {

                bg.setAttribute('width', svgWidth);
                bg.setAttribute('height', svgHeight);

            }

            //---

            setEntryPositions(radius);

        };

        //---

        function setEntryPositions(radius) {

            for (var i = 0, l = entryHolder.length; i < l; i++) {

                setEntryPosition(entryHolder[i], radius);

            }

        };

        function setEntryPosition(entry, radius) {

            var dx = entry.vectorPosition.x - center3D.x;
            var dy = entry.vectorPosition.y - center3D.y;
            var dz = entry.vectorPosition.z - center3D.z;

            var length = Math.sqrt(dx * dx + dy * dy + dz * dz);

            entry.vectorPosition.x /= length;
            entry.vectorPosition.y /= length;
            entry.vectorPosition.z /= length;

            entry.vectorPosition.x *= radius;
            entry.vectorPosition.y *= radius;
            entry.vectorPosition.z *= radius;

        };

        function addEntry(index, entryObj, x, y, z) {

            var entry = {};

            entry.element = document.createElementNS(svgNS, 'text');
            entry.element.setAttribute('x', 0);
            entry.element.setAttribute('y', 0);
            entry.element.setAttribute('fill', settings.fontColor);
            entry.element.setAttribute('font-family', settings.fontFamily);
            entry.element.setAttribute('font-size', settings.fontSize);
            entry.element.setAttribute('font-weight', settings.fontWeight);
            entry.element.setAttribute('font-style', settings.fontStyle);
            entry.element.setAttribute('font-stretch', settings.fontStretch);
            entry.element.setAttribute('text-anchor', 'middle');
            entry.element.textContent = entryObj.label;


            entry.link = document.createElementNS(svgNS, 'a');
            entry.link.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', entryObj.url);
            entry.link.setAttribute('target', entryObj.target);
            entry.link.setAttribute('class', entryObj.class);
            entry.link.addEventListener('mouseover', mouseOverHandler, true);
            entry.link.addEventListener('mouseout', mouseOutHandler, true);

            entry.link.addEventListener('click', mouseClickHandler, true);
            entry.link.appendChild(entry.element);


            entry.index = index;
            entry.mouseOver = true;

            entry.vectorPosition = {x: x, y: y, z: z};
            entry.vector2D = {x: 0, y: 0};

            svg.appendChild(entry.link);

            return entry;

        };

        function addEntries() {

            circleTop = document.createElementNS(svgNS, 'ellipse');
            circleTop.setAttribute('rx', 50);
            circleTop.setAttribute('ry', 50);
            circleTop.setAttribute('fill', '#ffffff');
            circleTop.setAttribute('cx', '100');
            circleTop.setAttribute('cy', '100');

            circle = document.createElementNS(svgNS, 'ellipse');
            circle.setAttribute('rx', 50);
            circle.setAttribute('ry', 50);
            circle.setAttribute('fill', '#ffffff');
            circle.setAttribute('cx', '100');
            circle.setAttribute('cy', '100');
            circle.setAttribute('filter', 'url(#dropshadow)');

            var defs = document.createElementNS(svgNS, 'defs');

            var filter = document.createElementNS(svgNS, 'filter');
            filter.setAttribute('id', 'dropshadow');
            filter.setAttribute('x', '-50%');
            filter.setAttribute('y', '-50%');
            filter.setAttribute('height', '200%');
            filter.setAttribute('width', '200%');
            filter.setAttribute('filterUnits', 'objectBoundingBox');

            var feOffset = document.createElementNS(svgNS, 'feOffset');
            feOffset.setAttribute('dx', '0');
            feOffset.setAttribute('dy', '0');
            feOffset.setAttribute('result', 'shadowOffsetOuter1');
            feOffset.setAttribute('in', 'SourceAlpha');
            filter.appendChild(feOffset);

            var feGaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur');
            feGaussianBlur.setAttribute('in', 'shadowOffsetOuter1');
            feGaussianBlur.setAttribute('stdDeviation', '25');
            feGaussianBlur.setAttribute('result', 'shadowBlurOuter1');
            filter.appendChild(feGaussianBlur);

            var feColorMatrix = document.createElementNS(svgNS, 'feColorMatrix');
            feColorMatrix.setAttribute('values', '0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0');
            feColorMatrix.setAttribute('type', 'matrix');
            feColorMatrix.setAttribute('in', 'shadowBlurOuter1');
            filter.appendChild(feColorMatrix);

            defs.appendChild(filter);
            svg.appendChild(defs);

            svg.appendChild(circle);
            svg.appendChild(circleTop);


            for (var i = 1, l = settings.entries.length + 1; i < l; i++) {

                var phi = Math.acos(-1 + (2 * i - 1) / l);
                var theta = Math.sqrt(l * Math.PI) * phi;

                var x = Math.cos(theta) * Math.sin(phi);
                var y = Math.sin(theta) * Math.sin(phi);
                var z = Math.cos(phi);

                var entry = addEntry(i - 1, settings.entries[i - 1], x, y, z);

                entryHolder.push(entry);

            }

        };

        function getEntryByElement(element) {

            for (var i = 0, l = entryHolder.length; i < l; i++) {

                var entry = entryHolder[i];

                if (entry.element.getAttribute('x') === element.getAttribute('x') &&
                    entry.element.getAttribute('y') === element.getAttribute('y')) {

                    return entry;

                }

            }

            return;

        };

        function highlightEntry(element) {

            var entry = getEntryByElement(element);

            if (entry !== undefined) {
                var height = jQuery(entry.element).height();

                var posShift = (getDevice() == 'mobile') ? 5 : 10;

                var text = entry.element.getBBox();
                var textWidth = text.width;
                var textHeight = text.height;

                circle.setAttribute('cx', entry.element.getAttribute('x'));
                circle.setAttribute('cy', entry.element.getAttribute('y') + height - posShift);
                circle.setAttribute('rx', textWidth / 2 + 20);
                circle.setAttribute('ry', textWidth / 2 + 20);
                circle.setAttribute('class', 'is--visible');

                circleTop.setAttribute('cx', entry.element.getAttribute('x'));
                circleTop.setAttribute('cy', entry.element.getAttribute('y') + height - posShift);
                circleTop.setAttribute('rx', textWidth / 2 + 20);
                circleTop.setAttribute('ry', textWidth / 2 + 20);
                circleTop.setAttribute('class', 'is--visible');

                var parentDiv = entry.element.parentNode;

                parentDiv.insertBefore(circle, entry.element);
                parentDiv.insertBefore(circleTop, entry.element);

                for (var i = 0, l = entryHolder.length; i < l; i++) {

                    var e = entryHolder[i];

                    if (e.index === entry.index) {

                        e.mouseOver = true;

                    } else {

                        e.mouseOver = false;

                    }

                }
            }

        };

        //---

        function render() {

            var fx = speed.x * mousePos.x - settings.speed;
            var fy = settings.speed - speed.y * mousePos.y;

            var angleX = fx * MATHPI180;
            var angleY = fy * MATHPI180;

            position.sx = Math.sin(angleX);
            position.cx = Math.cos(angleX);
            position.sy = Math.sin(angleY);
            position.cy = Math.cos(angleY);

            //---

            for (var i = 0, l = entryHolder.length; i < l; i++) {

                var entry = entryHolder[i];

                //---

                if (mouseReact) {

                    var rx = entry.vectorPosition.x;
                    var rz = entry.vectorPosition.y * position.sy + entry.vectorPosition.z * position.cy;

                    entry.vectorPosition.x = rx * position.cx + rz * position.sx;
                    entry.vectorPosition.y = entry.vectorPosition.y * position.cy + entry.vectorPosition.z * -position.sy;
                    entry.vectorPosition.z = rx * -position.sx + rz * position.cx;

                }

                //---

                var scale = settings.fov / (settings.fov + entry.vectorPosition.z);

                entry.vector2D.x = entry.vectorPosition.x * scale + center2D.x;
                entry.vector2D.y = entry.vectorPosition.y * scale + center2D.y;

                //---

                entry.element.setAttribute('x', entry.vector2D.x);
                entry.element.setAttribute('y', entry.vector2D.y);

                //---

                var opacity;

                if (mouseReact) {

                    opacity = (radius - entry.vectorPosition.z) / diameter;

                    if (opacity < settings.opacityOut) {

                        opacity = settings.opacityOut;

                    }

                } else {

                    opacity = parseFloat(entry.element.getAttribute('opacity'));

                    if (entry.mouseOver) {

                        opacity += (settings.opacityOver - opacity) / settings.opacitySpeed;

                    } else {

                        opacity += (settings.opacityOut - opacity) / settings.opacitySpeed;

                    }

                }

                entry.element.setAttribute('opacity', opacity);

            }

            //---

            entryHolder = entryHolder.sort(function (a, b) {

                return (b.vectorPosition.z - a.vectorPosition.z);

            });

        };

        //---

        window.requestAnimFrame = (function () {

            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };

        })();

        function animloop() {

            requestAnimFrame(animloop);

            render();

        };

        //---

        function mouseOverHandler(event) {

            mouseReact = false;

            //---

            highlightEntry(event.target);

        };

        function mouseOutHandler(event) {

            mouseReact = true;

            circle.setAttribute('class', '');
            circleTop.setAttribute('class', '');


        };

        function mouseClickHandler(event) {
            event.preventDefault(false);

            return false;

        };

        //---

        function mouseMoveHandler(event) {

            mousePos = getMousePos(svg, event);

        };

        function getMousePos(svg, event) {

            var rect = svg.getBoundingClientRect();

            return {

                x: event.clientX - rect.left,
                y: event.clientY - rect.top

            };

        };

        //---

        function resizeHandler(event) {

            reInit();

        };

        //---

        init();

    };

    window.SVG3DTagCloud = SVG3DTagCloud;

}());

if (typeof jQuery !== 'undefined') {

    (function ($) {

        $.fn.svg3DTagCloud = function (params) {

            return this.each(function () {

                if (!$.data(this, 'plugin_SVG3DTagCloud')) {

                    $.data(this, 'plugin_SVG3DTagCloud', new SVG3DTagCloud(this, params));

                }

            });

        };

    }(jQuery));

}
(function ($) {

    var preloaded = false
    var preloadReady = function () {

        if (preloaded) {
            return
        }
        preloaded = true

        figure();

        $("img[data-src]").each(function () {
            $(this).attr("src", $(this).attr("data-src"))
        })

        $("body").addClass('header--animate')
        hero();

        tagCloud();
        news();

        setTimeout(function () {
            if ($('.particle').length && getDevice() != "mobile") {
                buildParticles()
            }

            $("body").removeClass("is--preload");
            setTimeout(function () {
                $('.preloader').remove();
            }, 300);

        }, 100)


    }


    if (!$("body").hasClass('home')) {
        $("body").removeClass("is--preload");
    }


    /// fixed 100vh height >>> ios is taking nav bar and address bar to 100vh
    var iOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/);
    if (iOS) {
        $(window).resize(function () {
            var windowHeight = $(window).height();
            $('.hero').css('height', windowHeight);

            $('.particle__wrapper').css('top', windowHeight)
        }).resize();
    }


    // scroll animation for all links with #anchor
    if ($("body.home").length === 1) {
        $('a[href^="#"]:not([href="#"]), .logo__link').click(function (event) {
            event.preventDefault();

            //if footer link click, ignore...
            if ($(this).closest('.footer').length == 0) {

                var scrollPos = 0
                if (!$(this).hasClass("logo__link")) {
                    var target = $($(this).attr('href'));

                    var extraPadding = ($(this).attr('data-extra-padding')) ? $(this).attr('data-extra-padding') : 0;

                    scrollPos = target.offset().top - $('.header').innerHeight() * 2 - extraPadding

                    if (getDevice() == "mobile") {
                        scrollPos = target.offset().top - $('.header').innerHeight() - 15;
                    }
                }

                $('html, body').animate({
                    scrollTop: scrollPos
                }, 800);
            }

            return false;
        });

        if (location.hash) {
            setTimeout(function () {
                window.scrollTo(0, 0);
            }, 1);

            $(window).load(function () {
                $('html, body').animate({
                    scrollTop: $(location.hash).offset().top - $('.header').innerHeight() * 2
                }, 800);
            });
        }

    }


    var tagCloud = function () {

        var init = function () {
            var settings = {
                entries: tagEntries,
                width: '100%',
                height: '650',
                radius: (getDevice() == "mobile") ? '120%' : '40%',
                radiusMin: 40,
                bgDraw: true,
                bgColor: 'transparent',
                opacityOver: 1.00,
                opacityOut: 0.05,
                opacitySpeed: 6,
                fov: (getDevice() == "mobile") ? 25 : 125,
                speed: 0.1,
                fontFamily: 'Calibre, sans-serif',
                fontSize: (getDevice() == "mobile") ? '13' : '22',
                fontColor: '#000',
                fontWeight: 'normal',
                fontStyle: 'normal',
                fontStretch: 'normal'
            };

            $('.about__tags').svg3DTagCloud(settings);


        }
        if (typeof tagEntries !== 'undefined') {
            init();
        }
    }


    var news = function () {

        var init = function () {

            // potrait or landscape check...
            $('.news-list__item--normal img').each(function (i, img) {
                var $img = $(img);
                var $wrapper = $img.closest('.news-list__media');


                $img.one("load", function () {
                    var wrapperRatio = $wrapper.innerHeight() / $wrapper.width();
                    var imgRatio = $(this).height() / $(this).width();

                    if (imgRatio >= wrapperRatio) {
                        $(this).addClass('is--landscape');
                    } else {
                        $(this).addClass('is--portrait');
                    }


                }).each(function () {
                    if (this.complete) $(this).load();
                });


            });

        }

        init()
    }

    if ($("body").hasClass('post-type-archive-news')) {
        news();
    }


    var header = function () {
        var $main = $('.header');
        var $navigation = $('.header__navigation');

        var isOpen = false;
        var pos;

        var init = function () {
            setNavigation();

            $(window).scroll(function () {
                setHeader();
            }).scroll();
        }

        var hitNavigationPoint = function (pos) {
            var targetSection = $(".header__navigation .is--active").attr("href")

            if (targetSection) {
                try {
                    ga('send', {
                        hitType: 'pageview',
                        page: location.pathname + targetSection
                    })
                }
                catch (err) {
                }

                /*
                 try {
                 fbq('track', 'ViewContent', {
                 content_name: targetSection
                 })
                 }
                 catch(err) {
                 }
                 */


            }
        }

        var hitNavigationPointDebounced = _.debounce(hitNavigationPoint, 1500);

        var setNavigation = function () {
            var waypoints = $('main > section').waypoint(function (direction) {
                $navigation.find('a.is--active').removeClass('is--active')

                hitNavigationPointDebounced(this.element.id)

                if (direction === "down") {
                    $navigation.find('a[href="#' + this.element.id + '"]').addClass('is--active')
                } else {
                    $navigation.find('a[href="#' + this.element.id + '"]').parent().prev().find('a').addClass('is--active')
                }
            }, {
                offset: function () {
                    return $main.innerHeight() * 2 + 1
                }
            })

            var waypoints2 = $('main > section').waypoint(function (direction) {
                hitNavigationPointDebounced(this.element.id)
            }, {
                offset: function () {
                    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.5
                }
            })

            $('.toggle-menu').click(function (e) {
                e.preventDefault();

                if (isOpen == false) {
                    openNavigation();
                } else {
                    closeNavigation();
                }

                return false;
            })
            // link animation is on top
        }

        var openNavigation = function () {

            $('body').addClass('menu--open');

            $('html, body').on('touchmove', function (e) {
                //prevent native touch activity like scrolling
                e.preventDefault();
            });

            $main.addClass('has--background has--shadow');

            isOpen = true;

        }

        var closeNavigation = function () {
            $('body').removeClass('menu--open');

            $('html, body').off('touchmove');
            isOpen = false;

            setHeader();


        }

        var setHeader = function () {

            if (isOpen) {
                closeNavigation()
            }

            var pos = 1;

            if ($('body').hasClass('home')) {
                pos = $('.hero').height() - $main.height()
            }

            if ($(window).scrollTop() >= pos) {
                $main.addClass('has--background has--shadow');
            } else {
                if ($('body').hasClass('home')) {
                    $main.removeClass('has--background has--shadow');
                } else {
                    $main.removeClass('has--shadow');
                }
            }
        }

        init();


    }


    var figure = function (only) {

        var figures = $('.figure');

        if (only) {
            figures = only
        }

        var init = function () {
            getFigures();
            resize();
        }

        // get all figure elements and create images
        var getFigures = function () {

            figures.each(function (i, el) {

                createImage($(el));
            })
        }

        // create image and append in figure
        var createImage = function (figure) {


            var currentlyloadedImage = figure.find('img.is--loaded'); //image is already loaded (device resize)
            var img = $('<img />');
            var source = figure.find('.figure__source[data-device="' + getDevice() + '"]');

            // if no mini format is set, take mobile format
            if (source.length == 0 && getDevice() == 'mini') {
                source = figure.find('.figure__source[data-device="mobile"]');
            }

            img.attr({
                src: source.attr('data-src'),
                class: 'figure__image' + ((currentlyloadedImage.length > 0) ? ' is--loaded' : ''),
                'data-device': getDevice()
            });

            img.one("load", function () {

                if (figure.hasClass('hero__image')) {
                    Modernizr.on("videoautoplay", function (hasAutoPlay) {
                        preloadReady()
                    })
                }

                figure
                    .append(img)
                //.removeAttr('style');

                currentlyloadedImage.remove();

                // to get transition working...
                setTimeout(function () {
                    img.addClass('is--loaded');
                }, 10);

                setRatio(figure);

            }).each(function () {
                if (this.complete) $(this).load();
            });

        }

        // get Ratio of Image and Figure Wrapper
        var setRatio = function (figure) {

            var img = figure.find('.figure__image');

            img.removeClass('is--portrait');

            var imageRatio = figure.outerWidth() / figure.outerHeight();
            var aspectRatio = img.width() / img.height();


            if (imageRatio < aspectRatio) {
                img.addClass('is--portrait');
            }
        }

        // recalculate image ratio
        var resize = function () {
            $(window).resize(function () {
                figures.each(function (i, el) {
                    var figure = $(el);
                    var img = figure.find('.figure__image');

                    //load new image, if new device width is reached
                    if (img.attr('data-device') !== getDevice()) {
                        createImage(figure)
                        setRatio(figure);
                    } else {
                        setRatio(figure);
                    }


                })
            });
        }


        init();

    }

    var carousel = function () {

        var init = function () {


            // other options are special options >>> look at the html data-slick code
            var options = {
                infinite: true,
                prevArrow: '<button type="button" class="slick-prev"><span class="hidden">Prev</span><span class="slick-arrow-image"><img src=""></span></button>',
                nextArrow: '<button type="button" class="slick-next"><span class="hidden">Next</span><span class="slick-arrow-image"><img src=""></span></button>',
                useTransform: true,
                speed: 500,
                cssEase: 'ease-in-out'
            }

            oneColumnCarousel();
            twoColumnCarousel();
            threeColumnCarousel();

            $('.carousel').each(function (i, carousel) {
                var $carousel = $(carousel);

                if ($carousel.find('.carousel__item').length) {
                    $carousel.slick(options);
                }
            });
        }

        var threeColumnCarousel = function () {
            if (getDevice() != "mobile") {
                var wrap = 3;

                if (getDevice() == "tablet-portrait") {
                    wrap = 2;
                }

                $(".carousel--three-col").each(function (i, el) {
                    var divs = $(el).find(".carousel__item");

                    for (var i = 0; i < divs.length; i += wrap) {
                        divs.slice(i, i + wrap).wrapAll("<div><div class='grid has--small-gaps is--4 is--tp-6'></div></div>");
                    }
                });
            }

            $('.carousel--three-col').on('init reInit', function (event, slick, currentSlide) {
                $('.carousel--three-col').find('.slick-arrow-image img').remove();
            });

            $(".carousel--three-col").on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            });

        }

        var oneColumnCarousel = function () {

            $('.carousel--one-col').each(function (i, el) {

                var items = $(el).find('a.carousel__media');

                var swiped = false;

                // get all images
                var images = getAllImages($(el));


                $(el).on('init reInit afterChange', function (event, slick, currentSlide) {

                    controlsPreviewImage($(el), 1, -1, slick, currentSlide, images);

                });
            });
        }

        var twoColumnCarousel = function () {

            $('.carousel--two-col').each(function (i, el) {

                var items = $(el).find('a.carousel__media');

                var swiped = false;

                // get all images
                var images = getAllImages($(el));

                $(el).on('swipe', function (event, slick, direction) {

                    // if swipe no click function on image cover
                    swiped = true;

                    $(el).find('a.carousel__media iframe').removeClass('is--loaded');

                    setTimeout(function () {
                        swiped = false;

                        $(el).find('a.carousel__media iframe').remove();
                    }, 300);

                });


                $(el).find('a.carousel__media').click(function () {
                    if (!swiped) {

                        var $media = $(this);
                        var iframe = $('<iframe frameborder="0" allowfullscreen="allowfullscreen" />');
                        iframe.attr('src', $(this).attr('data-url'));

                        $media.append(iframe);

                        $media.addClass('is--loading');

                        iframe.load(function () {
                            $(this).addClass('is--loaded');
                            $media.removeClass('is--loading');
                        })

                    }

                    swiped = false;

                    return false;
                });

                $(el).on('init reInit afterChange', function (event, slick, currentSlide) {

                    controlsPreviewImage($(el), 2, -1, slick, currentSlide, images);

                });
            });
        }

        var getAllImages = function (el) {
            var images = new Array();

            el.find('.carousel__item .carousel__media__image').each(function () {
                if ($(this).attr('src') == undefined) {
                    images.push($(this).attr('data-src'));
                } else {
                    images.push($(this).attr('src'));
                }
            });

            return images;
        }

        var controlsPreviewImage = function (el, nextCount, prevCount, slick, currentSlide, images) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var nextSlide = (currentSlide ? currentSlide : 0) + nextCount;
            var prevSlide = (currentSlide ? currentSlide : 0) + prevCount;

            if (prevSlide == prevCount) {
                prevSlide = slick.slideCount + prevCount;
            }

            if (images.length == currentSlide + nextCount) {
                nextSlide = 0;
            } else if (images.length <= currentSlide + nextCount) {
                nextSlide = 1;
            }

            el.find('.slick-prev .slick-arrow-image img').attr('src', images[prevSlide])
            el.find('.slick-next .slick-arrow-image img').attr('src', images[nextSlide])
        }

        init();

    }

    var switchTabs = function () {

        var init = function () {
            setNavigation();
            checkEntries();
        }

        // toggle visibility of switch navigation
        var checkEntries = function () {
            $('.switch__tab').each(function (i, tab) {
                var $tab = $(tab);

                // if ($tab.find('.carousel__item').length == 0) {
                //     $tab.closest('.switch').find('.switch__navigation').remove();
                // }
            });
        }

        var setNavigation = function () {

            $('.switch').each(function (i, element) {
                $navigationItems = $(element).find('.switch__navigation__item');

                $navigationItems.click(function (event) {
                    event.preventDefault();

                    toggleTab($(this));

                    return false;
                });
            });

        }

        var toggleTab = function (item) {
            var container = item.closest('.switch');

            //is active? no? fine > toggle
            if (!item.hasClass('is--active')) {
                container.find('.switch__navigation__item').removeClass('is--active')
                item.addClass('is--active');

                container.find('.switch__tab').removeClass('is--active');
                $(item.attr('href')).addClass('is--active');
            }
        }

        init();
    }

    function hasVideoAutoPlay() {
        return !!Modernizr.videoautoplay
    }

    function isMobile() {
        return matchMedia("screen and (max-width: 700px)").matches
    }

    var hero = function () {
        var $videoMain = $('.hero__video--main');
        var $body = $("body")
        var $image = $('.hero__image');

        var $heroHeader = $('.hero__header');
        var $heroLine = $(".hero__line")
        var $heroFlip = $('.hero__flip');
        var busy = false
        var heroState = "preload";
        var videoState = "stop";

        var autoPlayTimeout = null
        var circlePos = linePos = {
            bottom: 0,
            top: 0
        }

        var init = function () {
            setVideoSize()
            position()
            requestAnimationFrame(function () {
                $image.addClass('is--visible')
                setTimeout(function () {
                    $('.hero__line').addClass('is--loaded')
                    $body.addClass('hero--animate');
                }, 1)

            })

            if (hasVideoAutoPlay()) {
                autoPlayTimeout = setTimeout(function () {
                    requestAnimationFrame(function () {
                        $('body').addClass('circle--animate')
                        autoPlayTimeout = setTimeout(function () {
                            triggerPlay()
                        }, 5000);
                    })
                }, 2500)
            }

            attachListeners()
        }

        function attachListeners() {

            $('.hero__header, .hero .button-play').click(function (ev) {
                ev.preventDefault();

                if (isMobile()) {
                    $videoMain[0].play()
                }
                else {

                    if (!hasVideoAutoPlay()) {
                        $videoMain[0].play()
                    }

                    clearTimeout(autoPlayTimeout)
                    if (videoState === "play") {
                        triggerPause()
                    }
                    else {
                        triggerPlay()
                    }
                }


            })

            $('.hero .button-pause').click(function (ev) {
                ev.preventDefault();
                triggerPause()
            });

            $videoMain.on("ended emptied error", function () {
                triggerPause(true)
            })

            $videoMain.on("stalled waiting", function (ev) {
                $body.addClass("hero--buffering")

            })

            $videoMain.on("progress timeupdate loadeddata play playing canplay canplaythrough pause", function (ev) {
                $body.removeClass("hero--buffering")
            })

            var debouncedPosition = _.debounce(function () {
                position()
            }, 500)

            $(window).resize(function () {
                setVideoSize();
                debouncedPosition()
            });

            $(window).scroll(function () {
                if ($(window).scrollTop() > (window.innerHeight * 0.05)) {
                    clearTimeout(autoPlayTimeout)
                    triggerPause()
                }
            })
        }

        function position() {
            circlePos = {
                top: ($(".hero__description").outerHeight() + $(".hero__description").offset().top) * 1.05,
                top2: $(".hero").height() * 0.9,
            }

            positionNav(videoState !== "play")
        }

        function transformCross(el, val) {
            el.style.msTransform = val;
            el.style.webkitTransform = val;
            el.style.MozTransform = val;
            el.style.OTransform = val;
            el.style.transform = val;
        }

        function positionNav(top) {

            if (top) {
                transformCross($heroFlip[0], 'translate(0,' + circlePos.top + 'px)')
                transformCross($heroLine[0], 'translate(0,' + circlePos.top + 'px)')
            }
            else {
                transformCross($heroFlip[0], 'translate(0,' + circlePos.top2 + 'px)')
                transformCross($heroLine[0], 'translate(0,' + circlePos.top2 + 'px)')
            }
        }


        function triggerPlay() {

            if (busy || videoState === "play") {
                return
            }

            busy = true


            requestAnimationFrame(function () {
                $image.removeClass('is--visible');
                $videoMain.addClass('is--visible');

                $body.removeClass('hero--animate');
                $body.addClass('header--dim hero--playing');

                positionNav(false)

                requestAnimationFrame(function () {

                    if ($videoMain[0].error) {
                        $videoMain[0].load()

                        setTimeout(function () {
                            $videoMain[0].play()
                            videoState = "play"
                            //busy = false
                        }, 1)
                    }
                    else {
                        $videoMain[0].play()
                        videoState = "play"
                        //busy = false
                    }

                    setTimeout(function () {
                        busy = false
                    }, 2000)
                })

            })


        }

        function triggerPause(showStill) {

            if (busy || videoState === "stop") {
                return
            }

            busy = true

            requestAnimationFrame(function () {

                $videoMain[0].pause();

                requestAnimationFrame(function () {
                    if (showStill) {
                        $image.addClass('is--visible')
                        $videoMain.removeClass('is--visible')
                    }

                    $body.addClass('hero--animate')
                    $body.removeClass('header--dim hero--playing')

                    positionNav(true)

                    videoState = "stop"
                    setTimeout(function () {
                        busy = false
                    }, 2000)
                })
            })

        }

        var setVideoSize = function () {
            if ((1920 / 1080) > (getWidth() / getHeight())) {
                $videoMain.addClass('is--portrait')
            } else {
                $videoMain.removeClass('is--portrait')
            }
        }

        Modernizr.on("videoautoplay", function (hasAutoPlay) {
            init(hasAutoPlay);
        })


    }

    var paralax = function () {

        var iPad = $('.partners__image');
        var iPadShadow = $('.partners__shadow');
        var robot = $('.about__robot');
        var $partners = $('.partners');
        var $about = $('.about');

        var init = function () {
            setPositions();

            s = skrollr.init({
                forceHeight: false,
                mobileCheck: function () {
                    //hack - forces mobile version to be off
                    return false;
                }
            });
        }

        var setPositions = function () {
            var offset = $partners.offset().top - $(window).innerHeight() - 300;

            var x = 'data-' + offset;
            var y = 'data-' + ($partners.offset().top - ($(window).innerHeight() / 2) + 200);


            iPad.attr(x, 'transform: translate3d(0, -50%, 0);');
            iPad.attr(y, 'transform: translate3d(0, -5%, 0)');

            iPadShadow.attr(x, 'opacity: 0.0');
            iPadShadow.attr(y, 'opacity: 0.2');

            if (robot.find('figure').length) {
                //robot paralaxe
                var offset = $about.offset().top - $(window).innerHeight() - 300;

                var x = 'data-' + offset;
                var y = 'data-' + ($about.offset().top + $(window).innerHeight());

                robot.attr(x, 'transform: translate3d(0, -20%, 0);');
                robot.attr(y, 'transform: translate3d(0, 15%, 0)');
            }
        }

        $(window).load(function () {
            if ($partners.length || $about.length) {
                init();
            }
        })


    }

    var people = function () {

        $main = $('.people--full');

        var init = function () {
            $('.people__item').each(function (i, el) {
                var item = $(el);
                var img = item.find('.people__box__image');

                // ie9 load fix
                img.attr("src", img.attr("src"));

                img.one("load", function () {
                    item.addClass('is--loaded')
                }).each(function () {
                    if (this.complete) $(this).load();
                });
            });
        }

        if ($main.length) {
            init();
        }
    }

    var companies = function () {

        $main = $('.companies--full');

        var init = function () {

            $main.find('.companies__item').each(function (i, el) {
                var item = $(el);
                var img = item.find('.companies__box__image');

                // ie9 load fix
                img.attr("src", img.attr("src"));

                img.one("load", function () {
                    item.addClass('is--loaded')
                }).each(function () {
                    if (this.complete) $(this).load();
                });
            });
        }

        if ($main.length) {
            init();
        }

    }

    var albums = function () {

        $main = $('.album--full');

        var init = function () {

            $main.find('.album__item').each(function (i, el) {
                var item = $(el);
                var img = item.find('.album__box__image');

                // ie9 load fix
                img.attr("src", img.attr("src"));

                img.one("load", function () {
                    item.addClass('is--loaded')
                }).each(function () {
                    if (this.complete) $(this).load();
                });
            });
        }

        if ($main.length) {
            init();
        }

    }

    var overlay = function () {

        var main = $('.overlay')
        var content = main.find('.overlay__content');

        var init = function () {

            $('.has--overlay').click(function (e) {
                e.preventDefault();

                open($(this));
            });

            $(document).keyup(function (e) {
                if (e.keyCode == 27) {
                    close();
                }
            });

            //click on overlay, not the content > close overlay
            main.click(function (event) {
                var closeOverlay = true;

                $(event.target).parents().each(function () {
                    if ($(this).hasClass('overlay')) {
                        closeOverlay = false;
                    }
                });

                if (closeOverlay) {
                    close();
                }

            })

            main.find('.overlay__close').click(function (e) {
                e.preventDefault();

                close();
            });
        };

        var open = function (link) {
            main.addClass('is--open');
            content.hide()
            $(link.attr('href')).show();

            setTimeout(function () {
                $(link.attr('href')).addClass('is--active');
            }, 10);


        };

        var close = function () {
            main.removeClass('is--open');
            content.removeClass('is--active');

            setTimeout(function () {
                content.hide()
            }, 400);

        };

        init();
    };


    var start = window.performance.now()

    var programmItems = []
    var svgItems = []
    var pointMatrix = [
        [], [], []
    ]


    figure($(".hero__image"));

    if (typeof(loadType) !== 'undefined') {
        var loadData = function (callback) {
        }

        switch (loadType) {
            case 'index':
                loadData = loadHomeInfo;
                break;
            case 'mentors':
                loadAllMentors(people);
                break;
            case 'startups':
                loadAllStartups(companies);
                break;
            case 'single-news':
                loadSingleNews();
                break;
            case 'all-news':
                loadAllNews();
                break;
            case 'album':
                loadAlbum(albums);
                break;
        }

        loadData(function () {
            switchTabs();
            carousel();
        });
    }

    header();
    paralax();
    overlay();


    function buildParticles() {
        var heroSvg = $(".hero__svg")
        var initialDimensionsHero = {
            width: 1440,
            height: 1000
        }

        var widthHero = Math.floor(heroSvg.width())
        var heightHero = Math.floor(widthHero / (1440 / 1000))
        heroSvg.css("height", heightHero)
        heroSvg.attr("viewBox", "0 0 " + widthHero + " " + heightHero)

        heroSvg.find("line").each(function (i, v) {

            if (!$(v).attr("data-x1")) {
                $(v).attr("data-x1", $(v).attr("x1"))
                $(v).attr("data-x2", $(v).attr("x2"))
            }

            var relativeX = (parseFloat($(v).attr('data-x1'), 10)) / initialDimensionsHero.width

            $(v).attr("x1", Math.floor(relativeX * widthHero))
            $(v).attr("x2", Math.floor(relativeX * widthHero))
        })


        var topParticleWrapper = $(".particle__wrapper .particle__svg--top")
        var initialDimensionsTop = {
            width: 1440,
            height: 3050
        }

        $('.particle').addClass('is--loaded')

        var widthTop = Math.floor(topParticleWrapper.width())
        var heightTop = Math.floor(-$(".hero").height() + ($(".program__container")[0].getBoundingClientRect().bottom - 0) + $(window).scrollTop())

        topParticleWrapper.find("circle").each(function (i, v) {

            if (!$(v).attr("data-cx")) {
                $(v).attr("data-cx", $(v).attr("cx"))
                $(v).attr("data-cy", $(v).attr("cy"))
            }

            var relativeX = parseFloat($(v).attr('data-cx'), 10) / initialDimensionsTop.width
            var relativeY = parseFloat($(v).attr('data-cy'), 10) / initialDimensionsTop.height

            $(v).attr("cx", Math.floor(relativeX * widthTop))
            $(v).attr("cy", Math.floor(relativeY * heightTop))
        })

        topParticleWrapper.css("height", heightTop)
        topParticleWrapper.attr("viewBox", "0 0 " + widthTop + " " + heightTop)

        var middleParticleWrapper = $(".particle__wrapper .particle__svg--middle")

        var initialDimensionsMiddle = {
            width: 1440,
            height: 1055
        }

        var widthMiddle = Math.floor(middleParticleWrapper.width())
        var heightMiddle = Math.floor($(".program__dates").outerHeight())

        middleParticleWrapper.find("circle").each(function (i, v) {

            if (!$(v).attr("data-cx")) {
                $(v).attr("data-cx", $(v).attr("cx"))
                $(v).attr("data-cy", $(v).attr("cy"))
            }

            var relativeX = parseFloat($(v).attr('data-cx'), 10) / initialDimensionsMiddle.width
            var relativeY = parseFloat($(v).attr('data-cy'), 10) / initialDimensionsMiddle.height

            $(v).attr("cx", Math.floor(relativeX * widthMiddle))
            $(v).attr("cy", Math.floor(relativeY * heightMiddle))
        })

        middleParticleWrapper.css("height", heightMiddle)
        middleParticleWrapper.attr("viewBox", "0 0 " + widthMiddle + " " + heightMiddle)


        var bottomParticleWrapper = $(".particle__wrapper .particle__svg--bottom")
        var initialDimensionsBottom = {
            width: 1440,
            height: 4000
        }

        var widthBottom = Math.floor(bottomParticleWrapper.width())
        var heightBottom = Math.floor(($("main")[0].getBoundingClientRect().bottom + $(window).scrollTop()) - ($(".program__dates")[0].getBoundingClientRect().top + $(window).scrollTop()))

        bottomParticleWrapper.find("circle").each(function (i, v) {

            if (!$(v).attr("data-cx")) {
                $(v).attr("data-cx", $(v).attr("cx"))
                $(v).attr("data-cy", $(v).attr("cy"))
            }

            var relativeX = (parseFloat($(v).attr('data-cx'), 10)) / initialDimensionsBottom.width
            var relativeY = (parseFloat($(v).attr('data-cy'), 10)) / initialDimensionsBottom.height

            $(v).attr("cx", Math.floor(relativeX * widthBottom))
            $(v).attr("cy", Math.floor(relativeY * heightBottom))
        })

        bottomParticleWrapper.css("height", heightBottom)
        bottomParticleWrapper.attr("viewBox", "0 0 " + widthBottom + " " + heightBottom)

        if (programmItems.length === 0) {
            $(".program__dates__list .program__dates__list__item").each(function (i, v) {
                programmItems.push($(v)[0])
            })
        }

        particles(topParticleWrapper[0], 0, 100)
        particles(middleParticleWrapper[0], 1, 50)
        particles(bottomParticleWrapper[0], 2, 100)


        runParticles()

    }

    if ($('.particle').length && getDevice() != "mobile") {
        $(window).load(function () {
            buildParticles()

            var lazyLayout = _.debounce(function () {

                programmItems = []
                svgItems = []
                pointMatrix = [
                    [], [], []
                ]

                buildParticles()

            }, 150);
            $(window).resize(lazyLayout);
        })
    }


    function animatePoint(el, svgIdent, idx, start, startLocation, pos, duration, randomDeviation) {

        var animate = !el.data().fixed

        if (!animate) {
            var newPos = []
            _.map(_.range(5), function (k) {
                newPos.push([
                    0,
                    0
                ])
            })

            pos = newPos
        }
        else if (pos !== null) {
            //pos = _.clone(_.shuffle(pos))
        }
        else {
            var newPos = []
            _.map(_.range(5), function (k) {
                newPos.push([
                    ((Math.random() * (randomDeviation))) - (randomDeviation / 2),
                    ((Math.random() * (randomDeviation))) - (randomDeviation / 2)
                ])
            })

            pos = newPos
            //   console.log(pos[0])
        }

        duration = (5000 + (Math.random() * 5000))

        var currentLocation = [startLocation[0], startLocation[1]]
        var activeCurrentLocation = [startLocation[0], startLocation[1]]
        var diff = [0, 0]

        var step = null

        var stepStart = start
        var oldLocation = []

        function update(now) {
            var elapsed = now - start
            var nextStep = Math.floor(elapsed / duration) % pos.length

            var fr = null
            var to = null
            if (nextStep !== step) {
                currentLocation = activeCurrentLocation

                step = nextStep
                stepStart = now
                //var previousStep = step === 0 ? (pos.length - 1) : step - 1

                activeCurrentLocation = []
                activeCurrentLocation[0] = startLocation[0] + pos[nextStep][0]
                activeCurrentLocation[1] = startLocation[1] + pos[nextStep][1]

                diff = [activeCurrentLocation[0] - currentLocation[0], activeCurrentLocation[1] - currentLocation[1]]
            }

            var progress = Math.min(1, Math.max(0, (now - stepStart) / duration))

            pointMatrix[svgIdent][idx] = [currentLocation[0] + (diff[0] * progress), currentLocation[1] + (diff[1] * progress)]

        }

        function getPoint() {
            return pointMatrix[svgIdent][idx]
        }

        var id = el.data().point

        return {
            el: el,
            id: id,
            idx: idx,
            elP: el[0],
            getPoint: getPoint,
            update: update
        }

    }

    var particleRunActive = false

    function runParticles() {

        if (particleRunActive) {
            return
        }
        particleRunActive = true

        var count = 0, sek = 0

        setInterval(function () {
            var now = window.performance.now()

            for (var svgIdent = 0; svgIdent < 3; svgIdent++) {
                _.forEach(svgItems[svgIdent].points, function (point) {
                    point.update(now)
                })
            }
        }, 1000 / 60 * 3)

        _.forEach(programmItems, function (item, idx) {
            item.style.left = '0px'
            item.style.top = '0px'
        })

        function animate() {

            var now = window.performance.now()
            count++

            if (window.abc) {
                return
            }
            if (count % 3 === 0) {

                if (sek !== Math.floor((now - start) / 1000)) {
                    //console.log(sek, count)
                    count = 0
                    sek = Math.floor((now - start) / 1000)
                }

                for (var svgIdent = 0; svgIdent < 3; svgIdent++) {

                    _.forEach(svgItems[svgIdent].points, function (point) {
                        var p = point.getPoint()
                        point.elP.setAttribute("cx", p[0])
                        point.elP.setAttribute("cy", p[1])
                    })

                    _.forEach(svgItems[svgIdent].lines, function (line) {
                        line.elP.setAttribute("x1", pointMatrix[svgIdent][line.source][0])
                        line.elP.setAttribute("y1", pointMatrix[svgIdent][line.source][1])
                        line.elP.setAttribute("x2", pointMatrix[svgIdent][line.target][0])
                        line.elP.setAttribute("y2", pointMatrix[svgIdent][line.target][1])
                    })
                }

                _.forEach(programmItems, function (item, idx) {

                    //ie9
                    item.style.msTransform = 'translate(' + pointMatrix[1][idx + 2][0] + 'px, ' + pointMatrix[1][idx + 2][1] + 'px)';
                    item.style.webkitTransform = 'translate3d(' + pointMatrix[1][idx + 2][0] + 'px, ' + pointMatrix[1][idx + 2][1] + 'px, 0px)';
                    item.style.MozTransform = 'translate3d(' + pointMatrix[1][idx + 2][0] + 'px, ' + pointMatrix[1][idx + 2][1] + 'px, 0px)';
                    item.style.msTransform = 'translate3d(' + pointMatrix[1][idx + 2][0] + 'px, ' + pointMatrix[1][idx + 2][1] + 'px, 0px)';
                    item.style.OTransform = 'translate3d(' + pointMatrix[1][idx + 2][0] + 'px, ' + pointMatrix[1][idx + 2][1] + 'px, 0px)';
                    item.style.transform = 'translate3d(' + pointMatrix[1][idx + 2][0] + 'px, ' + pointMatrix[1][idx + 2][1] + 'px, 0px)';

                    //item.style.top = pointMatrix[1][idx+2][0] + 'px';
                    //item.style.left = pointMatrix[1][idx+2][1] + 'px';
                })

            }
            requestAnimationFrame(animate)

        }

        animate()

    }


    function particles(svgEl, svgIdent, randomDeviation, debug) {

        var svgEl = $(svgEl)
        var totalHeight = $(svgEl).height()
        var totalWidth = $(svgEl).width() * 0.7
        var randomCount = Math.ceil((totalHeight / 50 / 2) + (totalHeight / 2 / 50 * Math.random()))

        var points = []

        $circles = svgEl.find("circle")
        $lines = svgEl.find("line")

        points = []


        // [550,50], [ [50,20], [-35,-50], [-45,20], [34,-50], [55,-50] ]
        // [650,250], [ [50,20], [-35,-50], [-45,20], [34,-50], [55,-50] ]
        $circles.each(function (i, v) {
            points.push(animatePoint($(v), svgIdent, i, start, [parseFloat($(v).attr("cx"), 10), parseFloat($(v).attr("cy"), 10)], null, null, randomDeviation))
        })

        _.forEach(points, function (point) {
            point.update(start)
        })

        var lines = []

        $lines.each(function (i, v) {

            var source = _.filter(points, function (point) {
                return point.id === $(v).data().source
            })[0]

            var target = _.filter(points, function (point) {
                return point.id === $(v).data().target
            })[0]

            lines.push({
                el: $(v),
                elP: v,
                source: source.idx,
                target: target.idx,
            })
        })


        svgItems[svgIdent] = {
            points: points,
            lines: lines
        }


    }


    function newsletter() {

        var busy = false

        $(".newsletter-component").submit(function (ev) {
            ev.preventDefault()

            var emailEl = $("[name='user_email']")

            emailEl.removeClass("has--error")

            $(".newsletter__error").hide()

            if (!validateEmail(emailEl.val())) {
                emailEl.addClass("has--error")
                return
            }

            var params = {
                action: 'mailchimp_subscribe',
                user_email: emailEl.val()
            }

            if (busy) {
                return
            }

            busy = true
            $(".form__button").attr("disabled", true)

            $.ajax({
                url: window.ajaxurl,
                dataType: "json",
                type: "POST",
                data: params,
                cache: false,
                success: function (response) {

                    var result = response.result
                    var bad_fields = response.bad_fields

                    if (result === 'success') {
                        $(".newsletter__success").show()
                        $(".newsletter-component").addClass("is--success")
                    }
                    else {
                        $(".newsletter__error").show()
                    }
                },
                error: function (result) {
                    $(".newsletter__error").show()
                },
                complete: function (result) {
                    busy = false
                    $(".form__button").attr("disabled", false)
                }
            })
        })
    }

    newsletter()

})(jQuery);

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// get the current Device
// changes in widths? also update the setup.scss
function getDevice() {
    if (getWidth() <= 480) {
        return "mobile" // maybe, we need a mini?
    } else if (getWidth() <= 767) {
        return "mobile"
    } else if (getWidth() <= 860) {
        return "tablet-portrait"
    } else if (getWidth() <= 1024) {
        return "tablet-landscape"
    } else {
        return "desktop"
    }

}


// get the current width
function getWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

// get the current width
function getHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}

