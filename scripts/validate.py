#!/usr/bin/env python3
"""
Skill Market 数据验证工具

功能:
- 验证 skills.json 数据完整性
- 检查必需字段
- 验证数据格式
- 生成验证报告
"""

import json
import sys
from pathlib import Path
from typing import Dict, List, Any
from datetime import datetime


class SkillValidator:
    def __init__(self, data_path: str = "data/skills.json"):
        self.data_path = Path(data_path)
        self.errors = []
        self.warnings = []
        self.stats = {
            "total": 0,
            "valid": 0,
            "invalid": 0,
            "missing_fields": 0,
            "format_errors": 0
        }
    
    def load_data(self) -> Dict:
        """加载数据文件"""
        try:
            with open(self.data_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            self.errors.append(f"数据文件不存在: {self.data_path}")
            return {}
        except json.JSONDecodeError as e:
            self.errors.append(f"JSON 格式错误: {e}")
            return {}
    
    def validate_skill(self, skill: Dict, index: int) -> bool:
        """验证单个技能"""
        is_valid = True
        
        # 必需字段
        required_fields = [
            'id', 'name', 'category', 'subcategory',
            'description', 'version', 'author', 'tags',
            'priority', 'platforms', 'useCases', 'rating',
            'downloads', 'status'
        ]
        
        for field in required_fields:
            if field not in skill or not skill[field]:
                self.errors.append(
                    f"技能 #{index} ({skill.get('id', 'unknown')}): "
                    f"缺少必需字段 '{field}'"
                )
                self.stats["missing_fields"] += 1
                is_valid = False
        
        # 字段格式验证
        if 'id' in skill:
            # ID 格式: 小写字母、数字、连字符
            if not skill['id'].replace('-', '').replace('_', '').isalnum():
                self.warnings.append(
                    f"技能 {skill['id']}: ID 格式不规范 "
                    f"(建议: 小写字母、数字、连字符)"
                )
        
        if 'rating' in skill:
            # 评分范围: 1.0 - 5.0
            if not (1.0 <= skill['rating'] <= 5.0):
                self.errors.append(
                    f"技能 {skill['id']}: 评分 {skill['rating']} 超出范围 (1.0-5.0)"
                )
                self.stats["format_errors"] += 1
                is_valid = False
        
        if 'priority' in skill:
            # 优先级: P0, P1, P2, P3
            if skill['priority'] not in ['P0', 'P1', 'P2', 'P3']:
                self.errors.append(
                    f"技能 {skill['id']}: 无效优先级 {skill['priority']} "
                    f"(必须是 P0-P3)"
                )
                is_valid = False
        
        if 'status' in skill:
            # 状态: stable, beta, dev
            if skill['status'] not in ['stable', 'beta', 'dev']:
                self.errors.append(
                    f"技能 {skill['id']}: 无效状态 {skill['status']} "
                    f"(必须是 stable/beta/dev)"
                )
                is_valid = False
        
        if 'category' in skill:
            # 分类: 必须在预定义列表中
            valid_categories = [
                'office', 'ecommerce', 'service', 'data',
                'marketing', 'hr', 'finance', 'devops', 'legal'
            ]
            if skill['category'] not in valid_categories:
                self.errors.append(
                    f"技能 {skill['id']}: 无效分类 {skill['category']} "
                    f"(必须是 {', '.join(valid_categories)})"
                )
                is_valid = False
        
        if 'version' in skill:
            # 版本格式: x.y.z
            import re
            if not re.match(r'^\d+\.\d+\.\d+$', skill['version']):
                self.warnings.append(
                    f"技能 {skill['id']}: 版本号格式不规范 "
                    f"{skill['version']} (建议: x.y.z)"
                )
        
        return is_valid
    
    def validate_all(self):
        """验证所有技能"""
        data = self.load_data()
        
        if not data or 'skills' not in data:
            print("❌ 无法加载数据或数据格式错误")
            return False
        
        skills = data['skills']
        self.stats["total"] = len(skills)
        
        print(f"📋 开始验证 {self.stats['total']} 个技能...\n")
        
        for i, skill in enumerate(skills):
            if self.validate_skill(skill, i):
                self.stats["valid"] += 1
                print(f"✅ {skill['id']}")
            else:
                self.stats["invalid"] += 1
                print(f"❌ {skill.get('id', f'skill-{i}')}")
        
        return self.stats["invalid"] == 0
    
    def print_report(self):
        """打印验证报告"""
        print("\n" + "="*60)
        print("📊 验证报告")
        print("="*60)
        
        print(f"\n总计: {self.stats['total']} 个技能")
        print(f"✅ 有效: {self.stats['valid']}")
        print(f"❌ 无效: {self.stats['invalid']}")
        print(f"⚠️  缺少字段: {self.stats['missing_fields']}")
        print(f"⚠️  格式错误: {self.stats['format_errors']}")
        
        if self.errors:
            print(f"\n❌ 错误 ({len(self.errors)}):")
            for error in self.errors[:10]:  # 只显示前10个
                print(f"  - {error}")
            if len(self.errors) > 10:
                print(f"  ... 还有 {len(self.errors) - 10} 个错误")
        
        if self.warnings:
            print(f"\n⚠️  警告 ({len(self.warnings)}):")
            for warning in self.warnings[:10]:  # 只显示前10个
                print(f"  - {warning}")
            if len(self.warnings) > 10:
                print(f"  ... 还有 {len(self.warnings) - 10} 个警告")
        
        print("\n" + "="*60)
        
        if self.stats["invalid"] == 0:
            print("✅ 所有技能验证通过!")
            return True
        else:
            print("❌ 验证失败,请修复上述错误")
            return False
    
    def save_report(self, output_path: str = "data/validation_report.json"):
        """保存验证报告"""
        report = {
            "timestamp": datetime.now().isoformat(),
            "stats": self.stats,
            "errors": self.errors,
            "warnings": self.warnings,
            "valid": self.stats["invalid"] == 0
        }
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"\n📄 验证报告已保存到: {output_path}")


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='验证 Skill Market 数据')
    parser.add_argument(
        '--data',
        default='data/skills.json',
        help='数据文件路径 (默认: data/skills.json)'
    )
    parser.add_argument(
        '--save-report',
        action='store_true',
        help='保存验证报告到文件'
    )
    parser.add_argument(
        '--fix',
        action='store_true',
        help='自动修复简单问题(未实现)'
    )
    
    args = parser.parse_args()
    
    validator = SkillValidator(args.data)
    validator.validate_all()
    
    if args.save_report:
        validator.save_report()
    
    success = validator.print_report()
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
