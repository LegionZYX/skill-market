#!/usr/bin/env python3
"""
JSON 转 CSV 转换工具

功能:
- 将 skills.json 转换为 skills.csv
- 支持自定义字段导出
- 保持数据一致性
"""

import json
import csv
from pathlib import Path
from typing import List, Dict


def json_to_csv(
    json_path: str = "data/skills.json",
    csv_path: str = "data/skills.csv"
):
    """将 JSON 转换为 CSV"""
    
    # 读取 JSON
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    skills = data.get('skills', [])
    
    if not skills:
        print("❌ 没有找到技能数据")
        return False
    
    # CSV 列定义
    fieldnames = [
        'ID', '名称', '分类', '子分类', '描述', '版本', '作者',
        '标签', '优先级', '平台', '评分', '下载量', '状态'
    ]
    
    # 写入 CSV
    with open(csv_path, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for skill in skills:
            writer.writerow({
                'ID': skill.get('id', ''),
                '名称': skill.get('name', ''),
                '分类': skill.get('category', ''),
                '子分类': skill.get('subcategory', ''),
                '描述': skill.get('description', ''),
                '版本': skill.get('version', ''),
                '作者': skill.get('author', ''),
                '标签': '|'.join(skill.get('tags', [])),
                '优先级': skill.get('priority', ''),
                '平台': '|'.join(skill.get('platforms', [])),
                '评分': skill.get('rating', 0),
                '下载量': skill.get('downloads', 0),
                '状态': skill.get('status', '')
            })
    
    print(f"✅ 成功转换 {len(skills)} 个技能")
    print(f"📄 CSV 文件: {csv_path}")
    return True


def csv_to_json(
    csv_path: str = "data/skills.csv",
    json_path: str = "data/skills.json"
):
    """将 CSV 转换为 JSON"""
    
    # 读取现有 JSON (保留 metadata)
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        data = {
            "version": "1.0.0",
            "lastUpdated": "",
            "maintainer": "OpenClaw Community",
            "skills": [],
            "categories": []
        }
    
    # 读取 CSV
    skills = []
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            skill = {
                'id': row['ID'],
                'name': row['名称'],
                'category': row['分类'],
                'subcategory': row['子分类'],
                'description': row['描述'],
                'version': row['版本'],
                'author': row['作者'],
                'tags': row['标签'].split('|') if row['标签'] else [],
                'priority': row['优先级'],
                'platforms': row['平台'].split('|') if row['平台'] else [],
                'rating': float(row['评分']) if row['评分'] else 0,
                'downloads': int(row['下载量']) if row['下载量'] else 0,
                'status': row['状态']
            }
            skills.append(skill)
    
    data['skills'] = skills
    
    # 写入 JSON
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"✅ 成功转换 {len(skills)} 个技能")
    print(f"📄 JSON 文件: {json_path}")
    return True


def main():
    import argparse
    from datetime import datetime
    
    parser = argparse.ArgumentParser(description='JSON/CSV 格式转换')
    parser.add_argument(
        '--to-csv',
        action='store_true',
        help='JSON → CSV'
    )
    parser.add_argument(
        '--to-json',
        action='store_true',
        help='CSV → JSON'
    )
    parser.add_argument(
        '--json-path',
        default='data/skills.json',
        help='JSON 文件路径'
    )
    parser.add_argument(
        '--csv-path',
        default='data/skills.csv',
        help='CSV 文件路径'
    )
    
    args = parser.parse_args()
    
    if args.to_csv:
        json_to_csv(args.json_path, args.csv_path)
    elif args.to_json:
        csv_to_json(args.csv_path, args.json_path)
    else:
        # 默认: JSON → CSV
        json_to_csv(args.json_path, args.csv_path)


if __name__ == "__main__":
    main()
