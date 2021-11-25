// 빌드시 requestIdleCallback를 못 찾는 에러를 막기 위한 두 가지 방법
// requestidlecallback 이외의 type도 사용한다면 2번을 사용??
//
// npm install --save @types/requestidlecallback
// 1. /// <reference types='requestidlecallback' />
// 2. /// <reference path='../../../../node_modules/@types/requestidlecallback/index.d.ts' />
/// <reference types='requestidlecallback' />
import { ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface TaskData {
  count: number;
  text: string;
}
type TaskHandler = (data: TaskData) => void;

@Component({
  selector: 'app-background-task',
  templateUrl: './background-task.component.html',
  styleUrls: ['./background-task.component.scss']
})
export class BackgroundTaskComponent implements OnInit {
  @ViewChild('totalTaskCountElem') totalTaskCountElem: ElementRef;
  @ViewChild('currentTaskNumberElem') currentTaskNumberElem: ElementRef;
  // @ViewChild('progressBarElem') progressBarElem: ElementRef;
  @ViewChild('logElem') logElem: ElementRef;
  /**
   * 시스템이 idle 상태일 때 마다 해당 기능을 실행하는 idle콜백과 함께, 함수를 호출하기 위한 요청을 큐에 추가할 수 있습니다.
   */

  /** 큐에 추가된 태스크 수. 증가하기만 한다. */
  public totalTaskCount = 0;
  /** 처리한 태스크  */
  public currentTaskNumber = 0;
  public logBuffer: SafeHtml = '';
  public currentProgress = 0;

  // 처리 대기중인 태스크 리스트, 태스크 큐 및 실행에 대한 상태정보를 관리하는데 사용한다.
  /** 실행 대기중인 하나의 태스크 */
  private taskList: {
    handler: TaskHandler;
    data: TaskData;
  }[] = [];
  /** 지금 처리중인 태스크에 대한 참조 */
  private taskHandle = null;

  /** 우리의 로깅 함수에 의해 생성된 DocumentFragment 를 저장하는데 사용됩니다. 다음 애니메이션 프레임이 렌더링 될 때 로그에 추가할 내용을 만듭니다. */
  private logFragment: DocumentFragment = null;
  /** 앞으로의 프레임에 대한 상태 표시 박스의 업데이트를 이미 예약했는지 여부를 추적하는데 사용됩니다. 그렇기 때문에 프레임당 한 번만 수행합니다. */
  private statusRefreshScheduled = false;

  constructor(
    private sanitizer: DomSanitizer,
    private chagneDetectorRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['..']);
  }

  public start() {
    this.decodeTechnoStuff();
  }

  private enqueueTask(taskHandler: TaskHandler, taskData: TaskData) {
    this.taskList.push({
      handler: taskHandler,
      data: taskData
    });

    this.totalTaskCount++;

    // 지금 처리중인 태스크가 없으면 대기열에 있는 것 실행
    if (!this.taskHandle) {
      this.taskHandle = requestIdleCallback(this.runTaskQueue, { timeout: 1000 });
    }

    this.scheduleStatusRefresh();
  }

  // this를 bind하기 위해서 arrow function을 사용
  private runTaskQueue = (deadline: IdleDeadline) => {
    while((deadline.timeRemaining() > 0 || deadline.didTimeout ) && this.taskList.length) {
      const task = this.taskList.shift();
      this.currentTaskNumber++;

      task.handler(task.data);
      this.scheduleStatusRefresh();
    }

    if (this.taskList.length) {
      this.taskHandle = requestIdleCallback(this.runTaskQueue, { timeout: 1000 });
    } else {
      this.taskHandle = 0;
    }
  };

  private scheduleStatusRefresh() {
    if (!this.statusRefreshScheduled) {
      requestAnimationFrame(() => this.updateDisplay());
      this.statusRefreshScheduled = true;
    }
  }

  /** 로그와 프로세스바를 그린다. 다음 프레임을 렌더링하는 과정에 변경사항을 적용하기 위해 DOM이 안전한 상태인 경우 브라우저에서 호출합니다. */
  private updateDisplay() {
    const logElement = this.logElem.nativeElement;
    const scrolledToEnd = logElement.scrollHeight - logElement.clientHeight <= logElement.scrollTop + 1;

    if (this.totalTaskCount !== 0) {
      console.log(`totalTaskCount: ${this.totalTaskCount}`);
      console.log(`currentTaskNumber ${this.currentTaskNumber}`);
    }

    if (this.logFragment) {
      const logElem = this.logElem.nativeElement;
      logElem.appendChild(this.logFragment);
      this.logFragment = null;
    }

    if (scrolledToEnd) {
      logElement.scrollTop = logElement.scrollHeight - logElement.clientHeight;
    }

    //
    // Angular가 감지하지 못하는 영역에서의 변경에 대해서 알려주어야 한다.
    // ref: https://stackoverflow.com/questions/35105374
    this.chagneDetectorRef.detectChanges();

    this.statusRefreshScheduled = false;
  }

  private log(text: string) {
    let log = this.sanitizer.sanitize(SecurityContext.HTML, this.logBuffer);
    log += text;
    this.logBuffer = this.sanitizer.bypassSecurityTrustHtml(log);
  }

  private logTaskHandler = (data: TaskData) => {
    this.log('<strong>Running task #' + this.currentTaskNumber + '</strong>');

    for (let i = 0; i < data.count; i += 1) {
      this.log((i + 1).toString() + '. ' + data.text);
    }
  };

  private decodeTechnoStuff() {
    // 초기화
    this.totalTaskCount = 0;
    this.currentTaskNumber = 0;
    this.updateDisplay();

    const n = this.getRandomIntInclusive(100, 200);

    for (let i = 0; i < n; i++) {
      const taskData: TaskData = {
        count: this.getRandomIntInclusive(75, 150),
        text: `This text is from task number ${(i+1).toString()}  of  ${n}</br>`
      };

      this.enqueueTask(this.logTaskHandler, taskData);
    }
  }

  // eslint-disable-next-line max-len
  /** ref: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random?document_saved=true#Getting_a_random_integer_between_two_values_inclusive */
  private getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
  }
}
