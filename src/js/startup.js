var baseUrl = 'http://192.168.0.102:8080/api';
var locationMap;

$(function () {
    //initLocationMap();
    $('.contact__form').find('.form__button').click(postContact);
});

function loadHomeInfo(callback) {
    $.json_http.get(baseUrl + '/home')
        .done(function (data, textStatus, jqXHR) {
            console.log(data);
            console.log('textStatus: ' + textStatus);
            if (textStatus === 'success' && data) {
                var newsCategories = data['news'];
                if (Array.isArray(newsCategories) && newsCategories.length > 0) {
                    setupNews(newsCategories);
                } else {
                    console.log('No news info!');
                }

                var peopleCategories = data['peoples'];
                if (Array.isArray(peopleCategories) && peopleCategories.length > 0) {
                    peopleCategories.forEach(function(category, index) {
                        if (category.name === 'Team') {
                            setupPeople('#switch-team-container', 'team', category.items);
                        } else if (category.name === 'Mentor') {
                            setupPeople('#switch-mentors-container', 'mentors', category.items);
                        }
                    });
                } else {
                    console.log('No people info!');
                }

                var startupCategories = data['startups'];
                if (Array.isArray(startupCategories) && startupCategories.length > 0) {
                    setupStartups(startupCategories);
                } else {
                    console.log('No startup info!');
                }

                var albums = data['albums'];
                if (Array.isArray(albums) && albums.length > 0) {
                    setupAlbums(albums);
                } else {
                    console.log('No album info!');
                }
            } else {
                console.log('No home info!');
            }
            callback();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            callback();
        });
}

