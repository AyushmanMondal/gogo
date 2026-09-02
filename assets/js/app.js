  /* ── Icons ── */

  function folderIcon(disabled){
    const c = disabled ? '#2a2a2a' : '#2f6fed';
    const cd = disabled ? '#222' : '#1a46bb';
    /* Rectangle-proportioned folder: wider than tall */
    return `<svg width="38" height="28" viewBox="0 0 38 28" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 5.5 C2 4.1 3.1 3 4.5 3 H13 L15.5 5.5 H33.5 C34.9 5.5 36 6.6 36 8 V23 C36 24.4 34.9 25.5 33.5 25.5 H4.5 C3.1 25.5 2 24.4 2 23 Z" fill="${c}"/>
      <path d="M2 10 H36 V23 C36 24.4 34.9 25.5 33.5 25.5 H4.5 C3.1 25.5 2 24.4 2 23 Z" fill="${cd}"/>
    </svg>`;
  }

  let stack = [root];

  function goBack(){
    if(stack.length > 1){ stack.pop(); render(); }
  }
  function openNode(node){
    if(node.disabled) return;
    stack.push(node); render();
  }
  function jumpTo(idx){
    stack = stack.slice(0, idx+1); render();
  }

  /* ── Render ── */
  function render(){
    const current = stack[stack.length-1];
    const isRoot = stack.length === 1;

    /* back button */
    document.getElementById('backBtn').disabled = isRoot;

    /* level title */
    document.getElementById('levelTitle').textContent = isRoot ? '' : current.name;

    /* breadcrumb — hide "Home" crumb on root */
    const crumbEl = document.getElementById('breadcrumb');
    crumbEl.innerHTML = '';
    stack.forEach((node, idx) => {
      if(idx === 0) return; /* skip "Home" entirely */
      if(idx > 1){
        const sep = document.createElement('span');
        sep.className='sep'; sep.textContent='/';
        crumbEl.appendChild(sep);
      }
      const crumb = document.createElement('span');
      crumb.className = 'crumb' + (idx===stack.length-1 ? ' current' : '');
      crumb.textContent = node.name;
      if(idx !== stack.length-1) crumb.onclick = () => jumpTo(idx);
      crumbEl.appendChild(crumb);
    });

    /* content */
    const content = document.getElementById('content');
    content.innerHTML = '';

    /* blank node */
    if(current.type === 'blank'){
      const links = current.linksYear ? sessionLinks[current.linksYear] : null;
      const hasLinks = links && (links.pdf || links.image);
      if(hasLinks){
        const panel = document.createElement('div');
        panel.className='link-panel';
        if(links.pdf){
          const a=document.createElement('a');
          a.className='link-btn'; a.href=links.pdf;
          a.target='_blank'; a.rel='noopener noreferrer'; a.textContent='View PDF';
          panel.appendChild(a);
        }
        if(links.image){
          const a=document.createElement('a');
          a.className='link-btn'; a.href=links.image;
          a.target='_blank'; a.rel='noopener noreferrer'; a.textContent='View Image';
          panel.appendChild(a);
        }
        content.appendChild(panel);
      } else {
        const e=document.createElement('div');
        e.className='empty-state'; e.textContent='';
        content.appendChild(e);
      }
      return;
    }

    /* folder children */
    const children = current.children || [];
    if(children.length===0){
      const e=document.createElement('div');
      e.className='empty-state'; e.textContent='';
      content.appendChild(e); return;
    }

    const grid=document.createElement('div');
    grid.className='grid';

    children.forEach(node => {
      const item=document.createElement('div');
      item.className='item'+(node.disabled?' disabled':'');

      item.innerHTML=`
        <div class="item-icon">${folderIcon(node.disabled)}</div>
        <div class="item-text">
          <div class="name">${node.name}</div>
          ${node.fullForm ? `<div class="subtitle">${node.fullForm}</div>` : ''}
        </div>
      `;

      if(!node.disabled) item.onclick=()=>openNode(node);
      else item.setAttribute('aria-disabled','true');

      grid.appendChild(item);
    });

    content.appendChild(grid);
  }

  render();
      
