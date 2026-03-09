// OpenClaw Skill Market - 主应用逻辑

// 全局变量
let currentCategory = 'all';
let currentPage = 1;
let skillsPerPage = 12;
let filteredSkills = [];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// 初始化应用
function initApp() {
    renderCategories();
    renderCategoryTabs();
    renderFeaturedSkills();
    renderAllSkills();
    setupEventListeners();
}

// 渲染分类标签
function renderCategoryTabs() {
    const tabsContainer = document.getElementById('categoryTabs');
    
    // 添加"全部"标签
    let tabsHTML = '<button class="category-tab active" data-category="all">全部</button>';
    
    // 添加其他分类标签
    skillsDatabase.categories.forEach(category => {
        tabsHTML += `
            <button class="category-tab" data-category="${category.id}">
                ${category.icon} ${category.name}
            </button>
        `;
    });
    
    tabsContainer.innerHTML = tabsHTML;
}

// 渲染分类卡片
function renderCategories() {
    const gridContainer = document.getElementById('categoryGrid');
    
    let categoriesHTML = '';
    skillsDatabase.categories.forEach(category => {
        categoriesHTML += `
            <div class="category-card" data-category="${category.id}">
                <div class="category-icon">${category.icon}</div>
                <div class="category-name">${category.name}</div>
                <div class="category-count">${category.count} 个技能</div>
            </div>
        `;
    });
    
    gridContainer.innerHTML = categoriesHTML;
}

// 渲染精选技能
function renderFeaturedSkills() {
    const container = document.getElementById('featuredSkills');
    const featuredSkills = skillsDatabase.skills.filter(skill => 
        skillsDatabase.featuredSkillIds.includes(skill.id)
    );
    
    let html = '';
    featuredSkills.forEach(skill => {
        html += generateSkillCard(skill);
    });
    
    container.innerHTML = html;
}

// 渲染所有技能
function renderAllSkills(reset = true) {
    const container = document.getElementById('allSkills');
    
    if (reset) {
        currentPage = 1;
        filteredSkills = filterSkills();
    }
    
    const startIndex = 0;
    const endIndex = currentPage * skillsPerPage;
    const skillsToShow = filteredSkills.slice(startIndex, endIndex);
    
    let html = '';
    skillsToShow.forEach(skill => {
        html += generateSkillCard(skill);
    });
    
    container.innerHTML = html;
    
    // 更新加载更多按钮状态
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (endIndex >= filteredSkills.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

// 过滤技能
function filterSkills() {
    let skills = [...skillsDatabase.skills];
    
    // 按分类过滤
    if (currentCategory !== 'all') {
        skills = skills.filter(skill => skill.category === currentCategory);
    }
    
    // 按价格过滤
    const priceFilter = document.getElementById('priceFilter').value;
    if (priceFilter === 'free') {
        skills = skills.filter(skill => skill.price === 0);
    } else if (priceFilter === 'paid') {
        skills = skills.filter(skill => skill.price > 0);
    }
    
    // 排序
    const sortFilter = document.getElementById('sortFilter').value;
    skills = sortSkills(skills, sortFilter);
    
    return skills;
}

// 排序技能
function sortSkills(skills, sortBy) {
    switch (sortBy) {
        case 'popular':
            return skills.sort((a, b) => b.downloads - a.downloads);
        case 'newest':
            return skills.sort((a, b) => b.id.localeCompare(a.id));
        case 'rating':
            return skills.sort((a, b) => b.rating - a.rating);
        case 'price-low':
            return skills.sort((a, b) => a.price - b.price);
        case 'price-high':
            return skills.sort((a, b) => b.price - a.price);
        default:
            return skills;
    }
}

// 生成技能卡片HTML
function generateSkillCard(skill) {
    const category = skillsDatabase.categories.find(c => c.id === skill.category);
    const priceText = skill.price === 0 ? '免费' : `¥${skill.price}`;
    const priceClass = skill.price === 0 ? 'free' : '';
    
    // 判断徽章类型
    let badgeHTML = '';
    if (skill.featured) {
        badgeHTML = '<div class="skill-badge popular">精选</div>';
    } else if (skill.native) {
        badgeHTML = '<div class="skill-badge">原生</div>';
    } else if (skill.price > 0) {
        badgeHTML = '<div class="skill-badge paid">付费</div>';
    }
    
    return `
        <div class="skill-card" data-skill-id="${skill.id}">
            <div class="skill-card-header">
                <div class="skill-icon">${category ? category.icon : '🔧'}</div>
                ${badgeHTML}
            </div>
            <h3 class="skill-title">${skill.name}</h3>
            <p class="skill-description">${skill.description}</p>
            <div class="skill-tags">
                <span class="skill-tag">${category ? category.name : '未分类'}</span>
                ${skill.native ? `<span class="skill-tag">${skill.native}</span>` : ''}
            </div>
            <div class="skill-footer">
                <div class="skill-rating">
                    <i class="fas fa-star"></i>
                    <span>${skill.rating}</span>
                    <span style="color: var(--text-secondary); font-size: 14px;">(${formatNumber(skill.downloads)} 次下载)</span>
                </div>
                <div class="skill-price ${priceClass}">${priceText}</div>
            </div>
        </div>
    `;
}

// 格式化数字
function formatNumber(num) {
    if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num;
}

// 设置事件监听器
function setupEventListeners() {
    // 分类标签点击
    document.getElementById('categoryTabs').addEventListener('click', (e) => {
        if (e.target.classList.contains('category-tab')) {
            const category = e.target.dataset.category;
            setActiveCategory(category);
        }
    });
    
    // 分类卡片点击
    document.getElementById('categoryGrid').addEventListener('click', (e) => {
        const card = e.target.closest('.category-card');
        if (card) {
            const category = card.dataset.category;
            setActiveCategory(category);
            // 滚动到技能列表
            document.getElementById('skillsList').scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // 技能卡片点击
    document.getElementById('allSkills').addEventListener('click', (e) => {
        const card = e.target.closest('.skill-card');
        if (card) {
            const skillId = card.dataset.skillId;
            showSkillDetail(skillId);
        }
    });
    
    // 精选技能卡片点击
    document.getElementById('featuredSkills').addEventListener('click', (e) => {
        const card = e.target.closest('.skill-card');
        if (card) {
            const skillId = card.dataset.skillId;
            showSkillDetail(skillId);
        }
    });
    
    // 搜索功能
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        searchSkills(query);
    });
    
    // 筛选器变化
    document.getElementById('sortFilter').addEventListener('change', () => {
        renderAllSkills();
    });
    
    document.getElementById('priceFilter').addEventListener('change', () => {
        renderAllSkills();
    });
    
    // 加载更多
    document.getElementById('loadMoreBtn').addEventListener('click', () => {
        currentPage++;
        renderAllSkills(false);
    });
    
    // 弹窗关闭
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('skillModal').classList.remove('active');
    });
    
    // 点击弹窗外部关闭
    document.getElementById('skillModal').addEventListener('click', (e) => {
        if (e.target.id === 'skillModal') {
            document.getElementById('skillModal').classList.remove('active');
        }
    });
}

// 设置当前分类
function setActiveCategory(category) {
    currentCategory = category;
    
    // 更新标签激活状态
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });
    
    // 更新标题
    const categoryName = category === 'all' ? '全部技能' : 
        skillsDatabase.categories.find(c => c.id === category)?.name || '技能列表';
    document.getElementById('currentCategoryName').textContent = categoryName;
    
    // 重新渲染技能列表
    renderAllSkills();
}

