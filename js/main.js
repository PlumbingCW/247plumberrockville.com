(function(){
  var d=document;
  /* mobile drawer, one breakpoint (768) shared with CSS */
  var t=d.getElementById("mob-toggle"),dr=d.getElementById("mob-drawer"),ov=d.getElementById("mob-overlay"),cl=d.getElementById("drawer-close");
  function openM(){dr.classList.add("open");ov.classList.add("visible");t.setAttribute("aria-expanded","true");t.setAttribute("aria-label","Close navigation menu");d.documentElement.style.overflow="hidden";}
  function closeM(){dr.classList.remove("open");ov.classList.remove("visible");t.setAttribute("aria-expanded","false");t.setAttribute("aria-label","Open navigation menu");d.documentElement.style.overflow="";}
  if(t&&dr&&ov){
    t.addEventListener("click",function(){t.getAttribute("aria-expanded")==="true"?closeM():openM();});
    if(cl)cl.addEventListener("click",closeM);
    ov.addEventListener("click",closeM);
    dr.querySelectorAll("a").forEach(function(a){a.addEventListener("click",closeM);});
    d.addEventListener("keydown",function(e){if(e.key==="Escape")closeM();});
    window.addEventListener("resize",function(){if(window.innerWidth>768)closeM();});
  }
  /* FAQ accordion: max-height toggle */
  d.querySelectorAll(".faq-q").forEach(function(b){
    b.addEventListener("click",function(){
      var it=b.parentNode,open=it.classList.toggle("open");
      b.setAttribute("aria-expanded",open?"true":"false");
    });
  });
  /* tabs: all panels stay in the HTML, script shows one at a time */
  d.querySelectorAll("[data-tabs]").forEach(function(box){
    var btns=box.querySelectorAll(".tabbtn"),panels=box.querySelectorAll(".tabpanel");
    function show(i,focus){
      btns.forEach(function(b,j){b.setAttribute("aria-selected",j===i?"true":"false");b.tabIndex=j===i?0:-1;});
      panels.forEach(function(p,j){if(j===i){p.removeAttribute("hidden");}else{p.setAttribute("hidden","");}});
      if(focus)btns[i].focus();
    }
    btns.forEach(function(b,i){
      b.addEventListener("click",function(){show(i,false);});
      b.addEventListener("keydown",function(e){
        var n=btns.length;
        if(e.key==="ArrowRight"){e.preventDefault();show((i+1)%n,true);}
        if(e.key==="ArrowLeft"){e.preventDefault();show((i-1+n)%n,true);}
      });
    });
    show(0,false);
  });
})();
