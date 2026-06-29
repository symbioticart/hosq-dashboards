// HOSQ dashboards — shared helpers, brand ECharts theme, data access.
export const C = {coral:'#FF6F55',violet:'#C47CF1',green:'#14B672',blue:'#56A4CB',pink:'#E770C3',
  dark:'#231F20',cream:'#EBE2D6',muted:'#6B6566',line:'#D8CDBF'};
export const CAT = [C.coral,C.violet,C.green,C.blue,C.pink,'#8C6FE0','#E0A23C','#3C8C7A'];
// Donor focus vectors (locked with principal): Internationality G + Cultural Vitality A + Art Quality D
export const FOCUS = new Set(['G','A','D']);

const AX={axisLabel:{fontSize:12,color:C.muted,fontFamily:'Cera Pro',margin:10,hideOverlap:true},
  nameTextStyle:{fontSize:12,color:C.muted},axisLine:{lineStyle:{color:'#D8CCBE'}},axisTick:{show:false},
  splitLine:{lineStyle:{color:'#E2D7CA'}}};
export const theme = {
  color: CAT,
  backgroundColor: 'transparent',
  textStyle:{fontFamily:'Cera Pro, sans-serif', color:C.dark},
  title:{textStyle:{color:C.dark,fontWeight:700}},
  grid:{left:12,right:16,top:24,bottom:8,containLabel:true},
  categoryAxis:{...AX,splitLine:{show:false}},
  valueAxis:{...AX,axisLine:{show:false}},
  legend:{textStyle:{fontSize:12,color:C.muted},itemGap:16,icon:'roundRect'},
  tooltip:{backgroundColor:'#FFFFFF',borderColor:'#E2D7CA',borderWidth:1,padding:[10,12],
    textStyle:{color:C.dark,fontSize:13,fontFamily:'Cera Pro'},extraCssText:'border-radius:12px;box-shadow:none;'},
};
// graph-card builder: title -> read-line -> chart -> AI insight -> source
export function gcard(o){
  return `<div class="card"><h3>${o.title}</h3>`+
    (o.read?`<div class="read-line">${o.read}</div>`:'')+
    `<div id="${o.id}" class="chart ${o.kind||''}"></div>`+
    (o.ai?`<div class="ai-insight"><div>${o.ai}</div></div>`:'')+
    (o.src?`<div class="src">${o.src}</div>`:'')+`</div>`;
}

export async function loadJSON(p){const r=await fetch(p);if(!r.ok)throw new Error(p+' '+r.status);return r.json();}
export const fmt = n => n==null?'—':n.toLocaleString('en-US');
export const money = n => n==null?'—':'$'+Number(n).toLocaleString('en-US');
export function chart(el){const c=echarts.init(el,null,{renderer:'svg'});c.setOption({});window.addEventListener('resize',()=>c.resize());return c;}

// shared header
export function header(active){
  return `<div class="topbar"><div class="wrap">
    <a class="brand" href="/index.html"><img src="/public/logos/hosq-logo-black.svg" alt="hosq"/></a>
    <nav class="nav">
      <a href="/index.html" class="${active==='portfolio'?'active':''}">Портфель</a>
      <a href="/impact.html" class="${active==='impact'?'active':''}">Доказательства A–J</a>
      <a href="/showcase.html" class="${active==='showcase'?'active':''}">Витрина</a>
      <a href="/data.html" class="${active==='data'?'active':''}">Данные</a>
    </nav></div></div>`;
}
export function footer(meta){
  return `<footer class="site"><div class="wrap">
    <b>HOSQ</b> · Дашборды фонда · Данные: черновик (draft) · По состоянию на ${meta.export_date} · ${meta.project_count} проектов<br>
    <span class="muted">${meta.honesty_note}</span></div></footer>`;
}
