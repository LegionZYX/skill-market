// 安装代码数据
const installCodes = {
    "lark-calendar": "npx openclaw-skills@latest install lark-calendar",
    "dingtalk-attendance": "npx openclaw-skills@latest install dingtalk-attendance",
    "meeting-notes": "npx openclaw-skills@latest install meeting-notes",
    "smart-customer-service": "npx openclaw-skills@latest install smart-customer-service",
    "content-creator": "npx openclaw-skills@latest install content-creator",
    "report-generator": "npx openclaw-skills@latest install report-generator",
    "wechat-mp-manager": "npx openclaw-skills@latest install wechat-mp-manager",
    "douyin-ecommerce": "npx openclaw-skills@latest install douyin-ecommerce",
    "taobao-product-manager": "npx openclaw-skills@latest install taobao-product-manager",
    "inventory-manager": "npx openclaw-skills@latest install inventory-manager",
    "ai-model-comparison": "npx openclaw-skills@latest install ai-model-comparison",
    "ai-tool-review": "npx openclaw-skills@latest install ai-tool-review",
    "email-assistant": "npx openclaw-skills@latest install email-assistant",
    "resume-screener": "npx openclaw-skills@latest install resume-screener",
    "invoice-ocr": "npx openclaw-skills@latest install invoice-ocr",
    "code-reviewer": "npx openclaw-skills@latest install code-reviewer",
    "contract-reviewer": "npx openclaw-skills@latest install contract-reviewer",
    "personal-calendar": "npx openclaw-skills@latest install personal-calendar",
    "translator": "npx openclaw-skills@latest install translator",
    "data-visualization": "npx openclaw-skills@latest install data-visualization"
};

// 显示安装代码
function showInstallCode(skillId) {
    const skill = skillsDatabase.skills.find(s => s.id === skillId);
    const installCode = installCodes[skillId] || `npx openclaw-skills@latest install ${skillId}`;
    
    // 创建安装弹窗
    const modalHTML = `
        <div class="install-modal">
            <h2>📦 安装 ${skill ? skill.name : skillId}</h2>
            
            <div class="install-section">
                <h3>安装命令</h3>
                <div class="code-block">
                    <code>${installCode}</code>
                    <button class="copy-btn" onclick="copyInstallCode('${installCode}')">
                        <i class="fas fa-copy"></i> 复制
                    </button>
                </div>
            </div>
            
            <div class="install-section">
                <h3>其他包管理器</h3>
                <div class="tabs">
                    <button class="tab-btn active" onclick="switchTab('npm', '${skillId}')">npm</button>
                    <button class="tab-btn" onclick="switchTab('pnpm', '${skillId}')">pnpm</button>
                    <button class="tab-btn" onclick="switchTab('bun', '${skillId}')">bun</button>
                </div>
                <div class="code-block" id="packageCode">
                    <code>${installCode}</code>
                </div>
            </div>
            
            <div class="install-section">
                <h3>安装前提</h3>
                <ul class="prerequisites">
                    <li><i class="fas fa-check"></i> Node.js 18.0 或更高版本</li>
                    <li><i class="fas fa-check"></i> npm、pnpm 或 bun 包管理器</li>
                    <li><i class="fas fa-check"></i> 网络连接</li>
                </ul>
            </div>
            
            <div class="install-section">
                <h3>安装步骤</h3>
                <ol class="steps">
                    <li>复制上方的安装命令</li>
                    <li>打开终端（Terminal 或 CMD）</li>
                    <li>粘贴命令并按回车执行</li>
                    <li>等待安装完成</li>
                    <li>在项目中使用该技能</li>
                </ol>
            </div>
            
            <button class="btn-primary btn-block" onclick="copyInstallCode('${installCode}')">
                <i class="fas fa-copy"></i> 复制安装命令
            </button>
        </div>
    `;
    
    // 显示弹窗
    document.getElementById('skillDetail').innerHTML = modalHTML;
    document.getElementById('skillModal').classList.add('active');
}

// 切换包管理器标签
function switchTab(packageManager, skillId) {
    const installCode = {
        npm: `npx openclaw-skills@latest install ${skillId}`,
        pnpm: `pnpx openclaw-skills@latest install ${skillId}`,
        bun: `bunx openclaw-skills@latest install ${skillId}`
    };
    
    // 更新激活状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // 更新代码
    document.querySelector('#packageCode code').textContent = installCode[packageManager];
}

// 复制安装代码
function copyInstallCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        // 显示成功提示
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>✅ 已复制到剪贴板</strong>
                <p style="margin: 5px 0 0 0; font-size: 14px;">粘贴到终端即可安装</p>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }).catch(err => {
        alert('复制失败，请手动复制：\n' + code);
    });
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showInstallCode,
        copyInstallCode,
        installCodes
    };
}