function loadAllNews() {
    $.json_http.get(baseUrl + '/news')
        .done(function (data, textStatus, jqXHR) {
            console.log(data);
            console.log('textStatus: ' + textStatus);

            if (textStatus === 'success') {
                setupAllNews(data);
            } else {
                console.error('load all news failed!');
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });
}

function loadSingleNews() {
    var id = 1;
    var search = location.search;
    var index = search.lastIndexOf('id=');
    if (index >= 0) {
        id = search.substring(index + 3);
    }

    $.json_http.get(baseUrl + '/news/' + id)
        .done(function (data, textStatus, jqXHR) {
            console.log(data);
            console.log('textStatus: ' + textStatus);

            if (textStatus === 'success') {
                setupSingleNews(data);
            } else {
                console.error('load single news failed!');
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        });
}

function loadAlbum(callback) {
    var id = 1;
    var search = location.search;
    var index = search.lastIndexOf('id=');
    if (index >= 0) {
        id = search.substring(index + 3);
    }

    $.json_http.get(baseUrl + '/albums/' + id + '/photos')
        .done(function (data, textStatus, jqXHR) {
            console.log(data);
            console.log('textStatus: ' + textStatus);

            if (textStatus === 'success') {
                setupAlbum(data);
            } else {
                console.error('load single news failed!');
            }

            callback();

            $('#album-container').magnificPopup({
                type:'image',
                delegate: 'a',
                gallery:{enabled:true}
            });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            callback();
        });
}

function loadAllMentors(callback) {
    $.json_http.get(baseUrl + '/people?size=10000')
        .done(function (data, textStatus, jqXHR) {
            if (textStatus === 'success') {
                setupPeople('#all-mentors-container', 'all', data);
            } else {
                console.error('load mentors failed!');
            }
            callback();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            callback();
        });
}

function loadAllStartups(callback) {
    $.json_http.get(baseUrl + '/home')
    .done(function (data, textStatus, jqXHR) {
        console.log(data);
        console.log('textStatus: ' + textStatus);
        if (textStatus === 'success' && data) {
            var startupCategories = data['startups'];
            if (Array.isArray(startupCategories) && startupCategories.length > 0) {
                setupAllStartups(startupCategories);
            } else {
                console.log('No startup info!');
            }
        } else {
            console.log('No home info!');
        }
        callback();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        callback();
    });
}

function setupAllNews(data) {
    $container = $('#news-list');
    data.forEach(function(news, index) {
        var $article = $('<article class="news-list__item"></article>');
        if (index === 0) {
            $article.addClass('is--12');
            $article.addClass('news-list__item--big');
        } else {
            $article.addClass('news-list__item--normal');
        }
        $article.append('<a href="news.html?id=' + news['id'] + '" class="news-list__media"><img src="' + news['thumbnail']['url'] + '" class="news-list__media__image"></a>');
        var $header = $('<div class="news-list__header"></div>');
        $header.append('<span class="news-list__date">' + utcToLocaleDate(news['createTime']) + '</span>');
        $header.append('<h3 class="news-list__title">' + news['title'] + '</h3>');
        $header.append('<a href="news.html?id=' + news['id'] + '" class="news-list__read-more">阅读详情</a>');
        $article.append($header);
        $container.append($article);
    });
}

function setupNews(data) {
    $container = $('#news-container');
    data.forEach(function(news, index) {
        var $item = $('<div class="carousel__item news-list__item news-list__item--normal"></div>');
        $item.append('<a href="news.html?id=' + news['id'] + '" class="news-list__media"><img data-src="' + news['thumbnail']['url'] + '" class="news-list__media__image carousel__media__image"></a>');
        var $header = $('<div class="news-list__header"></div>');
        $header.append('<span class="news-list__date">' + utcToLocaleDate(news['createTime']) + '</span>');
        $header.append('<h3 class="news-list__title">' + news['title'] + '</h3>');
        $header.append('<a href="news.html?id=' + news['id'] + '" class="news-list__read-more">阅读详情</a>');
        $item.append($header);
        $container.append($item);
    });
}

function setupAlbums(albums) {
    $container = $('#album-container');

    albums.forEach(function (album, albumIndex) {
        var $item = $('<div class="carousel__item album-list__item album-list__item--normal"></div>');
        $item.append('<a href="album.html?id=' + album['id'] + '" class="album-list__media"><img data-src="' + album['poster']['url'] + '" class="album-list__media__image carousel__media__image"></a>');
        var $header = $('<div class="album-list__header"></div>');
        $header.append('<span class="album-list__date">' + utcToLocaleDate(album['createTime']) + '</span>');
        $header.append('<h3 class="album-list__title">' + album['name'] + '</h3>');
        $header.append('<a href="album.html?id=' + album['id'] + '" class="album-list__read-more">阅读详情</a>');
        $item.append($header);
        $container.append($item);
    });
}

function setupAlbumBak(album) {
    $('#album-time').text(utcToLocaleDate(album['createTime']));
    $('#album-location').text(album['location']);
    $('#album-name').text(album['name']);

    var data = album['photos'];
    if (Array.isArray(data) && data.length > 0) {
        $container = $('#album-container');
        data.forEach(function(photo, index) {
            var $box = $('<div class="box album__box"></div>');
            $box.append('<span class="album__box__wrapper"><a href="' + photo['poster']['url'] + '" class="image-link"><img src="' + photo['poster']['url'] + '" class="carousel__image album__box__image" alt="' + photo['name'] + '"></a></span>');
            $box.append('<p>' + photo['poster']['originalName'] + '</p>');
            $container.append($('<div class="album__item"></div>').append($box));
        });
    }
}

function setupAlbum(album) {
    $('#album-time').text(utcToLocaleDate(album['createTime']));
    $('#album-location').text(album['location']);
    $('#album-name').text(album['name']);

    var data = album['photos'];
    if (Array.isArray(data) && data.length > 0) {
        $container = $('#album-container');
        data.forEach(function(photo, index) {
            var $box = $('<a href="' + photo['poster']['url'] + '" title="' + photo['id'] + ' - ' + photo['name'] + '"></a>');
            $box.append('<img src="' + photo['poster']['url'] + '?x-oss-process=image/resize,m_fill,h_240,w_240">');
            $container.append($box);
        });
    }
}

function setupStartups(data) {
    if (Array.isArray(data) && data.length > 0) {
        $nav = $('<nav class="switch__navigation"></nav>');
        $container = $('<div class="switch__container"></div>');
    
        data.sort(function(c1, c2) {
            if (c1['name'] > c2['name']) {
                return -1;
            } else if (c1['name'] < c2['name']) {
                return 1;
            } else {
                return 0;
            }
        }).forEach(function(category, index) {
            var $link = $('<a href="#switch-startups-' + category.id + '" class="switch__navigation__item" data-extra-padding="50">' + category.alias + '</a>');
            var $tab = $('<div class="switch__tab" id="switch-startups-' + category.id + '"></div>');
            if (index === 0) {
                $link.addClass('is--active');
                $tab.addClass('is--active');
            }
            $nav.append($link);
            var $list = $('<div class="carousel carousel--three-col companies__carousel" data-slick=\'{"responsive": [{ "breakpoint": 767, "settings": { "speed": 200 }}]}\'></div>');
            setupStartupItems($list, category.items, 'carousel__item');
            $tab.append($list);
            $tab.append('<p class="companies__more"><a class="button" href="startups.html">查看所有</a></p>');
            $container.append($tab);
        });

        $('#startups_switch').append($nav, $container);
    } else {
        console.log('No startup list info!');
    }
}

function setupSingleNews(news) {
    $('#news-title').text(news['title']);
    $('#news-time').text(utcToLocaleDate(news['createTime']));
    $('#news-content').append(news['content']);
}

function setupAllStartups(data) {
    if (Array.isArray(data) && data.length > 0) {
        $container = $('#startups-container');
    
        data.sort(function(c1, c2) {
            if (c1['name'] > c2['name']) {
                return -1;
            } else if (c1['name'] < c2['name']) {
                return 1;
            } else {
                return 0;
            }
        }).forEach(function(category, index) {
            $container.append('<h3>' + category['alias'] + '</h3>');
            var $list = $('<div class="grid is--4 is--m-12 has--small-gaps"></div>');
            setupStartupItems($list, category.items, 'companies__item');
            $container.append($list);
        });
    } else {
        console.log('No startup list info!');
    }
}

function setupStartupItems($container, data, itemType) {
    if (Array.isArray(data) && data.length > 0) {
        data.forEach(function(startup, index) {
            var $box = $('<div class="box companies__box"></div>');
            if (itemType === 'carousel__item') {
                $box.append('<span class="companies__box__wrapper"><img data-src="' + startup['icon']['url'] + '" class="carousel__image companies__box__image" alt="' + startup['name'] + '"></span>');
            } else {
                $box.append('<span class="companies__box__wrapper"><img src="' + startup['icon']['url'] + '" class="carousel__image companies__box__image" alt="' + startup['name'] + '"></span>');
            }
            $box.append('<div class="companies__box__description "><p>' + startup['description'] + '</p></div>');

            var appendContact = false;
            var $contact = $('<ul class="box__contact"></ul>');
            if (startup.website) {
                appendContact = true;
                $contact.append('<li class="box__contact__url"><a href="' + startup['website'] + '" target="_blank"></a></li>');
            }

            if (appendContact) {
                $box.append($contact);
            }

            $container.append($('<div class="' + itemType + '"></div>').append($box));
        });
    }
}

// peopleType: 'all', 'team', 'mentors'
function setupPeople(containerMark, peopleType, data) {
    $container = $(containerMark);
    if (Array.isArray(data) && data.length > 0) {
        var className = 'all' === peopleType ? 'people__item' : 'carousel__item';
        data.forEach(function(people, index) {
            var $boxDiv = $('<div class="box people__box"></div>');
            if ('all' === peopleType) {
                $boxDiv.append('<img src="' + people['avatar']['url'] + '" class="people__box__image" alt="' + people['name'] + '">');
            } else {
                $boxDiv.append('<img data-src="' + people['avatar']['url'] + '" class="carousel__image people__box__image" alt="' + people['name'] + '">');
            }
            $boxDiv.append('<h3 class="people__box__title headline--4">' + people['name'] + '</h3>');
            $boxDiv.append('<p class="people__box__company ">' + people['description'] + '</p>');

            var $ul = $('<ul class="box__contact"></ul>');
            var appendUl = false;
            if (people.linkin) {
                $ul.append('<li class="box__contact__linkedin"><a href="' + people['linkin'] + '" target="_blank"></a></li>');
                appendUl = true;
            }
            if (people.email) {
                $ul.append('<li class="box__contact__mail"><a href="mailto:' + people['email'] + '" target="_blank"></a></li>');
                appendUl = true;
            }
            if (people.wechat) {
                $ul.append('<li class="box__contact__wechat"><a href="' + people['wechat'] + '" target="_blank"></a></li>');
                appendUl = true;
            }
            if (people.weibo) {
                $ul.append('<li class="box__contact__weibo"><a href="' + people['weibo'] + '" target="_blank"></a></li>');
                appendUl = true;
            }
            if (appendUl) {
                $boxDiv.append($ul);
            }

            $container.append($('<div class="' + className + '"></div>').append($boxDiv));
        });
        //console.log($container[0].innerHTML);
    } else {
        console.log('No people list info! - ' + peopleType);
    }
}

var contactBusy = false;
function postContact() {
    var $form = $('.contact__form');

    if (contactBusy) {
        return;
    } else {
        contactBusy = true;
        $form.addClass("is--busy");
    }

    var name = $form.find("[name='name']");
    var email = $form.find("[name='email']");
    var company = $form.find("[name='company']");
    var comment = $form.find("[name='comment']");

    var validateEmail = function (email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    var toggleStatus = function (status) {
        setTimeout(function () {
            $form.find('.form__status')
                .css('height', $form.find('.form__status--initial').innerHeight())
                .removeClass('is--active')

            $form.find('.form__status--' + status)
                .addClass('is--active');
        }, 800);
    }

    var closeStatus = function () {
        $form.removeClass("is--busy");
        contactBusy = false;
    }

    var contact = {
        name: name.val(),
        email: email.val(),
        company: company.val(),
        message: comment.val(),
    }

    console.log(contact);

    name.toggleClass('has--error', !contact.name.length);
    company.toggleClass('has--error', !contact.company.length);
    email.toggleClass('has--error', !contact.email.length && !validateEmail(contact.email));
    comment.toggleClass('has--error', !contact.message.length);

    if (!$form.find('.has--error').length) {
        var $submitButton = $form.find('.form__button');
        $.json_http.post(baseUrl + '/contacts', contact)
            .done(function (data, textStatus, jqXHR) {
                console.log(textStatus);
                $submitButton.addClass('is--sending');
                if (textStatus === 'success') {
                    toggleStatus('success');
                } else {
                    busy = false
                    toggleStatus('error');
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                closeStatus();
                $submitButton.addClass('is--sending');
                toggleStatus('error');
            });
    } else {
        closeStatus();
    }
}

function utcToLocaleDateString(utcDatetime) {
    return new Date(utcDatetime).toLocaleDateString();
}

function utcToLocaleString(utcDatetime) {
    return new Date(utcDatetime).toLocaleString();
}

function utcToLocaleDate(utcDatetime) {
    var date = new Date(utcDatetime)
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
}