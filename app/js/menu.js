'use strict'

const remote = require('electron').remote
const app = remote.app
const Menu = remote.Menu

const template = [
    {
    label: 'Start',
    submenu: [
        {
            label: 'Exit',
            click: function() {
                app.quit()
            }
        }
    ]
    },
    {
        label: 'Evaluation',

    },
    {
        label: 'Help',
        click: function() {
            alert("clicked");
        }

    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
