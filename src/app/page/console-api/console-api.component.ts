/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-console-api',
  templateUrl: './console-api.component.html',
  styleUrls: ['./console-api.component.scss']
})
export class ConsoleApiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /** text나 data를 기록 */
  log() {
    for (let i = 0; i < 3; i++) {
      console.log('Hello, %s. You\'ve called me %d times.', 'Bob', i + 1);
    }

    console.log('This is %cMy stylish message', 'color: yellow; font-style: italic; background-color: blue;padding: 2px');
  }

  info() {
    const car = 'Dodge Charger';
    const someObject = { str: 'Some text', id: 5 };
    (console as any).info(someObject);
    (console as any).info('My first car was a', car, '. The object is:', someObject);
  }

  error() {
    const car = 'Dodge Charger';
    const someObject = { str: 'Some text', id: 5 };
    console.error(someObject);
    console.error('My first car was a', car, '. The object is:', someObject);
  }

  warn() {
    const car = 'Dodge Charger';
    const someObject = { str: 'Some text', id: 5 };
    console.warn(someObject);
    console.warn('My first car was a', car, '. The object is:', someObject);
  }

  debug() {
    const car = 'Dodge Charger';
    const someObject = { str: 'Some text', id: 5 };
    (console as any).debug(someObject);
    (console as any).debug('My first car was a', car, '. The object is:', someObject);
  }

  dir() {
    const someObject = { str: 'Some text', id: 5 };
    console.dir(someObject);
  }

  dirxml() {
    const someObject = { str: 'Some text', id: 5 };
    console.dirxml(someObject);
    console.dirxml(document);
  }

  table() {
    const someObject = { str: 'Some text', id: 5 };
    console.table(someObject);
  }

  /** group */
  group() {
    console.log('This is the outer level');
    console.group('First group');
    console.log('In the first group');
    console.group('Second group');
    console.log('In the second group');
    console.warn('Still in the second group');
    console.groupEnd();
    console.log('Back to the first group');
    console.groupEnd();
    (console as any).debug('Back to the outer level');
  }

  groupCollapsed() {
    console.log('This is the outer level');
    console.groupCollapsed('First group');
    console.log('In the first group');
    console.groupCollapsed('Second group');
    console.log('In the second group');
    console.warn('Still in the second group');
    console.groupEnd();
    console.log('Back to the first group');
    console.groupEnd();
    (console as any).debug('Back to the outer level');
  }

  /** timer */
  time() {
    for (let i=1; i<5; i++) {
      (console as any).time(`timer${i}`);
    }
  }

  timeEnd() {
    for (let i=1; i<3; i++) {
      (console as any).timeEnd(`timer${i}`);
    }
  }

  /** trace */
  trace() {
    function foo() {
      function bar() {
        (console as any).trace();
      }
      bar();
    }

    foo();
  }

  assert() {
    console.log('condition: true');
    console.assert(true);
    console.log('condition: false');
    console.assert(false);
  }

  count() {
    for(let i=1; i<4; i++) {
      console.count('label');
    }
  }

  countReset() {
    console.count('label');
    console.count('label');
    console.countReset('label');
    console.count('label');
  }

  profile() {
    (console as any).profile('profileTest');
  }

  profileEnd() {
    (console as any).profileEnd('profileTest');
  }

  clear() {
    console.clear();
  }
}
