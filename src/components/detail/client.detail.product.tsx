'use client';
import React, { useState, useCallback } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import Modal from 'react-modal';

interface INote {
    noteContent: string;
    setNoteContent: (note: string) => void;
}

const TakeNotePage: React.FC<INote> = ({ noteContent, setNoteContent }) => {
    const [modalNote, setModalNote] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalAnimation, setModalAnimation] = useState('translate-y-full');

    const handleOpenModal = () => {
        setIsOpenModal(true);
        // Thêm delay để animation hoạt động mượt mà
        setTimeout(() => {
            setModalAnimation('translate-y-0');
        }, 10);
    };

    const handleCloseModal = useCallback(() => {
        setModalAnimation('translate-y-full');
        // Đợi animation hoàn thành rồi mới đóng modal
        setTimeout(() => {
            setIsOpenModal(false);
        }, 200);
    }, []);

    const handleCompleteNote = (value: string) => {
        setModalAnimation('translate-y-full');
        setTimeout(() => {
            setIsOpenModal(false);
            setNoteContent(value);
        }, 200);
    };

    return (
        <div className="mt-10">
            <div className="flex items-center text-start gap-2">
                <AiOutlineCalendar />
                <p
                    className="text-xs cursor-pointer"
                    onClick={() => handleOpenModal()}
                >
                    {noteContent ? noteContent : 'Ghi chú'}
                </p>
            </div>

            {/* Modal */}
            <Modal
                isOpen={isOpenModal}
                onRequestClose={handleCloseModal}
                className={`fixed bottom-0 left-0 w-full bg-white rounded-t-lg p-4 transform transition-transform duration-200 ease-in-out ${modalAnimation}`}
                overlayClassName="fixed inset-0 bg-black transition-opacity duration-200 ease-in-out bg-opacity-50 z-50"
                ariaHideApp={false}
            >
                <div className="flex justify-between items-center">
                    <button
                        className="text-gray-600"
                        onClick={handleCloseModal}
                    >
                        Hủy
                    </button>
                    <h3 className="text-lg font-medium">Thêm ghi chú</h3>
                    <button
                        className="text-amber-500"
                        onClick={() => handleCompleteNote(modalNote)}
                    >
                        Xong
                    </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    Việc thực hiện yêu cầu theo ghi chú sẽ tùy thuộc vào quán.
                </p>
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-2 mt-4 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    rows={4}
                    maxLength={100}
                    value={modalNote}
                    onChange={(e) => setModalNote(e.target.value)}
                    autoFocus
                />
                <div className="text-right text-sm text-gray-400 mt-2">
                    {modalNote.length}/100
                </div>
            </Modal>
        </div>
    );
};

export default TakeNotePage;