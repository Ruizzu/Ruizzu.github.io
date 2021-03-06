let comments = new Array();
const commentItems = document.querySelector('#commentItems');
const comment_input = document.querySelector('#comment_input');
const comment_btn = document.querySelector('#comment_btn');
const commentItems_loading = commentItems.children[0];

Bmob.initialize("c4c8b7af88a34d5d587b8d15506b1882", "4298aaed28dfc11c8a492d1828d93539");
const commentQuery = Bmob.Query("sfComment");
const userQuery = Bmob.Query("sfUser");
commentQuery.order("-createdAt");

commentQuery.find().then(res => {
    //获取commentItem所需的主要信息（内容，系统，用户ID，发送时间、位置）
    for (let i = 0; i < res.length; i++) {
        comments[i] = {};
        comments[i].country = res[i].country;
        comments[i].region = res[i].region;
        comments[i].city = res[i].city;
        comments[i].content = res[i].content;
        comments[i].system = res[i].system;
        comments[i].browser = res[i].browser;
        comments[i].userId = res[i].userId;
        comments[i].createdAt = res[i].createdAt;
    }
    //构建commentItem内容
    for (let i = 0; i < comments.length; i++) {
        //创建commentItem中的各种元素
        let commentItem = document.createElement('div')
        let commentItem_link = document.createElement('a')
        let commentItem_userAvatar = document.createElement('img')
        let commentItem_username = document.createElement('p')
        let commentItem_postingTime = document.createElement('p')
        let commentItem_country = document.createElement('p')
        let commentItem_region = document.createElement('p')
        let commentItem_city = document.createElement('p')
        let commentItem_content = document.createElement('p')
        let commentItem_system = document.createElement('img')
        let commentItem_browser = document.createElement('img')
        //对commentItem中的元素的的属性进行常规赋值操作（主要是一些CSS样式）
        commentItem_link.setAttribute('target', '_blank')
        commentItem_userAvatar.setAttribute('class', 'avatar')
        commentItem_username.setAttribute('class', 'commentItem_username')
        commentItem_postingTime.setAttribute('class', 'commentItem_postingTime')
        commentItem_country.setAttribute('class', 'commentItem_country')
        commentItem_region.setAttribute('class', 'commentItem_region')
        commentItem_city.setAttribute('class', 'commentItem_city')
        commentItem_system.setAttribute('class', 'commentItem_incidental')
        commentItem_browser.setAttribute('class', 'commentItem_incidental')
        commentItem_content.setAttribute('class', 'commentItem_content')
        //对commentItem中的元素的主要内容进行赋值操作（个人主页地址，发送时间、位置，内容,系统，浏览器）
        commentItem_link.setAttribute('href', '/user/profile.html?id=' + comments[i].userId)
        commentItem_postingTime.innerText = comments[i].createdAt
        commentItem_country.innerText = comments[i].country
        commentItem_region.innerText = comments[i].region
        commentItem_city.innerText = comments[i].city
        commentItem_content.innerText = comments[i].content
        //对commentItem中的附带信息（系统）进行赋值操作
        commentItem_system.setAttribute('src', '/assets/images/comment/' + comments[i].system[0] + '.png')
        commentItem_system.setAttribute('title', comments[i].system[1])
        //对commentItem中的附带信息（浏览器）进行赋值操作
        commentItem_browser.setAttribute('src', '/assets/images/comment/' + comments[i].browser[0] + '.png')
        commentItem_browser.setAttribute('title', comments[i].browser[1])
        //对commentItem中的元素的剩余用户内容进行赋值操作（用户名，头像）
        userQuery.get(comments[i].userId).then(user => {
            //获取commentItem所需的用户信息
            comments[i].username = user.username;
            comments[i].avatarUrl = user.avatar == undefined ? '/assets/images/userAvatar.png' :user.avatar;
            //向commentItem中的元素写入用户信息
            commentItem_userAvatar.setAttribute('src', comments[i].avatarUrl)
            commentItem_username.innerText = comments[i].username
        }).catch(err => {
            alert("查询失败: " + err.code + " " + err.message);
        })
        //实现以上元素，将其添加为commmentItem的子类
        commentItem_link.appendChild(commentItem_userAvatar);
        commentItem.appendChild(commentItem_link);
        commentItem.appendChild(commentItem_username);
        commentItem.appendChild(commentItem_postingTime);
        commentItem.appendChild(commentItem_system);
        commentItem.appendChild(commentItem_browser);
        commentItem.appendChild(commentItem_city);
        commentItem.appendChild(commentItem_region);
        commentItem.appendChild(commentItem_country);
        commentItem.appendChild(commentItem_content);
        commentItems.appendChild(commentItem);
    }
    //隐藏“Loading...”
    commentItems_loading.style.display = 'none';
});

