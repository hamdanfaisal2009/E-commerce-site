
const PRODS=[
  {id:1,name:'Classic Leather Watch',cat:'fashion',tag:'hot',img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',price:249,orig:349,disc:28,rating:4.8,rev:1240},
  {id:2,name:'AirPods Pro Max',cat:'electronics',tag:'sale',img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',price:199,orig:299,disc:33,rating:4.9,rev:3200},
  {id:3,name:'Running Sneakers X',cat:'sports',tag:'new',img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',price:129,orig:189,disc:31,rating:4.7,rev:890},
  {id:4,name:'Summer Floral Dress',cat:'fashion',tag:'new',img:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&q=80',price:89,orig:139,disc:36,rating:4.6,rev:567},
  {id:5,name:'MacBook Laptop Stand',cat:'electronics',tag:'sale',img:'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80',price:49,orig:79,disc:38,rating:4.5,rev:432},
  {id:6,name:'Luxury Face Serum',cat:'beauty',tag:'hot',img:'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80',price:65,orig:99,disc:34,rating:4.9,rev:2100},
  {id:7,name:'Smart LED Floor Lamp',cat:'home',tag:'new',img:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&q=80',price:45,orig:70,disc:35,rating:4.4,rev:310},
  {id:8,name:'Yoga Mat Premium',cat:'sports',tag:'sale',img:'https://images.unsplash.com/photo-1601925228548-3f359f9ee7f2?w=500&q=80',price:38,orig:65,disc:41,rating:4.7,rev:780},
  {id:9,name:'Minimalist Handbag',cat:'fashion',tag:'hot',img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80',price:179,orig:280,disc:36,rating:4.8,rev:1050},
  {id:10,name:'Wireless Keyboard',cat:'electronics',tag:'new',img:'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',price:79,orig:119,disc:33,rating:4.6,rev:650},
  {id:11,name:'Scented Candle Set',cat:'home',tag:'sale',img:'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=500&q=80',price:35,orig:55,disc:36,rating:4.5,rev:420},
  {id:12,name:'Gaming Headset Pro',cat:'electronics',tag:'hot',img:'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80',price:149,orig:220,disc:32,rating:4.8,rev:1780},
];

let cart=JSON.parse(localStorage.getItem('sn_c')||'[]');
let wish=new Set(JSON.parse(localStorage.getItem('sn_w')||'[]'));
let af='all', mq=1;

const sv=s=>`<svg width="${s}" height="${s}" style="color:var(--accent)"><use href="#i-star"/></svg>`;
const stars=r=>Array.from({length:5},(_,i)=>i<Math.floor(r)?sv(13):`<svg width="13" height="13" style="color:var(--muted);opacity:.4"><use href="#i-star"/></svg>`).join('');
const bdgC={sale:'bs',new:'bn',hot:'bh'}, bdgT={sale:'SALE',new:'NEW',hot:'HOT'};

function rProds(list){
  const g=document.getElementById('pgrid');
  if(!list.length){g.innerHTML='<p style="color:var(--muted);grid-column:1/-1;text-align:center;padding:48px">No products found.</p>';return}
  g.innerHTML=list.map(p=>`
<div class="pc rv" data-id="${p.id}">
  <div class="pimgw">
    <img class="pimg" src="${p.img}" alt="${p.name}" loading="lazy"/>
    <span class="pbdg ${bdgC[p.tag]}">${bdgT[p.tag]}</span>
    <div class="povl">
      <button class="ovc" onclick="addToCart(${p.id},event)"><svg width="14" height="14"><use href="#i-cart"/></svg> Add to Cart</button>
      <button class="ovw${wish.has(p.id)?' on':''}" id="wb${p.id}" onclick="togWish(${p.id},event)"><svg width="14" height="14"><use href="${wish.has(p.id)?'#i-heart-f':'#i-heart'}"/></svg></button>
      <button class="ovq" onclick="openModal(${p.id},event)"><svg width="14" height="14"><use href="#i-eye"/></svg></button>
    </div>
  </div>
  <div class="pinfo">
    <div class="pcat">${p.cat}</div>
    <div class="pname">${p.name}</div>
    <div class="pstars"><div class="srow">${stars(p.rating)}</div><span class="prev">(${p.rev.toLocaleString()})</span></div>
    <div class="pprow"><div><span class="pprice">$${p.price}</span> <span class="porig">$${p.orig}</span></div><span class="pdisc">-${p.disc}%</span></div>
  </div>
</div>`).join('');
  obsv();
}

function filterP(c,el){document.querySelectorAll('.ccat').forEach(x=>x.classList.remove('active'));el.classList.add('active');af=c;rProds(c==='all'?PRODS:PRODS.filter(p=>p.cat===c));document.getElementById('products').scrollIntoView({behavior:'smooth',block:'start'})}
function sortP(t,el){document.querySelectorAll('.flt').forEach(b=>b.classList.remove('active'));el.classList.add('active');let l=af==='all'?[...PRODS]:PRODS.filter(p=>p.cat===af);if(t==='sale')l=l.filter(p=>p.tag==='sale');else if(t==='new')l=l.filter(p=>p.tag==='new');else if(t==='popular')l=[...l].sort((a,b)=>b.rev-a.rev);rProds(l)}

const sc=()=>localStorage.setItem('sn_c',JSON.stringify(cart));
const sw=()=>localStorage.setItem('sn_w',JSON.stringify([...wish]));

function addToCart(id,e){if(e)e.stopPropagation();const p=PRODS.find(x=>x.id===id);if(!p)return;const ex=cart.find(x=>x.id===id);if(ex)ex.qty++;else cart.push({...p,qty:1});sc();updBadge();toast(`"${p.name}" added to cart`);const b=document.getElementById('cBtnToggle');b.style.transform='scale(1.25)';setTimeout(()=>b.style.transform='',200)}
function quickAdd(name,price,img){const ex=cart.find(x=>x.name===name);if(ex)ex.qty++;else cart.push({id:Date.now(),name,price,img,qty:1});sc();updBadge();toast(`"${name}" added to cart`)}
function remCart(id){cart=cart.filter(x=>x.id!==id);sc();updBadge();rCart()}
function chQty(id,d){const it=cart.find(x=>x.id===id);if(!it)return;it.qty=Math.max(1,it.qty+d);sc();updBadge();rCart()}
function updBadge(){const n=cart.reduce((a,b)=>a+b.qty,0);const el=document.getElementById('cbadge');el.textContent=n;el.classList.toggle('show',n>0)}

function rCart(){
  const body=document.getElementById('cpbody'),foot=document.getElementById('cpfoot'),lbl=document.getElementById('cplbl');
  if(!cart.length){body.innerHTML=`<div class="cempty"><svg width="52" height="52"><use href="#i-cart"/></svg><p>Your cart is empty</p><p style="font-size:.78rem">Add some items to get started</p></div>`;foot.style.display='none';lbl.textContent='';return}
  const n=cart.reduce((a,b)=>a+b.qty,0);lbl.textContent=`(${n} item${n>1?'s':''})`;
  body.innerHTML=cart.map(it=>`<div class="ci"><img class="ciimg" src="${it.img}" alt="${it.name}"/><div class="ciinfo"><div class="ciname">${it.name}</div><div class="ciprice">$${it.price}</div><div class="ciaqty"><button class="qbtn" onclick="chQty(${it.id},-1)"><svg width="12" height="12"><use href="#i-minus"/></svg></button><span class="qnum">${it.qty}</span><button class="qbtn" onclick="chQty(${it.id},1)"><svg width="12" height="12"><use href="#i-plus"/></svg></button></div></div><button class="cidel" onclick="remCart(${it.id})"><svg width="15" height="15"><use href="#i-trash"/></svg></button></div>`).join('');
  const sub=cart.reduce((a,b)=>a+b.price*b.qty,0);document.getElementById('cpsub').textContent='$'+sub.toFixed(2);document.getElementById('cptot').textContent='$'+sub.toFixed(2);foot.style.display='block';
}

const openCart=()=>{document.getElementById('cveil').classList.add('open');rCart();document.body.style.overflow='hidden'};
const closeCart=()=>{document.getElementById('cveil').classList.remove('open');document.body.style.overflow=''};
document.getElementById('cveil').addEventListener('click',e=>{if(e.target===e.currentTarget)closeCart()});
document.getElementById('cBtnToggle').addEventListener('click',openCart);

function checkout(){if(!cart.length){toast('Your cart is empty');return}toast('Order placed! Thank you!');setTimeout(()=>{cart=[];sc();updBadge();closeCart();},1200)}

function togWish(id,e){if(e)e.stopPropagation();const btn=document.getElementById('wb'+id);if(!btn)return;if(wish.has(id)){wish.delete(id);btn.classList.remove('on');btn.innerHTML=`<svg width="14" height="14"><use href="#i-heart"/></svg>`;toast('Removed from wishlist')}else{wish.add(id);btn.classList.add('on');btn.innerHTML=`<svg width="14" height="14"><use href="#i-heart-f"/></svg>`;toast('Added to wishlist')}sw();updWish()}
function updWish(){const i=document.getElementById('wico');i.innerHTML=wish.size>0?'<use href="#i-heart-f"/>':'<use href="#i-heart"/>';document.getElementById('wBtnToggle').style.color=wish.size>0?'var(--red)':''}
document.getElementById('wBtnToggle').addEventListener('click',()=>toast(wish.size>0?`${wish.size} item${wish.size>1?'s':''} in your wishlist`:'Your wishlist is empty'));

function openModal(id,e){if(e)e.stopPropagation();const p=PRODS.find(x=>x.id===id);if(!p)return;mq=1;document.getElementById('mbox').innerHTML=`<div class="minner" style="position:relative"><button class="mclose" onclick="closeModal()"><svg width="15" height="15"><use href="#i-x"/></svg></button><div class="mimgside"><img src="${p.img}" alt="${p.name}"/></div><div class="mbody"><div class="mcat">${p.cat}</div><div class="mname">${p.name}</div><div style="display:flex;align-items:center;gap:7px;margin-bottom:14px"><div class="srow">${stars(p.rating)}</div><span style="font-weight:700">${p.rating}</span><span style="color:var(--muted);font-size:.8rem">(${p.rev.toLocaleString()} reviews)</span></div><p class="mdesc">Premium quality product crafted with meticulous attention to detail. Designed for those who appreciate excellence and style.</p><div class="mprow"><span class="mprice">$${p.price}</span><span class="morig">$${p.orig}</span><span class="pdisc">-${p.disc}%</span></div><span class="szlbl">SIZE</span><div class="sizes"><button class="sz" onclick="selSz(this)">XS</button><button class="sz on" onclick="selSz(this)">S</button><button class="sz" onclick="selSz(this)">M</button><button class="sz" onclick="selSz(this)">L</button><button class="sz" onclick="selSz(this)">XL</button></div><div class="mqrow"><div class="mqbox"><button class="mqb" onclick="mmq(-1)"><svg width="14" height="14"><use href="#i-minus"/></svg></button><span class="mqn" id="mqn">1</span><button class="mqb" onclick="mmq(1)"><svg width="14" height="14"><use href="#i-plus"/></svg></button></div><span class="instock"><svg width="14" height="14" style="color:var(--green)"><use href="#i-check"/></svg> In Stock</span></div><button class="btn-gold" style="width:100%;padding:15px;border-radius:14px;font-size:.95rem;justify-content:center" onclick="addToCart(${p.id});closeModal()"><svg width="16" height="16"><use href="#i-cart"/></svg> Add to Cart — $${p.price}</button></div></div>`;document.getElementById('mveil').classList.add('open');document.body.style.overflow='hidden'}
function selSz(b){b.closest('.sizes').querySelectorAll('.sz').forEach(x=>x.classList.remove('on'));b.classList.add('on')}
function mmq(d){mq=Math.max(1,mq+d);const el=document.getElementById('mqn');if(el)el.textContent=mq}
function closeModal(){document.getElementById('mveil').classList.remove('open');document.body.style.overflow='';mq=1}
function mclick(e){if(e.target===e.currentTarget)closeModal()}

document.getElementById('sBtnToggle').addEventListener('click',()=>{document.getElementById('sveil').classList.add('open');document.getElementById('sinp').focus();document.body.style.overflow='hidden'});
function closeSearch(){document.getElementById('sveil').classList.remove('open');document.getElementById('sinp').value='';document.getElementById('sres').innerHTML='';document.body.style.overflow=''}
function lsearch(q){const r=document.getElementById('sres');if(!q.trim()){r.innerHTML='';return}const m=PRODS.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.cat.toLowerCase().includes(q.toLowerCase()));if(!m.length){r.innerHTML='<p style="color:var(--muted);text-align:center;padding:22px">No results found</p>';return}r.innerHTML=`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:12px">${m.map(p=>`<div onclick="closeSearch();openModal(${p.id})" style="background:var(--card);border:1px solid var(--border);border-radius:14px;overflow:hidden;cursor:pointer;transition:transform .2s" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform=''"><img src="${p.img}" style="width:100%;aspect-ratio:4/3;object-fit:cover;display:block"/><div style="padding:11px"><div style="font-weight:600;font-size:.86rem;margin-bottom:3px">${p.name}</div><div style="color:var(--accent);font-weight:700;font-family:'Cormorant Garamond',serif;font-size:1.1rem">$${p.price}</div></div></div>`).join('')}</div>`}
document.getElementById('sveil').addEventListener('click',e=>{if(e.target===e.currentTarget)closeSearch()});

const hbg=document.getElementById('hbg'),mm=document.getElementById('mmenu');
hbg.addEventListener('click',()=>{hbg.classList.toggle('open');mm.classList.toggle('open');document.body.style.overflow=mm.classList.contains('open')?'hidden':''});
document.querySelectorAll('.mml').forEach(a=>a.addEventListener('click',()=>{hbg.classList.remove('open');mm.classList.remove('open');document.body.style.overflow=''}));

function toast(msg){const w=document.getElementById('tosts'),t=document.createElement('div');t.className='toast';t.innerHTML=`<span class="tdot"></span>${msg}`;w.appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transform='translateY(12px)';t.style.transition='all .3s';setTimeout(()=>t.remove(),320)},2400)}

window.addEventListener('scroll',()=>{document.getElementById('mainNav').classList.toggle('scrolled',scrollY>50);document.getElementById('btt').classList.toggle('show',scrollY>400)});

function buildCD(el,ms){function t(){const d=Math.max(0,ms-Date.now()),h=Math.floor(d/3600000),m=Math.floor((d%3600000)/60000),s=Math.floor((d%60000)/1000);el.innerHTML=[['Hrs',h],['Min',m],['Sec',s]].map(([l,v])=>`<div class="cbox"><span class="cnum">${String(v).padStart(2,'0')}</span><span class="clbl">${l}</span></div>`).join('')}t();setInterval(t,1000)}
buildCD(document.getElementById('cd1'),Date.now()+4*3600000+23*60000);

function subscribe(){const v=document.getElementById('nlemail').value;if(!v||!v.includes('@')){toast('Please enter a valid email');return}document.getElementById('nlemail').value='';toast('Subscribed! Welcome to ShopNova')}

document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeSearch();closeModal();closeCart();hbg.classList.remove('open');mm.classList.remove('open');document.body.style.overflow=''}if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();document.getElementById('sBtnToggle').click()}});

const io=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)'}})},{threshold:.08});
function obsv(){document.querySelectorAll('.rv').forEach(el=>{el.style.opacity='0';el.style.transform='translateY(22px)';el.style.transition='opacity .5s ease,transform .5s ease';io.observe(el)})}
document.querySelectorAll('.ccat,.tcard,.deal,.titem').forEach(el=>{el.style.opacity='0';el.style.transform='translateY(20px)';el.style.transition='opacity .5s ease,transform .5s ease';io.observe(el)});

rProds(PRODS);updBadge();updWish();
