import React from 'react';
import { Switch } from '../ui/Switch';
import type { FieldRequirement } from '../../db/models/FieldRequirement';

interface FieldRequirementsListProps {
  requirements: FieldRequirement[];
  onToggle: (id: string, isRequired: boolean) => void;
}

const fieldLabels: Record<string, string> = {
  name: 'プロダクト名',
  majorCategory: '機能大カテゴリ',
  minorCategory: '機能小カテゴリ',
  featureName: '機能名称',
  description: '機能概要',
  developmentStatus: '開発ステータス',
  isPublic: '顧客公開可否',
  targetIndustry: 'ターゲット業種',
  targetScale: 'ターゲット規模',
  customerImpact: '顧客インパクト',
  releaseDate: 'リリース予定日',
  actualReleaseDate: '実際のリリース日',
  projectManager: '担当PM',
  productMarketing: '担当PMM',
  documentationUrl: 'ドキュメントURL',
  figmaUrl: 'FigmaURL'
};

export function FieldRequirementsList({ requirements, onToggle }: FieldRequirementsListProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {requirements.map((requirement) => (
          <div
            key={requirement.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                {fieldLabels[requirement.fieldName]}
              </h4>
              <p className="text-sm text-gray-500">
                {requirement.isRequired ? '必須' : '任意'}
              </p>
            </div>
            <Switch
              checked={requirement.isRequired}
              onCheckedChange={(checked) => onToggle(requirement.id, checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}