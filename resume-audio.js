const resumeAudioTemplate = document.createElement('template');
resumeAudioTemplate.innerHTML = `
  <style>
    .animate{
      animation-name: ripple;
      animation-duration: 1.6s;
      animation-timing-function: ease-out;
    }

    @keyframes ripple {
      from {
        r:0;
      }
      to {
        r: 200vw;
      }
    }

    svg, .splash-container {
      height: 100vh;
      width: 100vw;
      margin: 0;
      padding: 0;
      position: absolute;
    }
  </style>

  <div class="splash-container">
  </div>

  <svg>
    <defs>
      <clipPath id="resumeAudio">
        <circle r="0" />
      </clipPath>
    </defs>
  </svg>
`;

class resumeAudio extends HTMLElement {
  constructor() {
    super();
    let resumeAudio = this;
    let contents = this.innerHTML;
    this.innerHTML = '';
    this.appendChild(resumeAudioTemplate.content.cloneNode(true));

    let splashContainer = this.querySelector(".splash-container");

    splashContainer.innerHTML = contents;

    let circle = this.querySelector("circle");

    this.addEventListener('touchstart', function(e) {
      Tone.start();
      circle.style.cx = e.touches[0].clientX;
      circle.style.cy = e.touches[0].clientY;
      startContext();
    }, false);

    this.addEventListener('mousedown', function(e) {
      Tone.start();
      circle.style.cx = e.clientX;
      circle.style.cy = e.clientY;
      startContext();
    }, false);

    function startContext() {
      circle.classList.add('animate');
      setTimeout(function(){ resumeAudio.parentNode.removeChild(resumeAudio); }, 1500);
    }

  }//end constructor
}//end HTMLElement
customElements.define('resume-audio', resumeAudio);
