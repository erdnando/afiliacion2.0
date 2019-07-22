
var isMobile =
{
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    Samsung: function () {
        return navigator.userAgent.indexOf('SamsungBrowser') > -1;
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() || isMobile.Samsung());
    }
};

function iOSversion() {
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // supports iOS 2.0 and later: <https://bit.ly/TJjs1V>
        var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
    }
};

if (isMobile.Samsung())
{
    if (window.location.href.indexOf('mobile.aspx') < 0)
        window.location.href = '/mobile.aspx';
}
else
{
    var ver = iOSversion();

    if (ver && ver[0] >= 5) {
        // is iOS
        var version = (ver[0]) * 100 + (ver[1]) * 10 + ver[2];

        if (version < 1130) {

            if (window.location.href.indexOf('iOS.aspx') < 0)
                window.location.href = '/iOS.aspx';
        }
    }
}

