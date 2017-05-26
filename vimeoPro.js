$(function() {
    let
        iframe$ = $('iframe'),
        video$ = [],
        playerID,
        playerElement


    //create array of all standard-embedded videos on page

    for (let i of iframe$) {
        let url = i.src
        if (url.includes('vimeo')) {
            i.classList.add('vimeo')
            video$.push(i)
        }
    }
    console.log(video$)


    //convert all standard-embedded videos to API player

    $.each($('.vimeo'), function(video) {
        console.log($(this))
        console.log($(this)[0])
        newPlayer($(this))
        console.log($(this).is(':appeared'))
    })


    //give each new player object a unique ID (their Vimeo ID), set default document.ready options

    function newPlayer(i) {
        i = new Vimeo.Player(i)
        giveUniqueID(i)
        initPresets(i)
    }

    function initPresets(player) {
        playerElement = player.element
        console.log(playerElement)
        console.log(player)
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
            console.log(player)
            player.element.id = id
            playerID = player.element.id
        }).catch(function(error) {})
        return playerID
    }

})



$(window).scroll(function() {
    console.log($('Player'))
    let scrollTimer = setTimeout(handleScroll(), 20)
    if (scrollTimer){
        clearTimeout(scrollTimer)
    }

    function handleScroll(){
        $.each($('.vimeo'), function(each) {
            // let video$ = $('.vimeo')[each]
            if($(this).is(':appeared')){
                $(this).on('disappear', console.log($(this)[0], 'bye'))
            }else{
                $(this).appear()

            }
            $(this).on('appear', function autoPlay() {
                console.log('hi', $(this)[0])
                // let video$ = $(this)[0]
                // video$.play().then(function() {}).catch(function(error) {
                //     switch (error.name) {
                //         case 'PasswordError':
                //             break;
                //         case 'PrivacyError':
                //             break;
                //         default:
                //             break;
                //     }
                // })
                // video$.setAutopause(false).then(function(autopause) {}).catch(function(error) {
                //     switch (error.name) {
                //         case 'UnsupportedError':
                //             break;
                //         default:
                //             break;
                //     }
                // })
            })
        })

    }



})
