jQuery(document).ready(function($) {
    const iframe$ = $('iframe'),
        video$ = []

    for (let i of iframe$) {
        const url = i.src
        if (url.includes('vimeo')) {
            i.classList.add('vimeo')
        }
    }

    //make all videos initialize then enable scroll functionality
    if (isMobile() == false) {
        initialize().promise().done(scrollAction());
    }

    function isMobile() { //...if not on mobile
        return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1)
    }

    //create new vimeo player objects with autoplay presets out of embedded videos

    function initialize() {
        return $.each($('.vimeo'), function(video) {
            video$.push(newPlayer($(this)))
        })
    }

    function newPlayer(player) {
        player = new Vimeo.Player(player)
        giveUniqueID(player)
        initPresets(player)
        return player
    }

    function initPresets(player) {
        loop(player)
        captionsOn(player)
        soundOff(player)
    }

    function autoPlay(player) {
        player.play().then(function() {}).catch(function(error) {
            switch (error.name) {
                case 'PasswordError':
                    break;
                case 'PrivacyError':
                    break;
                default:
                    break;
            }
        })
        player.setAutopause(false).then(function(autopause) {}).catch(function(error) {
            switch (error.name) {
                case 'UnsupportedError':
                    break;
                default:
                    break;
            }
        })
    }

    function pause(player) {
        player.pause().then(function() {}).catch(function(error) {
            switch (error.name) {
                case 'PasswordError':
                    break;
                case 'PrivacyError':
                    break;
                default:
                    break;
            }
        })
    }

    function loop(player) {
        player.setLoop(true).then(function(loop) {}).catch(function(error) {});
    }

    function captionsOn(player) {
        player.enableTextTrack('en').then(function(track) {}).catch(function(error) {
            switch (error.name) {
                case 'InvalidTrackLanguageError':
                    break;
                case 'InvalidTrackError':
                    break;
                default:
                    break;
            }
        })
    }

    function soundOff(player) {
        player.setVolume(0).then(function(volume) {}).catch(function(error) {
            switch (error.name) {
                case 'RangeError':
                    break;
                default:
                    break;
            }
        })
    }

    function giveUniqueID(player) {
        player.getVideoId().then(function(id) {
            player.element.id = id
            player.element.attr('playsinline', true)
        }).catch(function(error) {})
    }



    function scrollAction() { //when window is scrolled, delay action but then if video is in view play it
        let scrollTimer
        $(window).scroll(function() {
            if (scrollTimer) {
                clearTimeout(scrollTimer)
            }
            scrollTimer = setTimeout(handleScroll, 200)

            function handleScroll() {
                $.each(video$, function(i) {
                    let thi$Video = $(this)[0]
                    if (isInView($(this.element)[0])) {
                        console.log(thi$Video, 'hi')
                        autoPlay(thi$Video)
                    } else {
                        console.log(thi$Video, 'bye')
                        pause(thi$Video)
                        soundOff(thi$Video)
                    }
                })
            }

            function isInView(video) {
                const bounds = video.getBoundingClientRect()
                console.log(bounds)
                return (
                    bounds.top >= -100 &&
                    bounds.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100
                )
            }

        })
    }
})
