import { useState, createContext } from 'react';
import type { Client, Project, Task, Comment } from './../types';
import { initialClients, initialComments, initialProjects, initialTasks } from '../data/mockData';

export const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const crudOperations = (setter: Function, collectionName: string) => ({
    add: (item: any) => setter((prev: any[]) => [...prev, { ...item, id: `${collectionName}${Date.now()}` }]),
    update: (id: string, updatedItem: any) => setter((prev: any[]) => prev.map(item => (item.id === id ? { ...item, ...updatedItem } : item))),
    remove: (id: string) => setter((prev: any[]) => prev.filter(item => item.id !== id)),
  });

  const clientActions = crudOperations(setClients, 'cli');
  const projectActions = crudOperations(setProjects, 'proj');
  const taskActions = crudOperations(setTasks, 'task');
  const commentActions = crudOperations(setComments, 'com');
  
  const deleteClientAndRelated = (clientId: string) => {
    const projectsToDelete = projects.filter(p => p.clientId === clientId);
    projectsToDelete.forEach(p => deleteTaskAndRelated(p.id));
    setProjects(prev => prev.filter(p => p.clientId !== clientId));
    clientActions.remove(clientId);
  };

  const deleteProjectAndRelated = (projectId: string) => {
    deleteTaskAndRelated(projectId);
    projectActions.remove(projectId);
  };

  const deleteTaskAndRelated = (id: string) => {
    const tasksToDelete = tasks.filter(t => t.projectId === id || t.id === id);
    tasksToDelete.forEach(t => {
      setComments(prev => prev.filter(c => c.taskId !== t.id));
    });
    setTasks(prev => prev.filter(t => t.projectId !== id && t.id !== id));
    if (tasks.some(t => t.id === id)) {
        taskActions.remove(id);
    }
  };

  const value = {
    clients, projects, tasks, comments,
    clientActions, projectActions, taskActions, commentActions,
    deleteClientAndRelated, deleteProjectAndRelated, deleteTaskAndRelated
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};