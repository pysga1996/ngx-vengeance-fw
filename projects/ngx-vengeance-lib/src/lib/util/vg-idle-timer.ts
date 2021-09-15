export class VgIdleTimer {
  private readonly timeout: number;
  private readonly onTimeout: () => void;
  eventHandler: () => void;
  interval!: NodeJS.Timeout;
  timeoutTracker!: NodeJS.Timeout;

  constructor(
    timeout = 30,
    onTimeout = () => {
      console.debug('Interaction Timeout!');
    }
  ) {
    this.timeout = timeout;
    this.onTimeout = onTimeout;

    this.eventHandler = this.updateExpiredTime.bind(this);
    this.tracker();
    this.startInterval();
  }

  startInterval(): void {
    this.updateExpiredTime();

    this.interval = setInterval(() => {
      const expiredTime = parseInt(
        localStorage.getItem('_expiredTime') as string,
        10
      );
      if (expiredTime < Date.now()) {
        if (this.onTimeout) {
          this.onTimeout();
          this.cleanUp();
        }
      }
    }, 1000);
  }

  updateExpiredTime(): void {
    if (this.timeoutTracker) {
      clearTimeout(this.timeoutTracker);
    }
    this.timeoutTracker = setTimeout(() => {
      localStorage.setItem(
        '_expiredTime',
        String(Date.now() + this.timeout * 1000)
      );
    }, 300);
  }

  tracker(): void {
    window.addEventListener('mousemove', this.eventHandler);
    window.addEventListener('scroll', this.eventHandler);
    window.addEventListener('keydown', this.eventHandler);
  }

  cleanUp(): void {
    clearInterval(this.interval);
    window.removeEventListener('mousemove', this.eventHandler);
    window.removeEventListener('scroll', this.eventHandler);
    window.removeEventListener('keydown', this.eventHandler);
  }
}
