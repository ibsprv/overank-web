import React, { PureComponent, Dispatch, MouseEvent } from 'react';
import { withLocalize, Translate, LocalizeContextProps } from 'react-localize-redux';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { Button } from '@material-ui/core';
import { setFilter, filterSomething } from '../actions';
import { ISomething } from '../models';

interface IState {
  something: ISomething[];
  f: Partial<ISomething>;
}

interface IRootState {
  rootReducer: IState;

}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    onSetFilter: (click: MouseEvent) => dispatch(setFilter(click, { id: 2 })),
    clearFilter: (click: MouseEvent) => dispatch(setFilter(click, {})),
});

// const mapStateToProps = (state: IState, ownProps: any) => {
  const mapStateToProps = (state: IRootState) => {
  // tslint:disable-next-line:no-console
  console.log('mapStateToProps', state.rootReducer.something);
  return {
        something: filterSomething(state.rootReducer.something, state.rootReducer.f),
        f: state.rootReducer.f
  };
}

interface ITestReduxProps extends LocalizeContextProps, IState {
    onSetFilter: (click: MouseEvent) => void;
    clearFilter: (click: MouseEvent) => void;
}

class TestRedux extends PureComponent<ITestReduxProps, IState, AnyAction> {
    constructor(props: ITestReduxProps, state: IState) {
        super(props, state);
    }

    public componentDidMount() {
        // nothing to do
    }

    public render() {
      if (!this.props || !this.props.something) {
            return 'Loading...';
        }
        const { clearFilter, onSetFilter, something } = this.props;


        return (
            <div>
                <Button variant="contained" color="primary" onClick={onSetFilter}>
                    <Translate id="label.changeTestState" />
              </Button>
              <Button variant="contained" color="primary" onClick={clearFilter}>
                    <Translate id="label.clearTestState" />
              </Button>
              <ul>
                {something.map(s =>
                  <li key={s.id}>{s.text}</li>
                )}
              </ul>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withLocalize(TestRedux));
