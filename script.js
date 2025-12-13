const canvas = document.getElementById("constructionCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* IMAGE SEQUENCE */
const frameCount = 6;
const images = [];
const build = { frame: 0 };
let loaded = 0;

for(let i = 1; i <= frameCount; i++){
  const img = new Image();
  img.src = `img/frame_${String(i).padStart(3,"0")}.webp`;

  img.onload = () => {
    loaded++;
    if(loaded === frameCount){
      render();
      initScroll();
    }
  };

  images.push(img);
}

/* CINEMATIC RENDER */
function render(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const img = images[Math.floor(build.frame)];

  // subtle zoom effect (camera movement)
  const scale = 1 + build.frame * 0.02;
  const w = canvas.width * scale;
  const h = canvas.height * scale;

  ctx.globalAlpha = 0.9;
  ctx.drawImage(
    img,
    (canvas.width - w) / 2,
    (canvas.height - h) / 2,
    w,
    h
  );

  ctx.globalAlpha = 1;
}

/* SMOOTH SCROLL INTERPOLATION */
function initScroll(){
  gsap.to(build,{
    frame: frameCount - 1,
    ease:"power2.out",
    scrollTrigger:{
      trigger:".story",
      start:"top top",
      end:"bottom bottom",
      scrub:1.5   // <-- THIS MAKES IT FEEL ANIMATED
    },
    onUpdate:render
  });
}

/* STAGE TEXT */
const stageText = document.getElementById("stageText");
const stages = [
  "Empty Plot",
  "Foundation Work",
  "Structure Rising",
  "Brick & Plaster",
  "Finishing & Elevation",
  "Project Completed"
];

ScrollTrigger.create({
  trigger:".story",
  start:"top top",
  end:"bottom bottom",
  scrub:true,
  onUpdate:self=>{
    stageText.textContent =
      stages[Math.min(
        stages.length - 1,
        Math.floor(self.progress * stages.length)
      )];
  }
});
