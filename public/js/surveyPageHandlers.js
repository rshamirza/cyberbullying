$(document).ready(checkForChecked());

$('#next-btn').on('click', function () {
    var params = {};
    $(':checked').each(function () {
        params[$(this).attr('name')] = $(this).val();
    });
    params['profile_owner_id'] = document.getElementsByName('profile_owner_id')[0].value;
    params['caption_time'] = document.getElementsByName('caption_time')[0].value;
    $.ajax({
        type: 'POST',
        url: '/results',
        data: params,
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            alert(data);
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
    console.log('hello');
    var yes = $('.yes:checked').length;
    var no = $('.no:checked').length;
    if (yes + no == 2) {
        $('#next-btn').toggleClass('not-active');
    }
}