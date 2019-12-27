jQuery(function ($) {

    let interval = null;

    startInterval();


    function openModal() {
        document.getElementById("modal").classList.add('modalDisplay');
    }

    function closeModal() {
        document.getElementById("modal").classList.remove('modalDisplay');
    }


    let $form = $("#form");
    $form.on('submit', function (e) {
        e.preventDefault();
        if (!localStorage.getItem('id')) {

            openModal();
            canvasDisplay();
        } else {
            alert('Réservation en cours');
        }
    });

    let $validate = $("#validate");
    $validate.on('click', function (e) {
        e.preventDefault();
        closeModal();
        restartInterval();
    });

    let $cancel = $("#cancel");
    $cancel.on('click', function (e) {
        e.preventDefault();
        closeModal();
    });

    function restartInterval() {
        localStorage.setItem('id', $('#id').val());
        localStorage.setItem('reservedAt', new Date());
        stopInterval();
        startInterval();
    }

    function startInterval() {
        interval = setInterval(function () {
            let reservedAt = new Date(localStorage.getItem('reservedAt'));

            let diffTime = Math.round(((new Date()) - reservedAt) / 1000);

            const reservationTimeout = 1200 - diffTime;//1200 - diffTime;

            const reservationTimeoutMinutes = Math.floor(reservationTimeout / 60);

            const reservationTimeoutSeconds = reservationTimeout % 60;

            $('#time').text('Velo reserver :' + $('#address').val() + 'Temps restant : ' + reservationTimeoutMinutes + ' minutes et ' + reservationTimeoutSeconds + ' secondes');

            if (reservationTimeout <= 0) {
                stopInterval();
                $('#time').text('Réservation expirée');
                localStorage.removeItem('id');
                localStorage.removeItem('reservedAt');
            }
        }, 1000);
    }

    function stopInterval() {
        clearInterval(interval);
    }

    function canvasDisplay() {
        var canvas = document.querySelector("canvas");
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'gray';
        ctx.fillRect(10, 10, 100, 100);
    }

    close();

});