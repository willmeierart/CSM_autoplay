$(function() {

    $(function() {
        initialize().promise().done(scrollAction())
    })

    let iframe$ = $('iframe'),
        video$ = []

    for (let i of iframe$) {
        let url = i.src
        if (url.includes('vimeo')) {
            i.classList.add('vimeo')
        }
    }

    function initialize() {
        return $.each($('.vimeo'), function(video) {
            newPlayer($(this))
        })
    }

    function newPlayer(player) {
        player = new Vimeo.Player(player)
        giveUniqueID(player)
        initPresets(player)
        video$.push(player)
        return video$
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
        }).catch(function(error) {})
    }

    function scrollAction() {
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
                    }else{
                        console.log(thi$Video, 'bye')
                        pause(thi$Video)
                        soundOff(thi$Video)
                    }
                })
            }

            function isInView(video) {
                let bounds = video.getBoundingClientRect()
                return (
                    bounds.top >= 0 &&
                    bounds.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                )
            }

        })
    }

})
