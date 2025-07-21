import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export const CommentForm = ({ onDone, taskId }: { onDone: () => void, taskId: string }) => {
    const { commentActions } = useContext(AppContext);
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const commentData = { text, taskId, author, timestamp: new Date().toISOString() };
        commentActions.add(commentData);
        onDone();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Seu Nome</label>
                <Input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Comentário</label>
                <Input type="text" value={text} onChange={(e) => setText(e.target.value)} required />
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="secondary" onClick={onDone}>Cancelar</Button>
                <Button type="submit">Adicionar Comentário</Button>
            </div>
        </form>
    );
};