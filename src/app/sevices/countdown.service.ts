import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject, empty, interval } from 'rxjs'
import { map, switchMap, take } from 'rxjs/operators';
import { BaseAppService } from './base/base.app.service';

@Injectable({
    providedIn: "root",
})
export class CountdownService extends BaseAppService {

    constructor(protected httpCLient: HttpClient) {
        super(httpCLient);
    }

    public onCountDownCounter: EventEmitter<any> = new EventEmitter();

    timerList: any[] = [];
    timeNowInMinutes;
    timer = {
        id: this.genId(),
        timer$: null,
        total: 10,
        resume$: new Subject()
    };
    newtotal = 10;

    genId() {
        return this.timerList.length + 1;
    } 
    getTimer(id) {
        return this.timerList.filter(timer => timer.id === id)[0];
    } 
    newTimer(current?) {
        let source = interval(1000);
        let timer = Object.assign({}, this.timer);

        if (!current) {
            timer.timer$ = timer.resume$.pipe(switchMap(
                resume => (resume ? source : empty())
            ));
            this.timerList.push(timer);
        } else {
            timer.id = current.id;
            timer.resume$ = new Subject();
            timer.timer$ = timer.resume$.pipe(switchMap(
                resume => (resume ? source : empty())
            ));
            let backup = Object.assign({}, timer);
            this.timerList.splice(this.timerList.findIndex(t => t.id === current.id));
            this.timerList.push(backup);
        }

    } 
    startTimer(id, totalx:number=10) { 
        let timer = this.getTimer(id);  

        timer.timer$
            .pipe(
                take(totalx + 1),
                map((v:any) => totalx - (v))
            ).subscribe((v) => { 
                this.onCountDownCounter.emit(Math.floor((v) % 60)); 
            },
                (err) => console.log(err),
                () => { 
                    this.onCountDownCounter.emit(0);
                });

        timer.resume$.next(true);
    } 
    pauseTimer(id) {
        this.getTimer(id).resume$.next(false);
    } 
    resumeTimer(id) {
        this.getTimer(id).resume$.next(true);
    } 
    resetTimer(id) {
        this.getTimer(id).resume$.complete(); 
        let timer = this.getTimer(id);
        this.newTimer(timer);
    }
    stopTimer(id) {
        this.getTimer(id).resume$.next(false);
        this.resetTimer(id);
    } 
}