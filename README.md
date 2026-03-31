@media (max-width: 768px) {

    table, thead, tbody, th, td, tr {
        display: block;
    }

    thead {
        display: none;
    }

    tr {
        margin-bottom: 15px;
        background: rgba(255,255,255,0.08);
        padding: 10px;
        border-radius: 10px;
    }

    td {
        border: none;
        padding: 8px 0;
    }

    td:before {
        font-weight: bold;
        display: block;
        color: #00d4ff;
    }

    td:nth-child(1):before { content: "Nome"; }
    td:nth-child(2):before { content: "Idade"; }
    td:nth-child(3):before { content: "Motivo"; }
    td:nth-child(4):before { content: "Ações"; }
}
✍️ Autor

Fábio Costa
BY FABIO COSTA • lobofc_
