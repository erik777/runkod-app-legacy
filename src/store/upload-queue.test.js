import reducer, {
  setAct,
  startAct,
  okAct,
  errorAct,
  finishAct,
  resetAct
} from "./upload-queue"


describe('Scenario 1 - Ends up with one fail', () => {
  let state = undefined;

  it('1- default state', () => {
    expect(reducer(state, {})).toMatchSnapshot();
  });

  it('2- setAct - add files to queue. 4 items in "pending".', () => {
    const files = [
      {_id: 'id1', path: '', name: 'style.css'},
      {_id: 'id2', path: '', name: 'main.js'},
      {_id: 'id4', path: '', name: 'index.html'},
      {_id: 'id7', path: 'images/', name: 'bg.jpg'},
    ];
    const act = setAct(files);
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('3- startAct', () => {
    const act = startAct();
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('4- okAct - 3 items in "pending", 1 item in "completed".', () => {
    const act = okAct({_id: 'id2', path: '', name: 'main.js'});
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('5- okAct - 2 item in "pending", 2 items in "completed".', () => {
    const act = okAct({_id: 'id7', path: 'images/', name: 'bg.jpg'});
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('6- errorAct. 1 item in "pending", 2 items in "completed", 1 item in "failed". ', () => {
    const act = errorAct({_id: 'id4', path: '', name: 'index.html'});
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('7- okAct. 0 item in "pending", 3 items in "completed", 1 item in "failed". ', () => {
    const act = okAct({_id: 'id1', path: '', name: 'style.css'});
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('8- finishAct', () => {
    const act = finishAct();
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('9- resetAct', () => {
    const act = resetAct();
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

});


describe('Scenario 2 - All success', () => {
  let state = undefined;

  it('1- default state', () => {
    expect(reducer(state, {})).toMatchSnapshot();
  });

  it('2- setAct - add files to queue. 4 items in "pending".', () => {
    const files = [
      {_id: 'id1', path: '', name: 'style.css'},
      {_id: 'id2', path: '', name: 'main.js'},
      {_id: 'id4', path: '', name: 'index.html'},
      {_id: 'id7', path: 'images/', name: 'bg.jpg'},
    ];
    const act = setAct(files);
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('3- startAct', () => {
    const act = startAct();
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('4- okAct - 3 items in "pending", 1 item in "completed".', () => {
    const act = okAct({_id: 'id2', path: '', name: 'main.js'});
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('5- okAct - 2 item in "pending", 2 items in "completed".', () => {
    const act = okAct({_id: 'id7', path: 'images/', name: 'bg.jpg'});
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('6- okAct. 1 item in "pending", 3 items in "completed"', () => {
    const act = okAct({_id: 'id4', path: '', name: 'index.html'});
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('7- okAct. 0 item in "pending", 4 items in "completed"', () => {
    const act = okAct({_id: 'id1', path: '', name: 'style.css'});
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('8- finishAct', () => {
    const act = finishAct();
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('9- resetAct', () => {
    const act = resetAct();
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

});

