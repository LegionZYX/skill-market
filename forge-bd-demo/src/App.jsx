import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ShieldCheck, LayoutDashboard, BarChart3, Wallet, FileText, Search, Bell, User, ChevronRight, ArrowUpRight, ArrowDownRight, Plus, Zap, Lock, Globe, MessageSquare, Upload, CheckCircle2, Cpu } from 'lucide-react';

// --- Mock Data ---
const PRICE_HISTORY = [
  { name: 'Jan', price: 155 },
  { name: 'Feb', price: 158 },
  { name: 'Mar', price: 162 },
  { name: 'Apr', price: 160 },
  { name: 'May', price: 165 },
  { name: 'Jun', price: 172 },
  { name: 'Jul', price: 168 },
  { name: 'Aug', price: 175 },
];

const ORDER_BOOK = {
  asks: [
    { price: 176.5, size: '25,000', total: '4.41M', fill: 40 },
    { price: 176.2, size: '12,000', total: '2.11M', fill: 20 },
    { price: 175.8, size: '50,000', total: '8.79M', fill: 80 },
    { price: 175.5, size: '10,000', total: '1.75M', fill: 15 },
  ],
  bids: [
    { price: 174.2, size: '15,000', total: '2.61M', fill: 30 },
    { price: 174.0, size: '40,000', total: '6.96M', fill: 70 },
    { price: 173.5, size: '100,000', total: '17.35M', fill: 100 },
    { price: 173.2, size: '30,000', total: '5.19M', fill: 50 },
  ]
};

const ASSETS = [
  { id: 'BD-2024-001', series: 'Series E-2', unitPrice: 175.5, amount: '50,000', status: '已确权', spv: 'Forge-Byte-SPV-09' },
  { id: 'BD-2024-002', series: 'Series D-3', unitPrice: 168.2, amount: '120,000', status: '待交割', spv: 'Global-Tech-Trust-01' },
  { id: 'BD-2024-003', series: 'ESOP Pool', unitPrice: 172.0, amount: '15,000', status: '审核中', spv: 'Individual-Holding' },
];

// --- Components ---
const Sidebar = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'terminal', icon: LayoutDashboard, label: '交易终端' },
    { id: 'market', icon: BarChart3, label: '资产广场' },
    { id: 'vault', icon: ShieldCheck, label: '确权金库' },
    { id: 'wallet', icon: Wallet, label: '双币钱包' },
    { id: 'ai-desk', icon: Cpu, label: 'AI 智能工作台' },
    { id: 'docs', icon: FileText, label: '法务存证' },
  ];

  return (
    <div className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col h-full overflow-y-auto">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
          <Zap className="text-white fill-current" size={24} />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Forge-BD
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activePage === item.id
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-400">HK 结算中心连接正常</span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Node: HK-North-01</p>
        </div>
      </div>
    </div>
  );
};

const Header = () => (
  <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
    <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 w-96">
      <Search className="text-slate-500" size={16} />
      <input
        type="text"
        placeholder="搜索 SPV、持仓人或资产编号..."
        className="bg-transparent border-none focus:ring-0 text-sm text-slate-300 w-full ml-2"
      />
    </div>

    <div className="flex items-center gap-6">
      <div className="flex flex-col text-right">
        <span className="text-xs text-slate-500">ByteDance Est. Valuation</span>
        <span className="text-sm font-mono font-bold text-cyan-400">
          $225.84B <span className="text-green-500 text-[10px] ml-1">+1.2%</span>
        </span>
      </div>

      <div className="h-8 w-px bg-slate-800"></div>

      <button className="relative text-slate-400 hover:text-white transition-colors">
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950"></span>
      </button>

      <div className="flex items-center gap-3 pl-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs">
          JD
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-slate-200">Jane Doe</p>
          <p className="text-[10px] text-slate-500 font-bold uppercase">Pro Investor</p>
        </div>
      </div>
    </div>
  </header>
);

