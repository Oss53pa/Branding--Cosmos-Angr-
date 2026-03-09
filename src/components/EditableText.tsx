import React, { useRef, useEffect, useState } from 'react';
import { useEdit } from './EditContext';

interface EditableTextProps {
  storageKey: string;
  defaultValue: string;
  className?: string;
  tag?: 'div' | 'span' | 'p' | 'em';
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  storageKey,
  defaultValue,
  className = '',
  tag: Tag = 'div',
  multiline = false,
}) => {
  const { isEditing, getValue, setValue } = useEdit();
  const ref = useRef<HTMLElement>(null);
  const [text, setText] = useState(() => getValue(storageKey, defaultValue));

  useEffect(() => {
    setText(getValue(storageKey, defaultValue));
  }, [storageKey, defaultValue, getValue]);

  const handleBlur = () => {
    const newText = ref.current?.innerText || '';
    if (newText !== defaultValue) {
      setValue(storageKey, newText);
    }
    setText(newText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      ref.current?.blur();
    }
  };

  if (!isEditing) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag
      ref={ref as any}
      className={`${className} outline-none ring-1 ring-gold/30 rounded px-1 -mx-1 cursor-text hover:ring-gold/60 focus:ring-gold transition-all`}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {text}
    </Tag>
  );
};

export default EditableText;
