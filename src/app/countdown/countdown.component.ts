import { Component, Input, Output, OnInit, OnDestroy, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: [ './countdown.component.scss' ]
})
export class CountdownComponent implements OnInit, OnDestroy, OnChanges {

  @Input() init: number = null;
  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();
  public counter = 0;
  private countdownTimeRef: any = null;

  constructor() { }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy() {
    this.clearTimeout();
  }

  ngOnChanges(changes) {
    this.startCountdown();
  }

  startCountdown() {
    if (this.init && this.init > 0) {
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown() {
    this.countdownTimeRef = setTimeout(() => {
      this.counter = this.counter - 1;
      this.processCountdown();
    }, 1000);
  }

  processCountdown() {
    this.onDecrease.emit(this.counter);
    console.log('count is', this.counter);

    if (this.counter === 0) {
      this.onComplete.emit();
      console.log('counter end');
    } else {
      this.doCountdown();
    }
  }

  private clearTimeout() {
    if (this.countdownTimeRef) {
      /* clearTimeout es una función del core de Javascript que sirve para liberar referencias a timeouts generados con setTimeout. */
      clearTimeout(this.countdownTimeRef);
      this.countdownTimeRef = null;
    }
  }

}
