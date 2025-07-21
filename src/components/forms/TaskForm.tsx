import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import type { Task } from '../../types';

export const TaskForm = ({ task, onDone, projectId }: { task?: Task, onDone: () => void, projectId: string }) => {
    const { taskActions } = useContext(AppContext);
    const [title, setTitle] = useState(task?.title || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const taskData = { title, projectId, completed: task?.completed || false };
        if (task) {
            taskActions.update(task.id, taskData);
        } else {
            taskActions.add(taskData);
        }
        onDone();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Título da Tarefa</label>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="secondary" onClick={onDone}>Cancelar</Button>
                <Button type="submit">{task ? 'Atualizar' : 'Adicionar'} Tarefa</Button>
            </div>
        </form>
    );
};