comment_btn.addEventListener('click', function () {
    if (localStorage.id) {
        if (comment_input.value != '') {
            comment_btn.disabled = 'disabled';
            comment_btn.innerText = '发布中......'
            //获取系统版本
            var ua = navigator.userAgent
            var system = new Array(2)
            if (ua.indexOf('Windows NT 5.0') > -1 || ua.indexOf("Windows 2000") > -1) {
                system[0] = 'Windows'
                system[1] = 'Microsoft Windows 2000'
            }
            else if (ua.indexOf('Windows NT 5.1') > -1 || ua.indexOf("Windows XP") > -1) {
                system[0] = 'Windows'
                system[1] = 'Microsoft Windows XP';
            }
            else if (ua.indexOf('Windows NT 5.2') > -1 || ua.indexOf("Windows 2003") > -1) {
                system[0] = 'Windows'
                system[1] = 'Microsoft Windows 2003'
            }
            else if (ua.indexOf('Windows NT 6.0') > -1 || ua.indexOf("Windows Vista") > -1) {
                system[0] = 'Windows'
                system[1] = 'Microsoft Windows Vista'
            }
            else if (ua.indexOf('Windows NT 6.1') > -1 || ua.indexOf("Windows 7") > -1) {
                system[0] = 'Windows'
                system[1] = 'Microsoft Windows 7'
            }
            else if (ua.indexOf('Windows NT 6.2') > -1 || ua.indexOf("Windows 8") > -1) {
                system[0] = 'Win8-10'
                system[1] = 'Microsoft Window 8'
            }
            else if (ua.indexOf('Windows NT 6.3') > -1 || ua.indexOf("Windows 8.1") > -1) {
                system[0] = 'Win8-10'
                system[1] = 'Microsoft Windows 8.1'
            }
            else if (ua.indexOf('Windows NT 10.0') > -1 || ua.indexOf("Windows 10") > -1) {
                system[0] = 'Win8-10'
                system[1] = 'Microsoft Windows 10'
            }
            else if (ua.indexOf('vivo') > -1) {
                system[0] = 'vivo'
                system[1] = /vivo.*?B/.exec(ua)[0].slice(0,-1) + /Android.*?;/.exec(ua)[0].slice(0,-1)
            }
            else if (ua.indexOf('MI') > -1) {
                system[0] = 'mi'
                system[1] = /MI.*?B/.exec(ua)[0].slice(0,-1) + /Android.*?;/.exec(ua)[0].slice(0,-1)
            }
            else if (ua.indexOf('Redmi') > -1) {
                system[0] = 'mi'
                system[1] = /Redmi.*?B/.exec(ua)[0].slice(0,-1) + /Android.*?;/.exec(ua)[0].slice(0,-1)
            }
            else if (ua.indexOf('Android') > -1) {
                system[0] = 'Android'
                system[1] = /Android.*?;/.exec(ua)[0].slice(0,-1)
            }
            else if (ua.indexOf('iPhone') > -1) {
                system[0] = 'Apple'
                system[1] = 'IOS ' + navigator.userAgent.match(/CPU iPhone OS (.*?) like Mac OS X/)[1].replace(/_/g, '.')
            }
            else if (ua.indexOf('Linux') > -1) {
                system[0] = 'Linux'
                system[1] = 'Linux'
            }
            else {
                system[0] = 'unknown'
                system[1] = "未知系统"
            }
            if (ua.indexOf("x64") > -1 || ua.indexOf("WOW64") > -1)
                system[1] += ' 64位'
            else if (system[0] == 'Windows' || system[0] == 'Win8-10')
                system[1] += ' 32位'
            //获取浏览器
            var browser = new Array(2)
            if (ua.indexOf('Firefox') > -1) {
                browser[0] = 'Firefox'
                browser[1] = 'Mozilla Firefox'
            } else if (ua.indexOf('Opera' || 'OPR') > -1) {
                browser[0] = 'Opera'
                browser[1] = 'Opera'
            } else if (ua.indexOf('Edge') > -1) {
                browser[0] = 'Edge'
                browser[1] = 'Microsoft Edge'
            } else if (ua.indexOf('QQbrowser') > -1) {
                browser[0] = 'QQbrowser'
                browser[1] = 'QQ浏览器'
            } else if (ua.indexOf('Chrome') > -1) {
                browser[0] = 'Chrome'
                browser[1] = 'Google Chrome'
            } else if (ua.indexOf('Silk') > -1) {
                browser[0] = 'Silk'
                browser[1] = 'Amazon Silk'
            } else if (ua.indexOf('Safari') > -1) {
                browser[0] = 'Safari'
                browser[1] = 'Apple Safari'
            } else {
                browser[0] = 'unknown'
                browser[1] = "未知浏览器"
            }
            commentQuery.find().then(() => {
                commentQuery.set('userId', localStorage.id);
                commentQuery.set('system', system);
                commentQuery.set('browser', browser);
                commentQuery.set('ua', ua);
                commentQuery.set('content', comment_input.value);
                $.getJSON('//api.ipinfodb.com/v3/ip-city/?key=583b4749a22e4313070046dda434a7319ece4412802319109777849cc4991b98&format=json', function (data) {
                    commentQuery.set('country', data.countryName);
                    commentQuery.set('region', data.regionName);
                    commentQuery.set('city', data.cityName);
                    //放在getJSON是为了防止在获取到之前就进行commment.save操作
                    commentQuery.save().then(() => {
                        alert('发布成功！');
                        window.location.reload();
                    }).catch(err => {
                        alert('发布失败\n返回错误码：' + err.code + '\n返回错误信息：' + err.message);
                        comment_btn.disabled = false;
                        comment_btn.innerText = '发布'
                    })
                });

            });

        } else {
            alert('发布失败\n返回错误信息：内容不能为空。');
            comment_btn.disabled = false;
            comment_btn.innerText = '发布'
        }
    } else {
        alert('发布失败\n返回错误信息：请先登录账号。');
        comment_btn.disabled = false;
        comment_btn.innerText = '发布'
    }
})
