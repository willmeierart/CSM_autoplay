$(function() {
    let
        iframe$ = $('iframe'),
        video$ = [],
        playerID,
        scrollTimer

    //create array of all standard-embedded videos on page
    for (let i of iframe$) {
        let url = i.src
        if (url.includes('vimeo')) {
            i.classList.add('vimeo')

        }
    }


    $(function() {
        initialize().promise().done(scrollAction())
    })


    //convert all standard-embedded videos to API player
    function initialize() {
        return $.each($('.vimeo'), function(video) {
            newPlayer($(this))
        })

    }


    //give each new player object a unique ID (their Vimeo ID), set default document.ready options

    function newPlayer(i) {
        i = new Vimeo.Player(i)
        giveUniqueID(i)
        initPresets(i)
        video$.push(i)
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
            playerID = player.element.id
            player.classList.add('tryIt')
        }).catch(function(error) {})
        return playerID
    }

    function scrollAction() {
        $(window).scroll(function() {
            if (scrollTimer) {
                clearTimeout(scrollTimer)
            }
            scrollTimer = setTimeout(handleScroll, 500)

            function handleScroll() {
                $.each(video$, function(i) {
                    console.log(this)
                    console.log($(this)[0])
                    console.log($(this.element))

                    if ($(this.element).isScrolledIntoView()) {
                        // console.log('hi')
                        console.log($(this)[0], 'hi')
                        autoPlay($(this)[0])

                    }else{
                        // console.log('bye')
                        console.log($(this)[0], 'bye')
                        pause($(this)[0])
                    }
                })
            }

            $.fn.isScrolledIntoView = function() {
                let thisOffset = $(this).offset().top;
                let windowHeight = $(window).height();

                let heightToThis = thisOffset - windowHeight;

                let scrollPosition = $(window).scrollTop();

                if ((scrollPosition >= heightToThis)) {
                    return true;
                }
            }





        })
    }




})