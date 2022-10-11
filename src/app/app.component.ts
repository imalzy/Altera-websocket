import { environment } from './../environments/environment';
import { Component, OnInit } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { concatMap, delay } from 'rxjs/operators';
import { fromEvent, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ws-bitcoin';
  data: any;
  bitcoin:number[] = [];
  websocket$: WebSocketSubject<any> | undefined;

  ngOnInit(): void {

  }

  startWs(): void {
    this.websocket$ = webSocket(environment.websocket_bitcoint);

    this.websocket$
      .pipe(concatMap((item) => of(item).pipe(delay(1000))))
      .subscribe((res: any) => {
        console.log(res.bitcoin)
        this.bitcoin.push(res.bitcoin);

        this.data = {
          labels: [1, 2, 3],
          datasets: [
            {
              label: 'Bitcoin',
              data: [this.bitcoin],
              borderColor: '#FFA726',
              tension: 0.4,
            },
          ],
        };
      });

    this.websocket$ = webSocket({
      url: environment.websocket_bitcoint,
      serializer: val => JSON.stringify({channel: '', val})
    })
  }
}