// 搜索技能
function searchSkills(query) {
    if (!query) {
        renderAllSkills();
        return;
    }
    
    filteredSkills = skillsDatabase.skills.filter(skill => {
        const name = skill.name.toLowerCase();
        const description = skill.description.toLowerCase();
        const category = skillsDatabase.categories.find(c => c.id === skill.category);
        const categoryName = category ? category.name.toLowerCase() : '';
        
        return name.includes(query) || 
               description.includes(query) || 
               categoryName.includes(query);
    });
    
    currentPage = 1;
    renderAllSkills(false);
}

// 显示技能详情
function showSkillDetail(skillId) {
    const skill = skillsDatabase.skills.find(s => s.id === skillId);
    if (!skill) return;
    
    const category = skillsDatabase.categories.find(c => c.id === skill.category);
    const priceText = skill.price === 0 ? '免费使用' : `¥${skill.price}`;
    
    const modalHTML = `
        <div class="skill-detail">
            <div class="skill-detail-header">
                <div class="skill-detail-icon">${category ? category.icon : '🔧'}</div>
                <div class="skill-detail-info">
                    <h2>${skill.name}</h2>
                    <div class="skill-detail-meta">
                        <span><i class="fas fa-star"></i> ${skill.rating}</span>
                        <span><i class="fas fa-download"></i> ${formatNumber(skill.downloads)}</span>
                        <span><i class="fas fa-folder"></i> ${category ? category.name : '未分类'}</span>
                    </div>
                </div>
            </div>
            
            <div class="skill-detail-section">
                <h3>技能描述</h3>
                <p>${skill.description}</p>
            </div>
            
            ${skill.native ? `
            <div class="skill-detail-section">
                <h3>平台支持</h3>
                <p class="native-badge">${skill.native}</p>
            </div>
            ` : ''}
            
            <div class="skill-detail-section">
                <h3>应用场景</h3>
                <ul>
                    <li>提升工作效率</li>
                    <li>自动化重复任务</li>
                    <li>数据分析与决策</li>
                    <li>客户服务优化</li>
                </ul>
            </div>
            
            <div class="skill-detail-section">
                <h3>功能特性</h3>
                <ul>
                    <li><i class="fas fa-check"></i> 智能化处理</li>
                    <li><i class="fas fa-check"></i> 易于集成</li>
                    <li><i class="fas fa-check"></i> 实时更新</li>
                    <li><i class="fas fa-check"></i> 专业支持</li>
                </ul>
            </div>
            
            <div class="skill-detail-footer">
                <div class="price-display">
                    <span class="price-label">价格：</span>
                    <span class="price-value">${priceText}</span>
                </div>
                <div class="action-buttons">
                    ${skill.price === 0 ? 
                        '<button class="btn-primary" onclick="useSkill(\'' + skill.id + '\')">立即使用</button>' :
                        '<button class="btn-primary" onclick="buySkill(\'' + skill.id + '\')">立即购买</button>'
                    }
                    <button class="btn-secondary">了解更多</button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('skillDetail').innerHTML = modalHTML;
    document.getElementById('skillModal').classList.add('active');
}

// 使用技能
function useSkill(skillId) {
    alert(`正在启动技能: ${skillId}\n\n功能开发中，敬请期待！`);
}

// 购买技能
function buySkill(skillId) {
    const skill = skillsDatabase.skills.find(s => s.id === skillId);
    if (skill) {
        alert(`即将购买技能: ${skill.name}\n价格: ¥${skill.price}\n\n支付功能开发中，敬请期待！`);
    }
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
