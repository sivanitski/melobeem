import { gsap, Power1 } from "gsap";

export default class Spinner {
  constructor(spinner, stopper) {
    this.DOM = {
      spinner: spinner,
      stopper: stopper,
    };

    this.settings = {
      speed: 5,
    };

    this.state = {
      isPlay: false,
      speed: this.settings.speed,
      angle: 0,
      sector: 0,
      stopperInAnim: false,
      ticksToStop: 0,
      isMustBeStop: false,
    };
  }

  play() {
    if (this.state.isPlay) return;

    this.state.isPlay = true;
    gsap.to(this.state, { speed: this.settings.speed });
    window.requestAnimationFrame(this.tick.bind(this));
  }

  stop(stopAngle = 800) {
    if (!this.state.isPlay || this.state.isMustBeStop) return;

    this.state.isMustBeStop = true;
    stopAngle = stopAngle < this.state.angle ? stopAngle + 360 : stopAngle;
    const angle = stopAngle - this.state.angle;
    const duration = ((0.0166 * angle) / this.state.speed) * 2;

    gsap.to(this.state, {
      speed: 0,
      angle: stopAngle,
      duration,
      ease: Power1.easeOut,
      onComplete: () => {
        this.state.isMustBeStop = false;
        this.state.isPlay = false;
      },
    });
    return duration * 1000;
  }

  rotate() {
    this.DOM.spinner.style.transform = "rotate(" + this.state.angle + "deg)";

    const sector = Math.floor((this.state.angle % 360) / 45);

    if (this.state.sector !== sector) {
      this.state.sector = sector;
      this.stopperPlay();
    }
  }

  stopperPlay() {
    if (this.state.stopperInAnim) return;
    this.state.stopperInAnim = true;
    const rotate =
      0.3 / this.state.speed > 1 ? -35 / (0.3 / this.state.speed) : -35;
    const duration = 0.3 / this.state.speed > 1 ? 0.5 : 0.3 / this.state.speed;
    gsap
      .timeline({
        onComplete: () => {
          this.state.stopperInAnim = false;
        },
      })
      .to(this.DOM.stopper, {
        rotate: rotate,
        duration: duration,
        transformOrigin: "10px 10px",
      })
      .to(this.DOM.stopper, {
        rotate: 0,
        duration: 0.3,
        transformOrigin: "10px 10px",
      });
  }

  tick() {
    if (!this.state.isMustBeStop)
      this.state.angle = (this.state.angle + this.state.speed) % 360;
    this.rotate();

    if (this.state.isPlay) window.requestAnimationFrame(this.tick.bind(this));
  }
}

// const spinner = new Spinner();
// spinner.play();

// document.documentElement.addEventListener('click', () => {
//   if (spinner.state.isPlay)
//   spinner.stop();
//   else
//   spinner.play();
// })
