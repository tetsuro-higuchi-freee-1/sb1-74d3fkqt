import React from 'react';
import * as Icons from 'lucide-react';
import { getPriorityIcon } from '../../services/jira/utils';

interface JiraIssuePriorityProps {
  priority: string;
}

export function JiraIssuePriority({ priority }: JiraIssuePriorityProps) {
  const { name, color } = getPriorityIcon(priority);
  const Icon = Icons[name as keyof typeof Icons];

  return (
    <div className="flex items-center space-x-1">
      <Icon className={`h-4 w-4 ${color}`} />
      <span className="text-sm text-gray-500">{priority}</span>
    </div>
  );
}