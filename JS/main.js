jQuery(function ($) {

    $.fn.formBackUp = function () {
        if (!localStorage) {
            return false;
        }

        //storage of the form (s)
        let forms = this;
        //storage datas
        let datas = {};
        let ls = false;
        //url check
        datas.href = window.location.href;
        //recovering storage storage information
        if (localStorage['formBackUp']) {
            ls = JSON.parse(localStorage['formBackUp']);
            if (ls.href === datas.href) {
                for (let id in ls) {
                    if (id !== "href") {
                        $('#' + id).val(ls[id]);
                        datas[id] = ls[id];
                    }
                }
            }
        }
        forms.find('input, label').keyup(function (e) {
            datas[$(this).attr('id')] = $(this).val();
            localStorage.setItem('formBackUp', JSON.stringify(datas));
            console.log(localStorage)
        });

        forms.submit(function (e) {
            //delete local storage:
            //localStorage.removeItem('formBackUp');
            alert('votre vélo à été réserver');
        })

    };

    $('form').formBackUp();

});