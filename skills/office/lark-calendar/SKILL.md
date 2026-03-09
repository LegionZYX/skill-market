# Lark Calendar Skill

飞书日历管理技能,帮助用户管理飞书日程、创建会议、查询安排等。

## 功能

- 📅 查询日程安排
- 📝 创建/编辑日程
- 🤝 创建会议邀请
- ⏰ 日程提醒
- 🔍 搜索日程
- 📊 日程统计分析

## 使用场景

### 1. 查询日程

**用户**: "帮我查一下明天的日程"

**Agent**:
```
查询飞书日历...
您明天(2026-03-10)的日程安排:

09:00-10:00  产品需求评审会议 (会议室A)
11:00-12:00  与客户张总电话会议
14:00-15:30  项目周会 (线上)
16:00-17:00  1对1 with leader

空闲时间: 10:00-11:00, 13:00-14:00, 17:00-18:00
```

### 2. 创建会议

**用户**: "帮我约一个明天下午3点的团队会议,时长1小时"

**Agent**:
```
正在创建会议...

✅ 会议已创建:
- 标题: 团队会议
- 时间: 2026-03-10 15:00-16:00
- 参会人: 产品团队(8人)
- 会议室: 会议室B(已预约)

已发送会议邀请给所有参会人。
```

### 3. 日程冲突检测

**用户**: "我想约周三上午10点和客户见面"

**Agent**:
```
检查日程冲突...

⚠️ 检测到时间冲突:
- 10:00-11:00 已有"技术评审会议"

建议时间段:
1. 09:00-10:00 (空闲)
2. 11:00-12:00 (空闲)
3. 14:00-15:00 (空闲)

需要我帮你调整到其他时间吗?
```

## 配置

### 环境变量

```bash
# 飞书应用凭证
LARK_APP_ID=cli_xxxxxxxxxxxx
LARK_APP_SECRET=xxxxxxxxxxxxxxxx

# 可选: 日历ID(默认使用主日历)
LARK_CALENDAR_ID=xxxxxxxxxxxxxxxx
```

### OpenClaw 配置

在 `~/.openclaw/workspace/skills/office/lark-calendar/config.json`:

```json
{
  "defaultReminders": [15, 30],
  "timezone": "Asia/Shanghai",
  "workingHours": {
    "start": "09:00",
    "end": "18:00"
  },
  "autoConflictDetection": true
}
```

## 工具

### lark_calendar_query

查询日历事件

**参数**:
- `start_time` (string): 开始时间 (ISO 8601)
- `end_time` (string): 结束时间 (ISO 8601)
- `calendar_id` (string, 可选): 日历ID

**示例**:
```json
{
  "start_time": "2026-03-10T00:00:00+08:00",
  "end_time": "2026-03-10T23:59:59+08:00"
}
```

### lark_calendar_create

创建日历事件

**参数**:
- `summary` (string): 事件标题
- `start_time` (string): 开始时间
- `end_time` (string): 结束时间
- `attendees` (array, 可选): 参会人列表
- `location` (string, 可选): 地点
- `description` (string, 可选): 描述
- `reminders` (array, 可选): 提醒时间(分钟)

**示例**:
```json
{
  "summary": "产品评审会议",
  "start_time": "2026-03-10T15:00:00+08:00",
  "end_time": "2026-03-10T16:00:00+08:00",
  "attendees": ["ou_xxx", "ou_yyy"],
  "location": "会议室A",
  "reminders": [15, 30]
}
```

### lark_calendar_update

更新日历事件

**参数**:
- `event_id` (string): 事件ID
- `summary` (string, 可选): 新标题
- `start_time` (string, 可选): 新开始时间
- `end_time` (string, 可选): 新结束时间
- ... (其他同 create)

### lark_calendar_delete

删除日历事件

**参数**:
- `event_id` (string): 事件ID

### lark_calendar_search

搜索日历事件

**参数**:
- `query` (string): 搜索关键词
- `start_time` (string, 可选): 开始时间范围
- `end_time` (string, 可选): 结束时间范围

### lark_calendar_check_conflicts

检查时间冲突

**参数**:
- `start_time` (string): 开始时间
- `end_time` (string): 结束时间
- `exclude_event_id` (string, 可选): 排除的事件ID(用于更新时)

## 最佳实践

### 1. 智能时间解析

```python
# 支持自然语言时间
"明天下午3点" → "2026-03-10T15:00:00+08:00"
"下周一上午" → "2026-03-16T09:00:00+08:00"
"30分钟后" → 动态计算
```

### 2. 自动参会人识别

```python
# 从上下文推断参会人
"团队会议" → 自动添加团队成员
"和客户张总" → 从通讯录查找张总
```

### 3. 会议室推荐

```python
# 根据参会人数和时间推荐会议室
if attendees_count <= 4:
    recommend_small_room()
elif attendees_count <= 10:
    recommend_medium_room()
else:
    recommend_large_room()
```

### 4. 日程优化建议

```python
# 分析日程并提供优化建议
if consecutive_meetings > 3:
    suggest_break_time()
if meeting_density > 0.8:
    suggest_reschedule()
```

## 错误处理

### 常见错误

1. **认证失败**
```
错误: LARK_AUTH_FAILED
原因: App ID 或 App Secret 无效
解决: 检查环境变量配置
```

2. **权限不足**
```
错误: LARK_PERMISSION_DENIED
原因: 应用未获得日历权限
解决: 在飞书开放平台添加权限
```

3. **时间冲突**
```
错误: LARK_TIME_CONFLICT
原因: 指定时间段已有其他日程
解决: 使用 check_conflicts 提前检查
```

4. **会议室已被占用**
```
错误: LARK_ROOM_BOOKED
原因: 会议室在该时间段已被预约
解决: 更换会议室或时间
```

## 集成

### 与其他 Skill 配合

1. **lark-calendar + dingtalk-attendance**
   - 会议签到自动记录考勤

2. **lark-calendar + report-generator**
   - 生成会议统计报表

3. **lark-calendar + smart-customer-service**
   - 客户预约自动创建日程

### Webhook 集成

```javascript
// 日程变更通知
POST /webhook/lark-calendar
{
  "event": "calendar.event.created",
  "data": {
    "event_id": "xxx",
    "summary": "团队会议",
    "start_time": "2026-03-10T15:00:00+08:00"
  }
}
```

## API 限制

- 查询频率: 100次/分钟
- 创建频率: 50次/分钟
- 单次查询最多返回: 500个事件

## 更新日志

### v1.0.0 (2026-03-09)
- ✨ 初始版本发布
- ✅ 基础日程管理功能
- ✅ 会议邀请功能
- ✅ 冲突检测

### v1.1.0 (计划中)
- 🔥 会议室智能推荐
- 🔥 日程优化建议
- 🔥 日程模板

## 贡献

欢迎贡献代码或提出建议!

- GitHub: https://github.com/openclaw/skills
- Issue: https://github.com/openclaw/skills/issues

## 许可证

MIT License

## 支持

- 📖 文档: https://docs.openclaw.ai/skills/lark-calendar
- 💬 社区: https://discord.gg/clawd
- 📧 Email: support@openclaw.ai

---

**作者**: OpenClaw Team
**版本**: 1.0.0
**最后更新**: 2026-03-09
