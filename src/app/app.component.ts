import { Component } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'serachImages';

  idleState = 'Not started';
  timedOut = false;
  lastPing?: Date;
  dimmed?: boolean;

  constructor(private idle: Idle, private keepalive: Keepalive) {
    idle.setIdle(30);
    idle.setTimeout(30);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle';
      console.log(this.idleState);
      this.reset();
    });
    //  when time is run out
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timeout!';
      this.timedOut = true;
      console.log(this.idleState);
      //do somthing for example block the page
      localStorage.clear();
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      console.log(this.idleState);
    });

    keepalive.interval(15);
    keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started';
    this.timedOut = false;
    console.log(this.idleState);
  }
}
