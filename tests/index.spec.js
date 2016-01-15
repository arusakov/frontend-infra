import {main} from '../srcjs/index';

describe('index', () => {

  it('main()', () => {
    spyOn(console, 'log');
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    expect(main()).toBeUndefined();
  });

});
