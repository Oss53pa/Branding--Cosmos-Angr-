import React from 'react';
import { Pencil, Check } from 'lucide-react';
import { useEdit } from './EditContext';

const EditToggle: React.FC = () => {
  const { isEditing, toggleEditing } = useEdit();

  return (
    <button
      onClick={toggleEditing}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg transition-all text-sm font-medium ${
        isEditing
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-navy text-white hover:bg-navy/90'
      }`}
      title={isEditing ? 'Terminer les modifications' : 'Modifier le contenu'}
    >
      {isEditing ? (
        <>
          <Check size={16} />
          <span>Terminer</span>
        </>
      ) : (
        <>
          <Pencil size={16} />
          <span>Modifier</span>
        </>
      )}
    </button>
  );
};

export default EditToggle;
