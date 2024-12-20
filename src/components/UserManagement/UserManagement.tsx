import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { UserList } from './UserList';
import { UserForm } from './UserForm';
import { Modal } from '../Modal/Modal';
import { useUsers } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';
import { useOperationLog } from '../../contexts/OperationLogContext';
import type { User, UserFormData } from '../../types/user';
import type { FieldChange } from '../../types/operationLog';

export function UserManagement() {
  const { addUser, updateUser, deleteUser } = useUsers();
  const { user: currentUser } = useAuth();
  const { addLog } = useOperationLog();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: UserFormData & { isAdmin: boolean }) => {
    if (editingUser) {
      const changes: FieldChange[] = [];
      Object.entries(data).forEach(([key, value]) => {
        const oldValue = editingUser[key as keyof User];
        if (oldValue !== value) {
          changes.push({
            field: key as keyof User,
            oldValue: String(oldValue),
            newValue: String(value)
          });
        }
      });

      updateUser(editingUser.id, { ...data });
      addLog(
        'update',
        'user',
        editingUser.id,
        editingUser.name,
        changes
      );
    } else {
      const newUser = addUser({ ...data });
      addLog(
        'create',
        'user',
        newUser.id,
        newUser.name,
        Object.entries(data).map(([key, value]) => ({
          field: key as keyof User,
          oldValue: null,
          newValue: String(value)
        }))
      );
    }
    setIsModalOpen(false);
  };

  const handleDelete = (userId: string, userName: string) => {
    deleteUser(userId);
    addLog(
      'delete',
      'user',
      userId,
      userName,
      []
    );
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          メンバーを追加
        </button>
      </div>

      <UserList onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'メンバーを編集' : 'メンバーを追加'}
      >
        <UserForm
          user={editingUser || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
          currentUserIsAdmin={currentUser?.isAdmin || false}
        />
      </Modal>
    </div>
  );
}