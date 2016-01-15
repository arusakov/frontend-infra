import {main} from '../srcjs/index';

describe('index', () => {

  it('main()', () => {
    spyOn(console, 'log');
    expect(main()).toBeUndefined();
  });

});
