import reducer, {
  setAct,
  startAct,
  finishAct,
  okAct,
  errorAct,
  resetAct
} from "./delete-queue"


describe('Scenario 1 - Ends up with one fail', () => {
  let state = undefined;

  it('1- default state', () => {
    expect(reducer(state, {})).toMatchSnapshot();
  });

  it('2- set. 2 items in "pending".', () => {
    const files = [
      {_id: 'foo', parent: '/', label: 'style.css'},
      {_id: 'bar', parent: '/', label: 'main.js'}
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

  it('5- okAct. 1 item in "pending", 1 items in "completed".', () => {
    const act = okAct({_id: 'foo', parent: '/', label: 'style.css'});
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('7- errorAct. 0 item in "pending", 1 items in "completed", 1 item in "failed". ', () => {
    const act = errorAct({_id: 'bar', parent: '/', label: 'main.js'});
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

  it('2- setAct. 2 items in "pending".', () => {
    const files = [
      {_id: 'foo', parent: '/', label: 'style.css'},
      {_id: 'bar', parent: '/', label: 'main.js'}
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

  it('5- okAct. 1 item in "pending", 1 items in "completed".', () => {
    const act = okAct({_id: 'foo', parent: '/', label: 'style.css'});
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('7- okAct. 0 item in "pending", 2 items in "completed".', () => {
    const act = okAct({_id: 'bar', parent: '/', label: 'main.js'});
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('8- finishAct', () => {
    const act = finishAct();
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });

  it('9- reset', () => {
    const act = resetAct();
    state = reducer(state, act);
    expect(state).toMatchSnapshot();
  });
});


