$(function () {
    wjsBanner();
    backToTop('wjs_back_2top');
});
var wjsBanner = function () {
    //如果全局变量中有data就直接使用不用调ajax请求了
    var getData = function (callback) {
        if (window.data) {
            callback && callback(window.data);
        } else {
            $.ajax({
                type: 'get',
                url: 'js/data.json',
                dataType: 'json',
                data: '',//传递的参数-是一个对象
                success: function (data) {
                    window.data = data;
                    callback && callback(window.data);
                }
            })
        }
    };
    var render = function () {
        // getData(function (data) {

        // 如果在编译器中打开就启用getData()方法使用ajax请求获取data.json中的数据
        var data = bannerList;
        //是否是移动端
        var isMobile = $(window).width() < 768;
        //模板引擎渲染数据
        var pointTemplate = template('pointTemplate', {list: data});
        var imgTemplate = template('imgTemplate', {list: data, isMobile: isMobile});
        $('.carousel-indicators').html(pointTemplate);
        $('.carousel-inner').html(imgTemplate);
        // })
    };
    //测试
    $(window).on('resize', function () {
        render();
    }).trigger('resize');

    //移动端手势切换
    var startX = 0;
    var distanceX = 0;
    var isMove = 0;
    $('.wjs-banner').on('touchstart', function (ev) {
        console.log(ev);
        startX = ev.originalEvent.touches[0].clientX;
    }).on('touchmove', function (ev) {
        isMove = 1;
        var moveX = ev.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
    }).on('touchend', function () {
        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX > 0) {
                $('.carousel').carousel('prev');
            } else {
                $('.carousel').carousel('next');
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = 0;
    })
};

//返回顶部
function backToTop(eId, height) {
    var h = height || 1000;
    $(window).scroll(function () {
        var wh = $(window).scrollTop();
        if (wh > h) {
            $("#" + eId).stop().fadeIn(300);
        } else {
            $("#" + eId).stop().fadeOut(50);
        }
    });

    $("#" + eId).on('click', function () {
        $("html,body").stop().animate({scrollTop: 0}, 300, "swing");
    })
}

// nav动画
function ul(index) {
    var underlines = document.querySelectorAll(".underline");
    for (var i = 0; i < underlines.length; i++) {
        underlines[i].style.transform = 'translateX(' + index * 100 + '%)';
    }
}

var bannerList = [
    {
        "pcUrl": "images/slide_01_2000x410.jpg",
        "mUrl": "images/slide_01_640x340.jpg"
    },
    {
        "pcUrl": "images/slide_02_2000x410.jpg",
        "mUrl": "images/slide_02_640x340.jpg"
    },
    {
        "pcUrl": "images/slide_03_2000x410.jpg",
        "mUrl": "images/slide_03_640x340.jpg"
    },
    {
        "pcUrl": "images/slide_04_2000x410.jpg",
        "mUrl": "images/slide_04_640x340.jpg"
    }
];