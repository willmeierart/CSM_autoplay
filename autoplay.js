$(function() {
    let
        iframe$ = $('iframe'),
        video$ = [],
        playerId = 'playerId'

    console.log(iframe$)
    for (let i of iframe$) {
        let $rc = i.src
        if ($rc.includes('vimeo')) {
            video$.push(i)
        }
    }
    console.log(video$)

    for (let i of video$) {
        newPlayer(i)
    }

    function newPlayer(i) {
        i = new Vimeo.Player(i)
        initPresets(i)
    }

    function initPresets(player) {
        autoPlay(player)
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
        player.setAutopause(false).then(function(autopause) {
        }).catch(function(error) {
            switch (error.name) {
                case 'UnsupportedError':
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




})
