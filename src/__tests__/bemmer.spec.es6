import should from 'should';
import Bemmer from '../bemmer';

describe('new suite', () => {
  it('new spec', () => {
    var className = new Bemmer('myComponent', 'yourClassName largeSize', 'otherElementName');

    console.log(
      className
        .element('title')
        .state('--isEven', Date.now() % 2 === 0)
        .state('--isOdd', Date.now() % 2 === 1)
        .do()
    );

    should('its').be.ok;
  });
})
