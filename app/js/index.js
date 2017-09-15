const mysqlHandler = new MysqlHandler();

$(document).ready(() => {
    insertRequestTypes();
    insertNotes();

    $('#req-type-selection').change(() => {
        $('#req-description').html($('#req-type-selection option:selected').attr('data-description'))
    })

    $('#datepicker').val(new Date().toISOString().split('T')[0])
    $('#newNote').click(() => {
        $("#noteModal").modal('show');
    })
})

function insertRequestTypes() {
    mysqlHandler.getRequestTypes((data) => {
        $('#req-type-selection').html(data);
    });
}

function insertNotes() {
    mysqlHandler.getNotes((data) => {
        $('#notes').html(data);
    });
}

function saveNote() {
    let note = $('#newNoteEntry').val()
    mysqlHandler.saveNote(note);
    $('#newNoteEntry').val("")
    insertNotes();
    $("#noteModal").modal('hide');
}

function deleteNote(id) {
    if (confirm("Eintrag löschen?")) {
        mysqlHandler.deleteNote(id);
        insertNotes();
    }
}