const TradeTerminal = () => (
  <div className="p-6 grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
    {/* Market Overview Chart */}
    <div className="col-span-12 lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            ByteDance Ltd. <span className="text-sm font-normal text-slate-500 font-mono">/ OTC INDEX</span>
          </h3>
          <p className="text-slate-500 text-sm">字节跳动老股非公开市场价格趋势</p>
        </div>
        <div className="flex gap-2">
          {['1D', '1W', '1M', '1Y', 'ALL'].map(t => (
            <button
              key={t}
              className={`px-3 py-1 rounded text-xs font-bold ${
                t === '1M' ? 'bg-cyan-500 text-white' : 'text-slate-500 hover:bg-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PRICE_HISTORY}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
              itemStyle={{ color: '#06b6d4' }}
            />
            <Area type="monotone" dataKey="price" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Order Book */}
    <div className="col-span-12 lg:col-span-4 bg-slate-900/40 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm overflow-hidden">
      <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">实时订单簿 (Order Book)</h3>

      <div className="space-y-0.5">
        <div className="flex justify-between text-[10px] text-slate-500 font-bold mb-2 px-2">
          <span>PRICE (USD)</span>
          <span>SIZE (UNIT)</span>
          <span>TOTAL</span>
        </div>

        {/* Asks */}
        {ORDER_BOOK.asks.map((order, i) => (
          <div key={i} className="relative group cursor-pointer py-1.5 px-2">
            <div
              className="absolute inset-0 bg-red-500/10 origin-right transition-transform"
              style={{ transform: `scaleX(${order.fill / 100})` }}
            ></div>
            <div className="relative flex justify-between text-xs font-mono">
              <span className="text-red-400 font-bold">{order.price.toFixed(2)}</span>
              <span className="text-slate-300">{order.size}</span>
              <span className="text-slate-500">{order.total}</span>
            </div>
          </div>
        ))}

        <div className="py-4 my-2 border-y border-slate-800 flex items-center justify-center gap-3">
          <span className="text-xl font-bold font-mono text-slate-200">174.85</span>
          <span className="text-xs text-green-500 font-bold flex items-center">
            <ArrowUpRight size={14} />
            0.35%
          </span>
        </div>

        {/* Bids */}
        {ORDER_BOOK.bids.map((order, i) => (
          <div key={i} className="relative group cursor-pointer py-1.5 px-2">
            <div
              className="absolute inset-0 bg-green-500/10 origin-left transition-transform"
              style={{ transform: `scaleX(${order.fill / 100})` }}
            ></div>
            <div className="relative flex justify-between text-xs font-mono">
              <span className="text-green-400 font-bold">{order.price.toFixed(2)}</span>
              <span className="text-slate-300">{order.size}</span>
              <span className="text-slate-500">{order.total}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95">
        发起买入意向 (Place Bid)
      </button>
    </div>

    {/* Asset Status */}
    <div className="col-span-12 bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="font-bold">我的资产确权与挂单</h3>
        <button className="text-xs text-cyan-400 font-bold hover:underline">查看全部明细</button>
      </div>

      <table className="w-full">
        <thead className="bg-slate-950/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest text-left">
          <tr>
            <th className="px-6 py-4">资产编号</th>
            <th className="px-6 py-4">轮次/架构</th>
            <th className="px-6 py-4">持有数量</th>
            <th className="px-6 py-4">估值单价</th>
            <th className="px-6 py-4">确权状态</th>
            <th className="px-6 py-4 text-right">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 text-sm">
          {ASSETS.map((asset) => (
            <tr key={asset.id} className="hover:bg-slate-800/30 transition-colors">
              <td className="px-6 py-4 font-mono text-cyan-500 font-bold">{asset.id}</td>
              <td className="px-6 py-4">
                <div className="font-medium text-slate-200">{asset.series}</div>
                <div className="text-[10px] text-slate-500">{asset.spv}</div>
              </td>
              <td className="px-6 py-4 text-slate-300">{asset.amount}</td>
              <td className="px-6 py-4 font-mono text-slate-300">${asset.unitPrice}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    asset.status === '已确权'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-orange-500/10 text-orange-500'
                  }`}
                >
                  {asset.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-slate-400 hover:text-white p-2">
                  <ChevronRight size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AIDesk = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const simulateAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        name: 'Morgan Stanley Wealth Management',
        verifiedFunds: '$12.5M USD',
        kycStatus: 'Level 3 - Approved',
        matchRating: 98,
        recommendation: '高优先级买家，资金源已穿透确认为离岸信托资金，建议直接进入 SPA 阶段。'
      });
    }, 3000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
          <Cpu className="text-purple-400" size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">AI 智能辅助交易台</h2>
          <p className="text-slate-400">利用大模型自动解析 POF、KYC 并辅助撮合</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-slate-900/50 border-2 border-dashed border-slate-700 rounded-3xl p-10 flex flex-col items-center justify-center text-center group hover:border-cyan-500/50 transition-all">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Upload className="text-slate-500 group-hover:text-cyan-400" size={32} />
          </div>
          <h4 className="text-xl font-bold mb-2">上传买家资质文件</h4>
          <p className="text-slate-400 text-sm mb-6 max-w-xs">
            支持 PDF, Word 或银行流水截图。AI 将自动识别 POF 额度与合规风险。
          </p>
          <button
            onClick={simulateAnalysis}
            disabled={analyzing}
            className="px-8 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-cyan-400 transition-colors disabled:opacity-50"
          >
            {analyzing ? '正在通过 AI 解析中...' : '开始智能解析'}
          </button>
        </div>

        {/* AI Insight Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden min-h-[400px]">
          {analyzing && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-cyan-400 font-mono animate-pulse">EXTRACTING DATA...</p>
            </div>
          )}

          {!analyzing && !result && (
            <div className="h-full flex flex-col items-center justify-center opacity-30">
              <MessageSquare size={48} className="mb-4" />
              <p>等待分析结果</p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-400 uppercase text-xs tracking-widest">分析摘要</h4>
                <div className="px-2 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded border border-green-500/20">
                  AI VERIFIED
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">主体名称</p>
                  <p className="text-lg font-bold text-slate-100">{result.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">已验资额度</p>
                    <p className="text-xl font-mono font-bold text-cyan-400">{result.verifiedFunds}</p>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">匹配得分</p>
                    <p className="text-xl font-mono font-bold text-cyan-400">{result.matchRating}%</p>
                  </div>
                </div>

                <div className="border-l-2 border-cyan-500 pl-4 py-2 bg-cyan-500/5">
                  <p className="text-[10px] text-cyan-500 uppercase font-bold mb-1">私市交易专家(AI)建议</p>
                  <p className="text-sm text-slate-300 leading-relaxed italic">"{result.recommendation}"</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-700">
                    生成 SPA 草案
                  </button>
                  <button className="flex-1 py-2 bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-bold rounded-lg">
                    进入撮合室
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const VaultSection = () => (
  <div className="p-8 animate-in fade-in slide-in-from-left-4">
    <div className="flex justify-between items-end mb-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">确权金库 (Digital Vault)</h2>
        <p className="text-slate-400">基于区块链确权凭证的股权穿透名册</p>
      </div>
      <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-3">
        <Globe size={16} className="text-slate-500" />
        <span className="text-xs font-mono text-slate-400">
          Network Status: <span className="text-green-500 font-bold">Mainnet Online</span>
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
          <div className="p-6 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between">
            <h4 className="font-bold flex items-center gap-2 text-sm">
              <Lock size={16} className="text-cyan-500" />
              资产确权详情: Forge-Byte-SPV-09
            </h4>
            <span className="text-[10px] font-mono text-slate-500">Hash: 0x9f32...a9d1</span>
          </div>

          <div className="p-8 grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold">持有人名称</label>
                <p className="font-bold">Byte Capital Management Ltd.</p>
              </div>
              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold">底层股份数量</label>
                <p className="font-bold font-mono">1,500,000 Units</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold">律所确权备案</label>
                <p className="text-cyan-400 text-sm underline cursor-pointer">Latham & Watkins_Report_V2.pdf</p>
              </div>
              <div>
                <label className="text-[10px] text-slate-500 uppercase font-bold">最近确权日期</label>
                <p className="font-bold">2024-05-12 14:30 (HKT)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h5 className="text-xs font-bold text-slate-500 mb-4">流转历史记录</h5>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div>
                    <p className="text-xs font-bold">Transfer to SPV-0{i}</p>
                    <p className="text-[10px] text-slate-500">2023-11-20</p>
                  </div>
                  <ArrowUpRight size={14} className="text-slate-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h5 className="text-xs font-bold text-slate-500 mb-4">SPV 穿透架构</h5>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-10 h-10 rounded bg-cyan-500/20 border border-cyan-500 flex items-center justify-center text-cyan-500 text-[10px] font-bold">
                CAY
              </div>
              <div className="w-px h-4 bg-slate-700"></div>
              <div className="w-10 h-10 rounded bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-500 text-[10px] font-bold">
                HK
              </div>
              <div className="w-px h-4 bg-slate-700"></div>
              <div className="w-10 h-10 rounded bg-indigo-500/20 border border-indigo-500 flex items-center justify-center text-indigo-500 text-[10px] font-bold">
                SPV
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 h-fit sticky top-24">
        <h4 className="font-bold mb-6 flex items-center gap-2">
          <ShieldCheck size={18} className="text-green-500" />
          确权报告摘要
        </h4>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
              <CheckCircle2 size={14} />
            </div>
            <div>
              <p className="text-xs font-bold">真实性校验 (Authenticity)</p>
              <p className="text-[10px] text-slate-500">已穿透核实字节跳动底层 Cap Table，股份真实有效。</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
              <CheckCircle2 size={14} />
            </div>
            <div>
              <p className="text-xs font-bold">合规性校验 (Compliance)</p>
              <p className="text-[10px] text-slate-500">符合 HK-SFC 专业投资者管理条例，无洗钱风险。</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
              <CheckCircle2 size={14} />
            </div>
            <div>
              <p className="text-xs font-bold">流通性评估 (Liquidity)</p>
              <p className="text-[10px] text-slate-500">资产持有期已过禁售限制，支持二级 OTC 流转。</p>
            </div>
          </div>
        </div>

        <button className="w-full mt-8 py-3 border border-slate-700 hover:bg-slate-800 rounded-xl text-xs font-bold transition-all">
          下载完整确权证书 (PDF)
        </button>
      </div>
    </div>
  </div>
);

const WalletSection = () => (
  <div className="p-8 animate-in fade-in slide-in-from-right-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Wallet Summary */}
      <div className="md:col-span-1 space-y-6">
        <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Wallet size={120} />
          </div>
          <p className="text-cyan-100 text-xs font-bold uppercase tracking-widest mb-2">Total Net Worth</p>
          <h2 className="text-4xl font-mono font-bold mb-8">$24,845,210.00</h2>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-cyan-200 uppercase font-bold">Asset Type</p>
              <p className="text-sm font-bold tracking-widest">HK MULTI-CURRENCY</p>
            </div>
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-bold">
                USD
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-bold">
                USDT
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-bold">
                HKD
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
            <BarChart3 size={16} className="text-slate-400" />
            资产配置分布
          </h4>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">ByteDance Equity</span>
                <span className="text-slate-200 font-bold">68%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Stablecoins (USDT)</span>
                <span className="text-slate-200 font-bold">22%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '22%' }}></div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Fiat (USD/HKD)</span>
                <span className="text-slate-200 font-bold">10%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h4 className="font-bold">近期交易活动</h4>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-bold">导出流水</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {[
            { label: 'Asset Buyback', date: '2024-05-15', amount: '-$2,000,000.00', status: 'Completed', icon: ArrowDownRight, color: 'text-red-400' },
            { label: 'OTC Dividend', date: '2024-05-12', amount: '+$145,200.00', status: 'Completed', icon: ArrowUpRight, color: 'text-green-400' },
            { label: 'USDT Deposit', date: '2024-05-10', amount: '+$500,000.00', status: 'Completed', icon: ArrowUpRight, color: 'text-green-400' },
            { label: 'Wallet Authentication', date: '2024-05-08', amount: '0.00', status: 'System', icon: ShieldCheck, color: 'text-cyan-400' },
            { label: 'Platform Fee Charge', date: '2024-05-01', amount: '-$12,500.00', status: 'Completed', icon: ArrowDownRight, color: 'text-red-400' },
          ].map((tx, i) => (
            <div key={i} className="px-6 py-5 border-b border-slate-800/50 flex items-center justify-between hover:bg-slate-800/20 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl bg-slate-800 ${tx.color}`}>
                  <tx.icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-100">{tx.label}</p>
                  <p className="text-[10px] text-slate-500 font-mono uppercase">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-mono font-bold ${tx.color}`}>{tx.amount}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">{tx.status}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-slate-950/50">
          <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-700">
            查看所有离岸交易流水
          </button>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---
export default function App() {
  const [activePage, setActivePage] = useState('terminal');

  const renderContent = () => {
    switch(activePage) {
      case 'terminal':
        return <TradeTerminal />;
      case 'vault':
        return <VaultSection />;
      case 'ai-desk':
        return <AIDesk />;
      case 'wallet':
        return <WalletSection />;
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center p-20 text-center">
            <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mb-6 border border-slate-800">
              <Lock size={32} className="text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Beta Access Only</h2>
            <p className="text-slate-500 max-w-md">
              当前功能模块仅对白名单机构投资者开放。请联系您的专属交易专家获取权限。
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
          {renderContent()}
        </div>

        {/* Ticker Tape */}
        <div className="h-8 bg-slate-900 border-t border-slate-800 flex items-center overflow-hidden">
          <div className="flex items-center gap-8 whitespace-nowrap px-4 animate-[ticker_30s_linear_infinite]">
            <span className="text-[10px] font-bold flex items-center gap-2">
              <span className="text-slate-500">BD-SERIES-E</span>
              <span className="text-cyan-400 font-mono">$175.50</span>
              <span className="text-green-500">+0.8%</span>
            </span>
            <span className="text-[10px] font-bold flex items-center gap-2">
              <span className="text-slate-500">BD-SERIES-D</span>
              <span className="text-cyan-400 font-mono">$162.20</span>
              <span className="text-red-500">-0.2%</span>
            </span>
            <span className="text-[10px] font-bold flex items-center gap-2">
              <span className="text-slate-500">USDT-HKD</span>
              <span className="text-cyan-400 font-mono">7.8124</span>
              <span className="text-slate-500">0.0%</span>
            </span>
            <span className="text-[10px] font-bold flex items-center gap-2">
              <span className="text-slate-500">BD-ESOP-GLOBAL</span>
              <span className="text-cyan-400 font-mono">$171.15</span>
              <span className="text-green-500">+1.1%</span>
            </span>

            {/* Duplicate for infinite effect */}
            <span className="text-[10px] font-bold flex items-center gap-2">
              <span className="text-slate-500">BD-SERIES-E</span>
              <span className="text-cyan-400 font-mono">$175.50</span>
              <span className="text-green-500">+0.8%</span>
            </span>
            <span className="text-[10px] font-bold flex items-center gap-2">
              <span className="text-slate-500">BD-SERIES-D</span>
              <span className="text-cyan-400 font-mono">$162.20</span>
              <span className="text-red-500">-0.2%</span>
            </span>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
      `}} />
    </div>
  );
}
