import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useUsers } from '../../contexts/UserContext';
import type { CommentFormData, MentionSuggestion } from '../../types/comment';

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const { users } = useUsers();
  const [content, setContent] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [mentions, setMentions] = useState<string[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mentionsRef = useRef<HTMLDivElement>(null);

  const getMentionSuggestions = (): MentionSuggestion[] => {
    if (!mentionSearch) return [];
    return users
      .filter(user => 
        user.name.toLowerCase().includes(mentionSearch.toLowerCase()) ||
        getRoleLabel(user.role).toLowerCase().includes(mentionSearch.toLowerCase())
      )
      .map(user => ({
        id: user.id,
        name: user.name,
        role: user.role
      }));
  };

  const getRoleLabel = (role: string): string => {
    switch (role) {
      case 'sales': return '営業担当';
      case 'product_manager': return 'プロダクトマネージャー';
      case 'product_owner': return 'プロダクトオーナー';
      default: return role;
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    const position = e.target.selectionStart || 0;
    setCursorPosition(position);

    // Check if we should show mention suggestions
    const lastChar = newContent.charAt(position - 1);
    const textBeforeCursor = newContent.substring(0, position);
    const matches = textBeforeCursor.match(/@(\w*)$/);

    if (lastChar === '@' || matches) {
      setShowMentions(true);
      setMentionSearch(matches ? matches[1] : '');
    } else {
      setShowMentions(false);
      setMentionSearch('');
    }
  };

  const insertMention = (suggestion: MentionSuggestion) => {
    const textBeforeCursor = content.substring(0, cursorPosition);
    const textAfterCursor = content.substring(cursorPosition);
    const mentionText = `@${suggestion.name} `;
    
    // Find the position where the @ symbol starts
    const atSymbolPos = textBeforeCursor.lastIndexOf('@');
    
    // Combine the text before @, the mention, and the text after cursor
    const newContent = 
      textBeforeCursor.substring(0, atSymbolPos) + 
      mentionText + 
      textAfterCursor;

    setContent(newContent);
    setMentions([...mentions, suggestion.id]);
    setShowMentions(false);
    setMentionSearch('');

    // Focus back on input
    if (inputRef.current) {
      inputRef.current.focus();
      const newCursorPos = atSymbolPos + mentionText.length;
      inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (content.trim()) {
      onSubmit({ content, mentions });
      setContent('');
      setMentions([]);
    }
  };

  // Close mentions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mentionsRef.current && !mentionsRef.current.contains(event.target as Node)) {
        setShowMentions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative mt-4">
      <div className="flex flex-col space-y-2">
        <textarea
          ref={inputRef}
          value={content}
          onChange={handleInput}
          placeholder="コメントを入力... (@でメンションを追加)"
          className="w-full min-h-[100px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        
        {showMentions && (
          <div
            ref={mentionsRef}
            className="absolute z-10 w-64 mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-48 overflow-y-auto"
            style={{ top: '100%' }}
          >
            {getMentionSuggestions().map(suggestion => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => insertMention(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center justify-between"
              >
                <span className="font-medium">{suggestion.name}</span>
                <span className="text-sm text-gray-500">
                  {getRoleLabel(suggestion.role)}
                </span>
              </button>
            ))}
            {getMentionSuggestions().length === 0 && (
              <div className="px-4 py-2 text-sm text-gray-500">
                該当するユーザーが見つかりません
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  );
}