(function($) {
    function _request(method, url, data) {
        var settings = {
            method: method,
            dataType: 'json',
        };

        if (method === 'GET' && data) {
            var linkMark = url.indexOf('?') >= 0 ? '&' : '?';
            var queryString = $.param(data, true);
            url += linkMark + getQueryString;
        } else {
            settings.data = JSON.stringify(data);
            settings.contentType = 'application/json; charset=UTF-8';
        }

        return $.ajax(url, settings);
    }

    function _get(url, data) {
        return _request('GET', url, data);
    }

    function _post(url, data) {
        return _request('POST', url, data);
    }

    $.json_http = Object.freeze({
        request: _request,
        get: _get,
        post: _post,
    });
})(jQuery);
