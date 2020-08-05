
$(document).ready(function () {
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "Cpf": $(this).find("#Cpf").val().replace(/[^0-9]+/g, ''),
                "Beneficiarios": tableToJson()
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();
                }
        });
    })
    
})

function tableToJson() {
    var beneficiarios = [];
    var $headers = $("th");
    var $rows = $("tbody tr").each(function (index) {
        $cells = $(this).find("td");
        beneficiarios[index] = {};
        $cells.each(function (cellIndex) {
            if (cellIndex <= 2) {
                beneficiarios[index][$($headers[cellIndex]).html()] = $(this).html();
            }
        });
    });
    return beneficiarios;
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

var counter = 1;
$(function () {
    $('#AddBnf').click(function () {
        $('<tr id="tablerow' + counter + '">' +
            '<td style="display:none;" >0</td>' +
            '<td>' + $('#CpfBnf').val() +
            '</td>' +
            '<td>' + $('#NomeBnf').val() +
            '</td>' +
            '<td>' +
            '<button type="button" class="btn btn-primary" onclick="editarTr(' + counter + ');">Alterar</button>' +
            '</td>' +
            '<td>' +
            '<button type="button" class="btn btn-primary" onclick="removeTr(' + counter + ');">Excluir</button>' +
            '</td>' +
            '</tr>').appendTo('#submissionTable tbody');
        counter++;
        $('#CpfBnf').val("")
        $('#NomeBnf').val("")
        return false;
    });
});

function removeTr(index) {
    if (counter > 1) {
        $('#tablerow' + index).remove();
        counter--;
    }
    return false;
}

function editarTr(index) {
    if (counter > 1) {
        $('#tablerow' + index).each(function () {
            $('#CpfBnf').val( $(this).find("td:nth-child(2)").text())
            $('#NomeBnf').val($(this).find("td:nth-child(3)").text())
            $('#tablerow' + index).remove();
        })
        counter--;
    }
    return false;
}
