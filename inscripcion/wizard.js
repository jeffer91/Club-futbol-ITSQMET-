document.addEventListener('DOMContentLoaded',()=>{
  const form=document.querySelector('#registrationForm');
  if(!form)return;
  const pages=[...document.querySelectorAll('.wizard-page')];
  const labels=[...document.querySelectorAll('.wizard-step-label')];
  const progress=document.querySelector('#wizardProgressBar');
  const back=document.querySelector('#wizardBack');
  const next=document.querySelector('#wizardNext');
  const submit=document.querySelector('#wizardSubmit');
  const error=document.querySelector('#wizardError');
  let current=1;

  function showError(message){
    error.textContent=message;
    error.classList.add('show');
  }
  function clearError(){error.classList.remove('show')}

  function validatePage(step){
    clearError();
    const page=pages.find(p=>Number(p.dataset.step)===step);
    if(!page)return true;
    const required=[...page.querySelectorAll('[required]')];
    for(const field of required){
      if(!field.checkValidity()){
        field.reportValidity();
        return false;
      }
    }
    if(step===3){
      const rows=[...document.querySelectorAll('#players .player-row')];
      if(rows.length<6){
        showError('Agrega al menos 6 jugadores para continuar.');
        return false;
      }
      const institutional=rows.filter(r=>r.querySelector('[data-k="type"]')?.value==='institucional').length;
      const external=rows.length-institutional;
      if(institutional<4){
        showError('La plantilla debe incluir al menos 4 estudiantes institucionales.');
        return false;
      }
      if(external>2){
        showError('La plantilla puede incluir máximo 2 jugadores externos.');
        return false;
      }
    }
    return true;
  }

  function updateSummary(){
    const team=form.elements.teamName?.value?.trim()||'Sin completar';
    const captain=form.elements.captain?.value?.trim()||'Sin completar';
    const players=document.querySelectorAll('#players .player-row').length;
    const teamEl=document.querySelector('#reviewTeam');
    const captainEl=document.querySelector('#reviewCaptain');
    const playersEl=document.querySelector('#reviewPlayers');
    if(teamEl)teamEl.textContent=team;
    if(captainEl)captainEl.textContent=captain;
    if(playersEl)playersEl.textContent=`${players} jugadores`;
  }

  function render(){
    pages.forEach(p=>p.classList.toggle('active',Number(p.dataset.step)===current));
    labels.forEach((label,index)=>{
      const step=index+1;
      label.classList.toggle('active',step===current);
      label.classList.toggle('done',step<current);
    });
    if(progress)progress.style.width=`${current*25}%`;
    if(back)back.hidden=current===1;
    if(next)next.hidden=current===4;
    if(submit)submit.hidden=current!==4;
    if(current===4)updateSummary();
    clearError();
  }

  function go(step){
    current=Math.max(1,Math.min(4,step));
    render();
    const top=document.querySelector('.registration-intro');
    if(top)window.scrollTo({top:Math.max(0,top.offsetTop-88),behavior:'smooth'});
  }

  next?.addEventListener('click',()=>{
    if(validatePage(current))go(current+1);
  });
  back?.addEventListener('click',()=>go(current-1));

  form.addEventListener('submit',e=>{
    if(current!==4){
      e.preventDefault();
      if(validatePage(current))go(current+1);
    }
  });

  document.querySelector('#closeSuccess')?.addEventListener('click',()=>go(1));
  render();
});