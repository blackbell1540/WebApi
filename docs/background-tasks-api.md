# Background Tasks API

[MDN 참조](https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API)

문서 변경 이력

* 2020-12-15 내용 작성
* 2020-12-05 최초 작성

## 개념

Cooperative Scheduling of Background Tasks API
user agnet(브라우저)가 자원이 생기면 대기열에 있던 백그라운드에서 처리되지만 중요도는 낮은 작업들을 순차적으로 처리한다.

주의 사항..

* 우선순위(priority)가 높지 않은 태스크 -> 이번 이벤트 주기에 처리되지 못할 수 도 있다
* 아이들 콜백은 할당 된 시간을 초과하지 않아야한다
* 아이들 콜백 내에서 DOM 변경은 지양한다. -> 돔을 다시그려야 하는 문제가 있다. DOM을 변경해야 한다면 `Window.requestAnimationFrame()`을 이용해 예약해야한다.
* 실행시간을 예측할 수 없는 태스크는 지양한다.
* timeout은 정말 필요할 때만 써야 한다.

## 참고

* [requestAnimationFrame(), requestIdleCallback() 사용](https://black7375.tistory.com/72)
* [using-requestidlecallback](https://developers.google.com/web/updates/2015/08/using-requestidlecallback#why_should_i_use_requestidlecallback)

## 예제 코드 설명

1. `requestidlecallback()`을 이용하여 대기열에 작업을 넣어둔다.

  ```typescript
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
  ```

2. `requestAnimationFrame()`을 이용하여 DOM 업데이트를 예약한다.

  ```typescript
    private scheduleStatusRefresh() {
      if (!this.statusRefreshScheduled) {
        requestAnimationFrame(() => this.updateDisplay());
        this.statusRefreshScheduled = true;
      }
    }
  ```  

## 호환성

* 사파리는 메뉴의 개발자용 > 실험적 기능 > requestIdleCallback을 켜면 사용 가능하다.
* IE는 지원하지 않는다.
