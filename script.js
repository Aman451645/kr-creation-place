/* ================= CANVAS SETUP ================= */
const canvas = document.getElementById("constructionCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ================= IMAGE SEQUENCE ================= */
const frameCount = 6; // total frames
const images = [];
const build = { frame: 0 };

for(let i = 1; i <= frameCount; i++){
  const img = new Image();
  img.src = `img/frame_${String(i).padStart(3,"0")}.jpg`;
  images.push(img);
}

images[0].onload = render;

function render(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(images[build.frame],0,0,canvas.width,canvas.height);
}

/* ================= SCROLL ANIMATION ================= */
gsap.to(build,{
  frame: frameCount - 1,
  snap:"frame",
  ease:"none",
  scrollTrigger:{
    trigger:".story",
    start:"top top",
    end:"bottom bottom",
    scrub:1
  },
  onUpdate:render
});

/* ================= STAGE TEXT ================= */
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
    const index = Math.min(
      stages.length - 1,
      Math.floor(self.progress * stages.length)
    );
    stageText.textContent = stages[index];
  }
});
