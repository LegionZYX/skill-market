#!/usr/bin/env python3
"""
统计分析工具

功能:
- 生成统计报告
- 更新 stats.md
- 数据可视化(可选)
"""

import json
from pathlib import Path
from collections import defaultdict
from datetime import datetime


class StatsGenerator:
    def __init__(self, data_path: str = "data/skills.json"):
        self.data_path = Path(data_path)
        self.data = self.load_data()
        self.skills = self.data.get('skills', [])
    
    def load_data(self) -> dict:
        """加载数据"""
        with open(self.data_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def generate_stats(self) -> dict:
        """生成统计数据"""
        stats = {
            "total": len(self.skills),
            "by_category": defaultdict(lambda: {"count": 0, "downloads": 0, "rating": []}),
            "by_priority": defaultdict(int),
            "by_status": defaultdict(int),
            "by_platform": defaultdict(int),
            "top_downloads": [],
            "top_rated": [],
            "platforms": set()
        }
        
        for skill in self.skills:
            # 按分类统计
            cat = skill['category']
            stats["by_category"][cat]["count"] += 1
            stats["by_category"][cat]["downloads"] += skill.get('downloads', 0)
            stats["by_category"][cat]["rating"].append(skill.get('rating', 0))
            
            # 按优先级统计
            stats["by_priority"][skill.get('priority', 'P0')] += 1
            
            # 按状态统计
            stats["by_status"][skill.get('status', 'stable')] += 1
            
            # 平台统计
            for platform in skill.get('platforms', []):
                stats["by_platform"][platform] += 1
                stats["platforms"].add(platform)
        
        # 计算平均评分
        for cat, data in stats["by_category"].items():
            ratings = data["rating"]
            data["avg_rating"] = sum(ratings) / len(ratings) if ratings else 0
            del data["rating"]  # 删除原始评分列表
        
        # Top 10 下载量
        stats["top_downloads"] = sorted(
            self.skills,
            key=lambda x: x.get('downloads', 0),
            reverse=True
        )[:10]
        
        # Top 10 评分
        stats["top_rated"] = sorted(
            self.skills,
            key=lambda x: x.get('rating', 0),
            reverse=True
        )[:10]
        
        return stats
    
    def generate_markdown(self, stats: dict) -> str:
        """生成 Markdown 报告"""
        md = f"""# Skill Market 统计信息

**最后更新**: {datetime.now().strftime('%Y-%m-%d')}

## 📊 总体统计

| 指标 | 数值 |
|------|------|
| 总技能数 | {stats['total']} |
| 稳定版本 | {stats['by_status']['stable']} |
| 开发中 | {stats['by_status'].get('dev', 0)} |
| 总下载量 | {sum(s.get('downloads', 0) for s in self.skills):,}+ |
| 平均评分 | {sum(s.get('rating', 0) for s in self.skills) / len(self.skills):.2f} ⭐ |

## 📁 分类统计

| 分类 | 技能数 | 下载量 | 平均评分 |
|------|--------|--------|----------|
"""
        
        category_names = {
            'office': '办公协作',
            'ecommerce': '电商运营',
            'service': '客户服务',
            'data': '数据分析',
            'marketing': '营销推广',
            'hr': '人力资源',
            'finance': '财务管理',
            'devops': '开发运维',
            'legal': '法务合规'
        }
        
        for cat, data in sorted(stats['by_category'].items()):
            name = category_names.get(cat, cat)
            md += f"| {name} | {data['count']} | {data['downloads']:,} | {data['avg_rating']:.2f} |\n"
        
        md += """
## 🔥 热门技能 TOP 10

| 排名 | 技能名称 | 分类 | 下载量 | 评分 |
|------|----------|------|--------|------|
"""
        
        for i, skill in enumerate(stats['top_downloads'], 1):
            md += f"| {i} | {skill['name']} | {skill['category']} | {skill['downloads']:,} | {skill['rating']} ⭐ |\n"
        
        md += f"""
## 🏢 平台覆盖 ({len(stats['platforms'])} 个)

"""
        
        # 按平台出现次数排序
        sorted_platforms = sorted(
            stats['by_platform'].items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        for platform, count in sorted_platforms[:10]:
            md += f"- {platform} ({count} 个技能)\n"
        
        md += """
## 📈 趋势分析

### 优先级分布

"""
        
        for priority in ['P0', 'P1', 'P2', 'P3']:
            count = stats['by_priority'].get(priority, 0)
            percentage = (count / stats['total'] * 100) if stats['total'] > 0 else 0
            md += f"- **{priority}**: {count} skills ({percentage:.1f}%)\n"
        
        md += f"""
### 评分分布

"""
        
        rating_ranges = {
            '4.8-5.0': 0,
            '4.5-4.7': 0,
            '4.0-4.4': 0,
            '<4.0': 0
        }
        
        for skill in self.skills:
            rating = skill.get('rating', 0)
            if rating >= 4.8:
                rating_ranges['4.8-5.0'] += 1
            elif rating >= 4.5:
                rating_ranges['4.5-4.7'] += 1
            elif rating >= 4.0:
                rating_ranges['4.0-4.4'] += 1
            else:
                rating_ranges['<4.0'] += 1
        
        for range_name, count in rating_ranges.items():
            md += f"- {range_name} ⭐: {count} skills\n"
        
        md += f"""
---

**数据来源**: OpenClaw Skill Market
**统计时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**下次更新**: {(datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d')}
"""
        
        return md
    
    def save_report(self, output_path: str = "data/stats.md"):
        """保存统计报告"""
        from datetime import timedelta
        
        stats = self.generate_stats()
        markdown = self.generate_markdown(stats)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(markdown)
        
        print(f"✅ 统计报告已生成: {output_path}")
        print(f"📊 总技能数: {stats['total']}")
        print(f"🏢 覆盖平台: {len(stats['platforms'])}")


def main():
    import argparse
    
    parser = argparse.ArgumentParser(description='生成统计报告')
    parser.add_argument(
        '--data',
        default='data/skills.json',
        help='数据文件路径'
    )
    parser.add_argument(
        '--output',
        default='data/stats.md',
        help='输出文件路径'
    )
    
    args = parser.parse_args()
    
    generator = StatsGenerator(args.data)
    generator.save_report(args.output)


if __name__ == "__main__":
    main()
