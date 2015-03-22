$(document).ready(checkForChecked());

$('#next-btn').on('click', function () {
    $(this).toggleClass('not-active');
    var params = {};
    $(':checked').each(function () {
        params[$(this).attr('name')] = $(this).val();
    });
    params['profile_owner_id'] = document.getElementsByName('profile_owner_id')[0].value;
    params['caption_time'] = document.getElementsByName('caption_time')[0].value;
    $.ajax({
        type: 'POST',
        url: '/results',
        data: JSON.stringify(params),
        contentType: 'application/json',
        success: function (data) {
            var pathParts = window.location.pathname.split("/");
            moveToNext(pathParts[pathParts.length - 1]);
        },
        failure: function (err) {
            alert(err);
        }
    });
});

$('input[type="radio"]').change(function () {  //shortcut for .on('change', function() {
    console.log('radio button changed');
    checkForChecked();
});

function checkForChecked() {
    var yes = $('.yes:checked').length;
    var no = $('.no:checked').length;
    if (yes + no == 2) {
        $('#next-btn').toggleClass('not-active');
    }
}

function moveToNext(current) {
    var index = parseInt(current) + 1;
    //$.ajax({
    //    type: 'GET',
    //    url: '/survey/' + index,
    //    async: false
    //})
    window.location.href = '/survey/' + index;
}