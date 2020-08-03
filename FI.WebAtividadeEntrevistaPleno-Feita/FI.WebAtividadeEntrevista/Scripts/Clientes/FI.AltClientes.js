var idCliente;
var counter = 1;
var IdBeneficiario;
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #Cpf').val(obj.Cpf);
        idCliente = obj.Id;
        GetData();
    }

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
                window.location.href = urlRetorno;
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

function GetData () {
    $.ajax({
        url: '/Beneficiario/Lista',
        method: "POST",
        data: {
            IdCliente: idCliente
        },
        success: 
            function (r) {
                updateTable(r)
        }
    });
}


function updateTable(jsonData) {
        $.each(jsonData, function (key, val) {
            var tr = '<tr id="tablerow' + counter + '">';
            tr += '<td>' + val.Id + '</td>';
            tr += '<td>' + val.Cpf + '</td>';
            tr += '<td>' + val.Nome + '</td>';
            tr += '<td>' + '<button type="button" class="btn btn-primary" onclick="editarTr(' + counter + ');">Alterar</button>' + '</td>';
            tr += '<td>' + '<button type="button" class="btn btn-primary" onclick="removeTr(' + counter + ');">Excluir</button>' + '</td>';
            tr += '</tr>';
            $('tbody').append(tr);
            counter++;
    });
};


// Editar e Excluir 

$(function () {
    $('#AddBnf').click(function () {
        $('<tr id="tablerow' + counter + '">' +
            '<td> '+ IdBeneficiario + '</td>' +
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
        IdBeneficiario = 0
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
            $('#CpfBnf').val($(this).find("td:nth-child(2)").text())
            $('#NomeBnf').val($(this).find("td:nth-child(3)").text())
            IdBeneficiario = $(this).find("td:nth-child(1)").text()
            $('#tablerow' + index).remove();
        })
        counter--;
    }
    return false;
}
    