$(document).ready(checkForChecked());

$('#next-btn').on('click', function () {
    var params = {};
    $(':checked').each(function () {
        params[$(this).attr('name')] = $(this).val();
    });
    var paramsString = JSON.stringify(params);
    $.ajax({
        type: 'POST',
        url: '/results',
        data: paramsString,
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            goToNext();
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