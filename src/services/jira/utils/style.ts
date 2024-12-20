export const STATUS_COLORS = {
  'open': 'bg-gray-100 text-gray-800',
  'to do': 'bg-gray-100 text-gray-800',
  'in progress': 'bg-blue-100 text-blue-800',
  'done': 'bg-green-100 text-green-800',
  'blocked': 'bg-red-100 text-red-800',
  'on hold': 'bg-red-100 text-red-800'
} as const;

export const PRIORITY_STYLES = {
  'highest': { color: 'text-red-500', icon: 'AlertTriangle' },
  'high': { color: 'text-orange-500', icon: 'ArrowUp' },
  'medium': { color: 'text-yellow-500', icon: 'AlertCircle' },
  'low': { color: 'text-blue-500', icon: 'ArrowDown' },
  'lowest': { color: 'text-gray-400', icon: 'Minus' }
} as const;

export function getStatusColor(status: string): string {
  return STATUS_COLORS[status.toLowerCase()] || STATUS_COLORS['open'];
}

export function getPriorityStyle(priority: string) {
  const style = PRIORITY_STYLES[priority.toLowerCase()] || PRIORITY_STYLES['lowest'];
  return {
    name: style.icon,
    color: style.color
  };
}