# Performance API

[MDN 참조](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)

[A Primer for Web Performance Timing APIs](https://siusin.github.io/perf-timing-primer/)

[Resource Timing을 그린다](https://github.com/andydavies/waterfall)

문서 변경 이력

* 2021-02-15 A Primer for Web Performance Timeing APIs 참조 추가
* 2021-01-31 예제코드 설명 추가
* 2021-01-26 최초 작성

## 개념

고해상도까지 고려한 정밀한 측정을 위해서 마이크로초까지 정확하게 표현할 수 있는 High Resolution Time을 사용하여 성능을 측정한다.

### Method

now() : DOMHighResTimeStamp를 반환.  navigation start 범위에서.

toJson(): Performance 객체의 속성들을 보여준다.

### properties

timing: PerformanceTiming객체를 반환. 지연관련한 성능 정보를 담고 있다.(navigation time, start, end times..등)
navigation: PerformanceNavigation 객체를 반환. 브라우저에서 일어난 페이지 네비게이션 타입.

### PerformanceEntry

name: PerformanceEntry. entryType속성에서 반환하는 값을 추가로 지정하는 값
entryType: DOMString메트릭 성능을 나타내는 유형과 같은 예를 들어, " mark"
startTime: 시작 시간
duration: 이벤트의 기간의 시간 값

## 예제 코드 설명

현재 performanceEntry의 목록을 가져온다.

```typescript
  performance.getEntries();
```

entryType을 지정할 수 있다.

```typescript
  performance.getEntriesByType("mark");
```

특정 타입의 performanceEntry룰 생성한다.

```typescript
 performance.mark(markName);
 performance.measure('markA ~ markB를 측정', 'markA', 'markB');
```

현재 HighResTimeStamp를 얻는다.

```typescript
performance.now()
```

## 호환성

### Performance Entry

* IE에서 toJSON()만 지원하지 않는다.

### PerformanceMark, PerformanceMeasure

* PerformanceMark는 모든 브라우저가 지원한다.
* Firefox, IE, Safari에서 PerformanceMark() constructor, detail을 지원하지 않는다.

### DOMHighResTimeStamp

* 모든 브라우저에서 지원한다.
