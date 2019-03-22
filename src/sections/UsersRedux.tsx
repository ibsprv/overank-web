import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { UserQueries } from '../queries';

interface IResult {
    userMany: IUser[];
}

interface IProps {
    data: IResult;
}

interface IUser {
    _id: string;
    name: string;
}

const mapQueriesToProps = () => ({
    data: {
        query: UserQueries.getUsers,
        userMany: [],
    },
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
    const actions = {};
    // tslint:disable-next-line:no-console
    console.log('dispache');
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

class UsersRedux extends PureComponent<IProps, any> {
    public render() {
        const { userMany } = this.props.data;
        return (
            <select name="user">
            {userMany.map((user: IUser) => (
                    <option key={user._id} value={user.name}>
                        {user.name}
              </option>
                ))}
          </select>
        );
    }
}

export default connect(
    mapQueriesToProps,
    mapDispatchToProps,
)(UsersRedux);
