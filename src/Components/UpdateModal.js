import React from 'react'
import $ from 'jquery'
import ReactDom from 'react-dom'
import './UpdateModal.css'
export default function DeleteModal({ open, children, onClose, ToUpdate }) {
    const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        padding: '50px',
        zIndex: 1000,
        borderRadius: '5rem',
        width: '400px'
    }

    const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
    }
    if (!open) { return null }

    $('#btn_modal_up').removeAttr('disabled');
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />
            <div className="container-md align-content-center " style={MODAL_STYLES}>
                <label id="q_label_up"> Enter Message To Update </label>
                <br />
                <textarea type="text" id="Update_message_input" />
                <button id="btn_modal_up" className="btn-outline-success" onClick={() => { ToUpdate($('#Update_message_input').val()); onClose() }}>Update Message</button>
                <button id="btn_modal_up" className="btn-outline-danger" onClick={() => { onClose() }}>close</button>

            </div>
        </>,
        document.getElementById('portal')
    )
}


